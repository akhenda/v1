/**
 * Generates a base configuration for semantic-release.
 *
 * Ref:
 *  - https://www.pixelmatters.com/blog/how-to-manage-multiple-front-end-projects-with-a-monorepo
 *
 * @param project - The name of the project. Used to determine the name of the
 *   release branch.
 * @returns A configuration for semantic-release.
 */
function getBaseConfig(project: string) {
  return {
    extends: "semantic-release-monorepo",
    branches: ["main", { name: "dev", channel: "beta", prerelease: "rc" }],
    verifyConditions: [
      "@semantic-release/changelog",
      "@semantic-release/git",
      "@semantic-release/github",
    ],
    getLastRelease: "@semantic-release/git",
    prepare: [
      { path: "@semantic-release/changelog", changelogFile: "CHANGELOG.md" },
      { path: "@semantic-release/npm", npmPublish: true },
      {
        path: "@semantic-release/git",
        assets: ["package.json", "CHANGELOG.md"],
        message: `chore(release): ${project} v\${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`,
      },
    ],
    publish: ["@semantic-release/github", "@semantic-release/npm"],
    tagFormat: `${project}-v\${version}`,
  };
}

export default getBaseConfig;
