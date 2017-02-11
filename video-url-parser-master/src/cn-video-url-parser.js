(function (factory) {
    var providers = {
        YoukuVideoProvider: "video-provider-youku.com"
    };
    if (typeof module === "object" && typeof module.exports === "object") {
        var core = require("./video-url-parser.js"),
            ps = [];
        core.util.each(providers, function (value, key) {
            ps.push(require(value));
        });
        module.exports = factory(core.VideoUrlParser, core.VideoProvider, core.util, ps);
    } else if (typeof window === "object") {
        var util = window.VideoUrlParserUtil,
            ps = [];
        util.each(providers, function (value, key) {
            ps.push(window[key]);
        });
        factory(window.VideoUrlParser, window.VideoProvider, util, ps, window);
    } else {
        throw new Error("未知宿主环境，无法运行！");
    }
})(function (VideoUrlParser, VideoProvider, util, providers, root) {
    var cnVideoUrlParser = new VideoUrlParser("CN");
    util.each(providers, function (item) {
        cnVideoUrlParser.addProvider(item(util, cnVideoUrlParser));
    });
    if (root) {
        root.cnVideoUrlParser = cnVideoUrlParser;
    }
    return cnVideoUrlParser;
});