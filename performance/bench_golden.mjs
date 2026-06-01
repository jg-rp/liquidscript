import { Bench, nToMs } from "tinybench";
import fs from "fs";
import path from "path";
import { Environment, ObjectLoader } from "../dist/liquidscript.esm.js";

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
      loader: new ObjectLoader(this.templates),
      globals: this.data,
    });
  }
}

const fixture = Fixture.load("tests/golden_liquid/benchmark_fixtures/002");
const env = fixture.env();
const source = fixture.templates["index.liquid"];
const template = env.getTemplateSync("index.liquid");

// env.render(source).then(console.log);

const benchOptions = {
  name: `Golden benchmark 002`,
  time: 5000,
};

if (process.versions.bun) {
  benchOptions.now = () => nToMs(Bun.nanoseconds());
  benchOptions.setup = (_task, mode) => {
    // Run the garbage collector before warmup at each cycle
    if (mode === "warmup") {
      Bun.gc(true);
    }
  };
} else {
  benchOptions.setup = (_task, mode) => {
    // Run the garbage collector before warmup at each cycle
    if (mode === "warmup" && typeof globalThis.gc === "function") {
      globalThis.gc();
    }
  };
}

const bench = new Bench(benchOptions);

bench
  .add("parse", () => {
    env.parse(source);
  })
  .add("render", () => {
    template.renderSync();
  })
  .add("parse and render", () => {
    env.renderSync(source);
  })
  .add("render async", async () => {
    await template.render();
  })
  .add("parse and render async", async () => {
    await env.render(source);
  });

await bench.run();

function tableConverter(task) {
  const state = task.result.state;
  return {
    "Task name": task.name,
    ...(state === "aborted-with-statistics" || state === "completed"
      ? {
          "Throughput avg (ops/s)": `${Math.round(task.result.throughput.mean).toString()} \xb1 ${task.result.throughput.rme.toFixed(2)}%`,
          Samples: task.result.latency.samplesCount,
        }
      : state !== "errored"
        ? {
            "Throughput avg (ops/s)": "N/A",
            Remarks: state,
          }
        : {
            Error: task.result.error.message,
            Stack: task.result.error.stack ?? "N/A",
          }),
    ...(state === "aborted-with-statistics" && {
      Remarks: state,
    }),
  };
}

console.log(bench.name);
console.table(bench.table(tableConverter));
