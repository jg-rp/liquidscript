# Contributing to LiquidScript

Hi. Your contributions and questions are always welcome. Feel free to ask questions, report bugs or request features on the [issue tracker](https://github.com/jg-rp/liquidscript/issues) or on [Github Discussions](https://github.com/jg-rp/liquidscript/discussions).

**Table of contents**

- [Development](#development)
- [Documentation](#documentation)

## Development

The [golden liquid test suite](https://github.com/jg-rp/golden-liquid) is included in this repository as a git [submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). You'll need to initialize the submodule after cloning LiquidScript and before running any tests.

```shell
git clone git@github.com:jg-rp/liquidscript.git
cd liquidscript
$ git submodule update --init
```

We use [Bun](https://bun.com/docs/pm/cli/install) to manage packages and run scripts during development. Install development dependencies with:

```shell
$ bun install
```

We also use Bun's test runner.

```shell
$ bun test
```

And [vitest](https://github.com/vitest-dev/vitest) for testing against browser and Node.js runtimes.

```shell
bunx playwright install --with-deps
bun run test:browser
bun run test:node
```

Check for linting errors with the _lint_ script.

```shell
bun run lint
```

And check for type errors with the _type-check_ script.

```shell
bun run type-check
```

Built distribution bundles and type files with Bun's bundler.

```shell
bun run dist
```

## Documentation

[Documentation](https://jg-rp.github.io/liquidscript/) is built with [Docusaurus](https://docusaurus.io/). Find its source in the `docs/` folder of the main branch. Start the Docusaurus development server from within the `docs/` folder.

```shell
$ cd docs
$ bun run start
```
