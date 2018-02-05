/* Tests setup: global vars, and tests entry point */
const fs = require('fs')
const path = require('path')
const {LIB_PATH} = require('../config')

// setup
global.LIB_PATH = LIB_PATH

// require tests so that this file can
// be used as an entry point to run all of them.
const files = fs.readdirSync(__dirname)
for (var file of files) {
    // is test
    if (/spec.js$/.test(file)) {
        require(path.join(__dirname, file))
    }
}
