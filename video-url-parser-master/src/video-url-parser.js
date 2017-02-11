(function(factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else if (typeof window === "object") {
        factory(window);
    } else {
        throw new Error("未知宿主环境，无法运行！");
    }
})(function(root) {
    var util = {},
        hasOwn = util.hasOwnProperty;

    util.err = function err(module, message, errorType) {
        errorType = errorType || Error;
        throw errorType("[" + module + "] " + message);
    }

    util.warn = function warn(module, message) {
        console.warn("[" + module + "] " + message);
    }

    util.isArray = function isArray(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
    util.isArrayLike = function isArrayLike(arr) {
        if (arr && arr.length >= 0) return true;
        return false;
    }
    util.isSafeArrayLike = function isSafeArrayLike(arr) {
        if (arr && arr.length > 0 && arr[0]) return true;
        return false;
    }
    util.isFunction = function(fun) {
        return typeof fun === 'function';
    }
    util.uniqueKey = function uniqueKey() {
        return (Math.random() + "").replace("0.", "");
    }
    util.each = function(obj, fun, thisArg) {
        var i, len;
        thisArg = thisArg || obj;
        if ((util.isArray(obj) || util.isArrayLike(obj)) && !util.isFunction(obj)) {
            for (i = 0; i < obj.length; i++) {
                if (fun.call(thisArg, obj[i], i) === false) return;
            }
        } else if (typeof obj === "object") {
            for (i in obj) {
                if (fun.call(thisArg, obj[i], i) === false) return;
            }
        }
    };
    util.noop = function() {};
    util.keys = function(obj) {
        if (!obj) return;
        var keys = [],
            key;
        for (key in obj) {
            keys.push(key);
        }
        return keys;
    };
    //摘取自jquery
    util.isWindow = function(obj) {
        if (typeof window !== "object" || (typeof window === "object" && obj !== window)) {
            return false;
        }
        return true;
    }
    util.isPlainObject = function(obj) {
        var key;

        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || typeof obj !== "object" || obj.nodeType || util.isWindow(obj)) {
            return false;
        }

        try {

            // Not own constructor property must be Object
            if (obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {

            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // Support: IE<9
        // Handle iteration over inherited properties before own properties.
        if (!support.ownFirst) {
            for (key in obj) {
                return hasOwn.call(obj, key);
            }
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key);
    };
    util.extend = function() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;

            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !util.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (util.isPlainObject(copy) ||
                            (copyIsArray = util.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && util.isArray(src) ? src : [];

                        } else {
                            clone = src && util.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = util.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };
    if (root) {
        root.VideoUrlParserUtil = util;
    }

    //视频供应商
    function VideoProvider(spec) {
        if (!this.constructor.validProvider(spec)) {
            util.warn("Provider", "无效的Provider描述对象=>" + JSON.stringify(spec));
            return;
        }
        for (var prop in spec) {
            this[prop] = spec[prop];
        }
        if (!this.host) {
            this.host = util.uniqueKey();
        }
        if (typeof this.create !== "function") {
            this.create = util.noop;
        }
    }
    VideoProvider.prototype.constructor = VideoProvider;
    //验证供应商是否是一个合格的供应商，判断标准：含有parser方法，含有host属性或passParser方法
    VideoProvider.validProvider = function(spec) {
        if (spec instanceof VideoProvider) return true;
        if (!spec.parser || typeof spec.parser !== "function") {
            return false;
        }
        if (!spec.host && typeof spec.passParser !== "function") {
            return false;
        }
        return true;
    }
    if (root) {
        root.VideoProvider = VideoProvider;
    }

    function VideoUrlParser(name, getHost) {
        this.name = name;
        this.providers = {};
        this.hostMatchs = [];
        this.getHost = getHost || this.constructor.getHost;
    }
    VideoUrlParser.getHost = function(source) {
        var hostMatchs = this.hostMatchs,
            len = hostMatchs.length,
            i, match, host;
        for (i = 0; i < len; i++) {
            match = hostMatchs[i];
            if (typeof match === "function") {
                host = match(source);
            } else if (match instanceof RegExp) {
                host = match.exec(source);
                host = util.isSafeArrayLike(host) ? host[0] : undefined;
            }

            if (host) return host;
        }
    }
    VideoUrlParser.prototype.constructor = VideoUrlParser;
    VideoUrlParser.prototype.addProvider = function(spec) {
        var provider = spec instanceof VideoProvider ? spec : new VideoProvider(spec);
        this.providers[spec.host] = provider;
        if (provider.hostMatch) {
            this.hostMatchs.push(function() {
                return provider.hostMatch.apply(provider, arguments);
            });
        }
    };
    VideoUrlParser.prototype.removeProvider = function(host) {
        delete this.providers[host];
    };
    /**判断是否能解析 */
    VideoUrlParser.prototype.passParser = function(source) {
        var providers = this.providers,
            provider = providers[this.getHost(source)],
            host;

        if (provider) return provider;

        for (host in providers) {
            provider = providers[host];
            if (provider.hasOwnProperty("passParser")) {
                if (provider.passParser(source)) {
                    return provider;
                }
            }
        }
        return false;
    };
    //解析
    VideoUrlParser.prototype.parser = function(source, provider) {
        if (!source) return;
        source = source + "";
        if (typeof provider === "object") {
            if (!VideoProvider.validProvider(provider)) return;
            this.addProvider(provider);
        } else if (typeof provider !== "undefined") {
            provider = provider + "";
            var message = "无法找到host=" + provider + "的provider";
            provider = this.providers[provider];
            if (!provider) {
                util.warn("VideoUrlParser.parser", message);
                return;
            }
        } else {
            provider = this.passParser(source);
        }

        if (!provider) {
            util.warn("VideoUrlParser.parser", "无法找到合适的provider进行解析");
            return;
        }
        return provider.parser(source);
    };
    VideoUrlParser.prototype.passCreate = function(videoInfo) {
        if (typeof videoInfo === "object" && typeof videoInfo.provider !== "undefined") {
            var provider = this.providers[videoInfo.provider.host || (videoInfo.provider + "")];
            if (provider) return provider;
        }
        return false;
    };
    VideoUrlParser.prototype.create = function(videoInfo) {
        var provider = this.passCreate(videoInfo);
        if (provider) {
            return provider.create.call(provider, videoInfo);
        }
    };

    if (root) {
        root.VideoUrlParser = VideoUrlParser;
    }

    return {
        VideoUrlParser: VideoUrlParser,
        VideoProvider: VideoProvider,
        util: util
    }
});