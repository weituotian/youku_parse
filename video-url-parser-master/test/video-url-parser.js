(function(factory) {
    var isBrowser = typeof window === "object",
        chai, core;
    if (isBrowser) {
        chai = window.chai;
        factory(chai.assert, window.VideoUrlParser, window.VideoProvider, window.VideoUrlParserUtil, true);
    } else {
        chai = require("chai");
        core = require("../src/video-url-parser.js");
        factory(chai.assert, core.VideoUrlParser, core.VideoProvider, core.util, false);
    }
})(function(assert, VideoUrlParser, VideoProvider, util, isBrowser) {
    function tester() {
        describe("VideoProvider", function() {
            it('validProvider', function() {
                assert.equal(VideoProvider.validProvider({}), false);
                assert.equal(VideoProvider.validProvider({
                    name: "abc"
                }), false);
                assert.equal(VideoProvider.validProvider({
                    host: "abc"
                }), false);
                assert.equal(VideoProvider.validProvider({
                    parser: function() {}
                }), false);
                assert.equal(VideoProvider.validProvider({
                    host: "abc",
                    parser: function() {}
                }), true);
                assert.equal(VideoProvider.validProvider({
                    parser: function() {},
                    passParser: function() {}
                }), true);
            });

            it('constructor', function() {
                var p1 = new VideoProvider({});
                assert.isTrue(!p1.host);

                var p2 = new VideoProvider({
                    parser: function() {},
                    passParser: function() {}
                });
                assert.isTrue(p2.host && p2.host != "");
                assert.isTrue(typeof p2.passParser === "function");
            });
        });

        describe("VideoUrlParser", function() {
            var v1 = new VideoUrlParser("abc");

            it('addProvider', function() {
                v1.addProvider({
                    host: "youku.com",
                    parser: function() {
                        return 1;
                    },
                    hostMatch: function(s) {
                        return s === "abc" ? "youku.com" : "";
                    }
                });

                assert.isTrue(typeof v1.providers["youku.com"] === "object" && v1.providers["youku.com"] instanceof VideoProvider);
            });

            it('parser', function() {
                assert.isTrue(v1.parser("abc") === 1);
            });
        });

        describe("util", function() {
            var v1 = new VideoUrlParser("abc");

            it('each', function() {
                var obj = {
                    a: 1
                };
                util.each(obj, function(value, key) {
                    assert.isTrue(value === 1);
                    assert.isTrue(key === "a");
                });
            });
        });
    }

    if (isBrowser) {
        describe("test video-url-parser.js", tester);
    } else {
        return tester();
    }
});