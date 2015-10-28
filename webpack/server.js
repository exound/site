require("babel/register")({
  optional: ["es7.decorators", "es7.classProperties"]
});

const fs = require("fs")
    , path = require("path");

const IS_LOCAL = fs.existsSync(path.join(__dirname, "..", "_local"));

global.apiRoot = IS_LOCAL ? "http://127.0.0.1:3000" : "http://api.exound.com";

const connector = require("../src/scripts/server/connector")
    , server = require("../src/scripts/server/Server").connect(connector);

server.listen(4000);
