await Bun.build({
  entrypoints: ["./liquid-spec/cli.ts"],
  compile: {
    outfile: "bin/liquidscript_service",
  },
  minify: true,
  sourcemap: "linked",
  bytecode: true,
  define: {
    NODE_ENV: "production",
  },
});
