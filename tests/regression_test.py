import json
import re
import subprocess
import unittest
from urllib.parse import parse_qs, unquote, urlparse
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
APP_JS = ROOT / "app.js"
INDEX_HTML = ROOT / "index.html"
STYLES_CSS = ROOT / "styles.css"
FAVICON_SVG = ROOT / "favicon.svg"
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

    def test_favicon_uses_manifesto_shape_without_text(self):
        favicon = FAVICON_SVG.read_text(encoding="utf-8")

        self.assertIn('href="./favicon.svg"', self.index)
        self.assertIn("#e5b100", favicon)
        self.assertIn("#ef6408", favicon)
        self.assertIn("#d90f2f", favicon)
        self.assertIn("#356fc4", favicon)
        self.assertNotRegex(favicon, r"<text\b")

    def test_google_analytics_loads_only_after_consent(self):
        self.assertIn("G-15SPXQJVZR", self.app)
        self.assertIn("analyticsConsentBanner", self.index)
        self.assertIn("acceptAnalytics", self.index)
        self.assertIn("declineAnalytics", self.index)
        self.assertIn("loadGoogleAnalytics", self.app)
        self.assertIn("googletagmanager.com/gtag/js?id=", self.app)
        self.assertIn("sl20AnalyticsConsent", self.app)
        self.assertNotIn("<script async src=\"https://www.googletagmanager.com/gtag/js", self.index)

    def test_usage_events_are_tracked_without_search_text(self):
        self.assertIn('trackUsage("tool_open"', self.app)
        self.assertIn('trackUsage("lens_filter"', self.app)
        self.assertIn('trackUsage("source_filter"', self.app)
        self.assertIn('trackUsage("source_link_click"', self.app)
        self.assertNotIn("search_text", self.app)
        self.assertNotIn("search_term", self.app)
        self.assertNotIn('trackUsage("search', self.app)

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

    def test_source_file_links_use_team_tiger_workmaterial_path(self):
        body = self._function_body("getScaniaSourceFileUrl")

        self.assertIn("/:w:/r", body)
        self.assertIn("/teams/AgileScania/Shared Documents", self.app)
        self.assertIn("Team Tiger Workmaterial", self.app)
        self.assertIn("csf=1", body)
        self.assertIn("web=1", body)
        self.assertNotIn("Servant Leadership 2.0 Master", body)

    def test_source_file_tools_can_override_with_exact_sharepoint_link(self):
        body = self._function_body("openDrawer")
        inclusion_block = re.search(
            r'id: "inclusion-nudges",[\s\S]*?sourceFile: "Tools and practisies/Inclusion Nudges',
            self.app,
        )

        self.assertIsNotNone(inclusion_block)
        self.assertIn("tool.sourceUrl || getScaniaSourceFileUrl(tool.sourceFile)", body)
        self.assertIn("d=w09d99542179a489ab920036056f04601", inclusion_block.group(0))

    def test_all_manifesto_attitudes_are_filter_lenses(self):
        lens_ids = set(
            re.findall(
                r'\{\n    id: "([^"]+)",\n    name: "[\s\S]*?\n  \}',
                self.app[self.app.index("const lenses") : self.app.index("const manifestoPrinciples")],
            )
        )
        principle_blocks = re.findall(
            r'\{\n    id: "([^"]+)",\n    principle: "[\s\S]*?lensId: "([^"]+)"',
            self.app[self.app.index("const manifestoPrinciples") : self.app.index("const manifestoHotspots")],
        )

        self.assertEqual(len(lens_ids), 8)
        self.assertEqual({principle_id for principle_id, _ in principle_blocks}, lens_ids)
        self.assertEqual([(principle_id, principle_id) for principle_id, _ in principle_blocks], principle_blocks)

    def test_source_file_tools_are_tagged_from_attitude_in_filename(self):
        expected_by_attitude = {
            "I Align direction via WHY & WHAT": "align-why-what",
            "I am a situational Leader": "situational-leader",
            "I am a situational leader": "situational-leader",
            "I am a game changer": "game-changer",
            "I am a gamechanger": "game-changer",
            "I Think and Act for the whole": "whole-system",
            "I am a role model for growth": "growth-role-model",
            "I am a Role Model for Growth": "growth-role-model",
            "I am a Cultural Ambassador": "cultural-ambassador",
            "I Cultivate Psychological Safety": "psychological-safety",
            "I Lead With Empathy and Intent": "empathy-intent",
            "I Lead with Empathy and Intent": "empathy-intent",
        }
        blocks = re.findall(r'\{\n    id: "[^"]+",\n    title: "[\s\S]*?\n  \}', self.app)
        mismatches = []

        for block in blocks:
            source_file = re.search(r'sourceFile:\s*(?:\n\s*)?"([^"]+)"', block)
            if not source_file:
                continue

            attitude = re.search(r'\((I [^)]+)\)', source_file.group(1))
            self.assertIsNotNone(attitude, source_file.group(1))
            lens = self._read_js_string(block, "lensId")
            expected = expected_by_attitude[attitude.group(1)]
            if lens != expected:
                mismatches.append((self._read_js_string(block, "title"), lens, expected))

        self.assertEqual(mismatches, [])

    def test_scania_source_links_are_tagged_from_attitude_in_filename(self):
        expected_by_attitude = {
            "align direction via WHY & WHAT": "align-why-what",
            "Align direction via WHY & WHAT": "align-why-what",
            "am a situational Leader": "situational-leader",
            "am a situational leader": "situational-leader",
            "am a game changer": "game-changer",
            "am a gamechanger": "game-changer",
            "am a gamachanger": "game-changer",
            "Think and Act for the whole": "whole-system",
        }
        blocks = re.findall(r'\{\n    id: "[^"]+",\n    title: "[\s\S]*?\n  \}', self.app)
        mismatches = []

        for block in blocks:
            if 'sourceId: "scania"' not in block or "sourceFile:" in block:
                continue

            source_url = re.search(r'sourceUrl:\s*(?:\n\s*)?"([^"]+)"', block)
            if not source_url:
                continue

            file_values = parse_qs(urlparse(source_url.group(1)).query).get("file", [])
            self.assertTrue(file_values, self._read_js_string(block, "title"))
            source_name = unquote(file_values[0])
            attitude = re.search(r'\(I ([^)]+)\)', source_name)
            self.assertIsNotNone(attitude, source_name)
            lens = self._read_js_string(block, "lensId")
            expected = expected_by_attitude[attitude.group(1)]
            if lens != expected:
                mismatches.append((self._read_js_string(block, "title"), lens, expected))

        self.assertEqual(mismatches, [])

    def test_css_styles_all_lenses(self):
        lens_ids = set(
            re.findall(
                r'\{\n    id: "([^"]+)",\n    name: "[\s\S]*?\n  \}',
                self.app[self.app.index("const lenses") : self.app.index("const manifestoPrinciples")],
            )
        )

        for lens_id in lens_ids:
            self.assertIn(f'.filter-chip[data-lens="{lens_id}"]', self.styles)
            self.assertIn(f'.tool-card[data-lens="{lens_id}"]', self.styles)
            self.assertIn(f'.lens-card[data-lens="{lens_id}"]', self.styles)

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
