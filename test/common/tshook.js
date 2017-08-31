var config = require('../tsconfig.json')

require("ts-node").register({
  compilerOptions: config.compilerOptions
});