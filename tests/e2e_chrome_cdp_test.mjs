import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { mkdtemp, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const debugPort = 9224;
const appUrl = pathToFileURL(join(root, "index.html")).href;

let chrome;
let userDataDir;
let client;

test.before(async () => {
  userDataDir = await mkdtemp(join(tmpdir(), "sl-learning-e2e-"));
  chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ], {
    stdio: "ignore",
  });

  chrome.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`Chrome exited with code ${code}`);
    }
  });

  client = await connectToChrome();
  await client.send("Runtime.enable");
  await client.send("Page.enable");
});

test.after(async () => {
  if (client) {
    await client.close();
  }
  if (chrome && !chrome.killed) {
    chrome.kill();
  }
  if (userDataDir) {
    await rm(userDataDir, { force: true, recursive: true });
  }
});

test("page loads core UI without browser errors", async () => {
  await navigate(appUrl);
  const result = await evaluate(() => ({
    title: document.title,
    hotspots: document.querySelectorAll(".manifesto-hotspot").length,
    scenarioButtons: document.querySelectorAll(".scenario-chip").length,
    sourceFilters: document.querySelectorAll("#sourceFilters button").length,
    lensFilters: document.querySelectorAll("#lensFilters button").length,
    toolCards: document.querySelectorAll(".tool-card").length,
    resultCount: document.querySelector("#resultCount")?.textContent,
  }));

  assert.equal(result.title, "Servant Leadership 2.0 Toolbox");
  assert.equal(result.hotspots, 8);
  assert.equal(result.scenarioButtons, 7);
  assert.equal(result.sourceFilters, 3);
  assert.equal(result.lensFilters, 5);
  assert.ok(result.toolCards > 20);
  assert.match(result.resultCount, /Showing the full catalog:/);
});

test("manifesto hotspot opens exact-source drawer and related tools", async () => {
  await navigate(appUrl);
  await click(".manifesto-hotspot[data-principle-id='align-why-what']");

  const drawer = await evaluate(() => ({
    open: document.querySelector("#detailDrawer")?.classList.contains("open"),
    title: document.querySelector(".detail-title")?.textContent,
    meta: [...document.querySelectorAll(".detail-meta span")].map((item) => item.textContent),
    sections: [...document.querySelectorAll(".detail-section h4")].map((item) => item.textContent),
    bodyText: document.querySelector("#detailContent")?.textContent,
  }));

  assert.equal(drawer.open, true);
  assert.equal(drawer.title, "I Align direction via WHY & WHAT");
  assert.ok(drawer.meta.includes("Source: Excel Final sheet"));
  assert.deepEqual(drawer.sections, [
    "Team Behaviours",
    "Organizational Result",
    "Example Tools",
  ]);
  assert.match(drawer.bodyText, /People are more confident and proactive in their decision-making\.Teams feel empowered\./);

  await click("[data-manifesto-search]");
  const related = await evaluate(() => ({
    drawerOpen: document.querySelector("#detailDrawer")?.classList.contains("open"),
    cards: [...document.querySelectorAll(".tool-card h3")].map((item) => item.textContent),
    count: document.querySelector("#resultCount")?.textContent,
  }));

  assert.equal(related.drawerOpen, false);
  assert.deepEqual(related.cards.slice(0, 4), [
    "Why, What, How Canvas",
    "Intent Briefs",
    "Delegation Board",
    "Outcome Framing",
  ]);
  assert.match(related.count, /Showing 4 of/);
});

test("situation button shows recommended result cards", async () => {
  await navigate(appUrl);
  await clickScenario("Need participation fast");

  const result = await evaluate(() => ({
    cards: [...document.querySelectorAll(".tool-card h3")].map((item) => item.textContent),
    count: document.querySelector("#resultCount")?.textContent,
    searchValue: document.querySelector("#searchInput")?.value,
  }));

  assert.deepEqual(result.cards, [
    "1-2-4-All",
    "15% Solutions",
    "What I Need From You (WINFY)",
  ]);
  assert.match(result.count, /Showing 3 of/);
  assert.equal(result.searchValue, "");
});

test("lens and collection filters clear previous situation state", async () => {
  await navigate(appUrl);
  await clickScenario("Flow is too slow");
  await click("#lensFilters button[data-lens='align']");

  const lensResult = await evaluate(() => ({
    count: document.querySelector("#resultCount")?.textContent,
    cards: [...document.querySelectorAll(".tool-card h3")].map((item) => item.textContent),
  }));

  assert.match(lensResult.count, /Showing \d+ of/);
  assert.ok(lensResult.cards.includes("Why, What, How Canvas"));
  assert.ok(lensResult.cards.includes("Purpose-to-Practice (P2P)"));

  await clickScenario("Need participation fast");
  await click("#sourceFilters button[data-source='scania']");

  const sourceResult = await evaluate(() => ({
    count: document.querySelector("#resultCount")?.textContent,
    sources: [...document.querySelectorAll(".tool-card .tool-source")].map((item) => item.textContent),
  }));

  assert.match(sourceResult.count, /Servant Leadership/);
  assert.ok(sourceResult.sources.length > 10);
  assert.ok(sourceResult.sources.every((source) => source === "Servant Leadership"));
});

test("search matches multiple words as tokens in the GUI", async () => {
  await navigate(appUrl);
  await type("#searchInput", "flow bottlenecks");

  const result = await evaluate(() => ({
    count: document.querySelector("#resultCount")?.textContent,
    cards: [...document.querySelectorAll(".tool-card h3")].map((item) => item.textContent),
  }));

  assert.match(result.count, /Showing \d+ of/);
  assert.ok(result.cards.includes("Value Stream Mapping"));
  assert.ok(result.cards.length >= 1);
});

async function connectToChrome() {
  const started = Date.now();
  while (Date.now() - started < 10_000) {
    try {
      let response = await fetchWithTimeout(`http://127.0.0.1:${debugPort}/json/new`, {
        method: "PUT",
      });
      if (!response.ok) {
        response = await fetchWithTimeout(`http://127.0.0.1:${debugPort}/json/list`);
        const targets = await response.json();
        const target = targets.find((item) => item.type === "page");
        if (!target) {
          throw new Error("No Chrome page target found");
        }
        return connectToTarget(target.webSocketDebuggerUrl);
      }

      const target = await response.json();
      return connectToTarget(target.webSocketDebuggerUrl);
    } catch {
      await delay(100);
    }
  }
  throw new Error("Could not connect to Chrome DevTools Protocol");
}

async function connectToTarget(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  await new Promise((resolveOpen, rejectOpen) => {
    const timeout = setTimeout(() => rejectOpen(new Error("Timed out opening CDP socket")), 5_000);
    socket.addEventListener("open", () => {
      clearTimeout(timeout);
      resolveOpen();
    }, { once: true });
    socket.addEventListener("error", (event) => {
      clearTimeout(timeout);
      rejectOpen(event.error ?? new Error("CDP socket error"));
    }, { once: true });
  });
  return createCdpClient(socket);
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1_000);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function createCdpClient(socket) {
  let id = 0;
  const pending = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) {
      return;
    }

    const { resolveMessage, rejectMessage } = pending.get(message.id);
    pending.delete(message.id);

    if (message.error) {
      rejectMessage(new Error(message.error.message));
      return;
    }

    resolveMessage(message.result);
  });

  return {
    send(method, params = {}) {
      const messageId = ++id;
      socket.send(JSON.stringify({ id: messageId, method, params }));
      return new Promise((resolveMessage, rejectMessage) => {
        pending.set(messageId, { resolveMessage, rejectMessage });
      });
    },
    close() {
      socket.close();
    },
  };
}

async function navigate(url) {
  await client.send("Page.navigate", { url });
  await waitFor(() => document.readyState === "complete");
  await waitFor(() => document.querySelectorAll(".tool-card").length > 0);
}

async function click(selector) {
  await waitFor((targetSelector) => Boolean(document.querySelector(targetSelector)), selector);
  await evaluate((targetSelector) => {
    document.querySelector(targetSelector).click();
  }, selector);
}

async function clickScenario(title) {
  await evaluate((scenarioTitle) => {
    const button = [...document.querySelectorAll(".scenario-chip")]
      .find((item) => item.textContent.includes(scenarioTitle));
    if (!button) {
      throw new Error(`Scenario not found: ${scenarioTitle}`);
    }
    button.click();
  }, title);
}

async function type(selector, value) {
  await waitFor((targetSelector) => Boolean(document.querySelector(targetSelector)), selector);
  await evaluate((targetSelector, text) => {
    const input = document.querySelector(targetSelector);
    input.value = text;
    input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
  }, selector, value);
}

async function waitFor(predicate, ...args) {
  const started = Date.now();
  while (Date.now() - started < 5_000) {
    const result = await evaluate(predicate, ...args);
    if (result) {
      return result;
    }
    await delay(50);
  }
  throw new Error("Timed out waiting for browser condition");
}

async function evaluate(fn, ...args) {
  const expression = `(${fn.toString()})(...${JSON.stringify(args)})`;
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text);
  }

  return result.result.value;
}

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}
