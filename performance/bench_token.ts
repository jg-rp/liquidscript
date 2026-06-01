import { Bench, nToMs, Task } from "tinybench";

const source = "foo bar baz 123 456 lorem ipsum dolor sit amet ".repeat(1000);

// Simulated token kinds
const IDENT = 1;

// --- Eager version (stores value) ---
type TokenWithValue = {
  kind: number;
  index: number;
  value: string;
};

// --- Lazy version (stores span) ---
type TokenWithSpan = {
  kind: number;
  index: number;
  start: number;
  end: number;
};

// Simulated tokenizer: splits on spaces
function tokenizeWithValue(src: string): TokenWithValue[] {
  const tokens: TokenWithValue[] = [];
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

function tokenizeWithSpan(src: string): TokenWithSpan[] {
  const tokens: TokenWithSpan[] = [];
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

// Simulate parser needing values
function consumeWithValue(tokens: TokenWithValue[]) {
  let sum = 0;
  for (const t of tokens) {
    sum += t.value.length;
  }
  return sum;
}

function consumeWithSpan(tokens: TokenWithSpan[], src: string) {
  let sum = 0;
  for (const t of tokens) {
    const value = src.slice(t.start, t.end); // lazy allocation
    sum += value.length;
  }
  return sum;
}

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
  time: 1000,
});

bench
  .add("tokenize with value", () => {
    tokenizeWithValue(source);
  })
  .add("tokenize with span", () => {
    tokenizeWithSpan(source);
  })
  .add("tokenize + consume (value)", () => {
    const tokens = tokenizeWithValue(source);
    consumeWithValue(tokens);
  })
  .add("tokenize + consume (span)", () => {
    const tokens = tokenizeWithSpan(source);
    consumeWithSpan(tokens, source);
  });

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
