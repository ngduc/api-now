const package = require('../package.json');

module.exports = () => {
  console.log(package.version);
  process.exit(0);
};
