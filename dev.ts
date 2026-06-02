import { ReadOnlyChainMap } from "./src/chain_map";

const scope = new ReadOnlyChainMap({ a: 1, b: 2 }, { b: 99, c: 7 });

console.log(scope.b);
console.log(scope.c);

for (const [k, v] of scope) {
  console.log("!!", k, v);
}

console.log("--", Object.keys(scope));
console.log("**", Object.values(scope));
