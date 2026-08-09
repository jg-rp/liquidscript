import { LiquidscriptSession } from "./liquidscript";

const session = new LiquidscriptSession();

session.listen().catch((err) => {
  console.error("[FATAL]", err);
  process.exit(1);
});
