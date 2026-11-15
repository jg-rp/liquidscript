import { Bench, nToMs } from "tinybench";

const source = "foo bar baz 123 456 lorem ipsum dolor sit amet ".repeat(1000);

// Simulated token kinds
const IDENT = 1;

// Simulated tokenizer: splits on spaces
function tokenizeWithValue(src) {
  const tokens = [];
  let index = 0;

  for (const word of src.split(" ")) {
    tokens.push({
      kind: IDENT,
      index,
      value: word, // allocates substring
    });
    index += word.length + 1;
  }

  return tokens;
}

function tokenizeWithSpan(src) {
  const tokens = [];
  let i = 0;

  while (i < src.length) {
    const start = i;

    while (i < src.length && src[i] !== " ") {
      i++;
    }

    const end = i;

    tokens.push({
      kind: IDENT,
      index: start,
      start,
      end,
    });

    i++; // skip space
  }

  return tokens;
}

function tokenizeToArray(src) {
  const tokens = [];
  let i = 0;

  while (i < src.length) {
    const start = i;

    while (i < src.length && src[i] !== " ") {
      i++;
    }

    const end = i;

    tokens.push([IDENT, start, start, end]);

    i++; // skip space
  }

  return tokens;
}

// Simulate parser needing values
function consumeWithValue(tokens) {
  let sum = 0;
  for (const t of tokens) {
    sum += t.value.length;
  }
  return sum;
}

function consumeWithSpan(tokens, src) {
  let sum = 0;
  for (const t of tokens) {
    const value = src.slice(t.start, t.end);
    sum += value.length;
  }
  return sum;
}

function consumeFromArray(tokens, src) {
  let sum = 0;
  for (const t of tokens) {
    const value = src.slice(t[2], t[3]);
    sum += value.length;
  }
  return sum;
}

const benchOptions = {
  name: `token value or span`,
  time: 1000,
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
  .add("tokenize with value", () => {
    tokenizeWithValue(source);
  })
  .add("tokenize with span", () => {
    tokenizeWithSpan(source);
  })
  .add("tokenize to array", () => {
    tokenizeToArray(source);
  })
  .add("tokenize + consume (value)", () => {
    const tokens = tokenizeWithValue(source);
    consumeWithValue(tokens);
  })
  .add("tokenize + consume (span)", () => {
    const tokens = tokenizeWithSpan(source);
    consumeWithSpan(tokens, source);
  })
  .add("tokenize + consume (array)", () => {
    const tokens = tokenizeToArray(source);
    consumeFromArray(tokens, source);
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
