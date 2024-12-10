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
function getBaseConfig(project) {
  /**
   * @type {import('semantic-release').GlobalConfig}
   */
  return {
    debug: true,
    dryRun: true,
    extends: 'semantic-release-monorepo',
    branches: ['main', { name: 'dev', channel: 'beta', prerelease: 'rc' }],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      ['@semantic-release/changelog', { changelogFile: 'docs/CHANGELOG.md' }],
      ['@semantic-release/npm', { npmPublish: false }],
      [
        '@semantic-release/git',
        {
          assets: ['package.json', 'docs/CHANGELOG.md'],
          message: `chore(release): ${project} v\${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`,
        },
      ],
      '@semantic-release/github',
    ],
    tagFormat: `${project}-v\${version}`,
  };
}

module.exports = getBaseConfig;
