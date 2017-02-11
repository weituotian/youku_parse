var fs = require("fs"),
    path = require("path"),
    dir = __dirname,
    ignore = ["index.js", "index.html"];

fs.readdirSync(dir).forEach(function(filename) {
    if (ignore.indexOf(filename) !== -1) return;
    describe("test " + filename, require("./" + filename));
});