import json
import re
import subprocess
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
APP_JS = ROOT / "app.js"
INDEX_HTML = ROOT / "index.html"
STYLES_CSS = ROOT / "styles.css"
SOURCE_XLSX = ROOT / "Soure info" / "Servant leadership manifesto Summarize_Final.xlsx"


class StaticAppRegressionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = APP_JS.read_text(encoding="utf-8")
        cls.index = INDEX_HTML.read_text(encoding="utf-8")
        cls.styles = STYLES_CSS.read_text(encoding="utf-8")

    def test_javascript_syntax_is_valid(self):
        result = subprocess.run(
            ["node", "--check", str(APP_JS)],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

    def test_required_dom_hooks_exist(self):
        for selector in [
            'id="manifestoHotspots"',
            'id="sourceFilters"',
            'id="lensFilters"',
            'id="scenarioGrid"',
            'id="toolGrid"',
            'id="detailDrawer"',
        ]:
            self.assertIn(selector, self.index)

        self.assertRegex(self.index, r'<script src="./app\.js\?v=2026-04-24-1"></script>')
        self.assertIn(".manifesto-hotspot", self.styles)

    def test_manifesto_text_is_verbatim_from_excel_final_sheet(self):
        source_rows = self._read_final_sheet_rows()
        app_rows = self._read_manifesto_rows_from_app()

        self.assertEqual(len(source_rows), 8)
        self.assertEqual(len(app_rows), 8)

        for attitude, source in source_rows.items():
            self.assertIn(attitude, app_rows)
            self.assertEqual(app_rows[attitude], source)

    def test_manifesto_hotspots_match_manifesto_rows(self):
        principle_ids = set(
            re.findall(
                r'\{\n    id: "([^"]+)",\n    principle: "[\s\S]*?relatedToolIds:',
                self.app,
            )
        )
        hotspot_ids = re.findall(r'principleId: "([^"]+)"', self.app)

        self.assertEqual(len(principle_ids), 8)
        self.assertEqual(len(hotspot_ids), 8)
        self.assertEqual(set(hotspot_ids), principle_ids)

    def test_scenario_and_manifesto_related_ids_exist(self):
        ids = set(re.findall(r'\bid: "([^"]+)"', self.app))
        related_blocks = re.findall(
            r'(?:recommendedToolIds|relatedToolIds): \[([^\]]*)\]',
            self.app,
            re.S,
        )
        referenced_ids = [
            item
            for block in related_blocks
            for item in re.findall(r'"([^"]+)"', block)
        ]

        missing = sorted({item for item in referenced_ids if item not in ids})
        self.assertEqual(missing, [])

    def test_situation_buttons_show_recommended_results_directly(self):
        scenario_handler = self._function_body("populateScenarios")

        self.assertIn("state.activeLensId = null;", scenario_handler)
        self.assertIn("state.scenarioToolIds = scenario.recommendedToolIds.slice();", scenario_handler)
        self.assertIn('state.searchTerm = "";', scenario_handler)
        self.assertNotIn("state.activeLensId = scenario.lensId;", scenario_handler)
        self.assertNotIn("state.searchTerm = scenario.searchTerms;", scenario_handler)

    def test_lens_and_source_filters_clear_situation_results(self):
        source_body = self._function_body("renderSourceFilters")
        lens_body = self._function_body("renderLensFilters")

        self.assertGreaterEqual(source_body.count("state.scenarioToolIds = [];"), 2)
        self.assertGreaterEqual(lens_body.count("state.scenarioToolIds = [];"), 2)

    def test_search_matches_multiple_words_as_tokens(self):
        body = self._function_body("getFilteredTools")

        self.assertIn("const searchTokens = normalizedSearch.split", body)
        self.assertIn("searchTokens.every", body)
        self.assertNotIn(".includes(normalizedSearch)", body)

    def _function_body(self, name):
        start = self.app.index(f"function {name}(")
        brace_start = self.app.index("{", start)
        depth = 0
        for index in range(brace_start, len(self.app)):
            char = self.app[index]
            if char == "{":
                depth += 1
            elif char == "}":
                depth -= 1
                if depth == 0:
                    return self.app[brace_start : index + 1]
        raise AssertionError(f"Could not parse function {name}")

    def _read_manifesto_rows_from_app(self):
        rows = {}
        blocks = re.findall(
            r'\{\n    id: "[^"]+",\n    principle: "[\s\S]*?relatedToolIds: [\s\S]*?\n  \}',
            self.app,
        )
        for block in blocks[:8]:
            row = {
                "principle": self._read_js_string(block, "principle"),
                "description": self._read_js_string(block, "description"),
                "behavioursText": self._read_js_string(block, "behavioursText"),
                "resultText": self._read_js_string(block, "resultText"),
                "toolsText": self._read_js_string(block, "toolsText"),
            }
            rows[self._read_js_string(block, "attitude")] = row
        return rows

    def _read_js_string(self, block, name):
        match = re.search(name + r':\s*\n?\s*"((?:\\.|[^"\\])*)"', block)
        self.assertIsNotNone(match, f"Missing field {name}")
        return json.loads(f'"{match.group(1)}"')

    def _read_final_sheet_rows(self):
        ns = {"main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

        def text_of(node):
            return "".join(t.text or "" for t in node.findall(".//main:t", ns))

        with ZipFile(SOURCE_XLSX) as archive:
            shared_root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            shared = [text_of(si) for si in shared_root.findall("main:si", ns)]

            workbook = ET.fromstring(archive.read("xl/workbook.xml"))
            rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
            rid_to_target = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels}

            for sheet in workbook.findall(".//main:sheet", ns):
                if sheet.attrib["name"] != "Final ":
                    continue

                rid = sheet.attrib[
                    "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
                ]
                target = rid_to_target[rid]
                path = "xl/" + target.lstrip("/")
                if path not in archive.namelist():
                    path = "xl/worksheets/" + Path(target).name

                sheet_root = ET.fromstring(archive.read(path))
                rows = {}
                for row in sheet_root.findall(".//main:sheetData/main:row", ns):
                    values = []
                    for cell in row.findall("main:c", ns):
                        value = cell.find("main:v", ns)
                        if value is None:
                            values.append("")
                        elif cell.attrib.get("t") == "s":
                            values.append(shared[int(value.text)])
                        else:
                            values.append(value.text or "")

                    if len(values) >= 6 and values[0] in {
                        "Own Today, Shape Tomorrow",
                        "Dare to Try, Manage the Risk",
                        "Start with trust, Build together",
                    }:
                        rows[values[1]] = {
                            "principle": values[0],
                            "description": values[2],
                            "behavioursText": values[3],
                            "resultText": values[4],
                            "toolsText": values[5],
                        }
                return rows

        raise AssertionError("Final sheet was not found")


if __name__ == "__main__":
    unittest.main()
