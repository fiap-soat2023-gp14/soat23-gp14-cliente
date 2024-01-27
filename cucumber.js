let common = [
  'test/features/user_api.feature',
  '--require-module ts-node/register',
  '--require test/features/step_definitions/*.ts',
  '--format-options \'{"snippetInterface": "async-await"}\'',
  '--format progress-bar'// Load custom formatter
].join(' ');
module.exports = {
  default: common,
};