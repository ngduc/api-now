const package = require('../package.json')

module.exports = () => {
    console.log(package.version);
};