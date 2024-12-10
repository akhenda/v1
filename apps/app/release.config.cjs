const baseConfig = require('@v1/release');
const pkg = require('./package.json');

const config = baseConfig(pkg.name);

/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = config;
