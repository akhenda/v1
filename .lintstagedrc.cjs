module.exports = {
  "*": [() => "bun run lint:repo", () => "bun run lint:repo:fix"],
  "{apps,libs,packages,tooling}/**/*.{ts,tsx}": () => "bun run typecheck",
  "{apps,libs,packages,tooling}/**/*.{js,ts,jsx,tsx,json,md,html,css,scss}": [
    /**
     * Format, sort imports, lint, and apply safe fixes
     * https://biomejs.dev/recipes/git-hooks/#husky
     */
    "biome check --write",
  ],
};
