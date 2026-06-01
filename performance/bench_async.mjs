// Comparing sync and concurrent async batches with a very rough simulation of IO.
import fs from "fs";
import path from "path";
import {
  Environment,
  ObjectLoader,
  TemplateNotFoundError,
} from "../dist/liquidscript.esm.js";

function sleepSync(ms) {
  const sab = new SharedArrayBuffer(4);
  const int32 = new Int32Array(sab);
  Atomics.wait(int32, 0, 0, ms);
}

// Source - https://stackoverflow.com/a/39914235
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-01, License - CC BY-SA 4.0
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomLatency() {
  return 1 + Math.random() * 4; // 1–5ms
}

class SleepingObjectLoader extends ObjectLoader {
  async getSource(env, name) {
    await sleep(randomLatency());
    const source = this.obj[name];
    if (source !== undefined) return { source, name };
    throw new TemplateNotFoundError(name);
  }

  getSourceSync(env, name) {
    sleepSync(randomLatency());
    const source = this.obj[name];
    if (source !== undefined) return { source, name };
    throw new TemplateNotFoundError(name);
  }
}

class Fixture {
  constructor(name, data, templates) {
    this.name = name;
    this.data = data;
    this.templates = templates;
  }

  static load(fixture) {
    const name = path.basename(fixture);
    const templates = {};

    const data = JSON.parse(
      fs.readFileSync(path.join(fixture, "data.json"), "utf8"),
    );

    for (const fn of fs.globSync(path.join(fixture, "templates/*liquid"))) {
      templates[path.basename(fn)] = fs.readFileSync(fn, { encoding: "utf8" });
    }

    return new Fixture(name, data, templates);
  }

  env() {
    return new Environment({
      loader: new SleepingObjectLoader(this.templates),
      globals: this.data,
    });
  }
}

const fixture = Fixture.load("tests/golden_liquid/benchmark_fixtures/001");
const env = fixture.env();
const template = env.getTemplateSync("index.liquid");

// env.render(source).then(console.log);

const n = 500;

function now() {
  return process.hrtime.bigint();
}

function ms(start, end) {
  return Number(end - start) / 1e6;
}

async function runBatch(renderFn, N) {
  const start = now();

  for (let i = 0; i < N; i++) {
    await renderFn();
  }

  const end = now();
  return ms(start, end);
}

function runBatchSync(renderFn, N) {
  const start = process.hrtime.bigint();

  for (let i = 0; i < N; i++) {
    renderFn();
  }

  const end = process.hrtime.bigint();
  return Number(end - start) / 1e6;
}

async function runBatchConcurrent(renderFn, N) {
  const start = process.hrtime.bigint();

  await Promise.all(Array.from({ length: N }, () => renderFn()));

  const end = process.hrtime.bigint();
  return Number(end - start) / 1e6;
}

async function benchmark(name, fn) {
  const runs = 5;
  const results = [];

  // Warmup
  await fn();

  for (let i = 0; i < runs; i++) {
    // global.gc?.(); // optional if running with --expose-gc

    const t0 = process.hrtime.bigint();
    await fn();
    const t1 = process.hrtime.bigint();

    results.push(Number(t1 - t0) / 1e6);
  }

  // results.sort((a, b) => a - b);
  console.log(name, ":", results, "ms");
}

benchmark("async batch", () => runBatch(template.render.bind(template), n));

benchmark("async concurrent", () =>
  runBatchConcurrent(template.render.bind(template), n),
);

benchmark("sync batch", () =>
  runBatchSync(template.renderSync.bind(template), n),
);
