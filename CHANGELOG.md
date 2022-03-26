# LiquidScript Change Log

## Version 0.2.0-alpha.1

- New `FetchLoader`. A template loader for web browsers that uses the Fetch API to get templates.
- New `XMLHttpRequestLoader`. A template loader for web browsers that uses `XMLHttpRequest` to get templates.
- Move `src/builtin/loaders/choice.ts` to `src/builtin/loaders/choice_loader.ts`
- Move `src/builtin/loaders/file_system.ts` to `src/builtin/loaders/file_system_loader.ts`
- Change browser tests to use Mocha's "tdd" interface.
