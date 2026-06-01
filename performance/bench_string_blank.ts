import { Bench, nToMs, Task } from "tinybench";

// TODO: setup for node or bun
const bench = new Bench({
  name: "token value or span",
  now: () => nToMs(Bun.nanoseconds()),
  setup: (_task, mode) => {
    // Run the garbage collector before warmup at each cycle
    if (mode === "warmup") {
      Bun.gc(true);
    }
  },
  time: 100,
});

// Test inputs
const spaces = "     ";
const mixed = "  hello  ";

function testTrimEquals(str: string) {
  return str.trim() === "";
}

function testTrimLength(str: string) {
  return str.trim().length === 0;
}

const whitespaceRegex = /^\s*$/;
function testRegex(str: string) {
  return whitespaceRegex.test(str);
}

// Add benchmarks for different inputs
for (const [label, value] of Object.entries({
  spaces,
  mixed,
})) {
  bench
    .add(`trim === "" (${label})`, () => {
      testTrimEquals(value);
    })
    .add(`trim.length === 0 (${label})`, () => {
      testTrimLength(value);
    })
    .add(`regex (${label})`, () => {
      testRegex(value);
    });
}

await bench.run();

function tableConverter(task: Task) {
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
