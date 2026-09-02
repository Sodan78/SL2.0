# Four SharePoint Exercises Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four approved SharePoint exercises to the existing Servant Leadership catalog, make them searchable and filterable, and publish the verified result to GitHub Pages.

**Architecture:** Extend the static `tools` catalog in `app.js`; do not add runtime SharePoint calls. Reuse the current card, filter, search, and detail-drawer pipeline, and preserve canonical SharePoint document links as `sourceUrl` values. Cache-bust `app.js` in `index.html` so the deployment becomes visible immediately.

**Tech Stack:** Static HTML/CSS/JavaScript, Python `unittest`, Node.js test runner, Chrome DevTools Protocol, GitHub Actions and GitHub Pages.

---

## File Map

- `app.js`: owns catalog data, filtering, search indexing, and detail rendering; add the four complete tool objects here.
- `index.html`: owns static asset references; bump the `app.js` query version.
- `tests/regression_test.py`: owns structural and source-link regression coverage.
- `tests/e2e_chrome_cdp_test.mjs`: owns real-browser search and drawer behavior.

### Task 1: Add failing regression and browser tests

**Files:**
- Modify: `tests/regression_test.py`
- Modify: `tests/e2e_chrome_cdp_test.mjs`

- [ ] **Step 1: Add structural regression coverage**

Add a test that expects these exact catalog records:

```python
def test_four_new_sharepoint_exercises_are_complete(self):
    expected = {
        "future-story-exercise": ("Future Story Exercise", "empathy-intent", "45 min", "F93E1B72-42C7-4D53-A209-C2AD922316AF"),
        "office-reset-workshop": ("Office Reset Workshop", "psychological-safety", "60 min", "870ED113-5EA6-4D27-9E52-A4A086321F3A"),
        "concern-to-influence": ("From Concern to Influence", "empathy-intent", "45-60 min", "E0487583-F33F-4DD6-9817-736F8EFB280A"),
        "reality-hope-check-in": ("The Reality and Hope Check-In", "psychological-safety", "30-45 min", "E64A152D-12FA-4417-8166-BA5724DF77C3"),
    }

    for tool_id, (title, lens_id, duration, source_id) in expected.items():
        block = re.search(
            rf'id: "{tool_id}",[\s\S]*?sourceUrl:\s*(?:\n\s*)?"([^"]+)"',
            self.app,
        )
        self.assertIsNotNone(block, tool_id)
        text = block.group(0)
        self.assertIn(f'title: "{title}"', text)
        self.assertIn('sourceId: "scania"', text)
        self.assertIn(f'lensId: "{lens_id}"', text)
        self.assertIn(f'time: "{duration}"', text)
        self.assertIn(source_id, unquote(block.group(1)))
        for field in ["summary", "signal", "unlocks", "useWhen", "steps", "facilitation", "goodFor", "questions", "quote"]:
            self.assertRegex(text, rf'\b{field}:')
```

Update both asset-version assertions from `2026-05-29-1` to `2026-09-02-1`.

- [ ] **Step 2: Add browser coverage for search and drawer details**

Add this test after the existing search test:

```javascript
test("new SharePoint exercises are searchable and open in the detail drawer", async () => {
  const cases = [
    ["six months proud", "Future Story Exercise"],
    ["office collaboration agreement", "Office Reset Workshop"],
    ["frustration agency", "From Concern to Influence"],
    ["hardest hope", "The Reality and Hope Check-In"],
  ];

  for (const [query, expectedTitle] of cases) {
    await navigate(appUrl);
    await type("#searchInput", query);

    const cards = await evaluate(() =>
      [...document.querySelectorAll(".tool-card h3")].map((item) => item.textContent)
    );
    assert.ok(cards.includes(expectedTitle), `${expectedTitle} missing for ${query}`);

    await click(".tool-card .card-button");
    const drawer = await evaluate(() => ({
      title: document.querySelector(".detail-title")?.textContent,
      sourceHref: document.querySelector(".detail-link-primary")?.getAttribute("href"),
    }));
    assert.equal(drawer.title, expectedTitle);
    assert.match(drawer.sourceHref, /scaniaazureservices\.sharepoint\.com/);
  }
});
```

- [ ] **Step 3: Run the new tests and verify RED**

Run:

```bash
python3 -m unittest tests.regression_test.StaticAppRegressionTests.test_four_new_sharepoint_exercises_are_complete
node --test tests/e2e_chrome_cdp_test.mjs
```

Expected: the Python test fails because the first new ID is missing, and the browser test fails because the corresponding card cannot be found.

### Task 2: Add the four exercises and cache bust the catalog

**Files:**
- Modify: `app.js:1797-1838`
- Modify: `index.html` script reference
- Modify: `tests/regression_test.py` source attitude map

- [ ] **Step 1: Extend the accepted SharePoint filename attitude variants**

In `test_scania_source_links_are_tagged_from_attitude_in_filename`, add:

```python
"lead with empathy and Intent": "empathy-intent",
"lead with empathy and intent": "empathy-intent",
"cultivate Psychological Safety": "psychological-safety",
```

- [ ] **Step 2: Add four complete objects to the end of the Scania `tools` array**

Insert these complete records immediately before the closing `];` of the Scania `tools` array:

```javascript
{
  id: "future-story-exercise",
  title: "Future Story Exercise",
  sourceId: "scania",
  lensId: "empathy-intent",
  time: "45 min",
  summary: "Imagine a proud future six months ahead, then turn that story into concrete behaviors for today.",
  signal: "Best when a team needs hope, inspiration, and shared direction during change.",
  unlocks: ["A shared picture of success", "Hope grounded in observable behavior", "Two or three commitments the team can start today"],
  useWhen: ["The team needs direction without a detailed plan", "Change has reduced energy or confidence", "You want to align leadership behavior around a meaningful future"],
  steps: ["Ask the team to imagine it is six months from now and they are proud of how they handled this period.", "Let everyone reflect on what they are proud of, how they treated each other, what they learned, and which habits helped.", "Invite the team to describe what employees would say about their leadership.", "Find the strongest patterns and translate them into two or three concrete behaviors for today."],
  facilitation: ["Keep the future story specific enough to reveal behavior.", "Give people individual reflection time before sharing.", "Finish with present-day commitments rather than leaving the story in the future."],
  goodFor: ["future story", "inspiration", "direction", "change", "reflection", "leadership behavior"],
  questions: ["What are we proud of?", "How did we treat each other?", "What did we learn?", "What habits helped us succeed?", "What would our employees say about our leadership?"],
  quote: "What would our employees say about our leadership?",
  searchIndex: ["six months proud", "successful future", "concrete behaviours today", "concrete behaviors today"],
  sourceLabel: "Open Scania source",
  sourceUrl: "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BF93E1B72-42C7-4D53-A209-C2AD922316AF%7D&file=Future+Story+Excersise+%28I+lead+with+empathy+and+Intent%29.docx&action=default&mobileredirect=true&web=1",
},
{
  id: "office-reset-workshop",
  title: "Office Reset Workshop",
  sourceId: "scania",
  lensId: "psychological-safety",
  time: "60 min",
  summary: "Make time together in the office intentional by agreeing how face-to-face work should create value and energy.",
  signal: "Best when a return-to-office policy feels mandatory, unclear, or disconnected from useful collaboration.",
  unlocks: ["A shared Office Collaboration Agreement", "Clear reasons to meet face to face", "Healthier agreements about energy, focus, and connection"],
  useWhen: ["The team is resetting hybrid or office routines", "Office days are dominated by separate calls", "People need a safer conversation about what gives and drains energy"],
  steps: ["Ask what should be better when the team is together in the office.", "Identify which activities are worth doing face to face.", "Discuss which office behaviors give energy and which drain it.", "Agree the team behaviors needed now and capture them in a simple Office Collaboration Agreement."],
  facilitation: ["Focus on making office time useful rather than debating policy ownership.", "Protect both collaboration and legitimate focus needs.", "Make the agreement visible and revisit it after the team has tested it."],
  goodFor: ["office", "hybrid work", "collaboration", "team agreements", "energy", "focus", "social connection"],
  questions: ["What should be better when we are together in the office?", "What activities are worth doing face to face?", "What office behaviors give energy?", "What office behaviors drain energy?", "What team agreements do we need now?"],
  quote: "What should be better when we are together in the office?",
  searchIndex: ["office collaboration agreement", "avoid sitting in silence", "separate calls", "plan social connection intentionally", "check in on energy"],
  sourceLabel: "Open Scania source",
  sourceUrl: "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7B870ED113-5EA6-4D27-9E52-A4A086321F3A%7D&file=Office+Reset+Workshop+%28I+cultivate+Psychological+Safety%29.docx&action=default&mobileredirect=true&web=1",
},
{
  id: "concern-to-influence",
  title: "From Concern to Influence",
  sourceId: "scania",
  lensId: "empathy-intent",
  time: "45-60 min",
  summary: "Move from frustration and powerlessness toward influence and small actions the team can take now.",
  signal: "Best when change, policy, or uncertainty is consuming energy but the team still has meaningful room to act.",
  unlocks: ["A clearer boundary between concern and influence", "More agency during uncertainty", "Small actions connected to real frustrations"],
  useWhen: ["The team feels stuck in concerns it cannot fully control", "Motivation is falling during organizational change", "People need a practical next step without dismissing legitimate frustration"],
  steps: ["Create three visible columns: Concern, Influence, and Action.", "List what the team worries about but cannot fully control.", "For each concern, identify what the team can affect.", "Choose small actions to try and clarify who will take the next step."],
  facilitation: ["Acknowledge concerns before moving toward action.", "Do not imply the team is responsible for fixing decisions outside its control.", "Keep actions small, concrete, and connected to an influence the team genuinely has."],
  goodFor: ["concern", "influence", "action", "agency", "change", "motivation", "clarity"],
  questions: ["What are we worried about but unable to fully control?", "What can we influence?", "What small action will we try?"],
  quote: "What can we influence, and what small action will we try?",
  searchIndex: ["frustration agency", "concern influence action", "full-time office policy", "weekly clarity check", "start meetings with wins"],
  sourceLabel: "Open Scania source",
  sourceUrl: "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BE0487583-F33F-4DD6-9817-736F8EFB280A%7D&file=From+concern+to+Influence+%28I+lead+with+empathy+and+intent%29.docx&action=default&mobileredirect=true&web=1",
},
{
  id: "reality-hope-check-in",
  title: "The Reality and Hope Check-In",
  sourceId: "scania",
  lensId: "psychological-safety",
  time: "30-45 min",
  summary: "Acknowledge a difficult reality, surface support needs, recognize progress, and reconnect the team with hope.",
  signal: "Best when a team needs an honest check-in during change without getting stuck in negativity.",
  unlocks: ["Honest acknowledgement of the current situation", "Visible needs for clarity and support", "Renewed energy through pride and hope"],
  useWhen: ["Change has created uncertainty, fatigue, or loss", "People need to be heard before planning next steps", "The team needs to balance realism with possibility"],
  steps: ["Introduce the check-in as a space for honesty, listening, and support.", "Let each person reflect individually on the four questions.", "Invite sharing in pairs or small groups without forcing disclosure.", "Close by acknowledging what cannot be solved today and clarifying the next available support or step."],
  facilitation: ["Do not rush difficult answers or immediately solve them.", "Model honest listening and protect voluntary sharing.", "Be explicit about what you know, what you do not know, and what support can happen next."],
  goodFor: ["reality", "hope", "check-in", "psychological safety", "change", "support", "honesty"],
  questions: ["What has been hardest for me or the team during this change?", "What am I proud that we have managed anyway?", "What do I need more clarity or support around?", "What is one thing that still gives me hope?"],
  quote: "What is one thing that still gives me hope?",
  searchIndex: ["hardest hope", "acknowledge reality", "rebuild energy", "surface needs", "shift toward possibility"],
  sourceLabel: "Open Scania source",
  sourceUrl: "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BE64A152D-12FA-4417-8166-BA5724DF77C3%7D&file=The+Reality+and+Hope+check+In+%28I+cultivate+Psychological+Safety%29.docx&action=default&mobileredirect=true&web=1",
},
```

- [ ] **Step 3: Bump the application asset version**

Change:

```html
<script src="./app.js?v=2026-05-29-1"></script>
```

to:

```html
<script src="./app.js?v=2026-09-02-1"></script>
```

- [ ] **Step 4: Run structural tests and verify GREEN**

Run:

```bash
python3 -m unittest tests.regression_test
node --check app.js
```

Expected: all regression tests pass and JavaScript syntax check exits 0.

### Task 3: Verify behavior, commit, and publish

**Files:**
- Verify: `app.js`
- Verify: `index.html`
- Verify: `tests/regression_test.py`
- Verify: `tests/e2e_chrome_cdp_test.mjs`

- [ ] **Step 1: Run the complete browser suite**

Run:

```bash
node --test tests/e2e_chrome_cdp_test.mjs
```

Expected: all browser tests pass, including all four search queries and detail drawers.

- [ ] **Step 2: Inspect the final diff**

Run:

```bash
git diff --check
git diff -- app.js index.html tests/regression_test.py tests/e2e_chrome_cdp_test.mjs
```

Expected: only the four catalog entries, test coverage, source-attitude variants, and cache-busted script reference are present.

- [ ] **Step 3: Commit the implementation**

```bash
git add app.js index.html tests/regression_test.py tests/e2e_chrome_cdp_test.mjs docs/superpowers/plans/2026-09-02-four-sharepoint-exercises.md
git commit -m "Add four Servant Leadership exercises"
```

- [ ] **Step 4: Rebase safely if `origin/main` advanced, then push**

```bash
git fetch origin main
git rebase origin/main
git push origin HEAD:main
```

Expected: a fast-forward push to `main`.

- [ ] **Step 5: Verify GitHub Pages deployment and public content**

Run:

```bash
gh run list --repo Sodan78/SL2.0 --workflow static.yml --limit 1
curl -sSL https://sodan78.github.io/SL2.0/app.js | rg "future-story-exercise|office-reset-workshop|concern-to-influence|reality-hope-check-in"
```

Expected: the newest workflow run completes successfully and all four IDs appear in the deployed JavaScript.
