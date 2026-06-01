import { Bench, nToMs } from "tinybench";

const ESCAPE_MAP = {
  "\\": "\\u005C",
  "'": "\\u0027",
  '"': "\\u0022",
  ">": "\\u003E",
  "<": "\\u003C",
  "&": "\\u0026",
  "=": "\\u003D",
  "-": "\\u002D",
  ";": "\\u003B",
  "`": "\\u0060",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
  "\t": "\\u0009",
  "\n": "\\u000A",
  "\r": "\\u000D",
};

const ESCAPE_PATTERN = new RegExp(
  Object.keys(ESCAPE_MAP).map(escapeRegex).join("|"),
  "g",
);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceMatch(match) {
  return ESCAPE_MAP[match];
}

function escapeWithRegex(value) {
  return value.replace(ESCAPE_PATTERN, replaceMatch);
}

function escapeWithLoop(value) {
  let result = "";

  for (const char of value) {
    result += ESCAPE_MAP[char] ?? char;
  }

  return result;
}

const input = `
Hello <script>alert("xss")</script>

This string contains:
- quotes: ' "
- angle brackets: <>
- ampersands: &&
- backslashes: \\
- line breaks

Repeated many times...
`.repeat(100);

const benchOptions = {
  name: `Global string replace`,
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
  .add("regex", function regexBenchmark() {
    escapeWithRegex(input);
  })
  .add("loop", function loopBenchmark() {
    escapeWithLoop(input);
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
