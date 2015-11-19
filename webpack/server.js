require("babel/register")({
  optional: ["es7.decorators", "es7.classProperties"]
});

const fs = require("fs")
    , memwatch = require("memwatch-next")
    , path = require("path");

memwatch.on("leak", function(info) {
 console.error('Memory leak detected: ', info);
});

const IS_LOCAL = fs.existsSync(path.join(__dirname, "..", "_local"));

global.apiRoot = IS_LOCAL ? "http://127.0.0.1:3000" : "http://api.exound.com";

const connector = require("../src/scripts/server/connector")
    , server = require("../src/scripts/server/Server").connect(connector);

server.listen(4000);
