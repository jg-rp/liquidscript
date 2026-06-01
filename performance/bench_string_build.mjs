import { Bench, nToMs, Task } from "tinybench";

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

const PART_COUNT = 10000;

function generateParts(count) {
  const parts = [];

  for (let i = 0; i < count; i++) {
    parts.push(`item-${i}`);
  }

  return parts;
}

const parts = generateParts(PART_COUNT);

bench
  .add("string concatenation (+=)", () => {
    let result = "";

    for (const part of parts) {
      result += part;
    }

    return result;
  })
  .add("array push + join", () => {
    const buffer = [];

    for (const part of parts) {
      buffer.push(part);
    }

    return buffer.join("");
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
