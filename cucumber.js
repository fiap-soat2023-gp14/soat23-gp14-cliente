let common = [
  'test/features/*.feature',                // Specify our feature files
  '--require-module ts-node/register',  // Load support files
  '--require test/features/step_definitions/*.ts',   // Load step definitions
].join(' ');
module.exports = {
  default: common,
};