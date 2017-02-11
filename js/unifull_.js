/*! h5_player version1.7.0 2017-01-19  01:23:21*/
!
    function () {
        function crossDomain(a) {
            var b = document.createElement("script");
            b.type = "text/javascript",
                b.src = a,
                document.getElementsByTagName("head")[0].appendChild(b)
        }

        function selectQuality(a, b) {
            YK.defaultVideoType = "mp4",
            null != LocalStorage.getItem("defaultVideoType") && (YK.defaultVideoType = LocalStorage.getItem("defaultVideoType")),
            b.join(" ").indexOf(YK.defaultVideoType) < 0 && (YK.defaultVideoType = b.indexOf("3gphd") > -1 ? "3gphd" : "flv"),
            a.data.video.type && a.data.video.type.indexOf("panorama") != -1 && (YK.defaultVideoType = b.indexOf("hd2") > -1 ? "hd2" : YK.defaultVideoType),
                debug.log("default = " + YK.defaultVideoType)
        }

        function checkSrc() {
            BuildVideoInfo._fyks.length > BuildVideoInfo.mp4srcs.length || (clearInterval(BuildVideoInfo._tid), BuildVideoInfo.cleanSrc(), BuildVideoInfo.cache(), null == BuildVideoInfo._callback ? YKP.GetMP4OK(BuildVideoInfo._v, BuildVideoInfo._videoInfo) : BuildVideoInfo._callback(BuildVideoInfo._v, BuildVideoInfo._videoInfo))
        }

        function decode64(a) {
            if (!a) return "";
            a = a.toString();
            var b, c, d, e, f, g, h, i = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            for (g = a.length, f = 0, h = ""; f < g;) {
                do b = i[255 & a.charCodeAt(f++)];
                while (f < g && b == -1);
                if (b == -1) break;
                do c = i[255 & a.charCodeAt(f++)];
                while (f < g && c == -1);
                if (c == -1) break;
                h += String.fromCharCode(b << 2 | (48 & c) >> 4);
                do {
                    if (d = 255 & a.charCodeAt(f++), 61 == d) return h;
                    d = i[d]
                } while (f < g && d == -1);
                if (d == -1) break;
                h += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
                do {
                    if (e = 255 & a.charCodeAt(f++), 61 == e) return h;
                    e = i[e]
                } while (f < g && e == -1);
                if (e == -1) break;
                h += String.fromCharCode((3 & d) << 6 | e)
            }
            return h
        }

        function flashChecker() {
            var a = 0,
                b = 0,
                c = 0;
            try {
                if (document.all) {
                    var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    d && (a = 1, VSwf = d.GetVariable("$version"), b = parseInt(VSwf.split(" ")[1].split(",")[0]))
                } else if (navigator.plugins && navigator.plugins.length > 0) {
                    var d = navigator.plugins["Shockwave Flash"];
                    if (d) {
                        a = 1;
                        for (var e = d.description.split(" "), f = 0; f < e.length; ++f) isNaN(parseInt(e[f])) || (b = parseInt(e[f]))
                    }
                }
            } catch (g) {
                a = 1,
                    c = 1
            }
            return {
                f: a,
                v: b,
                e: c
            }
        }

        function rc4(a, b) {
            for (var c, d = [], e = 0, f = "", g = 0; g < 256; g++) d[g] = g;
            for (g = 0; g < 256; g++) e = (e + d[g] + a.charCodeAt(g % a.length)) % 256,
                c = d[g],
                d[g] = d[e],
                d[e] = c;
            g = 0,
                e = 0;
            for (var h = 0; h < b.length; h++) g = (g + 1) % 256,
                e = (e + d[g]) % 256,
                c = d[g],
                d[g] = d[e],
                d[e] = c,
                f += String.fromCharCode(b.charCodeAt(h) ^ d[(d[g] + d[e]) % 256]);
            return f
        }

        function translate(a, b) {
            for (var c = [], d = 0; d < a.length; d++) {
                var e = 0;
                e = a[d] >= "a" && a[d] <= "z" ? a[d].charCodeAt(0) - "a".charCodeAt(0) : a[d] - "0" + 26;
                for (var f = 0; f < 36; f++) if (b[f] == e) {
                    e = f;
                    break
                }
                e > 25 ? c[d] = e - 26 : c[d] = String.fromCharCode(e + 97)
            }
            return c.join("")
        }

        function ajaxFun(a) {
            if (a = a || {}, a.type = (a.type || "GET").toUpperCase(), a.dataType = a.dataType || "json", window.XMLHttpRequest) var b = new XMLHttpRequest;
            else var b = new ActiveXObject("Microsoft.XMLHTTP");
            if ("GET" == a.type) b.open("GET", a.url, !0),
                b.send(null);
            else if ("POST" == a.type) {
                var c = urlParameter(a.data);
                b.open("POST", a.url, !0),
                    b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    b.send(c)
            }
            b.onreadystatechange = function () {
                if (4 == b.readyState) {
                    var c = b.status;
                    c >= 200 && c < 300 ? a.success && a.success(b.responseText, b.responseXML) : a.fail && a.fail(c)
                }
            }
        }

        function hex_md5(a) {
            return binl2hex(core_md5(str2binl(a), a.length * chrsz))
        }

        function b64_md5(a) {
            return binl2b64(core_md5(str2binl(a), a.length * chrsz))
        }

        function hex_hmac_md5(a, b) {
            return binl2hex(core_hmac_md5(a, b))
        }

        function b64_hmac_md5(a, b) {
            return binl2b64(core_hmac_md5(a, b))
        }

        function calcMD5(a) {
            return binl2hex(core_md5(str2binl(a), a.length * chrsz))
        }

        function md5_vm_test() {
            return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
        }

        function core_md5(a, b) {
            a[b >> 5] |= 128 << b % 32,
                a[(b + 64 >>> 9 << 4) + 14] = b;
            for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
                var h = c,
                    i = d,
                    j = e,
                    k = f;
                c = md5_ff(c, d, e, f, a[g + 0], 7, -680876936),
                    f = md5_ff(f, c, d, e, a[g + 1], 12, -389564586),
                    e = md5_ff(e, f, c, d, a[g + 2], 17, 606105819),
                    d = md5_ff(d, e, f, c, a[g + 3], 22, -1044525330),
                    c = md5_ff(c, d, e, f, a[g + 4], 7, -176418897),
                    f = md5_ff(f, c, d, e, a[g + 5], 12, 1200080426),
                    e = md5_ff(e, f, c, d, a[g + 6], 17, -1473231341),
                    d = md5_ff(d, e, f, c, a[g + 7], 22, -45705983),
                    c = md5_ff(c, d, e, f, a[g + 8], 7, 1770035416),
                    f = md5_ff(f, c, d, e, a[g + 9], 12, -1958414417),
                    e = md5_ff(e, f, c, d, a[g + 10], 17, -42063),
                    d = md5_ff(d, e, f, c, a[g + 11], 22, -1990404162),
                    c = md5_ff(c, d, e, f, a[g + 12], 7, 1804603682),
                    f = md5_ff(f, c, d, e, a[g + 13], 12, -40341101),
                    e = md5_ff(e, f, c, d, a[g + 14], 17, -1502002290),
                    d = md5_ff(d, e, f, c, a[g + 15], 22, 1236535329),
                    c = md5_gg(c, d, e, f, a[g + 1], 5, -165796510),
                    f = md5_gg(f, c, d, e, a[g + 6], 9, -1069501632),
                    e = md5_gg(e, f, c, d, a[g + 11], 14, 643717713),
                    d = md5_gg(d, e, f, c, a[g + 0], 20, -373897302),
                    c = md5_gg(c, d, e, f, a[g + 5], 5, -701558691),
                    f = md5_gg(f, c, d, e, a[g + 10], 9, 38016083),
                    e = md5_gg(e, f, c, d, a[g + 15], 14, -660478335),
                    d = md5_gg(d, e, f, c, a[g + 4], 20, -405537848),
                    c = md5_gg(c, d, e, f, a[g + 9], 5, 568446438),
                    f = md5_gg(f, c, d, e, a[g + 14], 9, -1019803690),
                    e = md5_gg(e, f, c, d, a[g + 3], 14, -187363961),
                    d = md5_gg(d, e, f, c, a[g + 8], 20, 1163531501),
                    c = md5_gg(c, d, e, f, a[g + 13], 5, -1444681467),
                    f = md5_gg(f, c, d, e, a[g + 2], 9, -51403784),
                    e = md5_gg(e, f, c, d, a[g + 7], 14, 1735328473),
                    d = md5_gg(d, e, f, c, a[g + 12], 20, -1926607734),
                    c = md5_hh(c, d, e, f, a[g + 5], 4, -378558),
                    f = md5_hh(f, c, d, e, a[g + 8], 11, -2022574463),
                    e = md5_hh(e, f, c, d, a[g + 11], 16, 1839030562),
                    d = md5_hh(d, e, f, c, a[g + 14], 23, -35309556),
                    c = md5_hh(c, d, e, f, a[g + 1], 4, -1530992060),
                    f = md5_hh(f, c, d, e, a[g + 4], 11, 1272893353),
                    e = md5_hh(e, f, c, d, a[g + 7], 16, -155497632),
                    d = md5_hh(d, e, f, c, a[g + 10], 23, -1094730640),
                    c = md5_hh(c, d, e, f, a[g + 13], 4, 681279174),
                    f = md5_hh(f, c, d, e, a[g + 0], 11, -358537222),
                    e = md5_hh(e, f, c, d, a[g + 3], 16, -722521979),
                    d = md5_hh(d, e, f, c, a[g + 6], 23, 76029189),
                    c = md5_hh(c, d, e, f, a[g + 9], 4, -640364487),
                    f = md5_hh(f, c, d, e, a[g + 12], 11, -421815835),
                    e = md5_hh(e, f, c, d, a[g + 15], 16, 530742520),
                    d = md5_hh(d, e, f, c, a[g + 2], 23, -995338651),
                    c = md5_ii(c, d, e, f, a[g + 0], 6, -198630844),
                    f = md5_ii(f, c, d, e, a[g + 7], 10, 1126891415),
                    e = md5_ii(e, f, c, d, a[g + 14], 15, -1416354905),
                    d = md5_ii(d, e, f, c, a[g + 5], 21, -57434055),
                    c = md5_ii(c, d, e, f, a[g + 12], 6, 1700485571),
                    f = md5_ii(f, c, d, e, a[g + 3], 10, -1894986606),
                    e = md5_ii(e, f, c, d, a[g + 10], 15, -1051523),
                    d = md5_ii(d, e, f, c, a[g + 1], 21, -2054922799),
                    c = md5_ii(c, d, e, f, a[g + 8], 6, 1873313359),
                    f = md5_ii(f, c, d, e, a[g + 15], 10, -30611744),
                    e = md5_ii(e, f, c, d, a[g + 6], 15, -1560198380),
                    d = md5_ii(d, e, f, c, a[g + 13], 21, 1309151649),
                    c = md5_ii(c, d, e, f, a[g + 4], 6, -145523070),
                    f = md5_ii(f, c, d, e, a[g + 11], 10, -1120210379),
                    e = md5_ii(e, f, c, d, a[g + 2], 15, 718787259),
                    d = md5_ii(d, e, f, c, a[g + 9], 21, -343485551),
                    c = safe_add(c, h),
                    d = safe_add(d, i),
                    e = safe_add(e, j),
                    f = safe_add(f, k)
            }
            return Array(c, d, e, f)
        }

        function md5_cmn(a, b, c, d, e, f) {
            return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
        }

        function md5_ff(a, b, c, d, e, f, g) {
            return md5_cmn(b & c | ~b & d, a, b, e, f, g)
        }

        function md5_gg(a, b, c, d, e, f, g) {
            return md5_cmn(b & d | c & ~d, a, b, e, f, g)
        }

        function md5_hh(a, b, c, d, e, f, g) {
            return md5_cmn(b ^ c ^ d, a, b, e, f, g)
        }

        function md5_ii(a, b, c, d, e, f, g) {
            return md5_cmn(c ^ (b | ~d), a, b, e, f, g)
        }

        function core_hmac_md5(a, b) {
            var c = str2binl(a);
            c.length > 16 && (c = core_md5(c, a.length * chrsz));
            for (var d = Array(16), e = Array(16), f = 0; f < 16; f++) d[f] = 909522486 ^ c[f],
                e[f] = 1549556828 ^ c[f];
            var g = core_md5(d.concat(str2binl(b)), 512 + b.length * chrsz);
            return core_md5(e.concat(g), 640)
        }

        function safe_add(a, b) {
            var c = (65535 & a) + (65535 & b),
                d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | 65535 & c
        }

        function bit_rol(a, b) {
            return a << b | a >>> 32 - b
        }

        function str2binl(a) {
            for (var b = Array(), c = (1 << chrsz) - 1, d = 0; d < a.length * chrsz; d += chrsz) b[d >> 5] |= (a.charCodeAt(d / chrsz) & c) << d % 32;
            return b
        }

        function binl2hex(a) {
            for (var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++) c += b.charAt(a[d >> 2] >> d % 4 * 8 + 4 & 15) + b.charAt(a[d >> 2] >> d % 4 * 8 & 15);
            return c
        }

        function binl2b64(a) {
            for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "", d = 0; d < 4 * a.length; d += 3) for (var e = (a[d >> 2] >> 8 * (d % 4) & 255) << 16 | (a[d + 1 >> 2] >> 8 * ((d + 1) % 4) & 255) << 8 | a[d + 2 >> 2] >> 8 * ((d + 2) % 4) & 255, f = 0; f < 4; f++) c += 8 * d + 6 * f > 32 * a.length ? b64pad : b.charAt(e >> 6 * (3 - f) & 63);
            return c
        }

        function hcbt(a) {
            var b = "";
            return b = genH(a)
        }

        function genH(a) {
            for (var b = !1, c = ""; !b;) c = randomString(20),
                hstr = a + c,
                hashcash = S(hstr),
            "00" == hashcash.substring(0, 2) && (b = !0);
            return c
        }

        function randomString(a) {
            for (var b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", c = "", d = 0; d < a; d++) {
                var e = Math.floor(Math.random() * b.length);
                c += b.substring(e, e + 1)
            }
            return c
        }

        function S(a) {
            function b(a, b) {
                var c = a << b | a >>> 32 - b;
                return c
            }

            function c(a) {
                var b, c, d = "";
                for (b = 7; b >= 0; b--) c = a >>> 4 * b & 15,
                    d += c.toString(16);
                return d
            }

            function d(a) {
                a = a.replace(/\r\n/g, "\n");
                for (var b = "", c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
                }
                return b
            }

            var e, f, g, h, i, j, k, l, m, n = new Array(80),
                o = 1732584193,
                p = 4023233417,
                q = 2562383102,
                r = 271733878,
                s = 3285377520;
            a = d(a);
            var t = a.length,
                u = new Array;
            for (f = 0; f < t - 3; f += 4) g = a.charCodeAt(f) << 24 | a.charCodeAt(f + 1) << 16 | a.charCodeAt(f + 2) << 8 | a.charCodeAt(f + 3),
                u.push(g);
            switch (t % 4) {
                case 0:
                    f = 2147483648;
                    break;
                case 1:
                    f = a.charCodeAt(t - 1) << 24 | 8388608;
                    break;
                case 2:
                    f = a.charCodeAt(t - 2) << 24 | a.charCodeAt(t - 1) << 16 | 32768;
                    break;
                case 3:
                    f = a.charCodeAt(t - 3) << 24 | a.charCodeAt(t - 2) << 16 | a.charCodeAt(t - 1) << 8 | 128
            }
            for (u.push(f); u.length % 16 != 14;) u.push(0);
            for (u.push(t >>> 29), u.push(t << 3 & 4294967295), e = 0; e < u.length; e += 16) {
                for (f = 0; f < 16; f++) n[f] = u[e + f];
                for (f = 16; f <= 79; f++) n[f] = b(n[f - 3] ^ n[f - 8] ^ n[f - 14] ^ n[f - 16], 1);
                for (h = o, i = p, j = q, k = r, l = s, f = 0; f <= 19; f++) m = b(h, 5) + (i & j | ~i & k) + l + n[f] + 1518500249 & 4294967295,
                    l = k,
                    k = j,
                    j = b(i, 30),
                    i = h,
                    h = m;
                for (f = 20; f <= 39; f++) m = b(h, 5) + (i ^ j ^ k) + l + n[f] + 1859775393 & 4294967295,
                    l = k,
                    k = j,
                    j = b(i, 30),
                    i = h,
                    h = m;
                for (f = 40; f <= 59; f++) m = b(h, 5) + (i & j | i & k | j & k) + l + n[f] + 2400959708 & 4294967295,
                    l = k,
                    k = j,
                    j = b(i, 30),
                    i = h,
                    h = m;
                for (f = 60; f <= 79; f++) m = b(h, 5) + (i ^ j ^ k) + l + n[f] + 3395469782 & 4294967295,
                    l = k,
                    k = j,
                    j = b(i, 30),
                    i = h,
                    h = m;
                o = o + h & 4294967295,
                    p = p + i & 4294967295,
                    q = q + j & 4294967295,
                    r = r + k & 4294967295,
                    s = s + l & 4294967295
            }
            var m = c(o) + c(p) + c(q) + c(r) + c(s);
            return m.toLowerCase()
        }

        function loadjscssfile(a, b) {
            if ("js" == b) {
                var c = document.createElement("script");
                c.setAttribute("type", "text/javascript"),
                    c.setAttribute("src", a)
            } else if ("css" == b) {
                var c = document.createElement("link");
                c.setAttribute("rel", "stylesheet"),
                    c.setAttribute("type", "text/css"),
                    c.setAttribute("href", a)
            }
            "undefined" != typeof c && document.getElementsByTagName("head")[0].appendChild(c)
        }

        function showRel(a) {
            var b = document.getElementById(a);
            b.style.opacity = 1
        }

        function fadeRel(a) {
            var b = document.getElementById(a);
            b.style.opacity = .6
        }

        function getMType() {
            return YKP.isAndroid ? YKP.isAndroid4 ? "adr4" : "adr" : YKP.isIPHONE ? "iph" : YKP.isIPAD ? "ipa" : YKP.isIPOD ? "ipo" : "oth"
        }

        function errorMessage(a) {
            switch (a) {
                case 1:
                    return "抱歉，您请求的视频资源已不存在"
            }
        }

        function cssAdapt(a) {
            return YKP.isIPAD && window.location.href.indexOf("v.youku.com") >= 0 ? "x-player" : a <= 200 ? "x-player x-player-200" : a <= 300 ? "x-player x-player-200-300" : a <= 660 ? "x-player x-player-300-660" : a <= 800 ? "x-player x-player-660-800" : "x-player"
        }

        function buildDom(a) {
            var b = parseInt(YK.config.width);
            parseInt(YK.config.height);
            playerDom = '<div id=x-player class="' + cssAdapt(b) + '">';
            var c = "";
            (YK.isWeixin || YKP.isIPHONE) && (c = "webkit-playsinline playsinline", YK.initConfig.iswifi && (c += " autoplay")),
                a.innerHTML = playerDom + "<video class=x-video-player id=youku-html5player-video  " + c + '></video><div class=x-video-poster><img></img></div><div class=x-video-loading></div><div class=x-video-info><h1 class=x-title></h1><div class=x-video-state></div><div class=x-showmore></div></div><div class="x-video-rnum num-font"  id="js-video-register"></div><div class="x-video-lnum num-font" id="js-video-license"></div><div id="js_exclogo" class="x-video-logo-exc"></div><div id=x-video-button class=x-video-button><div class=x-video-play-ico></div></div><div class=x-feedback><div class="x-message"><div class=x-message-txt></div><div class=x-message-btn></div></div><div class="x-mask"></div></div><div class="x-pay"><div class=x-pay-txt><h1><em class=vip></em></h1><p class=x-pay-tips></p></div></div><div class="x-showtips"><div class="x-showtips-txt"><h2 id="x-tips-info"></h2><div class="x-showtips-btn"><button id="x-try" class="x-btn x-btn-try">免费试看</button><button id="x-pay" class="x-btn"></button></div></div></div><div class="x-trial"><div class="x-trial-close"></div><div class="x-cavator"></div><div id="x-txt-big" class="x-trial-txt"><br /><em class="x-buy">购买频道会员</em></div><div id="x-txt-small" class="x-trial-txt x-txt-small"><em class="x-buy">购买频道会员</em></div><div class="x-trial-next"></div></div><div class=x-advert><div class=x-advert-info><div class=x-advert-skip><div class=x-advert-txt></div><div class=x-mask></div></div><div class=x-advert-countdown><div class=x-advert-txt></div><div class=x-mask></div></div></div><div class=x-advert-detail><div class=x-advert-txt>详细了解<span class=x-ico-detail></span></div><div class=x-mask></div></div></div><div class=x-ad-pause></div><div class=x-prompt></div><div class="x-dashboard"><div class=x-progress-mini><div class=x-progress-track-mini></div><div class=x-progress-load-mini></div><div class=x-progress-play-mini></div></div><div class="x-console"><div class="x-progress"><div class="x-progress-track"><div class="x-progress-load"></div><div class=x-progress-play></div><div class="x-progress-seek"><div class="x-seek-handle"></div></div></div></div><div class="x-controls"><div class="x-play-control"><button class="x-control-btn"><b id=x-playbtn class="x-playing"><em>播放</em></b></button></div><div class="x-time-display"><span class="x-time-current">00:00</span><span class="x-time-splite">/</span><span class="x-time-duration">00:00</span></div><div class="x-settings"><div class=x-playspeed></div><div class=x-playshow style=display:none><button class=x-control-btn title=选集>选集</button></div><div class="x-localization"></div><div class="x-quality"></div><div class="x-fullscreen"><button class="x-control-btn" type="button" title="全屏模式" rol="button"><b class=x-zoomin><em>全屏</em></b></button></div></div></div></div></div><div class=x-showlist></div><div class=x-tips></div><div class=x-trigger></div></div>'
        }

        VER = "1.7.0",
            DEBUG__ = 1,
        0 != DEBUG__ && window.console || (window.console = {}, window.console.log = function () {
        }),
            debug = {},
            debug.log = function (a) {
                if (null != document.getElementById("debug")) {
                    var b = document.getElementById("debug");
                    b.innerHTML += a + " <br> "
                }
            },
            debug.log1 = function (a) {
                debug.logDom || (debug.logDom = document.getElementById("log"), debug.logDom ? debug.logDom.innerHTML = "" : ""),
                debug.logDom && (debug.logDom.innerHTML = debug.logDom.innerHTML + " " + a)
            };
        var YK = {},
            YKU = {},
            YKP = {
                playerType: "",
                userCache: {
                    a1: "4",
                    a2: "1"
                },
                playerState: {
                    PLAYER_STATE_INIT: "PLAYER_STATE_INIT",
                    PLAYER_STATE_READY: "PLAYER_STATE_READY",
                    PLAYER_STATE_AD: "PLAYER_STATE_AD",
                    PLAYER_STATE_PLAYING: "PLAYER_STATE_PLAYING",
                    PLAYER_STATE_END: "PLAYER_STATE_END",
                    PLAYER_STATE_ERROR: "PLAYER_STATE_ERROR"
                },
                playerCurrentState: "PLAYER_STATE_INIT"
            },
            YKFlashPlayer = function () {
                this._player = document.getElementById(YKP.playerId)
            };
        YKFlashPlayer.prototype = {
            resize: function (a, b) {
                this._player.style.width = a + "px",
                    this._player.style.height = b + "px"
            },
            currentTime: function () {
                var a = this._player.getPlayerState().split("|");
                return a.length >= 3 ? a[2] : -1
            },
            totalTime: function () {
                var a = this._player.getPlayerState().split("|");
                return a.length >= 4 ? a[3] : -1
            },
            playVideo: function () {
                this._player.pauseVideo(!1)
            },
            pauseVideo: function () {
                this._player.pauseVideo(!0)
            },
            seekTo: function (a) {
                this._player.nsseek(a)
            },
            playVideoById: function (a) {
                this._player.playVideoByID(a)
            },
            hideControls: function () {
                this._player.showControlBar(!1)
            },
            showControls: function () {
                this._player.showControlBar(!0)
            }
        },
            PartnerConstant = {
                OPEN_API_URL: "https://api.youku.com/players/custom.json",
                OPEN_API_OK: "openapiokyouku",
                OPEN_API_TIME_OUT: "openapitimeoutyouku",
                OPEN_API_ERROR: "openapierror"
            };
        var PartnerInfo = function (a) {
            this._handler = {},
                window.partnerinfo = this,
                a.callback = "partnerinfo.parse",
                a.type = "h5";
            var b = urlParameter(a),
                c = PartnerConstant.OPEN_API_URL + "?" + b;
            crossDomain(c);
            var d = this;
            setTimeout(function (a) {
                d._hasResp || d.dispatch({
                    type: PartnerConstant.OPEN_API_TIME_OUT
                })
            }, 2e3)
        };
        PartnerInfo.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            parse: function (a) {
                return this._hasResp = !0,
                    null != a.error || 1 != a.status ? void this.dispatch({
                        type: PartnerConstant.OPEN_API_ERROR
                    }) : void this.dispatch({
                        type: PartnerConstant.OPEN_API_OK,
                        data: a
                    })
            }
        };
        var BuildVideoInfo = {},
            Cache = {},
            CacheUep = [];
        BuildVideoInfo.mp4srcs = new Array,
            BuildVideoInfo.start = function (a, b, c, d) {
                if (this._callback = d, null == this._callback) switch (this._type) {
                    case "m3u8":
                        this._callback = YKP.GetM3U8OK;
                        break;
                    case "mp4":
                        this._callback = YKP.GetMP4OK;
                        break;
                    default:
                        this._callback = YKP.GetM3U8OK
                }
                if (null != Cache[a] && null != Cache[a][c]) return console.log("Cache Hit vid = " + a),
                    void this._callback(Cache[a][c].v, Cache[a][c].videoInfo);
                if (this._vid = decodeURIComponent(a), this._password = b, this._type = c, this._videoInfo = null, this._url = "", this.mp4srcs = new Array, this.typeNum = 0, YKP.ismaoyanApp) {
                    var e = this;
                    setTimeout(function () {
                        e.request()
                    }, 500)
                } else this.request();
                this.playlistOK = !1,
                    YK.show(YK.get(".x-video-loading")),
                    YK.hide(YK.get(".x-video-button"))
            },
            BuildVideoInfo.cache = function () {
                Cache[BuildVideoInfo._vid] = {},
                    Cache[BuildVideoInfo._vid][BuildVideoInfo._type] = {
                        v: this._v,
                        videoInfo: this._videoInfo
                    }
            },
            BuildVideoInfo.getPlayListUrl = function (a) {
                var b = this.typeNum % 2;
                this.typeNum++;
                var c = "";
                c = (1 === YK.randomCode && !b || 0 === YK.randomCode && 1 === b, "//play-ali.youku.com/play/get.json?vid="),
                    c += decodeURIComponent(this._vid),
                    c += "&ct=12";
                for (var d in this.playlistconfig) c += "&" + d + "=" + this.playlistconfig[d];
                return this._password && (c += "&pwd=" + escape(this._password)),
                this._password && YK.initConfig.client_id && YK.config.partner_config && 1 == YK.config.partner_config.status && 1 == YK.config.partner_config.passless && (c += "&cid=" + YK.initConfig.client_id),
                location.href.indexOf("https://") > -1 && (c += "&pro=1"),
                    c += "&callback=BuildVideoInfo.response",
                "" != YK.getUCStr(this._vid) && (c += YK.getUCStr(this._vid)),
                    encodeURI(c)
            },
            BuildVideoInfo.error = function (a, b, c, d) {
                a || (a = 0);
                var e = "";
                switch (a) {
                    case 0:
                        e = "XMLHttpRequest onerror";
                        break;
                    case 1:
                        e = "getplaylist response error";
                        break;
                    case 2:
                        e = "getplaylist no mp4 segment"
                }
                YKP.sendErrorReport(0),
                    YKP.sendLog("get_json", 203, 10),
                    YKP.showError(YK.config.parentBox, "该视频暂时不能播放,请下载APP或在PC上观看", 320)
            },
            BuildVideoInfo.reportPlayListUep = function () {
                var a = (new Date).getTime() - this._plreqStartTime;
                CacheUep.push({
                    type: "getplaylist",
                    time: a
                })
            },
            BuildVideoInfo.response = function (a) {
                var b = a.data,
                    c = b.stream;
                if (!this.playlistOK) {
                    if (b.error && b.error.code === -501) {
                        var d = ((new Date).getTime() - this._plreqStartTime) / 1e3;
                        return YKP.sendLog("get_json", 203, d),
                            this.typeNum < 2 ? void this.request() : (YKP.showError(null, b.error.note), void(this.playlistOK = !0))
                    }
                    if (b.error && b.error.code === -601) {
                        var d = ((new Date).getTime() - this._plreqStartTime) / 1e3;
                        return YKP.sendLog("get_json", 203, d),
                            YK.get("#x-player").innerHTML = b.error.note,
                            YK.get("#x-player").style.color = "white",
                            YK.get("#x-player").style.textAlign = "center",
                            YK.get("#x-player").style.lineHeight = YK.get("#x-player").offsetHeight + "px",
                            void(this.playlistOK = !0)
                    }
                    YK.hide(YK.get(".x-video-loading")),
                        YK.show(YK.get(".x-video-button"));
                    var d = ((new Date).getTime() - this._plreqStartTime) / 1e3;
                    YKP.sendLog("get_json", 200, d),
                        this.playlistOK = !0,
                        this.reportPlayListUep(),
                        YK.v = a,
                        a && b && (!c || "default" === c[0].drm_type && "http" === c[0].transfer_mode) ? this.init(a) : this.error(1, a, b, c)
                }
            },
            BuildVideoInfo.request = function (a) {
                this.playlistError && (this.playlistError = !1),
                    this._url = this.getPlayListUrl(),
                    this._plreqStartTime = (new Date).getTime(),
                    YKP.sendLog("get_json", 0, 0),
                    crossDomain(this._url);
                var b = this,
                    c = 1e4;
                setTimeout(function () {
                    b.playlistOK || (YKP.sendLog("get_json", 408, 10), b.playlistError ? (YKP.sendErrorReport(2003), YK.playerEvents && YK.playerEvents.onPlayError && YK.playerEvents.onPlayError("视频信息出错，请刷新重试"), YK.get("#x-player").innerHTML = "视频信息出错，请刷新重试", YK.get("#x-player").style.color = "white", YK.get("#x-player").style.textAlign = "center", YK.get("#x-player").style.lineHeight = YK.get("#x-player").offsetHeight + "px") : (b.request(), b.playlistError = !0))
                }, c)
            },
            BuildVideoInfo.m3u8src = function (a) {
                return YK.password = this._password,
                    YK.m3u8src_v2(YK.initConfig.vid, a)
            },
            BuildVideoInfo.total = function (a, b, c) {
                var d = a[b][c],
                    e = 0,
                    f = 0;
                if (YK.v.data.controller.html5_disable || YK.v.data.trial && "h5" == YK.v.data.trial.type) e += parseInt(YK.v.data.video.seconds);
                else for (var g = 0; g < d.length; g++) {
                    var h = d[g];
                    e += parseInt(h.seconds),
                        f += parseInt(h.size)
                }
                return {
                    totalTime: e,
                    totalBytes: f
                }
            },
            BuildVideoInfo.cleanSrc = function () {
                for (var a = YK.defaultLanguage, b = this._videoInfo._videoSegsDic.streams[a][g_playType], c = 0; c < b.length; c++) b[c].fyksrc = b[c].src,
                    b[c].src = BuildVideoInfo.mp4srcs[c]
            },
            BuildVideoInfo.processError = function (a) {
                debug.log("playlist errorcode = " + a.error.code);
                var b = a.stream;
                if (a.error.code == -301 || a.error.code == -303) {
                    for (var c = 0; c < b.length; c++) {
                        b[c].audio_lang = "default",
                            b[c].drm_type = "",
                            b[c].logo = "",
                            b[c].milliseconds_audio = 0,
                            b[c].milliseconds_video = 0,
                            b[c].kye = "",
                            b[c].size = 0,
                            b[c].stream_fileid = "0*0",
                            b[c].subtitle_lang = "";
                        for (var d = 0; d < b[c].segs.length; d++) b[c].segs[d].kye = "",
                            b[c].segs[d].size = 0,
                            b[c].segs[d].total_milliseconds_audio = 0,
                            b[c].segs[d].total_milliseconds_video = 0
                    }
                    return !1
                }
                return null == this._callback ? "m3u8" == this._type ? YKP.GetM3U8OK(this._v, {}) : YKP.GetMP4OK(this._v, {}) : this._callback(this._v, {}),
                    !0
            },
            BuildVideoInfo.init = function (a) {
                this._v = a;
                var b = a.data,
                    c = b.stream;
                if (!b.security || !b.security.encrypt_string || !b.security.ip) {
                    YKP.sendErrorReport(2004);
                    var d = b.error && b.error.note ? b.error.note : "数据解析错误";
                    return YKP.showError(null, d),
                        void YKP.sendLog("get_json", 203, 10)
                }
                if (!c && !b.error) return YKP.showError(null, "该视频暂不能播放"),
                    void YKP.sendLog("get_json", 203, 10);
                this.encodeid = b.video.encodeid;
                var e = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26],
                    f = rc4(translate(YK.mk.a3 + "o0b" + YKP.userCache.a1, e).toString(), decode64(b.security.encrypt_string)),
                    g = f.split("_");
                if (g.length < 2) return YKP.sendErrorReport(2004),
                    YKP.showError(null, "数据解析错误"),
                    void YKP.sendLog("get_json", 203, 10);
                if (YKP.userCache.sid = f.split("_")[0], YKP.userCache.token = f.split("_")[1], null != b.error && b.error.code !== -309) {
                    if (b.error.code == -202 || b.error.code == -203) YKP.sendErrorReport(4e3);
                    else {
                        if (b.error.code == -402) return YKP.sendErrorReport(2007),
                            void YKP.showError(YK.config.parentBox, "用户没有权限观看");
                        YKP.sendErrorReport(1e3)
                    }
                    if (this.processError(b)) return
                }
                this._videoInfo = new PlayListData(b, c, this._type);
                var h = this._videoInfo._videoSegsDic,
                    i = "";
                YK.defaultLanguage == h.lang ? i = YK.defaultLanguage : (i = h.lang, YK.defaultLanguage = h.lang);
                var j = BuildVideoInfo.total(h.streams, i, h.typeArr[i][0]);
                if (this._videoInfo.totalTime = j ? j.totalTime : b.video.seconds, "m3u8" == this._type) {
                    var k = this._videoInfo._videoSegsDic.typeArr[YK.defaultLanguage];
                    selectQuality(a, k),
                        this._videoInfo.src = BuildVideoInfo.m3u8src(YK.defaultVideoType),
                        this.cache(),
                        null == this._callback ? YKP.GetM3U8OK(this._v, this._videoInfo) : this._callback(this._v, this._videoInfo)
                } else if ("mp4" == this._type) {
                    var l = ["mp4", "3gphd", "flv"];
                    g_playType = null;
                    for (var m = 0; m < l.length; m++) if (h.streams[i][l[m]]) {
                        g_playType = l[m];
                        break
                    }
                    if (a.data.video.type && a.data.video.type.indexOf("panorama") != -1) {
                        var n = h.streams[i];
                        g_playType = n.hasOwnProperty("mp4") ? "mp4" : g_playType
                    }
                    if (debug.log("mp4 type=" + g_playType), !g_playType) return void this.error(2);
                    "flv" == g_playType && (YK.config.playType = "directsrc", YKP.isAndroid && YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4010834&cpp=1000962&url=")),
                        YK.defaultVideoType = g_playType;
                    var o = h.streams[i][g_playType];
                    this.fetchDirectSrc(o, h.streams[i]),
                        this._tid = setInterval("checkSrc()", 500)
                }
            },
            BuildVideoInfo.getFileUrl = function (a) {
                var b = new Array;
                if (a) for (var c = 0; c < a.length; c++) {
                    var d = a[c].src;
                    b.push(d)
                }
                return b
            },
            BuildVideoInfo.fetchDirectSrc = function (a, b) {
                if (urls = this.getFileUrl(a), this._fyks = urls, this._v && this._v.data.trial) {
                    var c = 0,
                        d = b,
                        e = d[YK.defaultVideoType];
                    for (c = 0; c < e.length && e[c].k !== -1; c++);
                    urls.length = c
                }
                for (var c = 0; c < urls.length; c++) {
                    urls[c] + "&callback=DirectSrcOK";
                    BuildVideoInfo.mp4srcs.push(urls[c])
                }
            },
            DirectSrcOK = function (a) {
                if (null != a && "object" == typeof a && 0 != a.length) {
                    a[0].server;
                    BuildVideoInfo.mp4srcs.push(a[0].server)
                }
            };
        var PlayListData = function (a, b, c) {
                var d = this;
                new Date;
                this._sid = YKP.userCache.sid,
                    this._fileType = c,
                    this._videoSegsDic = {};
                var e = (new RandomProxy, []),
                    f = null,
                    g = [];
                if (g.streams = {}, g.logos = {}, g.typeArr = {}, g.totalTime = {}, a.dvd && a.dvd.audiolang) {
                    var h = 0,
                        i = a.dvd.audiolang.length;
                    for (f = {}; h < i; h++) {
                        var j = a.dvd.audiolang[h];
                        j.langcode || (j.langcode = "default"),
                            e.push(j.langcode),
                            f[j.langcode] = {},
                            f[j.langcode].lang = j.lang,
                            f[j.langcode].vid = j.vid
                    }
                } else e.push(b[0].audio_lang);
                for (var h = 0; h < e.length; h++) {
                    for (var k = e[h], l = {}, m = {}, n = [], o = 0; o < b.length; o++) {
                        var p = b[o];
                        if (p.audio_lang || (p.audio_lang = "default"), k == p.audio_lang) {
                            if (!d.isValidType(p.stream_type)) continue;
                            var q = d.convertType(p.stream_type),
                                r = 0;
                            "none" != p.logo && (r = 1),
                                m[q] = r;
                            var s = !1;
                            for (var t in n) q == n[t] && (s = !0);
                            s || n.push(q);
                            var u = p.segs;
                            if (null == u) continue;
                            var v = [];
                            s && (v = l[q]);
                            for (var w = 0, x = 0; x < u.length; x++) {
                                var y = u[x];
                                if (null == y) break;
                                var z = {};
                                z.no = x,
                                    z.size = y.size,
                                    z.seconds = Number(y.total_milliseconds_video) / 1e3,
                                    z.milliseconds_video = Number(p.milliseconds_video) / 1e3,
                                    w += z.seconds,
                                    z.totalSeconds = w,
                                    z.key = y.key,
                                    z.fileId = y.fileid,
                                    z.src = this.getVideoSrc(o, x, a, p.stream_type, z.fileId),
                                    z.type = q,
                                    v.push(z)
                            }
                            l[q] = v
                        }
                    }
                    var A = k;
                    g.logos[A] = m,
                        g.streams[A] = l,
                        g.typeArr[A] = n
                }
                this._videoSegsDic = g,
                    this._videoSegsDic.lang = e[0]
            },
            RandomProxy = function (a) {
                this._randomSeed = a,
                    this.cg_hun()
            };
        RandomProxy.prototype = {
            cg_hun: function () {
                this._cgStr = "";
                for (var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890", b = a.length, c = 0; c < b; c++) {
                    var d = parseInt(this.ran() * a.length);
                    this._cgStr += a.charAt(d),
                        a = a.split(a.charAt(d)).join("")
                }
            },
            cg_fun: function (a) {
                for (var b = a.split("*"), c = "", d = 0; d < b.length - 1; d++) c += this._cgStr.charAt(b[d]);
                return c
            },
            ran: function () {
                return this._randomSeed = (211 * this._randomSeed + 30031) % 65536,
                this._randomSeed / 65536
            }
        },
            PlayListData.prototype = {
                getFileId: function (a, b) {
                    if (null == a || "" == a) return "";
                    var c = "",
                        d = a.slice(0, 8),
                        e = b.toString(16);
                    1 == e.length && (e = "0" + e),
                        e = e.toUpperCase();
                    var f = a.slice(10, a.length);
                    return c = d + e + f
                },
                isValidType: function (a) {
                    return "3gphd" == a || "flv" == a || "flvhd" == a || "mp4hd" == a || "mp4hd2" == a || "mp4hd3" == a
                },
                convertType: function (a) {
                    var b = a;
                    switch (a) {
                        case "m3u8":
                            b = "mp4";
                            break;
                        case "3gphd":
                            b = "3gphd";
                            break;
                        case "flv":
                            b = "flv";
                            break;
                        case "flvhd":
                            b = "flv";
                            break;
                        case "mp4hd":
                            b = "mp4";
                            break;
                        case "mp4hd2":
                            b = "hd2";
                            break;
                        case "mp4hd3":
                            b = "hd3"
                    }
                    return b
                },
                langCodeToCN: function (a) {
                    var b = "";
                    switch (a) {
                        case "default":
                            b = {
                                key: "guoyu",
                                value: "国语"
                            };
                            break;
                        case "guoyu":
                            b = {
                                key: "guoyu",
                                value: "国语"
                            };
                            break;
                        case "yue":
                            b = {
                                key: "yue",
                                value: "粤语"
                            };
                            break;
                        case "chuan":
                            b = {
                                key: "chuan",
                                value: "川话"
                            };
                            break;
                        case "tai":
                            b = {
                                key: "tai",
                                value: "台湾"
                            };
                            break;
                        case "min":
                            b = {
                                key: "min",
                                value: "闽南"
                            };
                            break;
                        case "en":
                            b = {
                                key: "en",
                                value: "英语"
                            };
                            break;
                        case "ja":
                            b = {
                                key: "ja",
                                value: "日语"
                            };
                            break;
                        case "kr":
                            b = {
                                key: "kr",
                                value: "韩语"
                            };
                            break;
                        case "in":
                            b = {
                                key: "in",
                                value: "印度"
                            };
                            break;
                        case "ru":
                            b = {
                                key: "ru",
                                value: "俄语"
                            };
                            break;
                        case "fr":
                            b = {
                                key: "fr",
                                value: "法语"
                            };
                            break;
                        case "de":
                            b = {
                                key: "de",
                                value: "德语"
                            };
                            break;
                        case "it":
                            b = {
                                key: "it",
                                value: "意语"
                            };
                            break;
                        case "es":
                            b = {
                                key: "es",
                                value: "西语"
                            };
                            break;
                        case "po":
                            b = {
                                key: "po",
                                value: "葡语"
                            };
                            break;
                        case "th":
                            b = {
                                key: "th",
                                value: "泰语"
                            }
                    }
                    return b
                },
                getVideoSrc: function (a, b, c, d, e, f, g) {
                    var h = c.stream[a],
                        i = c.video.encodeid;
                    if (!i || !d) return "";
                    var j = {
                            flv: 0,
                            flvhd: 0,
                            mp4hd: 1,
                            mp4hd2: 2,
                            mp4hd3: 3,
                            "3gphd": 0,
                            "3gp": 0
                        },
                        k = j[d],
                        l = {
                            flv: "flv",
                            mp4hd: "mp4",
                            mp4hd2: "flv",
                            mp4hd3: "flv",
                            "3gphd": "mp4",
                            "3gp": "flv",
                            flvhd: "flv"
                        },
                        m = l[d],
                        n = b.toString(16);
                    1 == n.length && (n = "0" + n);
                    var o = h.segs[b].total_milliseconds_video / 1e3,
                        p = h.segs[b].key;
                    "" != p && p != -1 || (p = h.key2 + h.key1);
                    var q = "";
                    c.show && (q = c.show.pay ? "&ypremium=1" : "&ymovie=1");
                    var r = "/player/getFlvPath/sid/" + YKP.userCache.sid + "_" + n + "/st/" + m + "/fileid/" + e + "?K=" + p + "&hd=" + k + "&myp=0&ts=" + o + "&ypp=0" + q,
                        s = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26],
                        t = encodeURIComponent(encode64(rc4(translate(YK.mk.a4 + "poz" + YKP.userCache.a2, s).toString(), YKP.userCache.sid + "_" + e + "_" + YKP.userCache.token)));
                    return r += "&ep=" + t,
                        r += "&ctype=12",
                        r += "&ev=1",
                        r += "&token=" + YKP.userCache.token,
                        r += "&oip=" + YK.v.data.security.ip,
                        r += (f ? "/password/" + f : "") + (g ? g : ""),
                        r = "//k.youku.com" + r
                }
            };
        var YKH5Player = function (a) {
            this._player = document.getElementById("youku-html5player-video"),
            null == this._player && (this._player = document.getElementById("youku-html5player-video-0")),
                this._oplayer = a
        };
        YKH5Player.prototype = {
            resize: function (a, b) {
                this._oplayer.resize(a, b)
            },
            currentTime: function () {
                return this._player.currentTime
            },
            totalTime: function () {
                return this._player.duration
            },
            playVideo: function () {
                this._oplayer.play()
            },
            startPlayVideo: function () {
                YKP.isNeedFrontAd ? this._oplayer.controls.onVideoBtnTouchEnd() : this._oplayer.controls.onVideoBtnClick()
            },
            pauseVideo: function () {
                this._player.pause()
            },
            seekTo: function (a) {
                try {
                    this._player.currentTime = a
                } catch (b) {
                }
            },
            playVideoById: function (a, b) {
                debug.log("YKH5Player playVideoByid");
                var c = this._oplayer;
                YK.config.autoplay = !0,
                    YK.config.vid = a,
                    BuildVideoInfo.start(a, b, YK.config.content, function (a, b) {
                        c.startPlay(a, b)
                    })
            },
            hideControls: function () {
                this._player.removeAttribute("controls")
            },
            showControls: function () {
                this._player.setAttribute("controls", !0)
            },
            switchFullScreen: function () {
                var a = this._oplayer.controls.fullscreenPanel;
                a.switchFullScreen({})
            }
        },
            YKP.Log = function (a, b) {
                var c = "youku-uniplayer-stat",
                    d = document.createElement("img");
                b && d.addEventListener("error", b, !1),
                    d.src = a + "&r_=" + Math.floor(1e4 * Math.random()),
                    d.id = c
            },
            YKP.sendLog = function (a, b, c) {
                var d = "//v.l.youku.com/h_player_service?",
                    e = {};
                e.v = YK.initConfig.vid,
                    e.u = window.location.href,
                    e.p = "hvpfp",
                    e.n = a,
                    e.c = b,
                    e.t = c,
                    YKP.Log(d + urlParameter(e))
            },
            YKP.isNeedAdrTrick = function () {
                return YKP.isAndroid && !YKP.adrPlayTrick && !YKP.isHTC && YKP.isNeedFrontAd && !YKP.isVIVO
            },
            YKP.adrInvalidPauseCheck = function (a) {
                var b = a.currentTime,
                    c = 0,
                    d = !1;
                YKP.adrPlayTrick = !0,
                    a.play(),
                    setInterval(function () {
                        a.currentTime != b || d ? d = !0 : (c++, a.play(), c % 10 == 0 && (a.load(), a.play()))
                    }, 1e3)
            },
            YKP.sendErrorReport = function (a) {
                var b = "//v.l.youku.com/perror?",
                    c = {},
                    d = "";
                d = YKP.isIPAD ? "xplayer_ipad" : YKP.isIPHONE ? "xplayer_iphone" : "xplayer_android",
                    c.m = d,
                    c.ec = a;
                var e = "";
                1e3 == a && (e = YK.v.data.error.code),
                    c.gc = e,
                    c.u = encodeURIComponent(window.location.href),
                    c.v = YK.videoInfo ? YK.videoInfo._sid : "",
                    c.ct = YK.v && YK.v.data && YK.v.data.video ? YK.v.data.video.category_id : "",
                    c.hd = YKP.hd ? YKP.hd : 0,
                YK.v && YK.v.data.network && (c.a = YK.v ? YK.v.data.network.area_code + "|" + YK.v.data.network.dma_code : "");
                var f = "";
                if (YK.initConfig.vvlogconfig && YK.initConfig.vvlogconfig.pvid && (f = YK.initConfig.vvlogconfig.pvid), c.pid = f, 2001 === a) {
                    var g = {};
                    g.segnum = g_cur_num,
                    YK.videoInfo._playListData && YK.videoInfo._playListData.security && (g.encrypt_string = YK.videoInfo._playListData.security.encrypt_string, g.ip = YK.videoInfo._playListData.security.ip),
                        g.ykss = this.getCookie("ykss"),
                        g.token = YKP.userCache.token,
                        g.sid = YKP.userCache.sid,
                        g.src = document.getElementsByTagName("video")[0].src.replace("//k.youku.com/player/getFlvPath/", ""),
                        c.ext = JSON.stringify(g)
                }
                YKP.Log(b + urlParameter(c))
            },
            YKP.Load = function (a, b) {
                var c = null;
                "js" == b ? (c = document.createElement("script"), c.setAttribute("type", "text/javascript"), c.setAttribute("src", a)) : "css" == b && (c = document.createElement("link"), c.setAttribute("rel", "stylesheet"), c.setAttribute("type", "text/css"), c.setAttribute("href", a)),
                "undefined" != typeof c && document.getElementsByTagName("head")[0].appendChild(c)
            },
            YKP.showError = function (a, b, c) {
                this.Log("//hz.youku.com/red/click.php?tp=1&cp=4010739&cpp=1000962&url=");
                var d = YK.get("#x-player");
                b = b ? b : "该视频格式特殊，请在App上观看",
                    d.innerHTML = b + '<div id="js-x-app-error-noti" style="margin-left:0.5rem;background:#3bb4fc;text-align:center;font-size:1rem;color:#fff;border-radius:1rem;-webkit-border-radius:1rem;width:7rem;height:2rem;line-height:2rem;display:inline-block;">用APP观看</div>',
                    d.style.textAlign = "center",
                    d.style.color = "white",
                    d.style.lineHeight = d.offsetHeight + "px",
                    YK.get("#js-x-app-error-noti").onclick = function () {
                        window.recallAppLog && recallAppLog("mplaypage12"),
                            YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4010738&cpp=1000962&url=&_time=" + (new Date).getTime()),
                            YKP.openApp("mplaypage12"),
                            this.innerHTML = "下载优酷App",
                            this.onclick = function () {
                                window.recallAppLog && recallAppLog("setup4"),
                                    YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4010740&cpp=1000962&url=&_time=" + (new Date).getTime()),
                                    YKP.downApp()
                            }
                    },
                YK.playerEvents && YK.playerEvents.onPlayError && YK.playerEvents.onPlayError(b ? b : "该视频格式特殊，请在App上观看")
            },
            YKP.canOpenApp = {
                android: "MQQBrowser|micromessenger|weibo|AliApp|article",
                ios: "micromessenger|weibo|AliApp|article",
                noIntent: "MQQBrowser|ucbrowser|baidubrowser|sogouMobilebrowser|mxbrowser|LieBao|360 APhone"
            },
            YKP.openApp = function (a) {
                var b = a ? a : "mplaypage12",
                    c = /iPhone|iPod/.test(navigator.userAgent) && /OS 9|OS 1\d{1,}/i.test(navigator.userAgent),
                    d = /iPhone|iPod/.test(navigator.userAgent),
                    e = YK.initConfig.vid,
                    f = this.getCookie("__ysuid"),
                    g = "youku://play?vid=" + e + "&source=" + b + "&action=play&webSocketEnabled=false&ua=other&cookieid=" + f + "&ccts=" + (new Date).getTime(),
                    h = "//statis.api.3g.youku.com/openapi-wireless/statis/recall_app_service?",
                    i = {
                        pagetype: 1,
                        datetime: parseInt((new Date).getTime() / 1e3),
                        sender: 1,
                        pid: d ? "69b81504767483cf" : "0d7c3ff41d42fcd9",
                        source: b,
                        action: "play",
                        webSocketEnabled: !1,
                        ua: "other",
                        cookieid: f,
                        ccts: (new Date).getTime()
                    };
                h += urlParameter(i),
                    (new Image).src = h;
                new RegExp(this.canOpenApp.noIntent, "i");
                if (c) window.location.href = g;
                else {
                    var j = document.createElement("iframe");
                    j.height = 0,
                        j.width = 0,
                        j.src = g,
                        document.body.appendChild(j),
                        setTimeout(function () {
                            document.body.removeChild(j)
                        }, 1e3)
                }
            },
            YKP.downApp = function (a) {
                this.isIOS ? window.open("//m.youku.com/webapp/dl?app=youku&source=webqr", "target=_blank") : window.open("//dl.m.cc.youku.com/android/phone/Youku_Android_yidongbanner.apk", "target=_blank")
            },
            YKP.getCookie = function (a, b) {
                for (var c = document.cookie.split(";"), d = c.length, e = 0; e < d; e++) {
                    var f = c[e].split("=");
                    if (f[0] = f[0].split(" ").join(""), f.length > 1 && f[0] === a) return f[1]
                }
            },
            YKP.opCookie = function (a, b, c) {
                if ("undefined" == typeof b) {
                    var d = null;
                    if (document.cookie && "" != document.cookie) for (var e = document.cookie.split(";"), f = 0; f < e.length; f++) {
                        var g = e[f].trim();
                        if (g.substring(0, a.length + 1) == a + "=") {
                            try {
                                d = decodeURIComponent(g.substring(a.length + 1))
                            } catch (h) {
                                d = ""
                            }
                            break
                        }
                    }
                    return d
                }
                c = c || {},
                null === b && (b = "", c.expires = -1);
                var i = "";
                if (c.expires && ("number" == typeof c.expires || c.expires.toUTCString)) {
                    var j;
                    "number" == typeof c.expires ? (j = new Date, j.setTime(j.getTime() + 24 * c.expires * 60 * 60 * 1e3)) : j = c.expires,
                        i = "; ex2pires=" + j.toUTCString()
                }
                var k = c.path ? "; path=" + c.path : "",
                    l = c.domain ? "; domain=" + c.domain : "",
                    m = c.secure ? "; secure" : "";
                document.cookie = [a, "=", encodeURIComponent(b), i, k, l, m].join("")
            },
            YKP.tGetPvid = function (a, b) {
                var c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                    d = 0,
                    e = "",
                    f = new Date;
                for (d = 0; d < a; d++) {
                    var g = parseInt(Math.random() * Math.pow(10, 6)) % c.length;
                    e += c[g]
                }
                return b && 1 == b ? e : f.getTime() + e
            },


            function () {
                var a = document.createElement("video"),
                    b = {
                        MP4: "video/mp4",
                        OGG: "video/ogg",
                        WEBM: "video/webm"
                    },
                    c = {
                        isWin: "Win",
                        isMac: "Mac",
                        isSafari: "Safari",
                        isChrome: "Chrome",
                        isIPAD: "iPad",
                        isIPAD7: "iPad; CPU OS 7",
                        isIPHONE: "iPhone",
                        isIPOD: "iPod",
                        isLEPAD: "lepad_hls",
                        isMIUI: "MI-ONE",
                        isAndroid: "Android",
                        isAndroid4: "Android 4.",
                        isAndroid41: "Android 4.1",
                        isSonyDTV: "SonyDTV",
                        isBlackBerry: "BlackBerry",
                        isMQQBrowser: "MQQBrowser",
                        isMobile: "Mobile",
                        isSamSung: "SAMSUNG",
                        isHTC: "HTC",
                        isLumia: "Lumia",
                        isVIVO: "vivo",
                        isUC: "UCBrowser",
                        ismaoyanApp: "movie/",
                        isAlipayClient: "AlipayClient"
                    };
                if (YKP.supportHTML5Video = !1, YKP.isIOS = !1, YKP.os = "", a.canPlayType) {
                    YKP.supportHTML5Video = !0;
                    for (var d in b) a.canPlayType(b[d]) ? YKP["canPlay" + d] = !0 : YKP["canPlay" + d] = !1
                }
                for (var e in c) if (navigator.userAgent.indexOf(c[e]) !== -1 ? (YKP[e] = !0, YKP.os += c[e] + " ") : YKP[e] = !1, navigator.userAgent.indexOf("Android") !== -1) {
                    var f = navigator.userAgent.indexOf("Android"),
                        g = navigator.userAgent.substr(f, 10);
                    g > c.isAndroid4 && (YKP.isAndroid4 = !0, YKP.os += g + " ")
                }
                YKP.isMobileIOS = YKP.isIPAD || YKP.isIPHONE || YKP.isIPOD,
                    YKP.isIOS = YKP.isMobileIOS || YKP.isMac,
                    YKP.isSupportH5M3U8 = YKP.isMobileIOS || YKP.isMac && YKP.isSafari && !YKP.isChrome || YKP.isLEPAD || YKP.isSonyDTV || YKP.isUC && YKP.isAndroid && !YKP.isAlipayClient,
                    YKP.isSupportH5MP4 = YKP.isChrome || YKP.isIE10 || YKP.isAndroid41 || YKP.isAndroid4 || YKP.isLumia || YKP.isMIUI || YKP.isUC && YKP.isAlipayClient && YKP.isAndroid && YKP.canPlayMP4;
                var h = flashChecker();
                YKP.isSupportFlash = h.f && !h.e,
                YKP.isMQQBrowser && (YKP.isSupportFlash = !1),
                YKP.isLumia && (YKP.isSupportFlash = !1);
                var i = window.navigator.userAgent;
                if (i.indexOf("SogouMSE,SogouMobileBrowser") > -1) {
                    var j = i.length,
                        k = i.substr(j - 5, j - 1).split(".").join("");
                    k = parseInt(k),
                        k >= 428 ? YKP.isSogou = !0 : YKP.isSogou = !1
                } else YKP.isSogou = !1;
                YKP.isPhone = YKP.isIPHONE || YKP.isIPOD || YKP.isAndroid && YKP.isMobile,
                    YKP.isAndroidPad = YKP.isAndroid && !YKP.isMobile,
                    YKP.isPad = YKP.isIPAD || YKP.isAndroidPad,
                    YKP.isMobile = YKP.isIPAD || YKP.isIPHONE || YKP.isIPOD || YKP.isLEPAD || YKP.isMIUI || YKP.isAndroid4 || YKP.isSonyDTV || YKP.isLumia;
                var l = YKP.opCookie("__ysuid") || "";
                "" != l && 16 != l.length || (l = YKP.tGetPvid(6), YKP.opCookie("__ysuid", l, {
                    expires: 1,
                    domain: "youku.com",
                    path: "/"
                }))
            }();
        var YoukuPlayerSelect = function (params) {
            return debug.log("canplay mp4 = " + YKP.canPlayMP4),
                YK.initConfig = params,
                this._vid = params.vid,
                this._target = params.target,
                this._partnerId = params.partnerId,
            params.client_id && (this._partnerId = params.client_id),
                params.pkid || this._vid && this._target && this._partnerId ? (this._events = params.events, YK.playerEvents = params.events, YKP._target = this._target, this._paid = 0, null != params.paid && (this._paid = params.paid), this._id = params.id, null == this._id && (this._id = "youku-player"), YKP.playerId = this._id, this._width = params.width, this._height = params.height, this._expand = params.expand, null == params.width || null == params.height ? null == params.expand && (this._expand = 0) : null == params.expand && (this._expand = 1), this._prefer = params.prefer ? params.prefer.toLowerCase() : "flash", this._starttime = params.starttime, this._password = params.password, this._poster = params.poster, this._autoplay = eval(params.autoplay), this._canWide = params.canWide, this._showRelated = params.show_related, this._winType = params.wintype, this._pkid = params.pkid, this._pkpid = params.pkpid, this._pkurl = params.pkurl, this._playlistconfig = params.playlistconfig, this._isMobile = YKP.isMobile, this._isMobileIOS = YKP.isMobileIOS, this._weixin = params.weixin, this._playerType = "", YK.mk = {}, YK.mk.a3 = "b4et", void(YK.mk.a4 = "boa4")) : void alert("[Fail]The params of {vid,target,client_id} are necessary !")
        };
        YoukuPlayerSelect.prototype = {
            isSupportH5MP4: function () {
                return YKP.isSupportH5MP4
            },
            isSupportH5M3U8: function () {
                return YKP.isSupportH5M3U8
            },
            isSupportFlash: function () {
                return YKP.isSupportFlash
            },
            playerType: function () {
                return "" != this._playerType ? this._playerType : ("h5" == this._prefer ? this.isSupportH5M3U8() ? this._playerType = "h5m3u8" : this.isSupportH5MP4() ? this._playerType = "h5mp4" : this.isSupportFlash() ? this._playerType = "flash" : this._playerType = "error" : "flash" == this._prefer ? this.isSupportFlash() ? this._playerType = "flash" : this.isSupportH5M3U8() ? this._playerType = "h5m3u8" : this.isSupportH5MP4() ? this._playerType = "h5mp4" : this._playerType = "error" : this._playerType = "error", "h5m3u8" != this._playerType && "h5mp4" != this._playerType || void 0 != this._pkid && (this._playerType = "h5pk"), this._playerType)
            },
            select: function () {
                if (debug.log("playerType = " + this.playerType()), this.isThirdParty()) {
                    var a = this;
                    return void this.processThirdParty(function (b) {
                        a.selectHandler()
                    })
                }
                this.selectHandler()
            },
            selectHandler: function () {
                if ("h5m3u8" == this.playerType() ? this.selectH5M3U8() : "h5mp4" == this.playerType() ? this.selectH5MP4() : "h5pk" == this.playerType() ? this.selectH5PK() : "flash" == this.playerType() ? this.selectFlash() : this.selectH5MP4(), this._events && this._events.onPlayerReady) {
                    var a = this._events.onPlayerReady;
                    if ("h5" == YKP.playerType) var b = setInterval(function () {
                        if ($$$(YKP.playerId)) {
                            YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_READY,
                                debug.log(YKP.playerCurrentState),
                                clearInterval(b);
                            try {
                                LocalStorage.appendItem("phase", "playerready"),
                                    a(YK.v.data)
                            } catch (c) {
                            }
                        }
                    }, 500);
                    else if ("flash" == YKP.playerType) var b = setInterval(function () {
                        if (1 == YKU.swfLoaded) {
                            YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_READY,
                                debug.log(YKP.playerCurrentState),
                                clearInterval(b);
                            try {
                                LocalStorage.appendItem("phase", "playerready"),
                                    a()
                            } catch (c) {
                            }
                        }
                    }, 500)
                }
            },
            selectH5MP4: function () {
                YKP.playerType = "h5";
                var a = {
                    id: this._id,
                    vid: this._vid,
                    partnerId: this._partnerId,
                    parentBox: this._target,
                    events: this._events,
                    width: this._width,
                    height: this._height,
                    poster: this._poster,
                    autoplay: this._autoplay,
                    isMobile: this._isMobile,
                    isMobileIOS: this._isMobileIOS,
                    content: "mp4",
                    wintype: this._winType,
                    expand: this._expand,
                    partner_config: this.partner_config,
                    canWide: this._canWide ? this._canWide : 0
                };
                this._h5player = new YoukuHTML5Player(a);
                var b = this._h5player;
                YKP.GetMP4OK = function (a, c) {
                    LocalStorage.appendItem("phase", "vinfo_mp4"),
                        b.startPlay(a, c),
                    YK.initConfig.events && YK.initConfig.events.onMediaSrcOK && c._videoSegsDic && YK.initConfig.events.onMediaSrcOK(g_playType, c._videoSegsDic.streams[c._videoSegsDic.lang][g_playType][0].src)
                },
                    BuildVideoInfo.playlistconfig = this._playlistconfig,
                    BuildVideoInfo.start(this._vid, this._password, "mp4")
            },
            selectH5M3U8: function () {
                YKP.playerType = "h5";
                var a = {
                    id: this._id,
                    vid: this._vid,
                    partnerId: this._partnerId,
                    parentBox: this._target,
                    events: this._events,
                    width: this._width,
                    height: this._height,
                    poster: this._poster,
                    autoplay: this._autoplay,
                    isMobile: this._isMobile,
                    isMobileIOS: this._isMobileIOS,
                    content: "m3u8",
                    wintype: this._winType,
                    expand: this._expand,
                    partner_config: this.partner_config,
                    canWide: this._canWide ? this._canWide : 0
                };
                YK.isWeixin = !1,
                this._weixin && (YK.isWeixin = !0);
                var b = new YoukuHTML5Player(a);
                this._h5player = b,
                    YKP.GetM3U8OK = function (a, c) {
                        LocalStorage.appendItem("phase", "vinfo_m3u8"),
                            b.startPlay(a, c)
                    },
                    BuildVideoInfo.playlistconfig = this._playlistconfig,
                    BuildVideoInfo.start(this._vid, this._password, "m3u8")
            },
            selectH5PK: function () {
                YKP.playerType = "h5";
                var a = {
                        id: this._pkid,
                        pid: this._pkpid,
                        url: decodeURIComponent(this._pkurl),
                        parentBox: this._target
                    },
                    b = new PkH5Player(a);
                this._h5player = b
            },
            processThirdParty: function (a) {
                var b = new PartnerInfo({
                        client_id: YK.initConfig.client_id,
                        video_id: YK.initConfig.vid,
                        embsig: YK.initConfig.embsig,
                        refer: escape(window.location.href)
                    }),
                    c = this;
                b.addEventListener(PartnerConstant.OPEN_API_OK, function (b) {
                    debug.log("thirdparty res ok"),
                        c.partner_config = b.data,
                        a()
                }),
                    b.addEventListener(PartnerConstant.OPEN_API_ERROR, function (b) {
                        debug.log("thirdparty res error"),
                            a()
                    }),
                    b.addEventListener(PartnerConstant.OPEN_API_TIME_OUT, function (b) {
                        debug.log("thirdparty res timeout"),
                            a()
                    })
            },
            selectH5VTag: function () {
                YKP.playerType = "h5";
                var a = "//v.youku.com/player/getM3U8/vid/" + this._vid + "/type/mp4/ts/" + parseInt((new Date).getTime() / 1e3);
                a += this._password ? "/password/" + this._password : "",
                    a += "/v.m3u8";
                var b = this._poster ? "poster=" + this._poster : "",
                    c = 1 == this._autoplay ? "autoplay=true" : "",
                    d = '<video src="' + a + '" controls width=' + this._width + " height=" + this._height + " id=" + this._id + " autohide=false " + b + " " + c + "></video>";
                $$$(this._target).innerHTML = d
            },
            isThirdParty: function () {
                if (void 0 != this._pkid) return !1;
                var a = YK.initConfig.client_id;
                return null != a && 16 == (a + "").length
            },
            selectFlash: function () {
                YKP.playerType = "flash";
                var a = {
                    imglogo: this._poster || "",
                    paid: this._paid,
                    partnerId: YK.initConfig.client_id
                };
                null != YK.initConfig.firsttime && (a.firsttime = YK.initConfig.firsttime),
                null != this._autoplay && (a.isAutoPlay = this._autoplay),
                null != YK.initConfig.embsig && (a.embsig = YK.initConfig.embsig),
                null != this._showRelated && (a.isShowRelatedVideo = this._showRelated),
                null != YK.initConfig.password && (a.passwordstr = YK.initConfig.password),
                null != YK.initConfig.styleid && (a.styleid = YK.initConfig.styleid),
                null != YK.initConfig.vext && (a.vext = YK.initConfig.vext);
                for (var b in YK.initConfig.adconfig) a[b] = YK.initConfig.adconfig[b];
                for (var b in YK.initConfig.flashconfig) a[b] = YK.initConfig.flashconfig[b];
                var c = "";
                this.isThirdParty() && (c = "/partnerid/" + this._partnerId),
                a.delayload && (c = "");
                var d = "";
                null != this._winType && "" != this._winType && (d = "/winType/" + this._winType),
                null != YK.initConfig.pkid && (a.VideoIDS = YK.initConfig.pkid),
                null != YK.initConfig.pkpid && (a.pkpid = YK.initConfig.pkpid),
                null != YK.initConfig.pkurl && (a.pkurl = YK.initConfig.pkurl);
                var e = "//player.youku.com/player.php/sid/" + this._vid + c + d + "/v.swf";
                YK.initConfig.flashsrc && (e = YK.initConfig.flashsrc),
                null != YK.initConfig.pkid && (e = "youkupaike.swf"),
                    a = urlParameter(a),
                    $$$(this._target).innerHTML = "<object type=application/x-shockwave-flash data= " + e + " width=100% height=100% id=" + this._id + "><param name=allowFullScreen value=true><param name=allowScriptAccess value=always><param name=movie value=" + e + "><param name=flashvars value=" + a + ">" + (YK.initConfig.flashext || "") + "</object>",
                this._expand && ($$$(this._target).style.width = this._width + "px", $$$(this._target).style.height = this._height + "px")
            },
            selectDirectUrl: function (a) {
                a = a || "mp4",
                    debug.log("select directsrc"),
                    YKP.playerType = "directsrc";
                var b = {
                        id: this._id,
                        vid: this._vid,
                        partnerId: this._partnerId,
                        parentBox: this._target,
                        events: this._events,
                        width: this._width,
                        height: this._height,
                        poster: this._poster,
                        autoplay: this._autoplay,
                        isMobile: this._isMobile,
                        isMobileIOS: this._isMobileIOS,
                        content: a,
                        playType: "directsrc",
                        wintype: this._winType,
                        expand: this._expand,
                        canWide: this._canWide ? this._canWide : 0
                    },
                    c = new DirectPlayer(b);
                this._h5player = c,
                    BuildVideoInfo.playlistconfig = this._playlistconfig,
                    BuildVideoInfo.start(this._vid, this._password, a, function (a, b) {
                        c.startPlay(a, b)
                    })
            },
            selectError_: function (a, b) {
                (this._width || this._height) && ($$$(this._target).style.width = this._width + "px", $$$(this._target).style.height = this._height + "px"),
                    YKP.playerType = "error",
                    YKP.showError(this._target, a, b)
            }
        },
            YKU.Player = function (a, b) {
                b.target = a,
                    this.select = new YoukuPlayerSelect(b),
                    this.select.select(),
                    this._player = ""
            },
            YKU.Player.prototype = {
                player: function () {
                    return "" != this._player ? this._player : ("h5" == YKP.playerType ? this._player = new YKH5Player(this.select._h5player) : "flash" == YKP.playerType ? this._player = new YKFlashPlayer : this._player = "error", this._player)
                },
                resize: function (a, b) {
                    this.player().resize(a, b)
                },
                currentTime: function () {
                    return this.player().currentTime()
                },
                totalTime: function () {
                    return this.player().totalTime()
                },
                playVideo: function () {
                    this.player().playVideo()
                },
                startPlayVideo: function () {
                    this.player().startPlayVideo()
                },
                pauseVideo: function () {
                    this.player().pauseVideo()
                },
                seekTo: function (a) {
                    this.player().seekTo(a)
                },
                hideControls: function () {
                    this.player().hideControls()
                },
                showControls: function () {
                    this.player().showControls()
                },
                playVideoById: function (a) {
                    this.player().playVideoById(a)
                },
                switchFullScreen: function () {
                    try {
                        this.player().switchFullScreen()
                    } catch (a) {
                    }
                }
            },
            $$$ = function (a) {
                return document.getElementById(a)
            };
        var nmlTime = function (a) {
                return a = parseInt(a),
                    Math.min(Math.max(a, 0), YK.videoInfo.totalTime)
            },
            json = function (a) {
                var b = [];
                for (var c in a) b.push(c + ":" + a[c]);
                var d = "{" + b.join(",") + "}";
                return d
            },
            toJSON = function (a) {
                var b = [];
                for (var c in a) b.push('"' + c + '":"' + a[c] + '"');
                return "{" + b.join(",") + "}"
            },
            urlParameter = function (a) {
                var b = [];
                for (var c in a) b.push(c + "=" + a[c]);
                return b.join("&")
            },
            encode64 = function (a) {
                if (!a) return "";
                a = a.toString();
                var b, c, d, e, f, g, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                for (d = a.length, c = 0, b = ""; c < d;) {
                    if (e = 255 & a.charCodeAt(c++), c == d) {
                        b += h.charAt(e >> 2),
                            b += h.charAt((3 & e) << 4),
                            b += "==";
                        break
                    }
                    if (f = a.charCodeAt(c++), c == d) {
                        b += h.charAt(e >> 2),
                            b += h.charAt((3 & e) << 4 | (240 & f) >> 4),
                            b += h.charAt((15 & f) << 2),
                            b += "=";
                        break
                    }
                    g = a.charCodeAt(c++),
                        b += h.charAt(e >> 2),
                        b += h.charAt((3 & e) << 4 | (240 & f) >> 4),
                        b += h.charAt((15 & f) << 2 | (192 & g) >> 6),
                        b += h.charAt(63 & g)
                }
                return b
            },
            QS = function () {
                for (var a = {}, b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
                    var e = c[d].split("=");
                    if ("undefined" == typeof a[e[0]]) a[e[0]] = e[1];
                    else if ("string" == typeof a[e[0]]) {
                        var f = [a[e[0]], e[1]];
                        a[e[0]] = f
                    } else a[e[0]].push(e[1])
                }
                return a
            };
        !
            function () {
                this.FX = function (b, c, d, e, f, g) {
                    this.el = a.get(b),
                        this.attributes = c,
                        this.duration = d || .7,
                        this.transition = e && e in FX.transitions ? e : "easeInOut",
                        this.callback = f ||
                            function () {
                            },
                        this.ctx = g || window,
                        this.units = {},
                        this.frame = {},
                        this.endAttr = {},
                        this.startAttr = {}
                },
                    this.FX.transitions = {
                        linear: function (a, b, c, d) {
                            return c * a / d + b
                        },
                        easeIn: function (a, b, c, d) {
                            return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
                        },
                        easeOut: function (a, b, c, d) {
                            return c * Math.sin(a / d * (Math.PI / 2)) + b
                        },
                        easeInOut: function (a, b, c, d) {
                            return -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
                        }
                    },
                    this.FX.prototype = {
                        start: function () {
                            var a = this;
                            this.getAttributes(),
                                this.duration = 1e3 * this.duration,
                                this.time = (new Date).getTime(),
                                this.animating = !0,
                                this.timer = setInterval(function () {
                                    var b = (new Date).getTime();
                                    b < a.time + a.duration ? (a.elapsed = b - a.time, a.setCurrentFrame()) : (a.frame = a.endAttr, a.complete()),
                                        a.setAttributes()
                                }, 10)
                        },
                        ease: function (a, b) {
                            return FX.transitions[this.transition](this.elapsed, a, b - a, this.duration)
                        },
                        complete: function () {
                            clearInterval(this.timer),
                                this.timer = null,
                                this.animating = !1,
                                this.callback.call(this.ctx)
                        },
                        setCurrentFrame: function () {
                            for (attr in this.startAttr) if (this.startAttr[attr] instanceof Array) {
                                this.frame[attr] = [];
                                for (var a = 0; a < this.startAttr[attr].length; a++) this.frame[attr][a] = this.ease(this.startAttr[attr][a], this.endAttr[attr][a])
                            } else this.frame[attr] = this.ease(this.startAttr[attr], this.endAttr[attr])
                        },
                        getAttributes: function () {
                            for (var b in this.attributes) switch (b) {
                                case "color":
                                case "borderColor":
                                case "border-color":
                                case "backgroundColor":
                                case "background-color":
                                    this.startAttr[b] = c(this.attributes[b].from || a.getStyle(this.el, b)),
                                        this.endAttr[b] = c(this.attributes[b].to);
                                    break;
                                case "scrollTop":
                                case "scrollLeft":
                                    var d = this.el == document.body ? document.documentElement || document.body : this.el;
                                    this.startAttr[b] = this.attributes[b].from || d[b],
                                        this.endAttr[b] = this.attributes[b].to;
                                    break;
                                default:
                                    var e, f = this.attributes[b].to,
                                        g = this.attributes[b].units || "px";
                                    this.attributes[b].from ? e = this.attributes[b].from : (e = parseFloat(a.getStyle(this.el, b)) || 0, "px" != g && document.defaultView && (a.setStyle(this.el, b, (f || 1) + g), e = (f || 1) / parseFloat(a.getStyle(this.el, b)) * e, a.setStyle(this.el, b, e + g))),
                                        this.units[b] = g,
                                        this.endAttr[b] = f,
                                        this.startAttr[b] = e
                            }
                        },
                        setAttributes: function () {
                            for (var b in this.frame) switch (b) {
                                case "opacity":
                                    a.setStyle(this.el, b, this.frame[b]);
                                    break;
                                case "scrollLeft":
                                case "scrollTop":
                                    var c = this.el == document.body ? document.documentElement || document.body : this.el;
                                    c[b] = this.frame[b];
                                    break;
                                case "color":
                                case "borderColor":
                                case "border-color":
                                case "backgroundColor":
                                case "background-color":
                                    var d = "rgb(" + Math.floor(this.frame[b][0]) + "," + Math.floor(this.frame[b][1]) + "," + Math.floor(this.frame[b][2]) + ")";
                                    a.setStyle(this.el, b, d);
                                    break;
                                default:
                                    a.setStyle(this.el, b, this.frame[b] + this.units[b])
                            }
                        }
                    };
                var a = {
                        get: function (a) {
                            return "string" == typeof a ? document.getElementById(a) : a
                        },
                        getStyle: function (a, c) {
                            c = b(c);
                            var d = document.defaultView;
                            if (d && d.getComputedStyle) return d.getComputedStyle(a, "")[c] || null;
                            if ("opacity" == c) {
                                var e = a.filters("alpha").opacity;
                                return isNaN(e) ? 1 : e ? e / 100 : 0
                            }
                            return a.currentStyle[c] || null
                        },
                        setStyle: function (a, c, d) {
                            "opacity" == c ? (a.style.filter = "alpha(opacity=" + 100 * d + ")", a.style.opacity = d) : (c = b(c), a.style[c] = d)
                        }
                    },
                    b = function () {
                        var a = {};
                        return function (b) {
                            if (a[b]) return a[b];
                            var c = b.split("-"),
                                d = c[0];
                            if (c.length > 1) for (var e = 1, f = c.length; e < f; e++) d += c[e].charAt(0).toUpperCase() + c[e].substring(1);
                            return a[b] = d
                        }
                    }(),
                    c = function () {
                        var a = /^#?(\w{2})(\w{2})(\w{2})$/,
                            b = /^#?(\w{1})(\w{1})(\w{1})$/,
                            c = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
                        return function (d) {
                            var e = d.match(a);
                            return e && 4 == e.length ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : (e = d.match(c), e && 4 == e.length ? [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)] : (e = d.match(b), e && 4 == e.length ? [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)] : void 0))
                        }
                    }()
            }(),
            FX.transitions.quadIn = function (a, b, c, d) {
                return c * (a /= d) * a + b
            },
            FX.transitions.quadOut = function (a, b, c, d) {
                return -c * (a /= d) * (a - 2) + b
            },
            FX.transitions.quadInOut = function (a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
            },
            FX.transitions.cubicIn = function (a, b, c, d) {
                return c * (a /= d) * a * a + b
            },
            FX.transitions.cubicOut = function (a, b, c, d) {
                return c * ((a = a / d - 1) * a * a + 1) + b
            },
            FX.transitions.cubicInOut = function (a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
            },
            FX.transitions.quartIn = function (a, b, c, d) {
                return c * (a /= d) * a * a * a + b
            },
            FX.transitions.quartOut = function (a, b, c, d) {
                return -c * ((a = a / d - 1) * a * a * a - 1) + b
            },
            FX.transitions.quartInOut = function (a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b
            },
            FX.transitions.quintIn = function (a, b, c, d) {
                return c * (a /= d) * a * a * a * a + b
            },
            FX.transitions.quintOut = function (a, b, c, d) {
                return c * ((a = a / d - 1) * a * a * a * a + 1) + b
            },
            FX.transitions.quintInOut = function (a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a * a * a + b : c / 2 * ((a -= 2) * a * a * a * a + 2) + b
            },
            FX.transitions.expoIn = function (a, b, c, d) {
                return 0 == a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b - .001 * c
            },
            FX.transitions.expoOut = function (a, b, c, d) {
                return a == d ? b + c : 1.001 * c * (-Math.pow(2, -10 * a / d) + 1) + b
            },
            FX.transitions.expoInOut = function (a, b, c, d) {
                return 0 == a ? b : a == d ? b + c : (a /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (a - 1)) + b - 5e-4 * c : c / 2 * 1.0005 * (-Math.pow(2, -10 * --a) + 2) + b
            },
            FX.transitions.circIn = function (a, b, c, d) {
                return -c * (Math.sqrt(1 - (a /= d) * a) - 1) + b
            },
            FX.transitions.circOut = function (a, b, c, d) {
                return c * Math.sqrt(1 - (a = a / d - 1) * a) + b
            },
            FX.transitions.circInOut = function (a, b, c, d) {
                return (a /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b : c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
            },
            FX.transitions.backIn = function (a, b, c, d, e) {
                return e = e || 1.70158,
                c * (a /= d) * a * ((e + 1) * a - e) + b
            },
            FX.transitions.backOut = function (a, b, c, d, e) {
                return e = e || 1.70158,
                c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
            },
            FX.transitions.backBoth = function (a, b, c, d, e) {
                return e = e || 1.70158,
                    (a /= d / 2) < 1 ? c / 2 * (a * a * (((e *= 1.525) + 1) * a - e)) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
            },
            FX.transitions.elasticIn = function (a, b, c, d, e, f) {
                if (0 == a) return b;
                if (1 == (a /= d)) return b + c;
                if (f || (f = .3 * d), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return -(e * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - g) * (2 * Math.PI) / f)) + b
            },
            FX.transitions.elasticOut = function (a, b, c, d, e, f) {
                if (0 == a) return b;
                if (1 == (a /= d)) return b + c;
                if (f || (f = .3 * d), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return e * Math.pow(2, -10 * a) * Math.sin((a * d - g) * (2 * Math.PI) / f) + c + b
            },
            FX.transitions.elasticBoth = function (a, b, c, d, e, f) {
                if (0 == a) return b;
                if (2 == (a /= d / 2)) return b + c;
                if (f || (f = d * (.3 * 1.5)), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return a < 1 ? -.5 * (e * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - g) * (2 * Math.PI) / f)) + b : e * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * d - g) * (2 * Math.PI) / f) * .5 + c + b
            },
            FX.transitions.backIn = function (a, b, c, d, e) {
                return "undefined" == typeof e && (e = 1.70158),
                c * (a /= d) * a * ((e + 1) * a - e) + b
            },
            FX.transitions.backOut = function (a, b, c, d, e) {
                return "undefined" == typeof e && (e = 1.70158),
                c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
            },
            FX.transitions.backBoth = function (a, b, c, d, e) {
                return "undefined" == typeof e && (e = 1.70158),
                    (a /= d / 2) < 1 ? c / 2 * (a * a * (((e *= 1.525) + 1) * a - e)) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
            },
            FX.transitions.bounceIn = function (a, b, c, d) {
                return c - FX.transitions.bounceOut(d - a, 0, c, d) + b
            },
            FX.transitions.bounceOut = function (a, b, c, d) {
                return (a /= d) < 1 / 2.75 ? c * (7.5625 * a * a) + b : a < 2 / 2.75 ? c * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + b : a < 2.5 / 2.75 ? c * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + b : c * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + b
            },
            FX.transitions.bounceBoth = function (a, b, c, d) {
                return a < d / 2 ? .5 * FX.transitions.bounceIn(2 * a, 0, c, d) + b : .5 * FX.transitions.bounceOut(2 * a - d, 0, c, d) + .5 * c + b
            };
        var hexcase = 0,
            b64pad = "",
            chrsz = 8,
            FEED_BACK_TIP = {
                "-100": "该视频正在转码中... , 请稍候",
                "-101": "该视频正在审核中... , 请稍候",
                "-102": "该视频已被屏蔽",
                "-103": "该视频转码失败",
                "-201": "该视频被设为私密",
                "-202": "该视频已经加密",
                "-203": "对不起，您输入的密码错误，请重新输入",
                "-204": "粉丝观看视频",
                "-301": "",
                "-302": "付费视频超过观看上限次数",
                "-303": "付费视频下线",
                "-306": "账号分享不合法, IP上限",
                "-307": "付费视频, 未登录",
                "-401": "集团播控系统限制",
                "-402": "用户没有权限观看(防盗链nonce)",
                "-501": "服务器发生错误",
                "-601": "参数错误"
            },
            FeedBackPanel = function (a, b) {
                this.player = a,
                    this._handle = {},
                    this._feedback = YK.get(".x-feedback"),
                    this._message = this._feedback.getElementsByClassName("x-message")[0],
                    this._messagetxt = this._message.getElementsByClassName("x-message-txt")[0],
                    this._messagebtn = this._message.getElementsByClassName("x-message-btn")[0],
                    this._error = null,
                    this._errorcode = null,
                    this.init(b),
                    this.bindEvent()
            };
        FeedBackPanel.prototype = {
            init: function (a) {
                if (a && a.data && a.data && a.data.error) {
                    switch (YK.hide(YK.get(".x-video-button")), YK.hide(YK.get(".x-console")), this._vid = a.data.id, this._title = a.data.video ? a.data.video.title : "", this._userid = a.data.video ? a.data.video.userid : "", this._error = a.data.error, this._errorcode = parseInt(a.data.error.code), this._errorcode) {
                        case -100:
                            this.setMessage(FEED_BACK_TIP[-100]);
                            break;
                        case -101:
                            this.setMessage(FEED_BACK_TIP[-101]);
                            break;
                        case -102:
                            this.setMessage(FEED_BACK_TIP[-102]),
                                this.setButton("搜索", this.search);
                            break;
                        case -103:
                            this.setMessage(FEED_BACK_TIP[-103]),
                                this.bind_feedback = YK.bindAsEventListener(this, this.feedback),
                                this.setButton("在线反馈", this.bind_feedback);
                            break;
                        case -201:
                            this.setMessage(FEED_BACK_TIP[-201]),
                                this.bind_contact = YK.bindAsEventListener(this, this.contactOwner),
                                this.setButton("联系上传者", this.bind_contact);
                            break;
                        case -202:
                            this._messagetxt.innerHTML = "<input type=password placeholder=输入密码观看视频 class=x-message-input>",
                                this.bind_inputpassword = YK.bindAsEventListener(this, this.inputPassword),
                                this.setButton("确定", this.bind_inputpassword);
                            break;
                        case -203:
                            this._messagetxt.innerHTML = '<input type=password placeholder="对不起,您输入的密码错误,请重新输入" class=x-message-input>',
                                this.bind_inputpassword = YK.bindAsEventListener(this, this.inputPassword),
                                this.setButton("确定", this.bind_inputpassword);
                            break;
                        case -301:
                            break;
                        case -306:
                            this._messagetxt.innerHTML = '<a style="color:#3399e0;text-decoration:underline;position:relative;top:3px;" href="' + a.data.error.link + '" target="_blank">' + a.data.error.note + "</a>";
                            break;
                        default:
                            this.setMessage(a.data.error.note)
                    }
                    this.show(),
                        this.showMessage()
                }
            },
            bindEvent: function () {
            },
            show: function () {
                YK.show(this._feedback)
            },
            hide: function () {
                YK.hide(this._feedback)
            },
            showMessage: function () {
                YK.show(this._message)
            },
            hideMessage: function () {
                YK.hide(this._message)
            },
            setMessage: function (a) {
                this._messagetxt.innerHTML = "<p>" + a + "</p>"
            },
            setButton: function (a, b) {
                this._messagebtn.innerHTML = "<button type=button class=x-btn>" + a + "</button>";
                var c = this._message.getElementsByClassName("x-btn")[0];
                YK.addEventHandler(c, "click", b)
            },
            search: function (a) {
                window.location.href = "//www.soku.com/search_video/q_" + this._title
            },
            feedback: function (a) {
                window.location.href = "//www.youku.com/service/feed/subtype/4/"
            },
            contactOwner: function (a) {
                window.location.href = "//i.youku.com/u/id_" + this._userid
            },
            onPasswordConfirm: function (a) {
            },
            inputPassword: function (a) {
                if (!this.isResponse) {
                    this.isResponse = !1;
                    var b = this;
                    setTimeout(function () {
                        b.isResponse = !0
                    }, 500);
                    var c = this._messagetxt.getElementsByClassName("x-message-input")[0],
                        d = c.value;
                    if (null == d || 0 == d.replace(/\s/g, "").length) return c.value = "",
                        void(c.placeholder = "密码为空，请重新输入");
                    var e = this.player;
                    YK.password = d,
                        YK.getwithPsw = !0,
                        BuildVideoInfo.start(this._vid, d, YK.config.content, function (a, b) {
                            YK.hide(YK.get(".x-feedback")),
                                YK.password = d,
                                YK.show(YK.get(".x-video-button")),
                                YK.hide(YK.get(".x-message")),
                                e.startPlay(a, b)
                        })
                }
            }
        };
        var FullScreenPanel = function (a) {
            this._handler = {},
                this.player = a,
                this._fullflag = null,
                this.init(),
                this._fullscreen = YK.get(".x-fullscreen"),
                this._btn = this._fullscreen.getElementsByTagName("button")[0],
                this._btnb = this._btn.getElementsByTagName("b")[0],
                this.bindEvent()
        };
        FullScreenPanel.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            init: function () {
            },
            bindEvent: function () {
                this.bind_switch = YK.bindAsEventListener(this, this.switchFullScreen),
                    YK.addEventHandler(this._fullscreen, "click", this.bind_switch, !0)
            },
            removeEvent: function () {
                YK.removeEventHandler(this._fullscreen, "click", this.bind_switch, !0)
            },
            zoomStatus: function () {
                return this._btnb.className
            },
            fullFlag: function () {
                if (null !== this._fullflag) return this._fullflag;
                var a = this.player.video.fullscreenchange;
                return "undefined" != typeof a ? this._fullflag = a : this._fullflag = !1,
                    this._fullflag
            },
            sogouSwitch: function (a) {
                a ? (this.sogouFullFlag = !1, window.location.href = "sogoumse://exit_fullscreen") : (this.sogouFullFlag = !0, window.location.href = "sogoumse://enter_fullscreen")
            },
            switchFullScreen: function (a) {
                var b = a.method || "c",
                    c = this._btnb.className;
                if (YKP.isSogou && YKP.isAndroid) {
                    var d = window.orientation;
                    if (a.type) this.sogouSwitch(this.sogouFullFlag);
                    else {
                        if (this.sogouFullFlag && (90 === d || d === -90) || !this.sogouFullFlag && (0 === d || 180 === d)) return;
                        this.sogouSwitch(this.sogouFullFlag)
                    }
                }
                if (YK.config.events && YK.config.events.onSwitchFullScreen) {
                    c.indexOf("in") === -1 ? (this._fullflag = !1, this._btnb.className = c.replace(/out/g, "in"), this.player.controls.hideShowListBtn(), this.player._reporter.sendUserActionReport("xexfs", b), this.player.adjustVideoRatio(1), this.dispatch({
                        type: "exitfullscreen"
                    })) : (this._fullflag = !0, this._btnb.className = c.replace(/in/g, "out"), this.player.controls.showShowListBtn(), this.player._reporter.sendUserActionReport("xenfs", b), this.player.adjustVideoRatio(), this.dispatch({
                        type: "enterfullscreen"
                    }));
                    var e = YK.config.events.onSwitchFullScreen;
                    return void e(a, c)
                }
                var f = document.getElementById("x-player");
                if (c.indexOf("in") === -1) {
                    if (this.player._reporter.sendUserActionReport("xexfs", b), document.webkitCancelFullScreen) return this._btnb.className = c.replace(/out/g, "in"),
                        this._fullflag = !1,
                        void document.webkitCancelFullScreen()
                } else {
                    if (this.player._reporter.sendUserActionReport("xenfs", b), f.webkitRequestFullScreen) return this._btnb.className = c.replace(/in/g, "out"),
                        this._fullflag = !0,
                        void f.webkitRequestFullScreen();
                    this.player.video.webkitSupportsFullscreen && this.player.video.readyState >= 1 && this.player.video.webkitEnterFullscreen()
                }
            }
        };
        var InformationPanel = function (a, b) {
            this.handler = {},
                this.player = a,
                this.information = YK.get(".x-video-info"),
                this.title = this.information.getElementsByClassName("x-title")[0],
                this.videoState = this.information.getElementsByClassName("x-video-state")[0],
                YK.hide(this.videoState),
                this.init(b)
        };
        InformationPanel.prototype = {
            init: function (a) {
                if (!a.data.trial && !a.data.error) {
                    a.data.show && a.data.show.title ? this.title.innerHTML = a.data.show.title.substr(0, 20) : this.title.innerHTML = a.data.video.title.substr(0, 20);
                    var b = YK.getTime(parseInt(a.data.video.seconds));
                    this.videoState.innerHTML = "<span>时长: " + b + "</span>",
                        this.show()
                }
            },
            show: function (a) {
                YK.v.data.trial || YK.show(this.information)
            },
            hide: function (a) {
                YK.hide(this.information)
            },
            bindEvent: function () {
            }
        };
        var InteractionPanel = function (a, b) {
            this.player = a,
                this._tip = YK.get(".x-prompt"),
                this.init()
        };
        InteractionPanel.prototype = {
            init: function () {
                this._tip.innerHTML = '<div class=x-prompt-mode><div class=x-prompt-time></div><div class=x-prompt-forward>快进</div><div class=x-prompt-back>快退</div><div class=x-mask></div></div><div class=x-prompt-status style="display:none"><div class=x-prompt-txt></div><div class=x-mask></div></div>',
                    this._mode = this._tip.getElementsByClassName("x-prompt-mode")[0],
                    this._time = this._tip.getElementsByClassName("x-prompt-time")[0],
                    this._back = this._tip.getElementsByClassName("x-prompt-back")[0],
                    this._forward = this._tip.getElementsByClassName("x-prompt-forward")[0],
                    this._status = this._tip.getElementsByClassName("x-prompt-status")[0],
                    this._statusTxt = this._tip.getElementsByClassName("x-prompt-txt")[0]
            },
            setProgress_: function (a) {
                1 != this._progressFlag && (this._time.innerHTML = YK.getTime(parseInt(a)))
            },
            setStatus: function (a) {
                this._statusTxt.innerHTML = a,
                    this.showStatus()
            },
            hideStatus: function () {
                YK.hide(this._status),
                    YK.hide(this._tip)
            },
            showStatus: function () {
                YK.hide(this._mode),
                    YK.show(this._status),
                    YK.show(this._tip)
            },
            setTip: function (a, b) {
                this._progressFlag = !0,
                    this._time.innerHTML = YK.getTime(nmlTime(a + b)),
                    b <= 0 ? (YK.show(this._back), YK.hide(this._forward)) : (YK.show(this._forward), YK.hide(this._back));
                var c = this;
                setTimeout(function (a) {
                    c._progressFlag = !1
                }, 1e3)
            },
            isVisible: function () {
                return !("none" == this._tip.style.display)
            },
            hide: function () {
                YK.hide(this._tip)
            },
            show: function () {
                YK.show(this._mode),
                    YK.hide(this._status),
                    YK.show(this._tip)
            },
            autoHide: function (a) {
                a = a || 1e3;
                var b = this;
                setTimeout(function (a) {
                    b.hide()
                }, a)
            }
        };
        var LanguagePanel = function (a, b) {
            var c = !0;
            if (this._handler = {}, YK.isWeixin) return void(YK.get(".x-localization").style.display = "none");
            if (!(b && b.data && b.data && b.data.dvd && b.data.dvd.audiolang)) return void(YK.get(".x-localization").style.display = "none");
            if (YK.videoInfo._videoSegsDic) {
                var d = YK.videoInfo._videoSegsDic.streams,
                    e = !1;
                for (key in d) {
                    var f = "";
                    for (k in d[key]) f += k + ",";
                    c = !(f.indexOf("3gphd") > -1 || f.indexOf("mp4") > -1),
                    c && (e = !0)
                }
                if (c && e) return void(YK.get(".x-localization").style.display = "none")
            }
            this.player = a,
                this._language = YK.get(".x-localization"),
                this.init(b),
                this.bindEvent(),
                this._button = this._language.getElementsByTagName("button")[0],
                this._panel = this._language.getElementsByTagName("div")[0],
                this._nodes = this._language.getElementsByTagName("li")
        };
        LanguagePanel.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            init: function (a) {
                a = a.data;
                for (var b = a.dvd.audiolang, c = ["<button class=x-control-btn>", "", "</button>"], d = ["<div class=x-panel><ul>", "", "</ul><div class=x-mask></div>", "</div>"], e = [], f = 0; f < b.length; f++) {
                    var g = "";
                    g += "<li data-vid=" + b[f].vid,
                        g += " data-language=" + b[f].lang,
                        g += " data-language-code=" + b[f].langcode,
                        b[f].vid == a.video.encodeid ? (c[1] = b[f].lang, g += " class=selected>") : g += ">",
                        g += b[f].lang + "</li>",
                        e[f] = g
                }
                d[1] = e.join(""),
                    this._language.innerHTML = c.join("") + d.join("")
            },
            bindEvent: function () {
                var a = this._language.getElementsByTagName("li");
                if (0 != a.length) {
                    this.bind_toggle = YK.bindAsEventListener(this, this.toggleLanguagePanel),
                        YK.addEventHandler(this._language, "click", this.bind_toggle);
                    for (var b = 0; b < a.length; b++) YK.addEventHandler(a[b], "click", YK.bindAsEventListener(this, this.switchLanguage))
                }
            },
            removeEvent: function () {
                null != this._language && YK.removeEventHandler(this._language, "click", this.bind_toggle)
            },
            hide: function (a) {
                if (this._language) {
                    var b = this._panel,
                        c = this._language.className;
                    this._language.className = c.replace(/[\s]*pressed/g, ""),
                        b.style.display = "none",
                    a || this.dispatch({
                        type: "settinghide"
                    })
                }
            },
            toggleLanguagePanel: function (a) {
                var b = this._panel,
                    c = this._language.className;
                c.indexOf("pressed") === -1 ? (this._language.className += " pressed", b.style.display = "block", this.dispatch({
                    type: "settingshow"
                }), this.player._reporter.sendUserActionReport("xcl", "c")) : (this.hide(), this.player._reporter.sendUserActionReport("xhl", "c")),
                    this.dispatch(a)
            },
            switchLanguage: function (a) {
                this.player._reporter.sendUserActionReport("xsl", "c"),
                    a.stopPropagation();
                var b = a.target,
                    c = null,
                    d = null;
                b.getAttribute ? (c = b.getAttribute("data-vid"), d = b.getAttribute("data-language"), langcode = b.getAttribute("data-language-code")) : (c = b.parentNode.getAttribute("data-vid"), d = b.parentNode.getAttribute("data-language"), langcode = b.parentNode.getAttribute("data-language-code")),
                    YK.defaultLanguage = langcode;
                for (var e = this._nodes, f = 0; f < e.length; f++) if (e[f].getAttribute("data-vid") == c) {
                    if (e[f].className.indexOf("selected") !== -1) return void this.toggleLanguagePanel();
                    e[f].innerHTML = e[f].getAttribute("data-language"),
                        e[f].className += " selected",
                        this._button.innerHTML = e[f].getAttribute("data-language")
                } else e[f].innerHTML = e[f].getAttribute("data-language"),
                    e[f].className = e[f].className.replace(/[\s]*selected/g, "");
                this.toggleLanguagePanel(),
                    this.dispatch({
                        type: "settingdone"
                    });
                var g = this.player,
                    h = this.player.currentTime;
                g_playType = YK.config.content,
                    console.log("switchLanguage vid = " + c),
                    YK.config.nextAutoPlay = 1,
                null != YK.videoInfo._videoSegsDic && null != YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType] && ("m3u8" == g_playType ? (g.video.src = YK.m3u8src_v2(c, YK.defaultVideoType), g.vid = c) : g.video.src = YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType][0].src, g._retry = 0, g.video.load(), g.video.play());
                var i = 0;
                g.video.addEventListener("canplay", function () {
                    1 !== i && (i = 1, g.seek(h))
                })
            }
        };
        var LocalStorage = {};
        LocalStorage.setItem = function (a, b) {
            try {
                window.localStorage.setItem(a, b)
            } catch (c) {
            }
        },
            LocalStorage.appendItem = function (a, b) {
                "phase" != a || this.phaseTag || (this.phaseTag = !0, LocalStorage.removeItem("phase"));
                try {
                    var c = LocalStorage.getItem(a);
                    null !== c && (b = c + "-" + b),
                        window.localStorage.setItem(a, b)
                } catch (d) {
                }
            },
            LocalStorage.getItem = function (a) {
                try {
                    return window.localStorage.getItem(a)
                } catch (b) {
                    return null
                }
            },
            LocalStorage.removeItem = function (a) {
                try {
                    window.localStorage.removeItem(a)
                } catch (b) {
                }
            };
        var MiniProgressBar = function (a) {
            this.player = a,
                this._progress = YK.get(".x-progress-mini"),
                this._track = this._progress.getElementsByClassName("x-progress-track-mini")[0],
                this._play = this._progress.getElementsByClassName("x-progress-play-mini")[0],
                this._load = this._progress.getElementsByClassName("x-progress-load-mini")[0],
                this._handler = {},
                this.bindEvent(),
                this.resetProgress(),
                this.hide()
        };
        MiniProgressBar.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            bindEvent: function () {
            },
            removeEvent: function () {
            },
            dispatch: function (a) {
                a && this._handler[a.type] && this._handler[a.type]()
            },
            setProgress: function (a, b) {
                var c = a,
                    d = Math.min(a, YK.videoInfo.totalTime);
                this.playTime = d;
                var e = d / YK.videoInfo.totalTime;
                this._play.style.width = 100 * e + "%",
                b !== !0 && (d += Math.max(this.player.bufferedEnd() - c, 0), this.loadTime = d, e = d / YK.videoInfo.totalTime + .05, this._load.style.width = 100 * Math.min(Math.max(e, 0), 1) + "%")
            },
            resetProgress: function () {
                this._play.style.width = "0%",
                    this._load.style.width = "0%"
            },
            show: function () {
                this._progress.style.display = "block"
            },
            hide: function () {
                this._progress.style.display = "none"
            }
        };
        var PayPanel = function (a, b) {
            this._handler = {},
                this._hasPayInfo = !1,
                this._payInfo = YK.get(".x-pay"),
                this._text = YK.get(".x-pay-txt"),
                this._title = this._text.getElementsByTagName("h1")[0],
                this._tip = YK.get(".x-pay-tips"),
                this._button = YK.get(".x-pay-btn"),
                this._tryBtn = YK.get("#x-try"),
                this._payBtn = YK.get("#x-pay"),
                this.isFirst = !0,
                this.h5caseurl = "",
                this.vipurl = "//vip.youku.com/?c=xhr&a=h5_player_get_pay_info",
                this.cvipurl = "//cvip.youku.com/order/pay_info_h5",
                this._showtips = YK.get(".x-showtips"),
                this._tipsInfo = YK.get("#x-tips-info"),
                this._trialInfo = YK.get(".x-trial"),
                this._trialText = YK.get("#x-txt-big"),
                this._trialTextSmall = YK.get("#x-txt-small"),
                this._trialPay = YK.get(".x-trial-next"),
                this._trialClose = YK.get(".x-trial-close"),
                this._avator = YK.get(".x-cavator"),
                this.payInfoStartTime,
                this.vipType = "vip",
                this.payInfoOk = !1,
                this.player = a,
                this.init(b)
        };
        PayPanel.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            bindEvent: function () {
                this.bind_try = YK.bindAsEventListener(this, this.play),
                    this.bind_pay = YK.bindAsEventListener(this, this.pay),
                    this.bind_close = YK.bindAsEventListener(this, this.closeTrial),
                    YK.addEventHandler(this._tryBtn, "click", this.bind_try),
                    YK.addEventHandler(this._payBtn, "click", this.bind_pay),
                    YK.addEventHandler(this._trialText, "click", this.bind_pay),
                    YK.addEventHandler(this._trialTextSmall, "click", this.bind_pay),
                    YK.addEventHandler(this._trialPay, "click", this.bind_pay),
                    YK.addEventHandler(this._trialClose, "click", this.bind_close)
            },
            removeEvent: function () {
                YK.removeEventHandler(this._tryBtn, "click", this.bind_try),
                    YK.removeEventHandler(this._payBtn, "click", this.bind_pay),
                    YK.removeEventHandler(this._trialText, "click", this.bind_pay),
                    YK.removeEventHandler(this._trialTextSmall, "click", this.bind_pay),
                    YK.removeEventHandler(this._trialPay, "click", this.bind_pay),
                    YK.removeEventHandler(this._trialClose, "click", this.bind_close)
            },
            init: function (a) {
                var b, c = a.data,
                    d = "",
                    e = this;
                if (window.response = this, c.trial || (this._tryBtn.style.display = "none"), c.error) c.error.code == -307 && (c.video.type.indexOf("fee") != -1 ? b = -307 : c.video.type.indexOf("channel_vip") == -1 && c.error.code != -309 || (b = -308)),
                    c.error.code == -309 || c.error.code == -308 || b == -308 ? (this.vipType = "channelVip", this.payInfoStartTime = (new Date).getTime(), YKP.sendLog("getcvippayinfo_h5", 0, 0), d = this.cvipurl + "?own_channel_id=" + c.fee.own_channel_id + "&video_id=" + c.id + "&callback=response.channelResponse", crossDomain(d), setTimeout(function () {
                        e.payInfoOk || YKP.sendLog("getcvippayinfo_h5", 408, 10)
                    }, 1e4)) : c.error.code != -301 && b != -307 || (this.payInfoStartTime = (new Date).getTime(), YKP.sendLog("getvippayinfo_h5", 0, 0), d = this.vipurl + "&video_id=" + c.id + "&callback=response.vipResponse", crossDomain(d), setTimeout(function () {
                        e.payInfoOk || YKP.sendLog("getvippayinfo_h5", 408, 10)
                    }, 1e4));
                else {
                    if (!c.pay || c.pay.can_play) return;
                    c.video.type.indexOf("fee") != -1 ? (this.payInfoStartTime = (new Date).getTime(), YKP.sendLog("getvippayinfo_h5", 0, 0), d = this.vipurl + "&video_id=" + c.id + "&callback=response.vipResponse", crossDomain(d), setTimeout(function () {
                        e.payInfoOk || YKP.sendLog("getvippayinfo_h5", 408, 10)
                    }, 1e4)) : c.video.type.indexOf("channel_vip") != -1 && (this.vipType = "channelVip", this.payInfoStartTime = (new Date).getTime(), YKP.sendLog("getcvippayinfo_h5", 0, 0), d = this.cvipurl + "?own_channel_id=" + c.fee.own_channel_id + "&video_id=" + c.id + "&callback=response.channelResponse", crossDomain(d), setTimeout(function () {
                        e.payInfoOk || YKP.sendLog("getcvippayinfo_h5", 408, 10)
                    }, 1e4))
                }
                if (null == a.data.trial && debug.log("not pay"), a.data.trial) {
                    if (this.player.video.pause(), "episodes" == a.data.trial.type) return;
                    var f = a.data.trial;
                    this._tryDuration = parseInt(f.time),
                        this.player.tryDuration = this._tryDuration,
                        this._hasPayInfo = !0,
                        debug.log("try = " + this._tryDuration)
                }
                this._showid = a.data.show.id;
                var g = a.data.video.title;
                g.length > 12 && (g = g.substr(0, 12) + "..."),
                    this._title.innerHTML = g,
                    this.bindEvent()
            },
            play: function (a) {
                "channelVip" === this.vipType && YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4011095&cpp=1001013&url=");
                var b = this;
                this.isFirst && (this.player.initVideo(), this.isFirst = !1),
                    this._showtips.style.display = "none",
                    this._trialInfo.style.display = "block",
                    setTimeout(function () {
                        b._trialInfo.setAttribute("class", "x-trial x-trial-small")
                    }, 5e3),
                (YKP.isIPHONE || YKP.isIPOD) && null != YK.v.data.trial && (this.player.video.style.display = "block"),
                    0 === this.activeTime ? this.player.seek(0) : this.player.isPlayAd ? this.player.controls.onVideoBtnTouchEnd() : this.player.video.play(),
                    this.player._reporter.sendUserActionReport("xtry", "c")
            },
            pay: function (a) {
                this.player.video.pause();
                var b = a.target;
                this.h5caseurl && ("channelVip" === this.vipType && ("x-buy" === b.className ? YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4011096&cpp=1001013&url=") : YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4011097&cpp=1001013&url=")), window.open(this.h5caseurl, "", "", !1)),
                    this.player._reporter.sendUserActionReport("xbuy", "c")
            },
            hide: function () {
                this._payInfo && (this._payInfo.style.display = "none")
            },
            show: function () {
                0 != this._hasPayInfo && (this._payInfo.style.display = "block", this._tryDuration <= 0 && YK.hide(this._tryBtn))
            },
            isBlock: function () {
                return "block" == this._payInfo.style.display
            },
            showTip: function () {
                this._hasPayInfo && (this._showtips.style.display = "block", this._trialInfo.style.display = "none", this._trialInfo.setAttribute("class", "x-trial"), this.show())
            },
            clearTip: function () {
                this._tip.innerHTML = ""
            },
            hasPayInfo: function () {
                return this._hasPayInfo
            },
            tryDuration: function () {
                return this._tryDuration
            },
            closeTrial: function () {
                "x-trial" == this._trialInfo.getAttribute("class") ? this._trialInfo.setAttribute("class", "x-trial x-trial-small") : this._trialInfo.style.display = "none"
            },
            channelResponse: function (a) {
                var b = parseInt(((new Date).getTime() - this.payInfoStartTime) / 1e3);
                if (YKP.sendLog("getcvippayinfo_h5", 200, b), this.payInfoOk = !0, a.msg && "success" == a.msg) {
                    var c = location.href;
                    c = c.indexOf("?") > -1 ? c : c + "?";
                    var d = a.result.desc;
                    d = d.replace(/>/, "</em>").replace(/</, '<em class="x-type">'),
                        this._tipsInfo.innerHTML = d,
                        this.h5caseurl = a.result.button_url + "&cburl=" + encodeURIComponent(c),
                        this._payBtn.innerHTML = a.result.button,
                        1 === parseInt(a.result.show_try_button) ? "" : YK.hide(this._tryBtn),
                        1 === parseInt(a.result.show_button) ? "" : YK.hide(this._payBtn),
                    this._tryDuration > 0 && (this._trialText.innerHTML = "您可以免费试看" + parseInt(this._tryDuration / 60) + '分钟<br /><em class="x-buy">购买频道会员</em>继续观看'),
                    a.result.user_icon && (this._avator.innerHTML = '<img src="' + a.result.user_icon + '"/>'),
                        this._showtips.style.display = "block"
                } else YKP.sendLog("getcvippayinfo_h5", 203, b)
            },
            vipResponse: function (a) {
                var b = parseInt(((new Date).getTime() - this.payInfoStartTime) / 1e3);
                if (YKP.sendLog("getvippayinfo_h5", 200, b), this.payInfoOk = !0, a.msg && "success" == a.msg) {
                    var c = a.result.product_desc;
                    c = c.replace(/>/, "</em>").replace(/</, '<em class="x-type">'),
                        this._tipsInfo.innerHTML = c,
                        this.h5caseurl = a.result.buy_link,
                        this._payBtn.innerHTML = a.result.buy_desc,
                    this._tryDuration > 0 && (this._trialText.innerHTML = "您可以免费试看" + parseInt(this._tryDuration / 60) + '分钟<br /><em class="x-buy">' + a.result.buy_desc + "</em>继续观看", this._trialTextSmall.innerHTML = '<em class="x-buy">' + a.result.buy_desc + "</em>"),
                        this._showtips.style.display = "block"
                } else YKP.sendLog("getvippayinfo_h5", 203, b)
            }
        };
        var PlayLimit = function (a, b) {
            this._handler = {},
                this.player = a,
                this._videoInfo = b,
                this._html5_disable = !1,
                this._isLimit = !1;
            var c = YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType];
            this.totalTime = 0;
            for (var d = 0, e = c.length; d < e; d++) this.totalTime += c[d].seconds;
            this._videoInfo.data.trial ? this._limitTime = this._videoInfo.data.trial.time : this._limitTime = 3e3,
            (this._videoInfo.data.controller.html5_disable || this._videoInfo.data.trial && "h5" === this._videoInfo.data.trial.type) && (this._isLimit = !0, this._html5_disable = !0, this.player.tryDuration = this._limitTime),
                this._isCreated = !1,
                debug.log("videoInfo.controller.xplayer_disable:", this._isLimit),
                debug.log("videoInfo.controller.app_disable:", this._app_disable)
        };
        PlayLimit.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            create: function () {
                if (!this._isCreated) {
                    debug.log("playLimit create"),
                        this.player.video.pause(),
                        this._isCreated = !0;
                    var a = YK.get("#x-player"),
                        b = this._html5_disable;
                    if (1 == b) {
                        var c = this._videoInfo.data.trial && this._videoInfo.data.trial.time ? Math.floor(this._videoInfo.data.trial.time / 60) : "50";
                        a.innerHTML = "<div class=x-app-guide><div class=x-app-guide-tips><p>本页面提供" + c + '分钟预览</p></div><div class=x-app-guide-action><button type=button class="x-btn x-btn-major">&nbsp;&nbsp;&nbsp;点这里观看完整版&nbsp;&nbsp;&nbsp;</button></div><div class=x-app-openapp></div></div>',
                            this._content = YK.get(".x-app-guide"),
                            this._fullBtn = this._content.getElementsByClassName("x-btn")[0],
                            this._openApp = this._content.getElementsByClassName("x-app-openapp")[0],
                            this.bind_onFullClick = YK.bindAsEventListener(this, this.onFullClick),
                            YK.addEventHandler(this._fullBtn, "click", this.bind_onFullClick),
                            YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4009227&cpp=1000752&url=&_time=" + (new Date).getTime()),
                            this._content.style.marginLeft = parseInt(-this._content.offsetWidth / 2) + "px",
                            this._content.style.marginTop = parseInt(-this._content.offsetHeight / 2) + "px"
                    }
                }
            },
            onFullClick: function () {
                debug.log("onFullClick"),
                    this._content.getElementsByClassName("x-app-guide-action")[0].innerHTML = '<button type=button class="x-btn x-btn-major">&nbsp;下载安装&nbsp;</button><button type=button class="x-btn">&nbsp;我知道了&nbsp;</button>',
                    this._downloadBtn = this._content.getElementsByClassName("x-btn")[0],
                    this._knowBtn = this._content.getElementsByClassName("x-btn")[1],
                    this.bind_onDownload = YK.bindAsEventListener(this, this.onDownloadClick),
                    this.bind_onKnow = YK.bindAsEventListener(this, this.onKnowClick),
                    YK.addEventHandler(this._downloadBtn, "click", this.bind_onDownload),
                    YK.addEventHandler(this._knowBtn, "click", this.bind_onKnow),
                    this._content.getElementsByClassName("x-app-guide-tips")[0].innerHTML = "<p>看完整版需安装最新优酷app</p>",
                    this._content.style.marginLeft = parseInt(-this._content.offsetWidth / 2) + "px",
                    this._content.style.marginTop = parseInt(-this._content.offsetHeight / 2) + "px",
                    this.openApp()
            },
            onDownloadClick: function () {
                var a = "setup1";
                window.recallAppLog && recallAppLog(a),
                    this._videoInfo.data.trial && this._videoInfo.data.trial.time <= 600 ? YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4011090&cpp=1000752&url=&_time=" + (new Date).getTime()) : YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4009215&cpp=1000752&url=&_time=" + (new Date).getTime()),
                    YKP.isAndroid ? window.open("//dl.m.cc.youku.com/android/phone/Youku_Android_xianbobofangqi.apk", "_blank") : window.open("https://itunes.apple.com/app/id336141475", "_blank")
            },
            onKnowClick: function () {
                YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4009216&cpp=1000752&url=&_time=" + (new Date).getTime()),
                    setTimeout(function () {
                        window.location.reload()
                    }, 500)
            },
            openApp: function () {
                var a = (YK.initConfig.vid, "mplayerpage15");
                window.recallAppLog && recallAppLog(a),
                    YKP.Log("//hz.youku.com/red/click.php?tp=1&cp=4009213&cpp=1000752&url=&_time=" + (new Date).getTime()),
                    YKP.openApp(a)
            },
            isLimit: function () {
                return this._isLimit
            },
            limitTime: function () {
                return this._limitTime
            }
        };
        var PLAYRATES = {
                2: "2倍",
                1.5: "1.5倍",
                1: "常速",
                .8: "0.8倍"
            },
            PlayRatePanel = function (a, b) {
                this._handler = {},
                YK.isWeixin || YKP.isIPAD7 && (this.player = a, this.playRate = YK.get(".x-playspeed"), this.init(b), this.bindEvent(), this.button = this.playRate.getElementsByTagName("button")[0], this.panel = this.playRate.getElementsByTagName("div")[0], this.nodes = this.playRate.getElementsByTagName("li"), YK.show(this.playRate))
            };
        PlayRatePanel.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            init: function (a) {
                a = a.data;
                for (var b = ["<button class=x-control-btn>", "", "</button>"], c = ['<div class=x-panel style="display:none"><ul>', "", "</ul><div class=x-mask></div>", "</div>"], d = "", e = [], f = ["2", "1.5", "1", "0.8"], g = 0; g < f.length; g++) {
                    var h = f[g],
                        i = "",
                        j = "";
                    "1" == h && (i = "", b[1] = PLAYRATES[h], j = " class=selected"),
                        d += "<li data-vtype=" + h + j + ">" + i + PLAYRATES[h] + "</li>",
                        e.push(PLAYRATES[h])
                }
                c[1] = d,
                    this.playRate.innerHTML = b.join("") + c.join("")
            },
            bindEvent: function () {
                var a = this.playRate.getElementsByTagName("li");
                if (0 != a.length) {
                    this.bind_toggle = YK.bindAsEventListener(this, this.toggleRatePanel),
                        YK.addEventHandler(this.playRate, "click", this.bind_toggle);
                    for (var b = 0; b < a.length; b++) YK.addEventHandler(a[b], "click", YK.bindAsEventListener(this, this.switchRate))
                }
            },
            removeEvent: function () {
                null != this.playRate && YK.removeEventHandler(this.playRate, "click", this.bind_toggle)
            },
            hide: function (a) {
                if (this.playRate) {
                    var b = this.panel,
                        c = this.playRate.className;
                    this.playRate.className = c.replace(/[\s]*pressed/g, ""),
                        b.style.display = "none",
                    a || this.dispatch({
                        type: "settinghide"
                    })
                }
            },
            toggleRatePanel: function (a) {
                var b = this.panel,
                    c = this.playRate.className;
                c.indexOf("pressed") === -1 ? (this.playRate.className += " pressed", b.style.display = "block", this.player._reporter.sendUserActionReport("xcra", "c"), this.dispatch({
                    type: "settingshow"
                })) : (this.hide(), this.player._reporter.sendUserActionReport("xhra", "c")),
                    this.dispatch(a)
            },
            switchRate: function (a) {
                a.stopPropagation();
                var b = a.target,
                    c = null;
                c = b.getAttribute ? b.getAttribute("data-vtype") : b.parentNode.getAttribute("data-vtype"),
                    this.player._reporter.sendUserActionReport("xsra", "c", {
                        rate: c
                    });
                for (var d = this.button, e = this.nodes, f = 0; f < e.length; f++) if (e[f].getAttribute("data-vtype") == c) {
                    if (e[f].className.indexOf("selected") !== -1) return void this.toggleRatePanel();
                    e[f].innerHTML = PLAYRATES[c],
                        e[f].className += " selected",
                        d.innerHTML = PLAYRATES[c]
                } else {
                    var g = e[f].getAttribute("data-vtype");
                    e[f].innerHTML = PLAYRATES[g],
                        e[f].className = e[f].className.replace(/selected/, "")
                }
                this.toggleRatePanel(),
                    this.dispatch({
                        type: "settingdone"
                    }),
                    this.player.video.pause(),
                    this.player.video.playbackRate = parseFloat(c),
                    this.player.video.play()
            }
        };
        var ProgressBar = function (a) {
            this.player = a,
                this._progress = YK.get(".x-progress"),
                this._track = this._progress.getElementsByClassName("x-progress-track")[0],
                this._play = this._progress.getElementsByClassName("x-progress-play")[0],
                this._load = this._progress.getElementsByClassName("x-progress-load")[0],
                this._seek = this._progress.getElementsByClassName("x-progress-seek")[0],
                this._seekHandle = this._seek.getElementsByClassName("x-seek-handle")[0],
                this._handler = {},
                this.bindEvent()
        };
        ProgressBar.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            bindEvent: function () {
                this.bind_seek = YK.bindAsEventListener(this, this.seek),
                    this.bind_touchstart = YK.bindAsEventListener(this, this.onTouchStart),
                    YK.addEventHandler(this._track, "click", this.bind_seek, !0),
                    YK.addEventHandler(this._seek, "touchstart", this.bind_touchstart)
            },
            removeEvent: function () {
                YK.removeEventHandler(this._track, "click", this.bind_seek, !0),
                    YK.removeEventHandler(this._seek, "touchstart", this.bind_touchstart)
            },
            removeClickEvent: function () {
                YK.removeEventHandler(this._track, "click", this.bind_seek, !0)
            },
            addClickEvent: function () {
                YK.addEventHandler(this._track, "click", this.bind_seek, !0)
            },
            dispatch: function (a) {
                a && this._handler[a.type] && this._handler[a.type](a)
            },
            setProgress: function (a, b) {
                var c = a,
                    d = Math.min(Math.max(a, 0), YK.videoInfo.totalTime);
                this.playTime = d;
                var e = d / YK.videoInfo.totalTime,
                    f = this._track.offsetWidth,
                    g = this._seek.offsetWidth,
                    h = g / f;
                this._play.style.width = Math.min(100 * (e + h / 2), 100) + "%";
                var i = e;
                if (i * f > f - g ? this._seek.style.left = f - g + "px" : this._seek.style.left = 100 * Math.min(Math.max(i, 0), 1) + "%", this.uCurrentTime.innerHTML = YK.getTime(d), b !== !0) {
                    d += Math.max(this.player.bufferedEnd() - c, 0),
                        this.loadTime = d,
                        e = d / YK.videoInfo.totalTime;
                    var j = e + .05;
                    this._load.style.width = 100 * Math.min(Math.max(j, 0), 1) + "%"
                }
            },
            resetProgress: function () {
                this._seek.style.left = this._seek.style.width,
                    this._load.style.width = "0",
                    this._play.style.width = "0"
            },
            getRate: function (a, b) {
                var c = 1,
                    d = YK.get(".x-fs-console");
                d && (c = parseFloat(YK.getCurrentStyle(d).zoom));
                var e = a / (b * c);
                return e
            },
            seek: function (a) {
                var b = (new Date).getTime(),
                    c = b - g_db_show_time;
                if (a.srcElement == this._seek || c < g_time_gap) return debug.log(c + "," + g_time_gap),
                    !1;
                this.player._reporter.sendUserActionReport("xcs", "c");
                var d = a.offsetX || a.changedTouches[0].clientX - this._track.clientX;
                debug.log("x = " + d);
                var e = this.getRate(d, this._track.offsetWidth),
                    f = e * YK.videoInfo.totalTime;
                debug.log("progress bar time = " + f + "rate = " + e + "total = " + YK.videoInfo.totalTime),
                    this.setProgress(f, !0),
                    this.dispatch({
                        type: "progressend"
                    }),
                    this.player.seek(f),
                    this.dispatch(a)
            },
            handleX: function (a) {
                return 0
            },
            onTouchStart: function (a) {
                if (1 != a.targetTouches.length || this.isTouching) return !1;
                if (this.startX = a.targetTouches[0].clientX, a.preventDefault(), this.isTouching = !0, this._currentTime = this.player.currentTime || 0, this.startTime = this._currentTime, "m3u8" == YK.config.content && (this._prepaused = this.player.video.paused, this.player.video.pause(), this.startTime = this.player.currentTime), "mp4" == YK.config.content) {
                    this.player.video.pause(),
                        this.startTime = this.player.video.currentTime;
                    for (var b = 0; b < g_cur_num; b++) this.startTime += parseInt(YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][g_playType][b].seconds)
                }
                this.bind_onTouchMove = YK.bindAsEventListener(this, this.onTouchMove),
                    this.bind_onTouchEnd = YK.bindAsEventListener(this, this.onTouchEnd),
                    YK.addEventHandler(this._seek, "touchmove", this.bind_onTouchMove),
                    YK.addEventHandler(this._seek, "touchend", this.bind_onTouchEnd)
            },
            onTouchMove: function (a) {
                if (1 != a.targetTouches.length) return !1;
                a.preventDefault(),
                    a.stopPropagation();
                var b = a.targetTouches[0].clientX - this.startX,
                    c = this.getRate(b, this._track.offsetWidth),
                    d = this.startTime + c * YK.videoInfo.totalTime;
                this.dispatch({
                    type: "progressing",
                    st: this._currentTime,
                    dt: d - this._currentTime
                }),
                    this._currentTime = d;
                var e = Math.min(Math.max(this._currentTime, 0), YK.videoInfo.totalTime);
                return this.setProgress(e, !0),
                    !1
            },
            onTouchEnd: function (a) {
                if (this.dispatch({
                        type: "progressend"
                    }), this.isTouching = !1, a.changedTouches.length > 1) return !1;
                var b = {
                    tb: parseInt(100 * this.startTime) / 100,
                    to: parseInt(100 * this._currentTime) / 100
                };
                debug.log("tb=" + b.tb),
                    this.player._reporter.sendUserActionReport("xds", "d", b),
                    a.preventDefault(),
                    a.stopPropagation(),
                    YK.removeEventHandler(this._seek, "touchmove", this.bind_onTouchMove),
                    YK.removeEventHandler(this._seek, "touchend", this.bind_onTouchEnd);
                var c = Math.min(Math.max(this._currentTime, 0), YK.videoInfo.totalTime - 5);
                this.player.controls.onPlay();
                var d = this.player;
                return this.player.seek(c, function () {
                    d.video.play()
                }),
                    !1
            }
        };
        var QualityPanel = function (a, b) {
            return this._handler = {},
            YK.isWeixin && (YK.get(".x-quality").style.display = "none"),
                "m3u8" != YK.config.content || YKP.isAndroid ? void(YK.get(".x-quality").style.display = "none") : b && b.data && b.data.stream[0] && b.data.stream[0].stream_type ? (this.player = a, this._quality = YK.get(".x-quality"), this.init(b), this.bindEvent(), this._button = this._quality.getElementsByTagName("button")[0], this._panel = this._quality.getElementsByTagName("div")[0], void(this._nodes = this._quality.getElementsByTagName("li"))) : void(YK.get(".x-quality").style.display = "none")
        };
        QualityPanel.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            init: function (a) {
                a = a.data;
                var b = (YK.videoInfo._videoSegsDic.streams, YK.videoInfo._videoSegsDic.typeArr),
                    c = ["<button class=x-control-btn title=画质设置>", "", "</button>"],
                    d = ['<div class=x-panel style="display:none"><ul>', "", "</ul><div class=x-mask></div>", "</div>"],
                    e = "",
                    f = [];
                for (var g in VIDEOTYPES) if (b[YK.defaultLanguage].indexOf(g) !== -1 && f.indexOf(VIDEOTYPES[g]) === -1) {
                    var h = "",
                        i = "";
                    g == YK.defaultVideoType && (h = "", c[1] = VIDEOTYPES[g], i = " class=selected"),
                        e += "<li data-vtype=" + g + i + ">" + h + VIDEOTYPES[g] + "</li>",
                        f.push(VIDEOTYPES[g])
                }
                "" == c[1] && (c[1] = f[0]),
                    d[1] = e,
                    this._quality.innerHTML = c.join("") + d.join("")
            },
            bindEvent: function () {
                var a = this._quality.getElementsByTagName("li");
                if (0 != a.length) {
                    this.bind_toggle = YK.bindAsEventListener(this, this.toggleQualityPanel),
                        YK.addEventHandler(this._quality, "click", this.bind_toggle);
                    for (var b = 0; b < a.length; b++) YK.addEventHandler(a[b], "click", YK.bindAsEventListener(this, this.switchQuality))
                }
            },
            removeEvent: function () {
                null != this._quality && YK.removeEventHandler(this._quality, "click", this.bind_toggle)
            },
            hide: function (a) {
                if (this._quality) {
                    var b = this._panel,
                        c = this._quality.className;
                    this._quality.className = c.replace(/[\s]*pressed/g, ""),
                        b.style.display = "none",
                    a || this.dispatch({
                        type: "settinghide"
                    })
                }
            },
            toggleQualityPanel: function (a) {
                var b = this._panel,
                    c = this._quality.className;
                c.indexOf("pressed") === -1 ? (this._quality.className += " pressed", b.style.display = "block", this.player._reporter.sendUserActionReport("xcq", "c"), this.dispatch({
                    type: "settingshow"
                })) : (this.hide(), this.player._reporter.sendUserActionReport("xhq", "c")),
                    this.dispatch(a)
            },
            switchQuality: function (a) {
                this.player._reporter.sendUserActionReport("xsq", "c"),
                    a.stopPropagation();
                var b = a.target,
                    c = null;
                c = b.getAttribute ? b.getAttribute("data-vtype") : b.parentNode.getAttribute("data-vtype");
                for (var d = this._button, e = this._nodes, f = 0; f < e.length; f++) if (e[f].getAttribute("data-vtype") == c) {
                    if (e[f].className.indexOf("selected") !== -1) return void this.toggleQualityPanel();
                    e[f].innerHTML = VIDEOTYPES[c],
                        e[f].className += " selected",
                        d.innerHTML = VIDEOTYPES[c],
                        LocalStorage.setItem("defaultVideoType", c),
                        YK.defaultVideoType = c
                } else {
                    var g = e[f].getAttribute("data-vtype");
                    e[f].innerHTML = VIDEOTYPES[g],
                        e[f].className = e[f].className.replace(/selected/, "")
                }
                debug.log("q1"),
                    this.toggleQualityPanel(),
                    this.dispatch({
                        type: "settingdone"
                    });
                var h = this.player.currentTime;
                this.player.video.src;
                this.player._retry = 0;
                var i = YK.m3u8src_v2(YK.v.data.video.encodeid, c);
                YK.unitedTag = null,
                    this.player.video.src = i;
                var j = this,
                    k = 0;
                this.player.video.addEventListener("canplay", function () {
                    return 1 === k ? void debug.log("XXXXXXXXXXXXXXXXXXXXX") : (k = 1, debug.log("q2 nsrc=" + i), j.player.seek(h), void debug.log("q3"))
                }),
                    this.player.video.load(),
                    this.player.video.play()
            },
            switchQuality_: function (a) {
                a.stopPropagation();
                for (var b = a.target, c = b.dataset.vtype, d = this._button, e = this._nodes, f = 0; f < e.length; f++) if (e[f].dataset.vtype == c) {
                    if (e[f].className.indexOf("selected") !== -1) return void this.toggleQualityPanel();
                    e[f].innerHTML = VIDEOTYPES[c],
                        e[f].className += " selected",
                        d.innerHTML = VIDEOTYPES[c]
                } else {
                    var g = e[f].dataset.vtype;
                    e[f].innerHTML = VIDEOTYPES[g],
                        e[f].className = e[f].className.replace(/selected/, "")
                }
                debug.log("q1"),
                    this.toggleQualityPanel();
                var h = this.player.video.currentTime,
                    i = this.player.video.src,
                    j = i.replace(/type\/(flv|flvhd|mp4|hd2)/, "type/" + c);
                this.player.video.src = j;
                var k = this,
                    l = 0;
                this.player.video.addEventListener("canplay", function () {
                    return 1 === l ? void debug.log("XXXXXXXXXXXXXXXXXXXXX") : (l = 1, debug.log("q2 nsrc=" + j), k.player.seek(h), void debug.log("q3"))
                })
            }
        };
        var RelatedPanel = function (a, b) {
            this._handler = {},
                this.player = a,
                this._panel = document.createElement("div"),
                this._panel.className = "x-recommend",
                this.init(b),
                this.request(b),
                window.relatedpanel = this,
                YK.get("#x-player").appendChild(this._panel),
                this._panel.style.display = "box";
            var c = {
                e: "xendcard"
            };
            c.device = YKP.isAndroid ? "adr" : YKP.isIPAD ? "ipad" : "oth"
        };
        RelatedPanel.prototype = {
            bindDynamicEvent: function () {
                var a = this._listinner.getElementsByClassName("x-item");
                this.bind_itemclick = YK.bindAsEventListener(this, this.onItemClick);
                for (var b = 0; b < a.length; b++) YK.addEventHandler(a[b], "click", this.bind_itemclick, !0)
            },
            onItemClick: function (a) {
                var b = a.currentTarget,
                    c = b.getAttribute("data-i");
                return "x" == c ? void this.replay() : void this.player._reporter.sendRecommendLog(this.getReportParam(c))
            },
            init: function (a) {
                this._panel.innerHTML = "<div class=x-pages></div>",
                    this._listinner = this._panel.getElementsByClassName("x-pages")[0]
            },
            request: function (a) {
                var b = "//ykrec.youku.com/video/packed/list.json?",
                    c = {};
                c.vid = a.data.id,
                    c.uid = a.data.video.userid,
                a.data.show && a.data.show.id && (c.sid = a.data.show.id),
                    c.cate = a.data.video.category_id,
                    c.site = "1",
                    c.module = "2";
                var d = a.data.controller.play_mode;
                c.pg = "1";
                var e = {
                    normal: 1,
                    show: 3,
                    folder: 4
                };
                c.pg = e[d],
                    "interior" == YK.config.winType ? c.apptype = 12 : (c.apptype = 12, c.pg = 1),
                    c.pl = 36;
                for (var f in YK.initConfig.playlistconfig) c[f] = YK.initConfig.playlistconfig[f];
                c.callback = "relatedpanel.parseResponse",
                    b += urlParameter(c),
                    crossDomain(b),
                    this._apt = c.apptype,
                    this._pg = c.pg,
                    this._md = c.module
            },
            parseResponse: function (a) {
                this._info = a,
                    this.buildPanel(this._info)
            },
            buildPanel: function (a) {
                var b = a.data,
                    c = b.length;
                debug.log("realted len = " + c);
                var d = [],
                    e = '<ul class="x-item" data-i="x"><li class="x-item-img"><img src="//static.youku.com/h5/player/res/img/replay.png"></li></ul>';
                d.push(e);
                var f = this._panel.offsetWidth - 60 + 16,
                    g = this._panel.offsetHeight - 120 + 12,
                    h = Math.floor(f / 166),
                    i = Math.floor(g / 97),
                    j = h * i;
                j = j > c ? c : j,
                    j -= 1,
                    j = j < 0 ? 0 : j;
                for (var k = 0; k < j; k++) {
                    var l = b[k].picUrl,
                        m = b[k].title.substr(0, 20),
                        n = " //m.youku.com/video/id_" + b[k].codeId + ".html?from=",
                        o = "y7";
                    o += "interior" == YK.config.winType ? ".2-1-" : ".7-1-",
                        o += YK.v.data.video.category_id,
                        o += ".4",
                        o += "." + (k + 1) + "-1",
                        o += "." + this._apt + "-" + this._pg + "-" + this._md + "-" + k,
                        n += o,
                        debug.log(n),
                    "myoukucom" == YK.initConfig.client_id && (n = "//m.youku.com/smartphone/detail?vid=" + b[k].codeId);
                    var p = '<ul class="x-item" data-i=' + k + '><li class="x-item-img"><img src=' + YK.getSrcProtocol(l) + '></li><li class="x-item-info"><div class="x-item-title">' + m + '</div><div class="x-item-bg"></div></li><li class="x-item-url"><a href=' + n + ' target="_blank"></a></li><li class="x-item-loading"><div class="x-play-loading"></div></li></ul>';
                    d.push(p)
                }
                this._listinner.innerHTML = d.join(""),
                    this.bindDynamicEvent(),
                    this.buildImgEvent()
            },
            getReportParam: function (a) {
                var b = {};
                return b.pos = "" + a,
                    b.sct = YK.v.data.video.category_id,
                    b.dct = this._info.data[a].dct,
                    b.ord = this._info.ord,
                    b.req_id = this._info.req_id,
                    b.abver = this._info.ver,
                    b.dma = this._info.data[a].dma,
                    b.algInfo = this._info.data[a].algInfo,
                    b.apt = this._apt,
                    b.md = this._md,
                    b.pg = this._pg,
                    b.r = (new Date).getTime(),
                    b.vid = YK.v.data.video.encodeid,
                    b.uid = YK.v.data.video.userid,
                    1 == this._info.data[a].type ? b.dvid = this._info.data[a].id : b.dsid = this._info.data[a].id,
                    b.sid = "",
                YK.v.data.show && YK.v.data.show.id && (b.sid = YK.v.data.show.id),
                    b
            },
            buildImgEvent: function () {
                for (var a = this._listinner.getElementsByClassName("x-item-img"), b = 0; b < a.length; b++) YK.addEventHandler(a[b], "error", YK.bindAsEventListener(this, this.onLoadImgError)),
                    YK.addEventHandler(a[b], "abort", YK.bindAsEventListener(this, this.onLoadImgError))
            },
            onLoadImgError: function (a) {
                debug.log("img error");
                var b = a.target,
                    c = b.parentNode.parentNode;
                YK.addClass(c, "x-no-pic"),
                    b.src = "//static.youku.com/h5/player/res/img/no_pic.png"
            },
            replay: function (a) {
                this.player.controls.rePlay(a)
            },
            onResize: function (a) {
                var b = this;
                setTimeout(function () {
                    b.buildPanel(b._info)
                }, 500)
            }
        };
        var ShowListPanel = function (a, b) {
            this._handler = {},
                this.player = a,
                this._showbtn = YK.get(".x-playshow"),
                this._showlist = YK.get(".x-showlist"),
                this.init(b),
                this._inner = this._showlist.getElementsByClassName("x-showlist-inner"),
                this._bullet = this._showlist.getElementsByClassName("x-showlist-bullet"),
                this.bindEvent()
        };
        ShowListPanel.prototype = {
            init: function (a) {
                if (this._showlist.innerHTML = '<div class=x-showlist-inner><div class=x-showlist-hd></div><div class=x-showlist-bd></div><div class=x-showlist-ft style="display:none"></div><div class=x-mask></div></div>', this._slhd = this._showlist.getElementsByClassName("x-showlist-hd")[0], this._slbd = this._showlist.getElementsByClassName("x-showlist-bd")[0], this._slft = this._showlist.getElementsByClassName("x-showlist-ft")[0], this._slhd.innerHTML = "<label>选集</label><div class=x-showlist-close></div>", this._closeHandle = this._slhd.getElementsByClassName("x-showlist-close")[0], !a.data.videos) return void(null == b || 0 == b.length);
                for (var b = a.data.videos.list, c = ["<ul class=x-showlist-bullet>", "", "</ul>"], d = [], e = 0; e < b.length; e++) {
                    var f = b[e];
                    if (f.title && f.encodevid) {
                        var g = "//m.youku.com/video/id_" + f.encodevid + ".html";
                        YK.v.folder && (g = g + "?f=" + YK.v.folder.folderId);
                        var h = "";
                        f.encodevid == YK.v.data.video.encodeid && (h = " class=selected");
                        var i = "<li" + h + "><a href=" + g + ">" + f.title.substr(0, 20) + "</a></li>";
                        d.push(i)
                    }
                }
                c[1] = d.join(""),
                    this._slbd.innerHTML = c.join("");
                var j = ["<div class=x-showlist-pages>", "<span class=x-showlist-pre></span>", "<ul>", "", "</ul>", "<span class=x-showlist-next></span>"];
                d = [];
                var h = -1;
                h = a.data.videos.previous ? parseInt(a.data.videos.previous.seq / 60) : 0;
                for (var e = 0; e < (b.length - 1) / 60 + 1; e++) {
                    var k = "";
                    e == h && (k = " class=current");
                    var i = "<li" + k + "><em>" + (e + 1) + "</em></li>";
                    d.push(i)
                }
                j[3] = d.join(""),
                    this._slft.innerHTML = j.join("")
            },
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            bindEvent: function () {
                this.bind_close = YK.bindAsEventListener(this, this.hide),
                    YK.addEventHandler(this._closeHandle, "click", this.bind_close),
                    this.bind_toggle = YK.bindAsEventListener(this, this.toggle),
                    YK.addEventHandler(this._showbtn, "click", this.bind_toggle)
            },
            removeEvent: function () {
                YK.removeEventHandler(this._closeHandle, "click", this.bind_close)
            },
            hide: function () {
                var a = this._showbtn.className;
                this._showbtn.className = a.replace(/[\s]*pressed/g, ""),
                    YK.hide(this._showlist)
            },
            show: function () {
                this._showbtn.className += " pressed",
                    YK.show(this._showlist)
            },
            showListBtn: function () {
                if (YK.v.data.videos) {
                    var a = YK.v.data.videos.list;
                    if (null == a || a.length <= 1) return;
                    YK.show(this._showbtn)
                } else YK.hide(this._showbtn)
            },
            hideListBtn: function () {
                if (YK.v.data.videos) {
                    var a = YK.v.data.videos.list;
                    if (null == a || 0 == a.length) return;
                    YK.hide(this._showbtn),
                        this.hide()
                }
            },
            toggle: function (a) {
                "block" != this._showlist.style.display ? (this.show(), this.player._reporter.sendUserActionReport("xshl", "c")) : this.hide(),
                    this.dispatch(a)
            },
            touchStart: function (a) {
                this._sx = a.targetTouches[0].clientX,
                    this._sy = a.targetTouches[0].clientY,
                    this._ex = this._sx,
                    this._ey = this._ey
            },
            touchEnd: function (a) {
            },
            touchMove: function (a) {
                if (this._ex = a.targetTouches[0].clientX, this._ey = a.targetTouches[0].clientY, this._dx = this._ex - this._sx, this._dy = this._ey - this._sy, !(Math.abs(this._dx) > Math.abs(this._dy))) {
                    a.preventDefault();
                    var b = this._bullet.offsetHeight / 6;
                    this._dy / b
                }
            }
        };
        var TipPanel = function (a, b) {
            this.player = a,
                this._handle = {},
                this._tips = YK.get(".x-tips"),
                YK.hide(this._tips),
                this._tips.innerHTML = "<div class=x-tips-txt></div><div class=x-tips-close><a href=#><em>关闭</em></a></div><div class=x-tips-mask></div>",
                this._ptip = this._tips.getElementsByClassName("x-tips-txt")[0],
                this._ctip = this._tips.getElementsByClassName("x-tips-close")[0],
            null == LocalStorage.getItem("youku_conf_skip") && LocalStorage.setItem("youku_conf_skip", !0),
                this.bindEvent()
        };
        TipPanel.prototype = {
            bindEvent: function () {
                YK.addEventHandler(this._ctip, "click", YK.bindAsEventListener(this, this.closeTip))
            },
            closeTip: function () {
                YK.hide(this._tips),
                    this.keepLastTime()
            },
            autoHide: function (a) {
                var b = this;
                setTimeout(function () {
                    b.closeTip()
                }, a)
            },
            keepLastTime: function () {
            },
            ignoreLastTime: function () {
            },
            isShowTimeTip: function () {
                var a = LocalStorage.getItem("youku_keep_lasttime");
                a = parseInt(a);
                var b = LocalStorage.getItem("youku_ignore_lasttime");
                return b = parseInt(b),
                    !(a >= 3 || b >= 3)
            },
            showLastTimeTip: function (a) {
                var b = YK.getTime(a);
                debug.log("last = " + b),
                0 != this.isShowTimeTip() && (this._ptip.innerHTML = "优酷记忆您上次播放到<span class=x-tips-time>" + b + "</span>, <a class=x-tip-timebegin href=#>从头观看</a>", this._playBegin = this._ptip.getElementsByClassName("x-tip-timebegin")[0], YK.addEventHandler(this._playBegin, "click", YK.bindAsEventListener(this, this.seekBegin)), YK.show(this._tips), this.autoHide(5e3))
            },
            onSkipTail: function () {
                "true" == LocalStorage.getItem("youku_conf_skip") ? (this._ptip.innerHTML = "即将为您跳过片尾, <a class=x-tip-skipnoway href=#>不再跳过</a>", this._skipnowtail = this._ptip.getElementsByClassName("x-tip-skipnoway")[0], YK.addEventHandler(this._skipnowtail, "click", YK.bindAsEventListener(this, this.skipNoway))) : (this._ptip.innerHTML = "是否跳过片头片尾? <a class=x-tip-skipalways href=#>始终跳过</a>", this._skipalwtail = this._ptip.getElementsByClassName("x-tip-skipalways")[0], YK.addEventHandler(this._skipalwtail, "click", YK.bindAsEventListener(this, this.skipAlways))),
                    YK.show(this._tips),
                    this.autoHide(1e4)
            },
            onSkipHead: function () {
                "true" == LocalStorage.getItem("youku_conf_skip") ? (this._ptip.innerHTML = "已经为您跳过片头, <a class=x-tip-skipnoway href=#>不再跳过</a>", this._skipnow = this._ptip.getElementsByClassName("x-tip-skipnoway")[0], YK.addEventHandler(this._skipnow, "click", YK.bindAsEventListener(this, this.skipNoway))) : (this._ptip.innerHTML = "是否跳过片头片尾? <a class=x-tip-skipalways href=#>始终跳过</a>", this._skipalw = this._ptip.getElementsByClassName("x-tip-skipalways")[0], YK.addEventHandler(this._skipalw, "click", YK.bindAsEventListener(this, this.skipImediately))),
                    YK.show(this._tips),
                    this.autoHide(5e3)
            },
            onUglyAdPlay: function () {
                this._ptip.innerHTML = "尊敬的会员，因版权原因，请点击右上角 关闭广告 ",
                    YK.show(this._tips);
                var a = this;
                setTimeout(function (b) {
                    YK.hide(a._tips)
                }, 15e3)
            },
            closeUglyHint: function () {
                YK.hide(this._tips)
            },
            skipImediately: function () {
                debug.log("skip imediately"),
                    this.player._reporter.sendUserActionReport("xskh", "c"),
                    LocalStorage.setItem("youku_conf_skip", !0);
                var a = parseInt((YK.v.data.dvd || "").head) / 1e3;
                return this.onSkipHead(),
                    this.player.seek(a),
                    !1
            },
            skipNoway: function () {
                return this.player._reporter.sendUserActionReport("xnsk", "c"),
                    LocalStorage.setItem("youku_conf_skip", !1),
                    this._ptip.innerHTML = "设置成功",
                    !1
            },
            skipAlways: function () {
                return this.player._reporter.sendUserActionReport("xask", "c"),
                    LocalStorage.setItem("youku_conf_skip", !0),
                    this._ptip.innerHTML = "设置成功",
                    !1
            },
            seekBegin: function () {
                return this.player._reporter.sendUserActionReport("xseb", "c"),
                    YK.hide(this._tips),
                    this.ignoreLastTime(),
                    this.player.seek(0),
                    !1
            }
        };
        var Reporter = function (a, b, c) {
            if (this.player = a, this.v = b, this.sid = c, this.isSendedConsumeReport = !1, YKP.hd = this.getHDFlag(), CacheUep.length > 0) for (var d = 0; d < CacheUep.length; d++) this.sendUepReport(CacheUep[d].type, CacheUep[d].time);
            this.dimension = {
                w: document.getElementById("x-player").offsetWidth,
                h: document.getElementById("x-player").offsetHeight
            },
                this.screenDim = {
                    w: screen.availWidth,
                    h: screen.availHeight
                };
            try {
                this.vvlogext = YK.initConfig.vvlogconfig.vvlogext ? YK.initConfig.vvlogconfig.vvlogext : UrchinAplus._yVvlogInfo()
            } catch (e) {
                this.vvlogext = ""
            }
        };
        Reporter.prototype = {
            sendRecommendLog: function (a) {
                var b = "//r.l.youku.com/recclick?";
                YKP.Log(b + urlParameter(a))
            },
            tsInit: function () {
                this.tsSn = null
            },
            sendTSLog: function (a) {
                null == this.tsSn && (this.tsSn = 0);
                var b = 5;
                b = this.tsSn > 24 ? 20 : this.tsSn > 12 ? 10 : 5;
                var c = this;
                if (this.tstimer = setTimeout(function (a) {
                        c.sendTSLog(60)
                    }, 1e3 * b), 61 == a) clearTimeout(this.tstimer),
                    this.tstimer = null;
                else if (c.player.video.paused) return;
                if (0 == this.tsSn) return void this.tsSn++;
                var d = YK.v.data;
                YK.initConfig.tslogconfig = YK.initConfig.tslogconfig || {};
                var e = {};
                e.vvid = this.sid,
                    e.vid = d.id,
                    e.cf = this.getHDFlag(),
                    e.cpt = this.player.currentTime ? Math.floor(this.player.currentTime) : 0,
                    e.full = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0,
                    e.lang = this.getLanguage(),
                    e.pc = 60 == a ? 0 : 1,
                    e.clb = 0,
                    e.iku = "m",
                    e.pt = this.getPlayTime(),
                    e.sn = this.tsSn++,
                    e.hi = b,
                    e.ext = this.getExtString(a),
                    e.cna = YKP.opCookie("cna") || "",
                    e.uid = YK.v.data.user.uid || 0,
                    e.r = this.signTS(e.vvid + e.vid + e.cpt + e.pt + e.sn);
                var f = "//yt.mmstat.com/yt/vp.vtslog?";
                YKP.Log(f + urlParameter(e));
                var g = "//p-log.ykimg.com/tslog?";
                YKP.Log(g + urlParameter(e))
            },
            signTS: function (a) {
                if (null == a) return 0;
                var b = 0,
                    c = a.length;
                for (j = 0; j < c; j++) b = 43 * b + a.charCodeAt(j),
                    b %= 1e10;
                return b
            },
            getPlayTime: function () {
                var a = 0;
                return a = this.tsSn > 24 ? 180 + 20 * (this.tsSn - 24) : this.tsSn > 12 ? 60 + 10 * (this.tsSn - 12) : 5 * this.tsSn
            },
            tslogparse: function (a) {
            },
            sendTSErrorLog: function (a, b) {
            },
            sendVVLog: function (a) {
                var b = YK.v.data;
                b.sid = YK.videoInfo._sid,
                    YK.initConfig.vvlogconfig = YK.initConfig.vvlogconfig || {};
                var c = {};
                c.pvid = "",
                    c.chid = b.video.category_id,
                    c.url = escape(this.getParentUrl() ? this.getParentUrl() : window.location.href),
                    c.rurl = "",
                    c.vvid = b.sid,
                    c.vid = b.id,
                    c.schid = b.video.category_id,
                    c.plid = "",
                    c.plchid = "",
                    c.shid = null != b.show && b.show.id ? b.show.id : "",
                    c.shchid = this.getSubCategories(b.video.subcategories),
                    c.ptype = YK.WIN_TYPE,
                    c.cp = null != b.show && b.show.copyright ? b.show.copyright : "",
                    c.vl = parseInt(b.video.seconds),
                    c.cf = this.getHDFlag(),
                    c.hf = this.getMaxFileType(),
                    c.spt = 0,
                    c.pb = 62 == a ? 2 : 0,
                    c.vdoid = b.user.uid,
                    c.out = "interior" == YK.initConfig.wintype ? 0 : 1,
                    c.r = this.signTS(c.vvid + c.vid),
                    c.ext = this.getExtString(a);
                for (var d in YK.initConfig.vvlogconfig) c[d] = YK.initConfig.vvlogconfig[d];
                var e = "//v.l.youku.com/ykvvlog?";
                YKP.Log(e + urlParameter(c))
            },
            getSubCategories: function (a) {
                for (var b = "", c = 0; c < a.length; c++) b += a[c].id + "|";
                return b.substring(0, b.length - 1)
            },
            getLanguage: function () {
                return null == this.langMap && (this.langMap = {
                    "国语": 1,
                    "粤语": 2,
                    "英语": 6,
                    "日语": 7,
                    "川话": 3
                }),
                this.langMap[YK.defaultLanguage || "国语"] || 1
            },
            getExtString: function (a) {
                var b = {};
                b.iku = "m",
                    b.full = this.player.controls.fullscreenPanel.fullFlag(),
                    b.lang = this.getLanguage(),
                    b.num = a,
                    b.ctp = 0,
                    b.pc = 60 == a ? 0 : 1,
                    b.clb = 0,
                    b.ctype = "12",
                    b.ev = "1",
                    b.tk = YKP.userCache.token,
                    b.oip = YK.v.data.security.ip,
                    b.isvip = YK.v.data.user.vip ? "1" : "0",
                    b.paystate = this.getPayState(),
                    b.playstate = null == YK.v.data.trial ? "1" : "2";
                var c = YKP.getCookie("cna");
                return b.cna = c ? c : "",
                    escape(urlParameter(b))
            },
            getPlayByType_: function (a) {
                var b = 0;
                return 62 == a && (b = 2),
                YK.initConfig.vvlogconfig.pb && (b = YK.initConfig.vvlogconfig.pb),
                    b
            },
            getMaxFileType: function () {
                var a = BuildVideoInfo._videoInfo._videoSegsDic;
                return a.hd2 ? 2 : a.mp4 ? 1 : 0
            },
            getHDFlag: function () {
                if (null == this.player) return 0;
                var a = null,
                    b = this.player.video.src;
                b.indexOf("m3u8") != -1 ? (a = {
                    flv: 0,
                    flvhd: 0,
                    mp4: 1,
                    hd2: 2,
                    hd3: 3
                }, b = YK.defaultVideoType) : a = {
                    "030020": 4,
                    "030004": 0,
                    "030008": 1,
                    "030080": 3
                };
                for (var c in a) if (b.indexOf(c) !== -1) return a[c];
                return 0
            },
            getParentUrl: function () {
                var a = null;
                if (parent !== window) try {
                    a = parent.location.href
                } catch (b) {
                    a = document.referrer
                }
                return a
            },
            addPlayerDurationReport: function (a) {
                var b = YK.videoInfo;
                if (null != b && null != b._playListData) {
                    var c = {};
                    if (null == this.drtimer && 60 == a) {
                        var d = this;
                        c.rs = 1,
                            this.drtimer = setInterval(function (a) {
                                d.player.video.paused || d.addPlayerDurationReport(60)
                            }, 6e4)
                    }
                    61 == a && (clearInterval(this.drtimer), this.drtimer = null),
                        c.viewUserId = 0,
                    YK.v.data.user.uid && (c.viewUserId = YK.v.data.user.uid),
                    YK.initConfig.vvlogconfig && YK.initConfig.vvlogconfig.pvid && (c.pvid = YK.initConfig.vvlogconfig.pvid),
                        c.ct = YK.v.data.video.category_letter_id,
                        c.url = encodeURIComponent(window.location.href),
                        c.referUrl = encodeURIComponent((YK.initConfig.vvlogconfig || "").rurl) || encodeURIComponent(document.referrer),
                        c.sid = this.sid,
                        c.videoid = YK.v.data.id,
                        c.cs = this.getSubCategories(YK.v.data.video.subcategories);
                    try {
                        c.fid = playlistId,
                            c.fct = playListChannelId
                    } catch (e) {
                        c.fid = "",
                            c.fct = ""
                    }
                    var f = YK.v.data.show;
                    f ? (c.showid_v2 = f.id || "", c.showid_v3 = f.encodeid || "", c.show_videotype = f.video_type || "", c.stg = f.stage || "", c.Copyright = f.copyright || "") : (c.showid_v2 = "", c.Copyright = ""),
                        c.oct = "",
                        c.winType = YK.WIN_TYPE,
                        c.outSite = 0,
                        c.videoOwnerId = YK.v.data.video.userid,
                        c.totalsec = b.totalTime,
                        c.hd = 1;
                    var g = {
                        flv: 0,
                        flvhd: 0,
                        mp4: 1,
                        hd2: 2,
                        hd3: 3
                    };
                    c.hd = g[YK.defaultVideoType];
                    var h = b._videoSegsDic.typeArr[YK.defaultLanguage].join("");
                    h.indexOf("hd3") > -1 ? c.format = 2 : h.indexOf("hd2") > -1 ? c.format = 1 : c.format = 0,
                        c.currentPlayTime = parseInt(this.player.currentTime || 0),
                        c.playBy = YK.initConfig.play_mode ? YK.initConfig.play_mode : 0,
                        c.number = a;
                    var i = new Date;
                    c.rnd = (i.getTime() - b.abstarttime) / 1e3,
                        c.mtype = getMType(),
                        c.fullflag = this.player.controls.fullscreenPanel.fullFlag(),
                        c.playComplete = 0,
                    61 == a && (c.playComplete = 1),
                        c.continuationPlay = 0,
                        c.pid = YK.initConfig.client_id,
                        c.timestamp = (new Date).getTime(),
                        c.ctype = "12",
                        c.ev = "1",
                        c.tk = YKP.userCache.token,
                        c.oip = YK.v.data.security.ip,
                        c.isvip = YK.v.data.user.vip ? "1" : "0",
                        c.paystate = this.getPayState(),
                        c.playstate = null == YK.v.data.trial ? "1" : "2",
                        c.cna = YKP.opCookie("cna") || "";
                    var j = "//yt.mmstat.com/yt/vp.vdoview?" + urlParameter(c);
                    try {
                        this.vvlogext || (this.vvlogext = UrchinAplus._yVvlogInfo() || ""),
                            j = j + "&" + urlParameter(this.vvlogext)
                    } catch (e) {
                    }
                    YKP.Log(j);
                    var k = "//stat.youku.com/player/addPlayerDurationReport?";
                    YKP.Log(k + urlParameter(c))
                }
            },
            addPlayerStaticReport: function () {
                var a = "//stat.youku.com/player/addPlayerStaticReport",
                    b = {};
                b.videoid = this.v.data.id,
                this.v.data.token && (b.t = this.v.data.token.vv),
                    b.totalsec = parseInt(this.v.data.video.seconds),
                    b.ikuflag = "m_" + this.getShowFlag(),
                    b.url = escape(this.getParentUrl() ? this.getParentUrl() : window.location.href),
                    b.fullflag = this.player.controls.fullscreenPanel.fullFlag(),
                    b.source = "video",
                    b.referer = (YK.initConfig.vvlogconfig || "").rurl,
                    b.sid = this.sid,
                    b.uid = this.v.data.user.uid,
                    b.h = hcbt(b.t),
                    b.totalseg = YK.pieceLength();
                var c = urlParameter(b);
                YKP.Log(a + "?" + c)
            },
            sendUserActionReport: function (a, b, c, d) {
                var e = "//e.stat.ykimg.com/red/ytes.php?",
                    f = {
                        t: 1002,
                        e: a,
                        v: b
                    };
                f.d = encode64(getMType());
                var g = {
                    v: "h5player",
                    vid: YK.v.data.id,
                    ssid: YK.videoInfo._sid,
                    ct: YK.v.data.video.category_letter_id,
                    cs: YK.v.data.video.subcategories
                };
                g.uid = 0,
                YK.v.data.user && (g.uid = YK.v.data.user.uid),
                    g.sid = "",
                YK.v.data.show && (g.sid = YK.v.data.show.id),
                    g.tc = this.player.currentTime || 0,
                    g.w = YK.get("#x-player").offsetWidth,
                    g.h = YK.get("#x-player").offsetHeight,
                    g.f = this.player.video.fullscreenchange ? "on" : "off",
                    g.q = this.player.getQuality(),
                    g.ver = "1.0.0";
                for (var h in c) g[h] = c[h];
                f.x = encode64(urlParameter(g)),
                    f.cna = YKP.opCookie("cna") || "";
                var i = urlParameter(f);
                if ("xre" == a) this.checkPlayerResize(e, i);
                else {
                    if ("xenfs" == a || "xexfs" == a) {
                        this._giveupReTag = !0;
                        var j = this;
                        setTimeout(function (a) {
                            j._giveupReTag = !1
                        }, 800)
                    }
                    YKP.Log("//p-log.ykimg.com/event?" + i);
                    try {
                        this.vvlogext || (this.vvlogext = UrchinAplus._yVvlogInfo() || ""),
                        this.vvlogext && (f.pc_i = this.vvlogext.pc_i, f.pc_u = this.vvlogext.pc_u)
                    } catch (k) {
                    }
                    f.rurl = encodeURIComponent(document.referrer),
                        f.jurl = encodeURIComponent(document.location.href),
                        YKP.Log("//yt.mmstat.com/yt/vp.event?" + urlParameter(f))
                }
            },
            checkScreenRotate: function (a, b) {
                var c = screen.availWidth,
                    d = screen.availHeight;
                debug.log("<hr/>rota w,h = " + c + "," + d),
                this.screenDim.w == c && this.screenDim.h == d || (this.screenDim.w = c, this.screenDim.h = d, debug.log("<b><font color=red>rotate</font></b>"), YKP.Log(a + b))
            },
            checkPlayerResize: function (a, b) {
                if (this._giveupReTag === !0) return void debug.log("give up xre after enfs or exfs");
                var c = document.getElementById("x-player");
                this._resizeList = this._resizeList || [],
                    this._resizeList.push({
                        str: b,
                        time: (new Date).getTime(),
                        w: c.offsetWidth,
                        h: c.offsetHeight
                    });
                var d = this;
                setTimeout(function (b) {
                    if (0 != d._resizeList.length) {
                        for (var c = d._resizeList[0].time, e = 0; e < d._resizeList.length; e++) {
                            var f = d._resizeList[e].w,
                                g = d._resizeList[e].h,
                                h = d._resizeList[e].time;
                            f == d.dimension.w && g == d.dimension.h || (d.dimension.w = f, d.dimension.h = g, (h - c > 800 || e == d._resizeList.length - 1) && YKP.Log(a + d._resizeList[e].str))
                        }
                        d._resizeList = []
                    }
                }, 1e3)
            },
            sendUepReport: function (a, b, c) {
                if (!(c !== !1 && 100 * Math.random() > 10)) {
                    var d = "//v.l.youku.com/uep?",
                        e = "";
                    e = YKP.isIPAD ? "xplayer_ipad" : YKP.isIPHONE ? "xplayer_iphone" : "xplayer_android";
                    var f = {
                        m: e,
                        hd: this.getHDFlag(),
                        t: a,
                        s: b,
                        u: escape(this.getParentUrl() ? this.getParentUrl() : window.location.href),
                        p: 2,
                        v: YK.videoInfo._sid,
                        ct: YK.v.data.video.category_letter_id,
                        cs: YK.v.data.video.subcategories
                    };
                    YKP.Log(d + urlParameter(f))
                }
            },
            sendLoadedTime: function (a) {
                debug.log("loaded cost = " + a),
                    this.sendUepReport("videoload", a)
            },
            sendComScoreReport: function (a) {
                if (!this._hasComScore) {
                    for (var b = document.getElementsByTagName("script"), c = 0; c < b.length; c++) if (b[c].src.indexOf("scorecardresearch.com/beacon.js") !== -1) {
                        this._hasComScore = !0;
                        break
                    }
                    if (this._hasComScore !== !0) {
                        var d = document.createElement("script"),
                            e = document.getElementsByTagName("script")[0];
                        d.async = !0,
                            d.src = ("https:" == document.location.protocol ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js",
                            e.parentNode.insertBefore(d, e)
                    }
                    this._hasComScore = !0
                }
                var f = setInterval(function (b) {
                    if ("undefined" != typeof COMSCORE) {
                        clearInterval(f);
                        try {
                            COMSCORE.beacon({
                                c1: 1,
                                c2: 7293931,
                                c3: a,
                                c6: YK.v.data.video.category_id
                            })
                        } catch (b) {
                            debug.log("beacon exception")
                        }
                    }
                }, 500)
            },
            sendIResearchReport: function (a) {
            },
            sendThirdPartyReport: function (a) {
                "xplayer_h5" == a && (a = YKP.isAndroid ? "xplayer_h5_android" : YKP.isIPAD ? "xplayer_h5_ipad" : "xplayer_h5_other"),
                    this.sendComScoreReport(a),
                    this.sendIResearchReport(a)
            },
            sendClientConsumeReport: function () {
                1 != this.isSendedConsumeReport && null != YK.config.partner_config && 1 == YK.config.partner_config.status && null != YK.config.partner_config.token && "" != YK.config.partner_config.token && (this.isSendedConsumeReport = !0, YKP.Log("https://api.youku.com/players/consume.json?token=" + YK.config.partner_config.token))
            },
            getPayState: function () {
                var a = 0;
                return YK.v.data.show && "vod" == YK.v.data.show.pay_type && (a = 1),
                YK.v.data.show && "mon" == YK.v.data.show.pay_type && (a = 2),
                    a
            },
            getShowFlag: function () {
                var a = "m";
                return a += YK.v.data.show ? "1" : "0"
            }
        };
        var PauseAdPlayer = function (a, b) {
            this._handler = {},
                this.player = a,
                this.controls = a.controls,
                this.adplugin = this.controls._pauseAdPlugin,
                this.info = b.data.info,
                this.adjustIMGWH(),
                this.adpause = YK.get(".x-ad-pause"),
                this.info.VAL[0].VT = parseInt(this.info.VAL[0].VT),
            2 != this.info.VAL[0].VT && (this.init(), this.bindEvent(), this._adreporter = new ADReporter(this, b.data)),
                this.loadVC()
        };
        PauseAdPlayer.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            bindEvent: function () {
                YK.addEventHandler(this.adcontent, "click", YK.bindAsEventListener(this, this.adClick)),
                    YK.addEventHandler(this.adclose, "click", YK.bindAsEventListener(this, this.hide));
                var a = this;
                window.addEventListener("orientationchange", function (b) {
                    setTimeout(function (b) {
                        YK.isLandScape() || a.hide()
                    }, 1e3)
                })
            },
            adjustIMGWH: function () {
                var a = this.info.VAL[0].W,
                    b = this.info.VAL[0].H,
                    c = YK.get("#x-player"),
                    d = (c.offsetHeight - 110) / b;
                (d > 1 || d <= 0) && (d = 1),
                    this.info.VAL[0].W = a * d,
                    this.info.VAL[0].H = b * d,
                    debug.log("pause img adjusted w = " + this.info.VAL[0].W + " h = " + this.info.VAL[0].H)
            },
            init: function () {
                this.adpause.innerHTML = '<div class=x-pause-content></div><div class=x-pause-close></div><div class="x-pause-adtip"></div>',
                    this.adcontent = this.adpause.getElementsByClassName("x-pause-content")[0],
                    this.adcontent.innerHTML = " <img class=x-pause-img width=" + this.info.VAL[0].W + " height=" + this.info.VAL[0].H + " src=" + YK.getSrcProtocol(this.info.VAL[0].RS) + ">",
                    this.adclose = this.adpause.getElementsByClassName("x-pause-close")[0],
                    this.adimg = this.adcontent.getElementsByClassName("x-pause-img")[0],
                    this.adimg.style.height = this.info.VAL[0].H + "px",
                    this.adimg.style.width = this.info.VAL[0].W + "px",
                    this.adpause.style.marginLeft = "-" + this.info.VAL[0].W / 2 + "px",
                    this.adpause.style.marginTop = "-" + this.info.VAL[0].H / 2 + "px"
            },
            hide: function () {
                YK.hide(this.adpause)
            },
            play: function () {
                2 != this.info.VAL[0].VT && (YK.show(this.adpause), this._adreporter.sendSUS())
            },
            adClick: function () {
                window.open(this.info.VAL[0].CU, null),
                this._adreporter && this._adreporter.sendCUM()
            },
            loadVC: function () {
                if (2 == this.info.VAL[0].VT || 1 == this.info.VAL[0].VT) {
                    var a = this.info.VAL[0].VC;
                    loadjscssfile(a, "js")
                }
            }
        };
        var AdInfoAdapter = function (a, b) {
            this._handler = {},
                this._adinfo = a,
                this._info = {
                    VAL: []
                };
            for (var c in a)"VAL" != c && (this._info[c] = a[c]);
            this._vt2nodes = b || []
        };
        AdInfoAdapter.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            buildAdRS: function () {
                var a = "";
                1 === YK.m3u8RandomCode,
                    a = "//pl-ali.youku.com/playlist/m3u8?";
                for (var b = {}, c = {}, d = this._adinfo.VAL, e = 0; e < d.length; e++) {
                    var f = d[e],
                        g = (f.RS, f.VID),
                        h = f.VQT;
                    c["a" + (e + 1)] = g + "_" + h
                }
                YK.frontAdIds = this._adinfo.VAL,
                    c.v = YK.v.data.video.encodeid + "_" + YK.defaultVideoType,
                    b.ids = escape(toJSON(c)),
                    b.ts = parseInt((new Date).getTime() / 1e3),
                YK.password && (b.password = YK.password),
                YK.password && YK.initConfig.client_id && YK.config.partner_config && 1 == YK.config.partner_config.status && 1 == YK.config.partner_config.passless && (b.client_id = YK.initConfig.client_id);
                for (var i = [], j = 0; j < d.length; j++) i.push(d[j].VID);
                i.push(YK.v.data.video.encodeid);
                var k = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26],
                    l = encodeURIComponent(encode64(rc4(translate(YK.mk.a4 + "poz" + YKP.userCache.a2, k).toString(), YKP.userCache.sid + "_" + i.join("") + "_" + YKP.userCache.token)));
                return b.ep = l,
                    b.sid = YKP.userCache.sid,
                    b.token = YKP.userCache.token,
                    b.ctype = "12",
                    b.ev = "1",
                    b.oip = YK.v.data.security.ip,
                    a += urlParameter(b),
                "" != YK.getUCStr(YK.v.data.id) && (a += YK.getUCStr(YK.v.data.id)),
                    a
            },
            run: function () {
                if (null == this._adinfo || null == this._adinfo.VAL || 0 == this._adinfo.VAL.length) return void this.dispatch({
                    type: ADConstant.FRONT_AD_INFO_ADAPER_OK,
                    data: this._info
                });
                for (var a = {
                    SUS: [],
                    SU: [],
                    SUE: [],
                    CU: [],
                    CUM: [],
                    VTVC: []
                }, b = 0, c = 0; c < this._adinfo.VAL.length; c++) {
                    var d = this._adinfo.VAL[c];
                    if (null != d.VID && null != d.VQT) {
                        if (null == d.SU && (d.SU = []), null == d.SUE && (d.SUE = []), 0 == c) a.SUS = d.SUS || [];
                        else for (var e = 0; e < d.SUS.length; e++) a.SU.push({
                            T: b,
                            U: d.SUS[e].U
                        });
                        for (var e = 0; e < d.SU.length; e++) {
                            var f = d.SU[e].T + b;
                            a.SU.push({
                                T: f,
                                U: d.SU[e].U
                            })
                        }
                        if (c == this._adinfo.VAL.length - 1) a.SUE = d.SUE;
                        else for (var e = 0; e < d.SUE.length; e++) {
                            var f = b + d.AL;
                            a.SU.push({
                                T: f,
                                U: d.SUE[e].U
                            })
                        }
                        b += d.AL,
                            a.CU.push({
                                T: b,
                                U: d.CU
                            }),
                            a.CUM.push({
                                T: b,
                                CUM: d.CUM
                            });
                        var g = parseInt(d.VT);
                        if (1 == g && a.VTVC.push({
                                U: d.VC,
                                T: b
                            }), 0 != this._vt2nodes.length) for (var e = 0; e < this._vt2nodes.length; e++) {
                            var h = this._vt2nodes[e],
                                i = this._vt2nodes[e].VC,
                                j = h.pos_;
                            j == -1 && a.VTVC.push({
                                U: i,
                                T: 0
                            }),
                            j == c && a.VTVC.push({
                                U: i,
                                T: b
                            })
                        }
                    }
                }
                a.AL = b,
                    a.RS = this.buildAdRS(),
                    this._info.VAL.push(a),
                    this._info.src = a.RS,
                    this.dispatch({
                        type: ADConstant.FRONT_AD_INFO_ADAPER_OK,
                        data: this._info
                    })
            }
        };
        var ADPlayer = function (a, b) {
            this._handler = {},
                this.player = a,
                this.video = this.player.video,
                this.controls = this.player.controls,
                this._adplugin = this.player._adplugin,
                this._adplugin.adplayer = this,
                this.video.preload = "none",
                this.video.src = b.data.urls[0],
                debug.log("ad src=" + this.video.src),
                this.video.style.display = "block",
                this._addata = b.data,
                this._addata.curnum = 0,
                this._playTag = [],
                this.bindAdEvent(),
                this._adreporter = new ADReporter(this, this._addata)
        };
        ADPlayer.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            bindAdEvent: function () {
                this.bind_fadtoplay = YK.bindAsEventListener(this, this.onPlayClick),
                    this.bind_fadplay = YK.bindAsEventListener(this, this.onAdPlay),
                    this.bind_fadended = YK.bindAsEventListener(this, this.onAdEnded),
                    this.bind_faderror = YK.bindAsEventListener(this, this.onAdError),
                    this.bind_fadpause = YK.bindAsEventListener(this, this.onAdPause),
                    this.bind_fadsuspend = YK.bindAsEventListener(this, this.onAdSuspend),
                    this.bind_fadstalled = YK.bindAsEventListener(this, this.onAdStalled),
                    this.bind_fadwaiting = YK.bindAsEventListener(this, this.onAdWaiting),
                    this.bind_fadloadedmetadata = YK.bindAsEventListener(this, this.onAdLoadedMetaData),
                    this.bind_fadtimeupdate = YK.bindAsEventListener(this, this.onAdTimeUpdate),
                    YK.addEventHandler(this.video, "play", this.bind_fadplay),
                    YK.addEventHandler(this.video, "ended", this.bind_fadended),
                    YK.addEventHandler(this.video, "error", this.bind_faderror),
                    YK.addEventHandler(this.video, "pause", this.bind_fadpause),
                    YK.addEventHandler(this.video, "suspend", this.bind_fadsuspend),
                    YK.addEventHandler(this.video, "stalled", this.bind_fadstalled),
                    YK.addEventHandler(this.video, "waiting", this.bind_fadwaiting),
                    YK.addEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata),
                    YK.addEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate),
                    this.shadow = this.controls.buttons.shadow,
                    this.videobtn = this.controls.buttons.videobtn,
                    YK.addEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
            },
            removeAdEvent: function () {
                YK.removeEventHandler(this.video, "play", this.bind_fadplay),
                    YK.removeEventHandler(this.video, "ended", this.bind_fadended),
                    YK.removeEventHandler(this.video, "error", this.bind_faderror),
                    YK.removeEventHandler(this.video, "pause", this.bind_fadpause),
                    YK.removeEventHandler(this.video, "suspend", this.bind_fadsuspend),
                    YK.removeEventHandler(this.video, "stalled", this.bind_fadstalled),
                    YK.removeEventHandler(this.video, "waiting", this.bind_fadwaiting),
                    YK.removeEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate),
                    YK.removeEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata),
                    YK.removeEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
            },
            onPlayClick: function (a) {
                this.video.play()
            },
            checkVTVC: function (a) {
                var b = this._addata.vtvc;
                if (null != b && 0 !== b.length) for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.pos_ == a - 1 && loadjscssfile(d.VC, "js")
                }
            },
            play: function () {
                this.checkVTVC(0),
                    this.video.load(),
                    this.video.play()
            },
            leftSecond: function () {
                for (var a = this._addata.curnum, b = this.video.currentTime, c = this._addata.seconds.length, d = this._addata.seconds[a] - b, e = a + 1; e < c; e++) d += this._addata.seconds[e];
                return parseInt(d)
            },
            clearTimer: function () {
                clearInterval(this._checkTimer),
                    this._checkTimer = null
            },
            checkPause: function () {
                if (!this._checkTimer) {
                    var a = this;
                    this._timelist = [],
                        this._checkTimer = setInterval(function (b) {
                            return a.video.paused ? void a.onAdPause() : (a._timelist.push(a.video.currentTime), void(a._timelist.length >= 3 && (Math.abs(a._timelist[0] - a._timelist[2]) < 1 && (debug.log("<b>ad unexpected pause</b>"), a.video.play(), 0 == a.leftSecond() && (debug.log("<b>exception left = 0 </b>"), a.onAdEnded())), a._timelist = [])))
                        }, 1e3)
                }
            },
            onAdPlay: function (a) {
                this.checkPause();
                var b = this.controls.buttons.videobtn,
                    c = this.controls.container.poster;
                YK.hide(b),
                    YK.hide(c),
                    YK.hide(YK.get(".x-video-info")),
                    this.video.style.display = "block";
                var d = this._addata.curnum;
                this._adplugin.setLeftSecond(this.leftSecond());
                var e = this;
                setTimeout(function () {
                    debug.log("ad media timeout check begin = " + e._adBegin),
                    e._adBegin || (e.removeAdEvent(), e._adplugin.hide(), e._adplugin.reportTime("advideo", -1, !1), e.dispatch({
                        type: ADConstant.AD_ERROR,
                        data: !0
                    }))
                }, 1e4),
                this._playTag[d] || (this._playTag[d] = !0, this._adfirsttu = !1, this._adplugin.recordTime("advideo"), LocalStorage.appendItem("phase", "adplay"))
            },
            uglyClose: function () {
                this.video.src = "",
                    this.video.load(),
                    this.video.play()
            },
            onAdError: function (a) {
                this.checkVTVC(this._addata.curnum + 1),
                    this.removeAdEvent(),
                    this._adplugin.hide(),
                    this._adplugin.reportTime("advideo", -1, !1),
                    this.dispatch({
                        type: ADConstant.AD_ERROR,
                        data: !0
                    })
            },
            onAdEnded: function (a) {
                return debug.log("ad ended"),
                    this._adreporter.sendSUE(),
                    this.checkVTVC(this._addata.curnum + 1),
                    this._addata.curnum < this._addata.urls.length - 1 ? void this.onMiddleAdEnded(a) : (this.removeAdEvent(), this._adplugin.hide(), this.clearTimer(), this.dispatch({
                        type: ADConstant.AD_END,
                        data: !0
                    }), void LocalStorage.appendItem("phase", "adend"))
            },
            onMiddleAdEnded: function (a) {
                debug.log("onMiddleAdEnded"),
                    this._pauseLeftSec = !0;
                var b = this;
                setTimeout(function () {
                    b._pauseLeftSec = !1
                }, 1e3),
                    this._addata.curnum++;
                var c = this._addata.curnum;
                this.video.src = this._addata.urls[c],
                    this.video.load(),
                    this.video.play(),
                    this._adBegin = !1
            },
            onAdPause: function (a) {
                if (!this.player.video.ended) {
                    var b = this.controls.buttons.videobtn;
                    YK.show(b);
                    var c = this.controls.buttons.shadow;
                    YK.hide(c)
                }
            },
            onAdSuspend: function (a) {
                debug.log("<font color=red>ad suspend</font>")
            },
            onAdStalled: function (a) {
                debug.log("<font color=red>ad stalled</font>")
            },
            onAdWaiting: function (a) {
                this.controls.onWaiting(a)
            },
            onAdTimeUpdate: function (a) {
                YK.hide(this.controls.buttons.loading),
                    this._adBegin = !0,
                    YK.hide(this.controls.buttons.loading);
                var b = this._addata.curnum;
                this._addata.seconds[b];
                this._pauseLeftSec || this._adplugin.setLeftSecond(this.leftSecond()),
                    this._adreporter.sendSU(this.video.currentTime),
                this.video.currentTime >= .5 && this._adplugin.show(),
                this._adfirsttu || (this._adfirsttu = !0, this._adreporter.sendSUS(), this._adreporter.sendVC(), this._adplugin.reportTime("advideo"), YKP.isNeedAdrTrick(), 0 === this._adplugin.SKIP && this.dispatch({
                    type: ADConstant.UGLY_CLOSE_AD_HINT
                }))
            },
            onAdLoadedMetaData: function (a) {
                this._adBegin = !0
            },
            onAdClick: function (a) {
                this.video.pause(),
                    this._adreporter.sendCUM();
                var b = this._addata,
                    c = b.curnum,
                    d = b.info.VAL[c].CU;
                debug.log("click cu=" + d),
                    window.open(d, "", "", !1)
            }
        },
            ADConstant = {
                FRONT_REQUEST_BASE: "//mf.atm.youku.com/mf?",
                BACK_REQUEST_BASE: "//mb.atm.youku.com/mb?",
                PAUSE_REQUEST_BASE: "//mp.atm.youku.com/mp?",
                INSERT_REQUEST_BASE: "//valo.atm.youku.com/valo?",
                OVERLAY_REQUEST_BASE: "//valc.atm.youku.com/valc?",
                FRONT_AD: "frontAD",
                BACK_AD: "backAD",
                INSERT_AD: "insertAD",
                PAUSE_AD: "pauseAD",
                OVERLAY_AD: "overlayAD",
                AD_END: "adend",
                AD_ERROR: "aderror",
                UGLY_CLOSE_AD: "uglyclosead",
                FRONT_AD_END: "frontADend",
                FRONT_AD_ERROR: "frontADerror",
                FRONT_AD_INFO_OK: "frontAdinfook",
                FRONT_AD_UNITED_INFO_OK: "unitedfrontadinfook",
                FRONT_AD_INFO_ADAPER_OK: "frontAdinfoadapterok",
                FRONT_AD_INFO_TIMEOUT: "frontAdinfotimeout",
                BACK_AD_END: "backAdend",
                BACK_AD_ERROR: "backaderror",
                BACK_AD_INFO_OK: "backAdinfook",
                BACK_AD_INFO_TIMEOUT: " backAdinfotimeout",
                INSERT_AD_INFO_OK: "insertAdinfook",
                PAUSE_AD_INFO_OK: "pauseAdinfook",
                PAUSE_AD_INFO_ERROR: "pauseAdinfoerror",
                PAUSE_AD_INFO_TIMEOUT: "pauseadinfotimeout",
                OVERLAY_AD_INFO_OK: "overlayAdinfook",
                AdPluginObject: "adpluginobject"
            };
        var AdPlugin = function (a, b, c) {
            this._handler = {},
                this.player = a,
                this.sid = c,
                this._advids = [],
                this._adsecs = [],
                this._adsrcs = [],
                this._vid = b.data.video.encodeid,
                this._advert = YK.get(".x-advert"),
                this._adskip = this._advert.getElementsByClassName("x-advert-skip")[0],
                this._adcount = this._advert.getElementsByClassName("x-advert-countdown")[0],
                this._adknowdet = this._advert.getElementsByClassName("x-advert-detail")[0],
                this.init(b),
                this.bindEvent()
        };
        AdPlugin.prototype = {
            init: function (a) {
                this.initRequestParam(a),
                    this._adskipTxt = this._adskip.getElementsByClassName("x-advert-txt")[0],
                    this._adskipTxt.innerHTML = "跳过广告",
                    this._adcountTxt = this._adcount.getElementsByClassName("x-advert-txt")[0],
                    this._adcountTxt.innerHTML = "广告 <span class=x-advert-sec></span> 秒",
                    this._adsec = this._adcountTxt.getElementsByClassName("x-advert-sec")[0]
            },
            getSubCategories: function (a) {
                for (var b = "", c = 0; c < a.length; c++) b += a[c].id + "|";
                return b.substring(0, b.length - 1)
            },
            initRequestParam: function (a) {
                var b = a.data.trial ? parseInt(a.data.trial.time - 1) : parseInt(a.data.video.seconds),
                    c = {
                        site: 1,
                        p: 0,
                        vl: b,
                        fu: 0,
                        ct: a.data.video.category_letter_id,
                        cs: this.getSubCategories(a.data.video.subcategories),
                        d: 0,
                        paid: a.data.show ? a.data.show.pay : 0,
                        s: a.data.show ? a.data.show.id : 0,
                        sid: this.sid,
                        td: a.data.video.source ? a.data.video.source : 0,
                        v: a.data.id,
                        vip: a.data.user.vip ? 1 : 0,
                        wintype: "xplayer_m3u8",
                        u: a.data.video.userid,
                        bt: YKP.isPad ? "pad" : "phone",
                        os: YKP.isMobileIOS ? "ios" : "Android",
                        rst: YKP.isMobileIOS ? "m3u8" : "3gphd",
                        tict: 0,
                        aw: "w",
                        vs: "1.0"
                    };
                null != YK.config.partner_config && (c.partnerid = YK.initConfig.client_id, c.atm = YK.config.partner_config.atm);
                for (var d in YK.initConfig.adconfig) c[d] = YK.initConfig.adconfig[d];
                this._param = c,
                    this._ti = encodeURIComponent(a.data.video.title);
                var e = a.data.video.tags || [];
                this._k = encodeURIComponent(e.join("|")),
                    this.loadPartnerParam()
            },
            loadPartnerParam: function () {
            },
            partnerParse: function (a) {
            },
            initRequestParam_: function (a) {
                var b = {
                    ct: a.data.video.category_letter_id,
                    cs: a.data.video.subcategories,
                    v: a.data.id,
                    t: parseInt(a.data.video.seconds),
                    u: a.data.video.userid,
                    fileid: "todo",
                    winType: "xplayer_m3u8",
                    partnerid: YK.config.partnerId,
                    sid: this.sid,
                    k: "",
                    td: "todo"
                };
                b.s = a.data.show ? a.data.show.id : "",
                a.user && (b.vip = a.data.user.vip ? 1 : 0),
                    b.paid = a.data.show ? a.data.show.pay : 0;
                for (var c in YK.initConfig.adconfig) b[c] = YK.initConfig.adconfig[c];
                this._param = b
            },
            bindEvent: function () {
                var a = this;
                this.fSkipAd = function (b) {
                    a.adplayer.video.pause();
                    var c = "//cps.youku.com/redirect.html?id=000002bf";
                    window.open(c, "", "", !1)
                },
                    this._adskip.addEventListener("click", this.fSkipAd, !1),
                    this._adknowdet.addEventListener("click", function (b) {
                        debug.log("detail clicked"),
                            a.adplayer.onAdClick("")
                    }, !1)
            },
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            show: function () {
                YK.show(this._advert)
            },
            hide: function () {
                YK.hide(this._advert)
            },
            setLeftSecond: function (a) {
                this._adsec && (this._adsec.innerText = Math.ceil(a))
            },
            splitVTVC: function (a) {
                debug.log("split adinfo vt vc"),
                    this._vtvc = [];
                var b = {};
                for (var c in a)"VAL" != c && (b[c] = a[c]);
                b.VAL = [];
                for (var d = a.VAL, e = 0; e < d.length; e++) 2 !== parseInt(d[e].VT) ? null != d[e].RS && "" != d[e].RS.trim() && null != d[e].VID && null != d[e].VQT && b.VAL.push(d[e]) : (d[e].pos_ = e - 1 - this._vtvc.length, this._vtvc.push(d[e]));
                return b
            },
            buildTestData: function () {
                var a = {
                    VAL: [{
                        AL: 15,
                        VID: 147660115,
                        VQT: "flv",
                        SUS: [{
                            U: "//mytestdata.com1"
                        },
                            {
                                U: "//mytestdata.com2"
                            }],
                        SU: [],
                        SUE: [],
                        CU: "//www.baidu.com",
                        CUM: [{
                            U: "//cum"
                        }],
                        RS: "//fasdfa"
                    },
                        {
                            AL: 15,
                            VID: 15252,
                            VQT: "flv",
                            SUS: [{
                                U: "//mytestdata.com1"
                            },
                                {
                                    U: "//mytestdata.com2"
                                }],
                            SU: [],
                            SUE: [],
                            CU: "//www.bing.com",
                            CUM: [{
                                U: "//cum"
                            }],
                            RS: "//fasdfa",
                            VT: 2,
                            VC: "//vc.com"
                        }]
                };
                return a
            },
            checkSkip: function (a) {
                a && 0 === parseInt(a.SKIP) && (YK.hide(this._adskip), this.SKIP = 0)
            },
            adParseUnited: function (a) {
                if (this.checkSkip(a), this._isAdInfoOk = !0, LocalStorage.appendItem("phase", "adinfo"), this.reportTime("adinfo"), a && a.VAL && (debug.log("<b>before split val length =  " + a.VAL.length + "</b>"), a = this.splitVTVC(a), debug.log("<b>after : val length =  " + a.VAL.length + "</b>")), null == a || null == a.VAL || 0 == a.VAL.length) return a = {
                    VAL: []
                },
                    this.isAdPlaying = !1,
                    void this.dispatch({
                        type: ADConstant.FRONT_AD_UNITED_INFO_OK,
                        data: {
                            info: {
                                VAL: []
                            },
                            vtvc: this._vtvc || []
                        }
                    });
                var b = new AdInfoAdapter(a, this._vtvc),
                    c = this;
                b.addEventListener(ADConstant.FRONT_AD_INFO_ADAPER_OK, function (a) {
                    debug.log("ad info adapter ok");
                    var b = a.data;
                    c.dispatch({
                        type: ADConstant.FRONT_AD_UNITED_INFO_OK,
                        data: {
                            info: b,
                            vtvc: c._vtvc || []
                        }
                    })
                }),
                    b.run()
            },
            adParse: function (a) {
                if (this.checkSkip(a), LocalStorage.appendItem("phase", "adinfo"), this.reportTime("adinfo"), this._isAdInfoOk = !0, a && a.VAL) {
                    a = this.splitVTVC(a);
                    for (var b = a.VAL, c = 0; c < b.length; c++) this._adsrcs.push(b[c].RS),
                        this._adsecs.push(parseInt(b[c].AL))
                }
                debug.log("frontad len =" + this._adsrcs.length);
                var d = {
                    type: ADConstant.FRONT_AD_INFO_OK,
                    data: {
                        ids: this._advids || [],
                        urls: this._adsrcs,
                        seconds: this._adsecs,
                        info: a,
                        vtvc: this._vtvc || []
                    }
                };
                this.dispatch(d)
            },
            buildPauseData: function () {
                return adinfo = {
                    P: 10,
                    VAL: [{
                        RS: "//static.atm.youku.com/Youku2013/201307/0715/27896/600-430.jpg",
                        RST: "img",
                        AT: 73,
                        SU: [],
                        SUS: [{
                            U: "//mf.atm.youku.com/mshow?v=137006183&at=73&ct=d&cs=1003&ca=135159&ie=150597&uid=1234567&ck=137689524489061H&al=0&bl=1&s=&td=&st=1&vl=1200.0&ap=4&sid=1&cr=0&tvb=0&pr=100&oidtype=27896%7C1&tpa=null&rid=&os=1&dt=1&aw=a&avs="
                        }],
                        SUE: [],
                        CU: "//vid.atm.youku.com/mclick?v=137006183&at=73&ct=d&cs=1003&ca=135159&ie=150597&uid=1234567&ck=137689524489061H&al=0&bl=1&s=&td=&st=1&vl=1200.0&ap=4&sid=1&cr=0&tvb=0&pr=100&oidtype=27896%7C1&tpa=null&rid=&os=1&dt=1&aw=a&avs=&u=http://static.youku.com/pub/youku/fragment/panel_phone.html&md5=f2450cd80597324b57d986147dc1b3a9",
                        W: 400,
                        H: 300,
                        CF: "1"
                    }]
                },
                    adinfo
            },
            adParsePause: function (a) {
                return debug.log("<b> ad parse pause </b>"),
                    LocalStorage.appendItem("phase", "pauseadinfo"),
                    this.reportTime("adinfo"),
                    this._isPauseAdInfoOk = !0,
                    null == a || null == a.VAL || 0 == a.VAL.length || 10 != a.P ? void this.dispatch({
                        type: ADConstant.PAUSE_AD_INFO_ERROR
                    }) : (debug.log("<b>pause ad len = " + a.VAL.length + "</b>"), void this.dispatch({
                        type: ADConstant.PAUSE_AD_INFO_OK,
                        data: {
                            info: a
                        }
                    }))
            },
            frontAd: function () {
                this._param.fu = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0,
                    this._param.p = 7,
                    this._param.callback = ADConstant.AdPluginObject + ".adParse",
                    YK.OLD_M3U8 = !0;
                (YKP.isIPAD || YKP.isMobileIOS) && (debug.log("<font color=red> new m3u8 api</font>"), YK.OLD_M3U8 = !1, this._param.callback = ADConstant.AdPluginObject + ".adParseUnited");
                var a = ADConstant.FRONT_REQUEST_BASE + urlParameter(this._param) + "&ti=" + this._ti + "&k=" + this._k;
                crossDomain(a),
                    this.recordTime("adinfo");
                var b = this;
                setTimeout(function () {
                    b._isAdInfoOk || (debug.log("adinfo timeout"), b.reportTime("adinfo", -1), b.dispatch({
                        type: ADConstant.FRONT_AD_INFO_TIMEOUT,
                        data: {
                            timeout: 8e3
                        }
                    }))
                }, 8e3)
            },
            pauseAd: function () {
                this._param.r_ = parseInt(1e4 * Math.random()),
                    this._param.p = 10,
                    this._param.fu = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0,
                    this._param.callback = ADConstant.AdPluginObject + ".adParsePause";
                var a = ADConstant.PAUSE_REQUEST_BASE + urlParameter(this._param) + "&ti=" + this._ti + "&k=" + this._k;
                crossDomain(a),
                    this.recordTime("adinfo");
                var b = this;
                setTimeout(function (a) {
                    b._isPauseAdInfoOk || (debug.log("pause ad info timeout"), b.reportTime("adinfo", -1), b.dispatch({
                        type: ADConstant.PAUSE_AD_INFO_TIMEOUT,
                        data: {
                            timeout: 8e3
                        }
                    }))
                }, 8e3)
            },
            recordTime: function (a) {
                null == this._timearr && (this._timearr = {}),
                    this._timearr[a] = (new Date).getTime()
            },
            reportTime: function (a, b, c) {
                null == this._timearr && (this._timearr = {});
                var d = {
                        adinfo: "valfload",
                        advideo: "adload"
                    },
                    e = b || (new Date).getTime() - this._timearr[a];
                this.player._reporter.sendUepReport(d[a], e, c)
            },
            backAd: function () {
                this._param.fu = this.player.controls.fullscreenPanel.fullFlag(),
                    this._param.p = 9,
                    this._param.callback = ADConstant.AdPluginObject + ".adParse",
                    this._param.ctu = 0;
                var a = ADConstant.BACK_REQUEST_BASE + urlParameter(this._param) + "&ti=" + this._ti + "&k=" + this._k;
                crossDomain(a);
                var b = this;
                setTimeout(function () {
                    b._isAdInfoOk || (debug.log("adinfo timeout"), b.dispatch({
                        type: ADConstant.BACK_AD_INFO_TIMEOUT,
                        data: {
                            timeout: 5e3
                        }
                    }))
                }, 5e3)
            },
            insertAd: function () {
                this._param.ps = 0,
                    this._param.pt = 0
            }
        };
        var ADReporter = function (a, b) {
            this.adplayer = a,
                this.addata = b,
            "undefined" == typeof b.curnum && (this.addata.curnum = 0)
        };
        ADReporter.prototype = {
            sendSUS: function () {
                var a = this.addata.info.VAL[this.addata.curnum],
                    b = a.SUS;
                if ("undefined" != typeof b) for (var c = 0; c < b.length; c++) {
                    var d = b[c].U;
                    YKP.Log(d)
                }
            },
            sendUnitedVTVC: function (a) {
                a += 2;
                var b = this.addata.info.VAL[0],
                    c = b.VTVC;
                this._vtccache || (this._vtccache = []);
                for (var d = null, e = 1e6, f = 1e5, g = 0; g < c.length; g++) {
                    var h = c[g].U,
                        i = parseInt(c[g].T),
                        j = a - i;
                    j >= 0 && j < f && (f = j, d = h, e = i)
                }
                null != d && this._vtccache.indexOf(e) == -1 && (this._vtccache.push(e), debug.log("<b> vc = " + d + "</b>"), loadjscssfile(d, "js"))
            },
            sendVC: function () {
                var a = this.addata.info.VAL[this.addata.curnum],
                    b = a.VT;
                if ("undefined" != typeof b) {
                    var c = a.VC;
                    loadjscssfile(c, "js")
                }
            },
            sendSUS_: function () {
                var a = this.addata.info,
                    b = this.addata.curnum + 2,
                    c = a["A" + b].SU,
                    d = a["A" + b].ATMSU,
                    e = a["A" + b].ISOSU;
                YKP.Log(c),
                    YKP.Log(d),
                    YKP.Log(e)
            },
            sendSUE: function () {
                var a = this.addata.info.VAL[this.addata.curnum],
                    b = a.SUE;
                if ("undefined" != typeof b) for (var c = 0; c < b.length; c++) {
                    var d = b[c].U;
                    YKP.Log(d)
                }
            },
            sendSUE_: function () {
                var a = this.addata.info,
                    b = this.addata.curnum + 2,
                    c = a["A" + b].OU,
                    d = a["A" + b].COU;
                YKP.Log(c),
                    YKP.Log(d)
            },
            sendSU: function (a) {
                var b = this.addata.info.VAL[this.addata.curnum],
                    c = b.SU;
                if ("undefined" != typeof c) {
                    this._sucache || (this._sucache = []);
                    for (var d = 1e4, e = 1e6, f = 0; f < c.length; f++) {
                        var g = (c[f].U, parseInt(c[f].T)),
                            h = a - g;
                        h >= 0 && h < d && (d = h, e = g)
                    }
                    if (1e6 != e && this._sucache.indexOf(e) == -1) {
                        this._sucache.push(e);
                        for (var f = 0; f < c.length; f++) parseInt(c[f].T) == e && YKP.Log(c[f].U)
                    }
                }
            },
            sendSU_: function (a) {
                curnum += 2;
                var b = this.addata.info["A" + curnum].MT;
                if (b && a >= parseInt(b)) {
                    var c = this.addata.info["A" + curnum].MU,
                        d = this.addata.info["A" + curnum].CMU;
                    YKP.Log(c),
                        YKP.Log(d)
                }
            },
            sendCUM: function () {
                var a = this.addata.info.VAL[this.addata.curnum],
                    b = a.CUM;
                if ("undefined" != typeof b) for (var c = 0; c < b.length; c++) {
                    var d = b[c].U;
                    YKP.Log(d)
                }
            },
            sendUnitedCUM: function (a) {
                var b = this.addata.info.VAL[0],
                    c = b.CUM;
                if ("undefined" != typeof c && 0 !== c.length) for (var d = 0; d < c.length; d++) if (a < parseInt(c[d].T)) {
                    for (var e = 0; e < (c[d].CUM || []).length; e++) YKP.Log(c[d].CUM[e].U);
                    break
                }
            },
            sendCUM_: function () {
                var a = this.addata,
                    b = a.curnum + 2,
                    c = a.info["A" + b].VCU;
                YKP.Log(c)
            }
        };
        var UnitedADPlayer = function (a, b) {
            this._handler = {},
                this.player = a,
                this.video = this.player.video,
                this.controls = this.player.controls,
                this._adplugin = this.player._adplugin,
                this._adplugin.adplayer = this,
                this._addata = b.data.info,
                this.video.preload = "none",
                this.video.src = this._addata.VAL[0].RS,
                debug.log("ad src=" + this.video.src),
                this.video.style.display = "block",
                this._playTag = [],
                this.bindAdEvent(),
                this._adreporter = new ADReporter(this, {
                    curnum: 0,
                    info: this._addata
                })
        };
        UnitedADPlayer.prototype = {
            addEventListener: function (a, b, c) {
                this._handler[a] = b
            },
            removeEventListener: function (a, b, c) {
                this._handler[a] = null
            },
            dispatch: function (a) {
                a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
            },
            bindAdEvent: function () {
                this.bind_fadtoplay = YK.bindAsEventListener(this, this.onPlayClick),
                    this.bind_fadplay = YK.bindAsEventListener(this, this.onAdPlay),
                    this.bind_fadended = YK.bindAsEventListener(this, this.onAdEnded),
                    this.bind_faderror = YK.bindAsEventListener(this, this.onAdError),
                    this.bind_fadpause = YK.bindAsEventListener(this, this.onAdPause),
                    this.bind_fadsuspend = YK.bindAsEventListener(this, this.onAdSuspend),
                    this.bind_fadstalled = YK.bindAsEventListener(this, this.onAdStalled),
                    this.bind_fadseeking = YK.bindAsEventListener(this, this.onAdSeeking),
                    this.bind_fadwaiting = YK.bindAsEventListener(this, this.onAdWaiting),
                    this.bind_fadloadedmetadata = YK.bindAsEventListener(this, this.onAdLoadedMetaData),
                    this.bind_fadtimeupdate = YK.bindAsEventListener(this, this.onAdTimeUpdate),
                    this.bind_fadloadstart = YK.bindAsEventListener(this, this.onAdLoadStart),
                    this.bind_faddurationchange = YK.bindAsEventListener(this, this.onAdDurationChange),
                    this.bind_fadloadeddata = YK.bindAsEventListener(this, this.onAdLoadedData),
                    YK.addEventHandler(this.video, "play", this.bind_fadplay),
                    YK.addEventHandler(this.video, "error", this.bind_faderror),
                    YK.addEventHandler(this.video, "pause", this.bind_fadpause),
                    YK.addEventHandler(this.video, "suspend", this.bind_fadsuspend),
                    YK.addEventHandler(this.video, "stalled", this.bind_fadstalled),
                    YK.addEventHandler(this.video, "seeking", this.bind_fadseeking),
                    YK.addEventHandler(this.video, "waiting", this.bind_fadwaiting),
                    YK.addEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata),
                    YK.addEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate),
                    YK.addEventHandler(this.video, "loadstart", this.bind_fadloadstart),
                    YK.addEventHandler(this.video, "durationchange", this.bind_faddurationchange),
                    YK.addEventHandler(this.video, "loadeddata", this.bind_fadloadeddata),
                    this.shadow = this.controls.buttons.shadow,
                    this.videobtn = this.controls.buttons.videobtn,
                    YK.addEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
            },
            removeAdEvent: function () {
                YK.removeEventHandler(this.video, "play", this.bind_fadplay),
                    YK.removeEventHandler(this.video, "ended", this.bind_fadended),
                    YK.removeEventHandler(this.video, "error", this.bind_faderror),
                    YK.removeEventHandler(this.video, "pause", this.bind_fadpause),
                    YK.removeEventHandler(this.video, "suspend", this.bind_fadsuspend),
                    YK.removeEventHandler(this.video, "stalled", this.bind_fadstalled),
                    YK.removeEventHandler(this.video, "waiting", this.bind_fadwaiting),
                    YK.removeEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate),
                    YK.removeEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata),
                    YK.removeEventHandler(this.video, "loadstart", this.bind_fadloadstart),
                    YK.removeEventHandler(this.video, "durationchange", this.bind_faddurationchange),
                    YK.removeEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
            },
            onPlayClick: function (a) {
                this.video.play()
            },
            play: function () {
                this.video.load(),
                    this.video.play(),
                    YKP.sendLog("m3u8", 0, 0),
                    this.startM3u8Time = (new Date).getTime()
            },
            leftSecond: function () {
                if (this.adInterval) return Math.max(0, this._addata.VAL[0].AL - this._adTime);
                this._adTime = 0,
                    _self = this,
                    this.adInterval = setInterval(function () {
                        !YKP.isUC && !_self.video.paused && _self.video.currentTime > 0 && !_self.video.seeking ? _self._adTime++ : YKP.isUC && _self.video.currentTime > 0 && !_self.video.seeking && _self._adTime++
                    }, 1e3);
                var a = this.video.currentTime;
                return Math.ceil(Math.max(0, this._addata.VAL[0].AL - a))
            },
            clearTimer: function () {
                clearInterval(this._checkTimer),
                    clearInterval(this.adInterval),
                    this._checkTimer = null
            },
            checkPause: function () {
                if (!this._checkTimer) {
                    var a = this;
                    this._timelist = [],
                        this._checkTimer = setInterval(function (b) {
                            return a.video.paused ? void a.onAdPause() : (a._timelist.push(a.video.currentTime), void(a._timelist.length >= 3 && (Math.abs(a._timelist[0] - a._timelist[2]) < 1 && (debug.log("<b>ad unexpected pause</b>"), a.video.play(), 0 == a.leftSecond() && (debug.log("<b>exception left = 0 </b>"), a.onAdEnded())), a._timelist = [])))
                        }, 1e3)
                }
            },
            onAdPlay: function (a) {
                this.checkPause();
                var b = this.controls.buttons.videobtn,
                    c = this.controls.container.poster;
                YK.hide(b),
                    YK.hide(c),
                    YK.hide(YK.get(".x-video-info")),
                    this.video.style.display = "block",
                    this._adplugin.setLeftSecond(this.leftSecond());
                var d = this;
                setTimeout(function () {
                    if (debug.log("ad media timeout check begin = " + d._adBegin), !d._adBegin && d._checkTimer) {
                        d.removeAdEvent(),
                            d._adplugin.hide(),
                            d._adplugin.reportTime("advideo", -1, !1),
                            d.dispatch({
                                type: ADConstant.AD_ERROR,
                                data: !0
                            });
                        var a = (new Date).getTime() - d.startM3u8Time;
                        YKP.sendLog("m3u8", 408, a / 1e3),
                            d.startM3u8Time = 0
                    }
                }, 15e3);
                var e = 0;
                this._playTag[e] || (this._playTag[e] = !0, this._adfirsttu = !1, this._adplugin.recordTime("advideo"), LocalStorage.appendItem("phase", "adplay"))
            },
            uglyClose: function () {
                debug.log("united ugly close"),
                    this.onAdError()
            },
            onAdError: function (a) {
                if (this.removeAdEvent(), this._adplugin.hide(), this._adplugin.reportTime("advideo", -1, !1), this.clearTimer(), this.dispatch({
                        type: ADConstant.AD_ERROR,
                        data: !0
                    }), this.startM3u8Time && 0 === this.video.currentTime) {
                    var b = (new Date).getTime() - this.startM3u8Time;
                    YKP.sendLog("m3u8", 404, b / 1e3),
                        this.startM3u8Time = 0
                } else this.startM3u8Time = 0
            },
            onAdEnded: function (a) {
                debug.log("united ad ended"),
                    this._adreporter.sendSUE(),
                    this.removeAdEvent(),
                    this._adplugin.hide(),
                    this.clearTimer(),
                    this.dispatch({
                        type: ADConstant.AD_END,
                        data: !0
                    }),
                    LocalStorage.appendItem("phase", "adend"),
                    g_cur_num = 0
            },
            onAdPause: function (a) {
                if (!this.player.video.ended) {
                    var b = this.controls.buttons.videobtn;
                    YK.show(b);
                    var c = this.controls.buttons.shadow;
                    YK.hide(c)
                }
            },
            onAdSuspend: function (a) {
            },
            onAdStalled: function (a) {
            },
            onAdWaiting: function (a) {
                this.controls.onWaiting(a)
            },
            onAdTimeUpdate: function (a) {
                var b = this.video.currentTime;
                return !YKP.isUC && this._adTime < this._addata.VAL[0].AL && b - this._adTime > 3 && (this.video.currentTime = this._adTime, this.video.play()),
                    YKP.isUC && b > this._addata.VAL[0].AL ? void this.onAdEnded() : this._adTime > this._addata.VAL[0].AL ? void this.onAdEnded() : (YK.hide(this.controls.buttons.loading), this._adBegin = !0, YK.hide(this.controls.buttons.loading), this._adplugin.setLeftSecond(this.leftSecond()), this._adreporter.sendSU(this.video.currentTime), this._adreporter.sendUnitedVTVC(this.video.currentTime), void(this._adfirsttu || (this._adplugin.show(), this._adreporter.sendSUS(), this._adfirsttu = !0, this._adplugin.reportTime("advideo"), 0 === this._adplugin.SKIP && this.dispatch({
                        type: ADConstant.UGLY_CLOSE_AD_HINT
                    }))))
            },
            onAdLoadedMetaData: function (a) {
                this._adBegin = !0
            },
            onAdLoadStart: function () {
            },
            onAdLoadedData: function () {
            },
            onAdDurationChange: function () {
                if (this._adBegin = !0, this.startM3u8Time > 0) {
                    var a = (new Date).getTime() - this.startM3u8Time;
                    YKP.sendLog("m3u8", 200, a / 1e3),
                        this.startM3u8Time = 0
                }
            },
            onAdClick: function (a) {
                this.video.pause(),
                    this._adreporter.sendUnitedCUM(this.video.currentTime || 0);
                for (var b = this._addata, c = b.VAL[0].CU, d = this.video.currentTime, e = 0; e < c.length; e++) {
                    var f = c[e],
                        g = f.U;
                    if (d <= parseInt(f.T)) {
                        window.open(g, "", "", !1);
                        break
                    }
                }
            },
            onAdSeeking: function () {
            }
        },
            DirectPlayer = function (a) {
                YK.config = a,
                null == YK.config.width && (YK.config.width = $(YK.config.parentBox).offsetWidth),
                    this.buildDirectDom($(YK.config.parentBox))
            },
            DirectPlayer.prototype = {
                buildDirectDom: function (a) {
                    a.innerHTML = "<div id=x-player class=" + cssAdapt(YK.config.width) + '><div class=x-video-poster><img id=x-img></img></div><div class=x-video-button><div class=x-video-play-ico></div></div><div class=x-video-info><h1 class=x-title></h1><div class=x-video-state style="display:none"><span class=x-time-span></span></div><div class=x-showmore></div><div class=x-mask></div></div>'
                },
                bindEvent: function () {
                    this._videobtn = YK.get(".x-video-button"),
                        YK.addEventHandler(this._videobtn, "click", YK.bindAsEventListener(this, this.redirect))
                },
                startPlay: function (a, b) {
                    YK.v = a,
                        YK.videoInfo = b,
                        YK.videoInfo._playListData = a.data,
                        this._pimg = YK.get("#x-img"),
                        this._pimg.src = a.data.video.logo,
                        this._title = YK.get(".x-title"),
                        this._title.innerHTML = a.data.video.title,
                        this._timespan = YK.get(".x-time-span"),
                        this._timespan.innerHTML = YK.getTime(a.data.video.seconds),
                        YK.show(YK.get(".x-video-poster")),
                        YK.show(YK.get(".x-video-info")),
                        this.adapterForReport(),
                        this._reporter = new Reporter(this, YK.v, YK.videoInfo._sid),
                        this.bindEvent()
                },
                onPlayStart: function () {
                    YK.config.events && YK.config.events.onPlayStart && (YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_PLAYING, debug.log(YKP.playerCurrentState), debug.log("api:onplaystart"), YK.config.events.onPlayStart())
                },
                getSrc: function () {
                    return this.src ? this.src : ("m3u8" == YK.config.content ? this.src = YK.videoInfo.src : null != YK.videoInfo._videoSegsDic && null != YK.videoInfo._videoSegsDic[g_playType] && (this.src = YK.videoInfo._videoSegsDic[g_playType][0].src), this.src)
                },
                redirect: function (a) {
                    var b = this.getSrc();
                    debug.log("redirect play src=" + b),
                        YKP.isMIUI ? window.location.href = b : window.open(b, "", "", !1),
                        this.onPlayStart(),
                        this._reporter.addPlayerStaticReport(),
                        this._reporter.addPlayerDurationReport(60),
                        this._reporter.sendTSLog(60),
                        this._reporter.sendUserActionReport("xps", "c"),
                        this._reporter.sendThirdPartyReport("xplayer_dl"),
                        this._reporter.sendClientConsumeReport()
                },
                adapterForReport: function () {
                    this.controls = {
                        fullscreenPanel: {
                            fullFlag: function () {
                                return 1
                            }
                        }
                    },
                        this.video = {
                            src: this.getSrc()
                        },
                        this.getQuality = function () {
                            return "m"
                        }
                }
            },
            loadjscssfile("//static.youku.com/h5/player/res/play.css?ver=" + VER.replace(/[-:]/g, ""), "css");
        var PkH5Player = function (a) {
            this._id = a.id,
                this._pid = a.pid || "",
                this._url = a.url,
                this._box = a.parentBox,
                this._gotInfo = !1,
                a.width = $(a.parentBox).offsetWidth,
                a.height = $(a.parentBox).offsetHeight,
                YK.config = a,
                this.request()
        };
        PkH5Player.prototype = {
            request: function () {
                window.pkinfo = this;
                var a = this._url + "/h5/videos/play.json?vid=" + this._id + "&pid=" + this._pid + "&callback=pkinfo.parse";
                crossDomain(a);
                var b = this;
                setTimeout(function () {
                    1 != b._gotInfo && b.showError()
                }, 5e3)
            },
            parse: function (a) {
                this._gotInfo = !0,
                    0 == a.error ? (this.videoSrc = a.results.url, this.imgSrc = a.results.cover, this.buildDom()) : this.showError()
            },
            buildDom: function () {
                var a = parseInt(YK.config.width),
                    b = "<div id=x-player class=" + this.cssAdapt(a) + ">";
                this.$(this._box).innerHTML = b + "<video class=x-video-player id=youku-html5player-video style=width: 100%; height: 100%; position: relative; display: none; top: -1000px; src=" + this.videoSrc + "></video><div class=x-video-poster><img src=" + this.imgSrc + "></img></div><div class=x-video-loading></div><div id=x-video-button class=x-video-button><div class=x-video-play-ico></div></div></div>",
                    this.video = YK.get(".x-video-player"),
                    this.cover = YK.get(".x-video-poster"),
                    this.videoBtn = YK.get(".x-video-button"),
                    this.loading = YK.get(".x-video-loading"),
                    YK.addEventHandler(this.videoBtn, "click", YK.bindAsEventListener(this, this.onOverBtnClick)),
                    YK.addEventHandler(this.video, "ended", YK.bindAsEventListener(this, this.onEnded)),
                    YK.addEventHandler(this.video, "timeupdate", YK.bindAsEventListener(this, this.onTimeUpdate)),
                    YK.addEventHandler(this.video, "waiting", YK.bindAsEventListener(this, this.onWaiting))
            },
            showError: function () {
                this.$(this._box).innerHTML = '<div style="background:#000; color:#FFF; text-align:center; color: white; line-height:' + $$$(this._box).offsetHeight + 'px " >视频信息出错，请刷新重试</div>'
            },
            onOverBtnClick: function () {
                this.video.play(),
                    this.loading.style.display = "block",
                    this.videoBtn.style.display = "none"
            },
            onEnded: function () {
                this.cover.style.display = "block",
                    this.videoBtn.style.display = "block",
                    this.loading.style.display = "none",
                    this.video.style.display = "none"
            },
            onTimeUpdate: function () {
                "none" != this.loading.style.display && (this.loading.style.display = "none"),
                "block" != this.video.style.display && (this.video.style.display = "block"),
                "none" != this.cover.style.display && (this.cover.style.display = "none")
            },
            onWaiting: function () {
                this.loading.style.display = "block"
            },
            cssAdapt: function (a) {
                return YKP.isIPAD && window.location.href.indexOf("v.youku.com") >= 0 ? "x-player" : a <= 200 ? "x-player x-player-200" : a <= 300 ? "x-player x-player-200-300" : a <= 660 ? "x-player x-player-300-660" : a <= 800 ? "x-player x-player-660-800" : "x-player"
            },
            $: function (a) {
                return document.getElementById(a)
            }
        };
        var VideoControls = function (a, b) {
            this.setting = {
                debug: !1,
                controls: YK.get(".x-console"),
                feedback: YK.get(".x-feedback"),
                container: {
                    poster: YK.get(".x-video-poster")
                },
                buttons: {
                    pointVideo: YK.get("#point-video"),
                    playControl: YK.get(".x-play-control"),
                    play: YK.get("#x-playbtn"),
                    videobtn: YK.get(".x-video-button"),
                    loading: YK.get(".x-video-loading"),
                    videoinfo: YK.get(".x-video-info"),
                    shadow: YK.get(".x-trigger"),
                    currentTime: YK.get(".x-time-current"),
                    totalTime: YK.get(".x-time-duration"),
                    fullscreen: YK.get(".x-fullscreen"),
                    licensNum: YK.get("#js-video-license"),
                    registerNum: YK.get("#js-video-register"),
                    exclusiveLogo: YK.get("#js_exclogo"),
                    resetbtn: YK.get(".x-resetbox")
                },
                classNames: {
                    play: "x-playing",
                    pause: "x-pause"
                },
                init: function () {
                }
            },
                YK.extend(this.setting, b),
                this.player = a,
                this.dashboard = this.setting.controls,
                this.container = this.setting.container,
                this.progressBar = new ProgressBar(a),
                this.progressBar.uCurrentTime = this.setting.buttons.currentTime,
                this.miniProgressBar = new MiniProgressBar(a),
                this.fullscreenPanel = new FullScreenPanel(a),
                this.interactionPanel = new InteractionPanel(a),
                this.xplayer = YK.get("#x-player"),
                this.buttons = this.setting.buttons,
                this.isUserInteracting = !1,
                this.onPointerDownPointerX,
                this.onPointerDownPointerY,
                this.onPointerDownLon,
                this.onPointerDownLat,
                this.mc = 0,
                this.zoom = 50,
                this.dis = 0,
                this.tt = 50,
                this.clickTimer = null,
                this.isFirstPlay = !0
        };
        VideoControls.prototype = {
            init: function (a, b) {
                this.v = a,
                    b.totalTime ? this.buttons.totalTime.innerHTML = YK.getTime(b.totalTime) : this.buttons.totalTime.innerHTML = "00:00",
                    this.resetProgress(),
                    this.buttons.play.className = this.setting.classNames.play;
                var c = this.container.poster.getElementsByTagName("img")[0];
                if (YK.config.poster ? c.src = YK.getSrcProtocol(YK.config.poster) : a.data.trial && "episodes" != a.data.trial.type || a.data.error ? null != a.data.error && a.data.error.code == -203 ? (this.container.poster.style.backgroundColor = "black", c.parentNode.removeChild(c), YK.show(this.container.poster)) : a.data.video.logo && (c.src = YK.getSrcProtocol(a.data.video.logo), this.container.poster.style.display = "block") : (c.src = YK.getSrcProtocol(a.data.video.logo), this.container.poster.style.display = "block"), this.player.isPanorama ? this.hide("fullscreen") : this.hide("resetbtn"), this.player.isError) return void(this._payPanel = new PayPanel(this.player, a));
                this._qualityPanel = new QualityPanel(this.player, a),
                    this._languagePanel = new LanguagePanel(this.player, a),
                    this._playratePanel = new PlayRatePanel(this.player, a),
                    this._payPanel = new PayPanel(this.player, a),
                    this._feedbackPanel = new FeedBackPanel(this.player, a),
                    this._informationPanel = new InformationPanel(this.player, a),
                    this.tipPanel = new TipPanel(this.player, a),
                    this.showlistPanel = new ShowListPanel(this.player, a),
                    this.playLimit = new PlayLimit(this.player, a),
                    this.bindDynamicEvent(),
                "flv" == YK.defaultVideoType && YKP.isAndroid && (this.show(), this.hide("videobtn"), this.ifAndroidFlv = !0);
                var d = b._videoSegsDic.logos;
                a.data.show && a.data.show.exclusive && d && 0 === d[YK.defaultLanguage][YK.defaultVideoType] ? this.show("exclusiveLogo") : this.hide("exclusiveLogo")
            },
            bindDynamicEvent: function () {
                this.bind_mutualHide = YK.bindAsEventListener(this, this.mutualHide),
                    YK.addEventHandler(this._languagePanel, "click", this.bind_mutualHide),
                    YK.addEventHandler(this._qualityPanel, "click", this.bind_mutualHide),
                    YK.addEventHandler(this.showlistPanel, "click", this.bind_mutualHide),
                    YK.addEventHandler(this._playratePanel, "click", this.bind_mutualHide),
                    this.bind_progress = YK.bindAsEventListener(this, this.onProgress),
                    YK.addEventHandler(this.progressBar, "progressing", this.bind_progress),
                    YK.addEventHandler(this.progressBar, "progressend", YK.bindAsEventListener(this, this.onProgressEnd)),
                    YK.addEventHandler(this._languagePanel, "settingdone", YK.bindAsEventListener(this, this.onSettingDone)),
                    YK.addEventHandler(this._qualityPanel, "settingdone", YK.bindAsEventListener(this, this.onSettingDone)),
                    YK.addEventHandler(this._playratePanel, "settingdone", YK.bindAsEventListener(this, this.onSettingDone)),
                    YK.addEventHandler(this._languagePanel, "settingshow", YK.bindAsEventListener(this, this.onSettingShow)),
                    YK.addEventHandler(this._qualityPanel, "settingshow", YK.bindAsEventListener(this, this.onSettingShow)),
                    YK.addEventHandler(this._playratePanel, "settingshow", YK.bindAsEventListener(this, this.onSettingShow)),
                    YK.addEventHandler(this._languagePanel, "settinghide", YK.bindAsEventListener(this, this.onSettingHide)),
                    YK.addEventHandler(this._qualityPanel, "settinghide", YK.bindAsEventListener(this, this.onSettingHide)),
                    YK.addEventHandler(this._playratePanel, "settinghide", YK.bindAsEventListener(this, this.onSettingHide)),
                    YK.addEventHandler(this.fullscreenPanel, "enterfullscreen", YK.bindAsEventListener(this, this.onEnterFullScreen)),
                    YK.addEventHandler(this.fullscreenPanel, "exitfullscreen", YK.bindAsEventListener(this, this.onExitFullScreen))
            },
            retimer: function (a) {
                debug.log("retimer"),
                    this.autoHideDashBoard()
            },
            hideDashBoard: function () {
                var a = this.setting.controls,
                    b = this._payPanel,
                    c = this._informationPanel,
                    d = this.miniProgressBar,
                    e = (this.tipPanel, this.interactionPanel),
                    f = this._languagePanel;
                a.style.display = "none",
                    d.show(),
                    b.hide(),
                    c.hide(),
                    e.hideStatus(),
                    f.hide(),
                    this._qualityPanel.hide(),
                    this._playratePanel.hide()
            },
            autoHideDashBoard: function (a) {
                this.dashboardTimer && clearTimeout(this.dashboardTimer);
                var b = a || 2e3,
                    c = this;
                this.dashboardTimer = setTimeout(function (b) {
                    var d = YK.get(".x-showlist");
                    return d && "block" == d.style.display ? void c.autoHideDashBoard(a) : void(c.player.video.paused || c.hideDashBoard())
                }, b)
            },
            onMultiTouch: function (a) {
            },
            showUglyHint: function () {
            },
            closeUglyHint: function () {
            },
            showBoardInfo: function () {
                YK.show(this.setting.controls),
                    this.miniProgressBar.hide(),
                    this._informationPanel.show(),
                this._payPanel.hasPayInfo() && this._payPanel.show()
            },
            toggleDashBoard: function (a) {
                if (!("touchend" == a.type && a.changedTouches.length > 1)) {
                    this._sx = this._sx || 0,
                        this._sy = this._sy || 0,
                        a.changedTouches = a.changedTouches || [{
                                clientX: this._sx,
                                clientY: this._sy
                            }];
                    var b = {
                            x: this._sx,
                            y: this._sy
                        },
                        c = {
                            x: a.changedTouches[0].clientX,
                            y: a.changedTouches[0].clientY
                        };
                    if (!this._stmtag && 1 !== this._sactionType && this.isTouchTooShort(b, c, 100)) {
                        var d = this.setting.controls,
                            e = d.style.display;
                        "none" == e || "" == e ? (this.player._reporter.sendUserActionReport("xcd", "c"), this.showBoardInfo(), this.autoHideDashBoard(), g_db_show_time = (new Date).getTime()) : (this.player._reporter.sendUserActionReport("xhd", "c"), clearTimeout(this.dashboardTimer), this.hideDashBoard())
                    }
                }
            },
            bindAdVideoBtnEvent: function () {
                YK.addEventHandler(this.buttons.videobtn, "touchstart", YK.bindAsEventListener(this, this.onVideoBtnTouchStart)),
                    YK.addEventHandler(this.buttons.videobtn, "touchend", YK.bindAsEventListener(this, this.onVideoBtnTouchEnd)),
                this.ifAndroidFlv && (YK.addEventHandler(this.buttons.playControl, "touchstart", YK.bindAsEventListener(this, this.onVideoBtnTouchStart)), YK.addEventHandler(this.buttons.playControl, "touchend", YK.bindAsEventListener(this, this.onVideoBtnTouchEnd)))
            },
            bindVideoBtnEvent: function () {
                YK.addEventHandler(this.buttons.videobtn, "click", YK.bindAsEventListener(this, this.onVideoBtnClick), !0)
            },
            bindEvent: function () {
                debug.log("bind event"),
                    this.bind_uireinit = YK.bindAsEventListener(this, this.uiInit),
                    this.bind_play = YK.bindAsEventListener(this, this.play),
                    this.bind_redirect = YK.bindAsEventListener(this, this.redirect),
                    this.bind_showTimeTip = YK.bindAsEventListener(this, this.showTimeTip),
                    this.bind_hideTimeTip = YK.bindAsEventListener(this, this.hideTimeTip),
                    this.bind_changeVolume = YK.bindAsEventListener(this, this.changeVolume),
                    this.bind_toggleVolume = YK.bindAsEventListener(this, this.toggleVolume),
                    this.bind_gestureChange = YK.bindAsEventListener(this, this.onGestureChange),
                    this.bind_toggleDashBoard = YK.bindAsEventListener(this, this.toggleDashBoard),
                    this.bind_retimer = YK.bindAsEventListener(this, this.retimer),
                    YK.addEventHandler(this.progressBar, "click", this.bind_uireinit),
                    YK.addEventHandler(this.setting.controls, "click", this.bind_retimer),
                    YK.addEventHandler(this.setting.controls, "touchstart", this.bind_retimer),
                    YK.addEventHandler(this.buttons.playControl, "click", this.bind_play),
                "directsrc" != YK.config.playType || (YKP.isSupportH5M3U8 ? YK.addEventHandler(this.buttons.videobtn, "click", YK.bindAsEventListener(this, this.playIPH), !0) : YK.addEventHandler(this.buttons.videobtn, "click", this.bind_redirect, !0)),
                    this.player.isPanorama ? (YK.addEventHandler(this.buttons.shadow, "touchstart", YK.bindAsEventListener(this, this.touchStartPano)), YK.addEventHandler(this.buttons.shadow, "touchmove", YK.bindAsEventListener(this, this.touchMovePano)), YK.addEventHandler(this.buttons.shadow, "touchend", YK.bindAsEventListener(this, this.touchEndPano)), YK.addEventHandler(this.buttons.resetbtn, "click", YK.bindAsEventListener(this, this.resetPano))) : (YK.addEventHandler(this.buttons.shadow, "touchstart", YK.bindAsEventListener(this, this.shadowTouchStart)), YK.addEventHandler(this.buttons.shadow, "touchmove", YK.bindAsEventListener(this, this.shadowTouchMove)), YK.addEventHandler(this.buttons.shadow, "touchend", YK.bindAsEventListener(this, this.shadowTouchEnd))),
                    YK.addEventHandler(this.buttons.shadow, "click", this.bind_toggleDashBoard),
                    YK.addEventHandler(this.buttons.shadow, "touchend", YK.bindAsEventListener(this, this.onMultiTouch)),
                    YK.addEventHandler(this.buttons.shadow, "gesturechange", this.bind_gestureChange)
            },
            removeEvent: function () {
                debug.log("remove event begin"),
                    YK.removeEventHandler(this.progressBar, "click", this.bind_uireinit),
                    YK.removeEventHandler(this.buttons.playControl, "click", this.bind_play),
                    YK.removeEventHandler(this.buttons.shadow, "click", this.bind_toggleDashBoard),
                this.player.isPanorama && (YK.removeEventHandler(this.buttons.shadow, "touchstart", YK.bindAsEventListener(this, this.touchStartPano)), YK.removeEventHandler(this.buttons.shadow, "touchmove", YK.bindAsEventListener(this, this.touchMovePano)), YK.removeEventHandler(this.buttons.shadow, "touchend", YK.bindAsEventListener(this, this.touchEndPano)), YK.removeEventHandler(this.buttons.resetbtn, "click", YK.bindAsEventListener(this, this.resetPano))),
                    YK.removeEventHandler(this.progressBar, "touchstart", this.bind_uireinit),
                    YK.removeEventHandler(this._languagePanel, "click", this.bind_mutualHide),
                    YK.removeEventHandler(this._qualityPanel, "click", this.bind_mutualHide),
                    YK.removeEventHandler(this._playratePanel, "click", this.bind_mutualHide),
                    this.progressBar.removeEvent(),
                    this.fullscreenPanel.removeEvent(),
                    this._languagePanel.removeEvent(),
                    this._qualityPanel.removeEvent(),
                    debug.log("remove event end")
            },
            onGestureChange: function (a) {
                a.preventDefault();
                var b = this.fullscreenPanel.zoomStatus().indexOf("in") !== -1;
                (a.scale > 1.1 && b || a.scale < .9 && !b) && (a.method = "m", this.fullscreenPanel.switchFullScreen(a))
            },
            toggleVolume: function (a) {
            },
            changeVolume: function (a) {
            },
            rePlay: function (a) {
                debug.log("replay"),
                    this.player._reporter.sendUserActionReport("xrp", "c"),
                    g_isVEnded = !1,
                    this._recommend = YK.get(".x-recommend"),
                this._recommend && YK.get("#x-player").removeChild(this._recommend),
                    this.resetProgress(),
                    this._first = !1,
                    this.player.replay(),
                    debug.log("replay func end")
            },
            redirect: function (a) {
                this.isFirstPlay && (this.isFirstPlay = !1, this.player._reporter.addPlayerDurationReport(59)),
                    this.player.redirect(a)
            },
            hideFacade: function () {
                var a = this.buttons.videobtn,
                    b = this.container.poster;
                YK.hide(a),
                    YK.hide(b),
                    YK.hide(YK.get(".x-feedback")),
                    debug.log("<font color=blue>hide facade</font>")
            },
            hideVideobtn: function () {
                var a = this.buttons.videobtn;
                YK.hide(a)
            },
            onVideoBtnTouchStart: function (a) {
                this._vtsx = a.targetTouches[0].clientX,
                    this._vtsy = a.targetTouches[0].clientY
            },
            onVideoBtnTouchEnd: function (a) {
                return !this.ifAndroidFlv && this.isFirstPlay && (this.isFirstPlay = !1, this.player._reporter.addPlayerDurationReport(59)),
                    debug.log("<font color=red>video btn clicked</font>"),
                YK.config.events && YK.config.events.onAdPlayStart && YK.config.events.onAdPlayStart(YK.v.data),
                    a = a || {},
                    g_isVEnded ? void this.rePlay() : a && a.changedTouches && Math.abs(a.changedTouches[0].clientY - this._vtsy) > 50 ? void debug.log("videobtn too long y") : (this.player._reporter.sendUserActionReport("xps", "c"), void(this._hasAdReq !== !0 && (this._hasAdReq = !0, this.hideFacade(), debug.log("active src=" + this.player.video.src), this.player.video.load(), this.player.requestAd())))
            },
            onVideoBtnClick: function (a) {
                return !this.ifAndroidFlv && this.isFirstPlay && (this.isFirstPlay = !1, this.player._reporter.addPlayerDurationReport(59)),
                YK.config.events && YK.config.events.onAdPlayStart && YK.config.events.onAdPlayStart(YK.v.data),
                YKp.isSupportH5M3U8 && null != YK.v.data.trial && (this.player.video.style.display = "block"),
                    g_isVEnded ? void this.rePlay() : void(YK.v.data.trial && "episodes" != YK.v.data.trial.type && 0 == YK.v.data.trial.time || (this.player.video.load(), this.player.video.play()))
            },
            playIPH: function (a) {
                if (this.isFirstPlay && (this.isFirstPlay = !1, this.player._reporter.addPlayerDurationReport(59)), !this.iphTag) {
                    this.player.video.load();
                    var b = this;
                    this.player.video.addEventListener("timeupdate", function (a) {
                        4 == a.target.readyState && (b.iphTag = !0)
                    })
                }
                this.player.video.play()
            },
            play: function (a) {
                if (a = a || {}, this.isFirstPlay && (this.isFirstPlay = !1, this.player._reporter.addPlayerDurationReport(59)), g_isVEnded) return void this.rePlay();
                var b = this.player.video.paused;
                debug.log("m3u8 isPause = " + b + " e = " + a),
                    b ? (0 === this._payPanel.activeTime ? (this._payPanel.activeTime = -1, this.player.seek(0)) : this.player.video.play(), this.player._reporter.sendUserActionReport("xpl", "c"), this.interactionPanel.setStatus("播放"), this.checkPauseAd()) : (this.player.video.pause(), this.player._reporter.sendUserActionReport("xpa", "c"), this.interactionPanel.setStatus("暂停"), this.checkPauseAd())
            },
            isProperWH: function (a, b) {
                var c = YK.get("#x-player");
                return c.offsetWidth >= a && c.offsetHeight >= b
            },
            isNeedPauseAd: function () {
                return this.player.video.paused && YK.isLandScape()
            },
            checkPauseAd: function () {
                return this.isNeedPauseAd() ? (this._pauseAdPlugin = new AdPlugin(this.player, YK.v, YK.videoInfo._sid), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_OK, YK.bindAsEventListener(this, this.onPauseAdInfoOK)), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_TIMEOUT, YK.bindAsEventListener(this, this.onPauseAdInfoTimeout)), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_ERROR, YK.bindAsEventListener(this, this.onPauseAdInfoERROR)), window[ADConstant.AdPluginObject] = this._pauseAdPlugin, this._pauseAdPlugin.pauseAd(), void debug.log("send pause ad request<br/>")) : (debug.log("<font color=blue> donot need pause ad </font>"), void this.hidePauseAd())
            },
            hidePauseAd: function () {
                YK.hide(YK.get(".x-ad-pause"))
            },
            onPauseAdInfoOK: function (a) {
                debug.log("pause info ok"),
                this._pauseAdStart || (this._pauseAdStart = !0),
                    this._pauseAdPlayer = new PauseAdPlayer(this.player, a),
                    this._pauseAdPlayer.play()
            },
            onPauseAdInfoTimeout: function (a) {
                debug.log("pause info timeout = " + a.data.timeout),
                this._pauseAdStart || (this._pauseAdStart = !0)
            },
            onPauseAdInfoERROR: function (a) {
                debug.log("<font color=blue>pause info error no info</font>"),
                this._pauseAdStart || (this._pauseAdStart = !0)
            },
            autoShow: function (a) {
                this.show();
                var b = this;
                setTimeout(function () {
                    b.hide()
                }, 5e3)
            },
            mutualHide: function (a) {
                a._target == this._languagePanel ? (this._qualityPanel.hide(!0), this._playratePanel.hide(!0), this.showlistPanel.hide()) : a._target == this._qualityPanel ? (this._languagePanel.hide(!0), this._playratePanel.hide(!0), this.showlistPanel.hide()) : a._target == this.showlistPanel ? (this._qualityPanel.hide(!0), this._languagePanel.hide(!0), this._playratePanel.hide(!0)) : a._target == this._playratePanel && (this._qualityPanel.hide(!0), this._languagePanel.hide(!0), this.showlistPanel.hide())
            },
            show: function (a) {
                return a ? void YK.show(this.buttons[a]) : void YK.show(this.setting.controls)
            },
            hide: function (a) {
                a ? YK.hide(this.buttons[a]) : YK.hide(this.setting.controls)
            },
            backAdPrepare: function () {
                this.dashboard.style.display = "none",
                    this.buttons.shadow.style.display = "none",
                    this.buttons.videobtn.style.display = "block"
            },
            onEnded: function (a) {
                return this.ifAndroidFlv ? (this.hide("videobtn"), this.showBoardInfo(), this.hide("videobtn")) : (this.dashboard.style.display = "none", this.buttons.shadow.display = "none", this.buttons.videobtn.style.display = "block", this.container.poster.style.display = "block"),
                    this._informationPanel.show(),
                    this.miniProgressBar.hide(),
                    this.interactionPanel.hide(),
                    YK.v.data.trial ? void(this.playLimit.isLimit() ? this.playLimit.create() : (this._payPanel.activeTime = 0, this._payPanel.showTip())) : void(0 != YK.initConfig.show_related && (this._relatedPanel = new RelatedPanel(this.player, YK.v)))
            },
            onPlay: function () {
                this.player.video.style.display = "block",
                    this.buttons.play.className = this.setting.classNames.pause,
                    this.buttons.videobtn.style.display = "none",
                    this.container.poster.style.display = "none",
                    this.hidePauseAd(),
                    this.buttons.shadow.style.display = "block",
                    this._recommend = YK.get(".x-recommend"),
                this._recommend && YK.get("#x-player").removeChild(this._recommend),
                    g_isVEnded = !1,
                this._first || (this._first = !0, this._informationPanel.show(), this.setting.controls.style.display = "block", this._payPanel.hasPayInfo() && this._payPanel.show()),
                    this.autoHideDashBoard(5e3)
            },
            onPause: function () {
                this.buttons.play.className = this.setting.classNames.play,
                    YK.hide(this.buttons.loading),
                this.interactionPanel.isVisible() || (this.showBoardInfo(), this.interactionPanel.setStatus("暂停"))
            },
            onWaiting: function (a) {
                this.player.video.paused || "none" == this.buttons.videobtn.style.display && (this.buttons.loading.style.display = "block")
            },
            onTryPlayEnded: function (a) {
                debug.log("try end");
                var b = this.player.video;
                this.player.video.pause(),
                    g_isVEnded = !0,
                    this.onEnded({
                        target: b
                    });
                var c = this;
                setTimeout(function () {
                    c.dashboard.style.display = "none",
                        c.buttons.shadow.style.display = c.ifAndroidFlv ? "block" : "none",
                        c.interactionPanel.hide()
                }, 1e3)
            },
            onTimeUpdate: function (a) {
                this.buttons.loading.style.display = "none";
                var b = this.player.video;
                if (a.target == b) {
                    var c = this.player.currentTime;
                    if (4 == a.target.readyState && this.setProgress(c), this._payPanel.hasPayInfo() && c >= this._payPanel.tryDuration()) return void this.onTryPlayEnded();
                    this.playLimit.isLimit() && c >= this.playLimit.limitTime() && this.playLimit.create()
                }
            },
            checkPlayLimit: function () {
                var a = !1;
                return a = YK.v.data.trial ? this.player.currentTime >= YK.v.data.trial.time : this.player.currentTime >= this.playLimit.limitTime(),
                !(!this.playLimit.isLimit() || !a) && (this.playLimit.create(), !0)
            },
            removeControls: function () {
                this.video.controls = !1
            },
            loadControls: function () {
                this.video.controls = !0
            },
            setProgress: function (a) {
                a = Math.min(Math.max(a, 0), YK.videoInfo.totalTime),
                    this.progressBar.setProgress(a),
                    this.miniProgressBar.setProgress(a);
                var b = this.progressBar.playTime;
                this.buttons.currentTime.innerHTML = YK.getTime(b)
            },
            resetProgress: function () {
                this.progressBar.resetProgress(),
                    this.miniProgressBar.resetProgress(),
                    this.buttons.currentTime.innerHTML = "00:00"
            },
            hideTimeTip: function (a) {
                return a.srcElement.id != this.buttons.progressHandler.id && void(this.buttons.progressTime.style.display = "none")
            },
            showTimeTip: function (a) {
                if (a.srcElement.id == this.buttons.progressHandler.id) return !1;
                if (a.srcElement.id == this.buttons.progressTime.id) return !1;
                if (a.srcElement.id == this.buttons.pointVideo.id) return !1;
                var b = a.offsetX,
                    c = this.buttons.progressBar.offsetWidth,
                    d = b / c,
                    e = d * YK.videoInfo.totalTime,
                    f = YK.getTime(e);
                this.buttons.progressTime.innerHTML = f,
                    this.buttons.progressTime.style.left = 100 * Math.min(Math.max(d, .023), .977) + "%",
                    this.buttons.progressTime.style.display = "block"
            },
            shadowTouchStart: function (a) {
                return a.targetTouches.length > 1 ? void this.interactionPanel.hide() : (this._sx = a.targetTouches[0].clientX, this._sy = a.targetTouches[0].clientY, this._smx = this._sx, this._smy = this._sy, this._presmx = this._sx, this._presmy = this._sy, this._deltaxs = [], this._stime = this.player.currentTime || 0, this._ttime = this._stime, this._stmtag = !1, this._spretag = !1, this._sactionTime = (new Date).getTime(), this._presmt = this._sactionTime, this._sactionType = 0, void(this._stmlrtag = 0))
            },
            shadowTouchMove: function (a) {
                if (a.targetTouches.length > 1) return void this.interactionPanel.hide();
                this._smx = a.targetTouches[0].clientX,
                    this._smy = a.targetTouches[0].clientY,
                    this._smt = (new Date).getTime();
                var b = 100,
                    c = Math.abs(this._smx - this._sx),
                    d = Math.abs(this._smy - this._sy),
                    e = this._smt - this._sactionTime;
                if (0 === this._stmlrtag && (c > d ? this._stmlrtag = 1 : this._stmlrtag = -1), 1 == this._stmlrtag && a.preventDefault(), 1 != this._sactionType) {
                    if (c > b && c > d && e < 500) {
                        debug.log("quick seek moving"),
                            this.player.video.pause(),
                            this._sactionType = 1;
                        var e = this._smx > this._sx ? 30 : -30;
                        return this.interactionPanel.setTip(this._stime, e),
                            void this.interactionPanel.show()
                    }
                    c < b + 100 && d < b && e > 1e3 && (this._spretag = !0),
                    (this._spretag && c > d || this._stmtag) && (debug.log("stmtag =" + this._stmtag), this._sactionType = 2, this._stmtag = !0, this.player.video.pause(), this.dragging(a))
                }
            },
            shadowTouchEnd: function (a) {
                if (a.changedTouches.length > 1) return void this.interactionPanel.hide();
                if (this.adrAdapt(a), this.isShadowTouchTooShort() && !this._stmtag && 1 != this._sactionType) return void debug.log("too short or horizontal");
                var b = Math.abs(this._smy - this._sy) > Math.abs(this._smx - this._sx) ? "xdud" : "xdlr";
                if (debug.log("shadow action = " + b), this.player._reporter.sendUserActionReport(b, "d"), 2 == this._sactionType) return debug.log("<br/><b>normal seek</b>"),
                    this.player.video.play(),
                    this.player.seek(this._ttime),
                    this.interactionPanel.hide(),
                    void this.player._reporter.sendUserActionReport("xtseek", "d");
                if (1 == this._sactionType) {
                    var c = this._smx - this._sx > 0 ? 30 : -30;
                    debug.log("<br/><font color=red>quick seek deltat = " + c + " cur=" + this._stime + "</font>"),
                        this.setProgress(this._stime + c);
                    return this.interactionPanel.setTip(this._stime, c),
                        this.interactionPanel.show(),
                        this.interactionPanel.autoHide(),
                        this.player.video.play(),
                        this.player.seek(this._stime + c),
                        this.player._reporter.sendUserActionReport("xqseek", "d"),
                        void debug.log("<br/>")
                }
            },
            dragging_: function (a) {
                var b = this._smx - this._presmx,
                    c = (this._smt - this._presmt, b > 10 ? b / 2 : b);
                this._deltaxs.push(c),
                    c = 0;
                for (var d = 0; d < this._deltaxs.length; d++) c += this._deltaxs[d];
                var e = c / a.currentTarget.offsetWidth,
                    f = e * YK.videoInfo.totalTime,
                    g = Math.min(Math.max(f + this._stime, 0), YK.videoInfo.totalTime);
                this.setProgress(g),
                    this.interactionPanel.show(),
                    this._ttime = g,
                    this._presmx = this._smx,
                    this._presmy = this._smy,
                    this._presmt = this._smt
            },
            dragging: function (a) {
                var b = (this._smx - this._sx) / a.currentTarget.offsetWidth,
                    c = 60 * b,
                    d = Math.min(Math.max(c + this._stime, 0), YK.videoInfo.totalTime);
                this.setProgress(d),
                    this.interactionPanel.setTip(this._ttime, d - this._ttime),
                    this.interactionPanel.show(),
                    this._ttime = d,
                    this._presmx = this._smx,
                    this._presmy = this._smy,
                    this._presmt = this._smt
            },
            onProgress: function (a) {
                var b = a.st || 0,
                    c = a.dt || 0;
                this.interactionPanel.setTip(b, c),
                    this.interactionPanel.show()
            },
            onProgressEnd: function (a) {
                this.interactionPanel.hide()
            },
            onSettingDone: function (a) {
                this.interactionPanel.setStatus("设置成功")
            },
            onSettingShow: function (a) {
                debug.log("<b>setting show</b>"),
                    clearTimeout(this.pbarClickTimer),
                    this.progressBar.removeClickEvent()
            },
            onSettingHide: function (a) {
                debug.log("<b>setting hide</b>");
                var b = this;
                this.pbarClickTimer = setTimeout(function (a) {
                    b.progressBar.addClickEvent()
                }, 1e3)
            },
            onEnterFullScreen: function (a) {
                YKP.isIPAD && YK.addClass(this.setting.controls, "x-fs-console")
            },
            onExitFullScreen: function (a) {
                YKP.isIPAD && YK.removeClass(this.setting.controls, "x-fs-console")
            },
            adrAdapt: function (a) {
                YKP.isAndroid && (this._smx = a.changedTouches[0].clientX, this._smy = a.changedTouches[0].clientY, debug.log("<hr/>adr smy= " + this._smy + " y = " + this._sy))
            },
            isShadowTouchTooShort: function (a) {
                var b = {
                        x: this._sx,
                        y: this._sy
                    },
                    c = {
                        x: this._smx,
                        y: this._smy
                    };
                return this.isTouchTooShort(b, c, a)
            },
            isTouchTooShort: function (a, b, c) {
                var d = Math.abs(b.x - a.x);
                d = d || 1e-6;
                var e = Math.abs(b.y - a.y);
                e = e || 1e-6,
                    debug.log(d + "," + e);
                var f = c || 100;
                return d < f && e < f
            },
            showShowListBtn: function () {
                this.showlistPanel.showListBtn()
            },
            hideShowListBtn: function () {
                this.showlistPanel.hideListBtn()
            },
            showLastTimeTip: function (a) {
                a <= 0 || this.tipPanel.showLastTimeTip(a)
            },
            uiInit: function (a) {
                debug.log("uiInit"),
                g_isVEnded && (g_isVEnded = !1, this.buttons.videobtn.style.display = "block")
            },
            onResize: function (a) {
                var b = $(YK.config.parentBox).offsetWidth,
                    c = $(YK.config.parentBox).offsetHeight;
                if (b && c && YK.resizeTag) {
                    var d = this.xplayer.className;
                    this.xplayer && (d.indexOf("fullscreen") === -1 ? this.xplayer.className = cssAdapt(b) : (b = window.innerWidth, this.xplayer.className = cssAdapt(b) + " x-player-fullscreen")),
                    this._relatedPanel && this._relatedPanel.onResize(a)
                }
            },
            showRegisterNum: function () {
                this.v.data.show && this.v.data.show.license_num && (this.buttons.licensNum.innerHTML = this.v.data.show.license_num, this.buttons.licensNum.style.display = "block"),
                this.v.data.show && this.v.data.show.youku_register_num && (this.buttons.registerNum.innerHTML = this.v.data.show.youku_register_num, this.buttons.registerNum.style.display = "block")
            },
            hideRegisterNum: function () {
                this.buttons.licensNum.style.display = "none",
                    this.buttons.registerNum.style.display = "none"
            },
            touchStartPano: function (a) {
                a.preventDefault(),
                    this._sx = a.targetTouches[0].clientX,
                    this._sy = a.targetTouches[0].clientY,
                    this.isUserInteracting = !0,
                    this.onPointerDownPointerX = a.touches[0].pageX,
                    this.onPointerDownPointerY = a.touches[0].pageY,
                    this.onPointerDownLon = this.player.panoramaPanel.lon,
                    this.onPointerDownLat = this.player.panoramaPanel.lat,
                2 == a.touches.length && (this.dis = Math.abs(a.touches[1].pageX - a.touches[0].pageX))
            },
            touchMovePano: function (a) {
                if (this.isUserInteracting === !0 && (1 == a.touches.length && (this.mc = a.touches[0].pageX, this.player.panoramaPanel.lon = .2 * (this.onPointerDownPointerX - a.touches[0].pageX) + this.onPointerDownLon, this.player.panoramaPanel.lat = .2 * (a.touches[0].pageY - this.onPointerDownPointerY) + this.onPointerDownLat), 2 == a.touches.length)) {
                    var b = Math.abs(a.touches[1].pageX - a.touches[0].pageX) - this.dis;
                    this.tt = this.zoom - .1 * b,
                    this.tt > 160 && (this.tt = 160),
                    this.tt < 35 && (this.tt = 35),
                        this.player.panoramaPanel.camera12.fov = this.tt,
                        this.player.panoramaPanel.camera12.updateProjectionMatrix(),
                        this.player.panoramaPanel.renderer.render(this.player.panoramaPanel.scene, this.player.panoramaPanel.camera12),
                        this.player.panoramaPanel.camera13.fov = this.tt,
                        this.player.panoramaPanel.camera13.updateProjectionMatrix(),
                        this.player.panoramaPanel.renderer.render(this.player.panoramaPanel.scene, this.player.panoramaPanel.camera13)
                }
            },
            touchEndPano: function (a) {
                this.player.panoramaPanel.lon == this.onPointerDownLon,
                    this.isUserInteracting = !1
            },
            resetPano: function (a) {
                var b = this,
                    c = this.player.panoramaPanel.lon,
                    d = this.player.panoramaPanel.lat;
                this.buttons.resetbtn.setAttribute("class", "x-resetbox x-reseting"),
                    this.player.panoramaPanel.lon = 0 == c ? c : 0,
                    this.player.panoramaPanel.lat = 0 == d ? d : 0,
                    this.player.panoramaPanel.camera12.fov = 75,
                    this.player.panoramaPanel.camera12.updateProjectionMatrix(),
                    this.player.panoramaPanel.renderer.render(this.player.panoramaPanel.scene, this.player.panoramaPanel.camera12),
                    this.player.panoramaPanel.camera13.fov = 75,
                    this.player.panoramaPanel.camera13.updateProjectionMatrix(),
                    this.player.panoramaPanel.renderer.render(this.player.panoramaPanel.scene, this.player.panoramaPanel.camera13),
                    setTimeout(function () {
                        b.buttons.resetbtn.setAttribute("class", "x-resetbox")
                    }, 200)
            }
        };
        var VideoPlayer = function (a, b) {
            this.video = YK.get("#youku-html5player-video"),
                this._startPlayTime = -1,
                this._waitTry = 0,
                this.currentTime = 0
        };
        VideoPlayer.prototype = {
            getVideo: function () {
                return "m3u8" == YK.config.content ? this.video : this.video
            },
            show: function () {
                YK.show(this.video)
            },
            hide: function () {
                YK.hide(this.video)
            },
            play: function () {
                return YK.v && YK.v.data.trial && 0 == YK.v.data.trial.time ? void debug.log("<b> trial time = 0  </b>") : void this.video.play()
            },
            pause: function () {
                this.video.pause()
            },
            setupControls: function (a) {
                return this.controls && this.controls.removeEvent(),
                    new VideoControls(a)
            },
            hideControls: function () {
                this.controls.hide()
            },
            showControls: function () {
                this.controls.show()
            },
            removeControls: function () {
                this.controls.removeControls()
            },
            loadControls: function () {
                this.controls.loadControls()
            },
            retry: function (a, b) {
            },
            showError: function (a) {
                this.errorBox || (this.errorBox = document.createElement("div"), this.errorBox.style.cssText = "position:absolute;width:100%;top:50%;display:none;text-align:center;", this.video.parentNode.appendChild(this.errorBox)),
                    this.errorBox.innerHTML = a,
                    this.errorBox.style.marginTop = "-" + this.errorBox.offsetHeight / 2 + "px",
                    this.errorBox.style.display = "block"
            },
            onLoadStart: function () {
            },
            onCanPlay: function (a) {
            },
            onLoadedData: function (a) {
            },
            onLoadedMetaData: function (a) {
            },
            onAbort: function () {
            },
            onError: function (a) {
                if (this._reporter.sendUserActionReport("xve", "e"), this._reporter.sendUepReport("videoload", -1, !1), this.video.src.indexOf("m3u8") !== -1 && this.startM3u8Time > 0 && !this.video.currentTime) {
                    var b = (new Date).getTime() - this.startM3u8Time;
                    YKP.sendLog("m3u8", 404, b / 1e3),
                        this.startM3u8Time = 0
                }
                if (this._retry-- >= 0) return this.video.src.indexOf("m3u8") !== -1 && (this.vid ? this.video.src = YK.m3u8src_v2(this.vid, YK.defaultVideoType, 1) : this.video.src = YK.m3u8src_v2(YK.v.data.video.encodeid, YK.defaultVideoType, 1)),
                    debug.log("video onerror retry it ,time=" + this.currentTime + " src=" + this.video.src),
                    this.video.load(),
                    this.video.play(),
                this.video.src.indexOf("m3u8") !== -1 && (YKP.sendLog("m3u8", 0, 0), this.startM3u8Time = (new Date).getTime()),
                    void this.seek(this.currentTime);
                if (!(this.isOnePiece() && 1 == this.controls.checkPlayLimit() || (YKP.sendErrorReport(2001), this._errorTag))) {
                    this._errorTag = !0,
                    YK.playerEvents && YK.playerEvents.onPlayError && YK.playerEvents.onPlayError("抱歉，视频出错，请刷新");
                    var c = YK.get("#x-player");
                    c.innerHTML = "抱歉，视频出错，请刷新",
                        c.style.textAlign = "center",
                        c.style.color = "white",
                        c.style.lineHeight = c.offsetHeight + "px"
                }
            },
            onPause: function (a) {
                this.controls.onPause()
            },
            onPlayIPH: function (a) {
                return debug.log("onplayiph"),
                    this._firstPlayTag ? void(1 == this._endedIPH && (this._reporter.tsInit(), this._reporter.sendTSLog(60), this._reporter.addPlayerDurationReport(62), this._reporter.addPlayerDurationReport(60))) : (this._firstPlayTag = !0, this.onPlayStart(), this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(60), this._reporter.sendTSLog(60), this._reporter.sendUserActionReport("xps", "c"), this._reporter.sendLoadedTime(3), this._reporter.sendThirdPartyReport("xplayer_iph"), void this._reporter.sendClientConsumeReport())
            },
            onTimeUpdateIPH: function (a) {
                if (this.startM3u8Time && YKP.isSupportH5M3U8) {
                    var b = (new Date).getTime() - this.startM3u8Time;
                    YKP.sendLog("m3u8", 200, b / 1e3),
                        this.startM3u8Time = 0
                }
                this.onTimeUpdate(a),
                    this.currentTime = this.video.currentTime
            },
            onEndedIPH: function (a) {
                this.onPlayEnd(),
                    this._reporter.addPlayerDurationReport(61),
                    this._reporter.sendTSLog(61),
                    this._endedIPH = !0
            },
            onPlay: function (a) {
                if (debug.log("onplay"), this.controls.onPlay(), !this._firstPlayTag) {
                    if (this._firstPlayTag = !0, this.onPlayStart(), YK.initConfig.firsttime) debug.log("starttime = " + YK.initConfig.firsttime),
                        this.seek(YK.initConfig.firsttime);
                    else {
                        var b = this.seekToLastPoint();
                        b || this.skipHead()
                    }
                    this._startPlayTime = (new Date).getTime(),
                        this._reporter.addPlayerStaticReport(),
                        this._reporter.addPlayerDurationReport(60),
                        this._reporter.sendTSLog(60),
                        this._reporter.sendClientConsumeReport()
                }
                LocalStorage.appendItem("phase", "videoplay")
            },
            onVolumeChange: function () {
            },
            onPlaying: function () {
            },
            onStalled: function (a) {
                (this.isOnePiece() || a.target == this.video) && this.controls.onWaiting(a)
            },
            onSuspend: function (a) {
            },
            onWaiting: function (a) {
                (this.isOnePiece() || a.target == this.video) && this.controls.onWaiting(a)
            },
            onSeeked: function () {
                if (debug.log("onSeeked waitSkip=" + this._waitSeek + " try= " + this._waitTry), !isNaN(this._waitSeek)) {
                    var a = this._waitSeek;
                    Math.abs(this.video.currentTime - a) > 10 && this._waitTry <= 5 ? (this._waitTry = this._waitTry + 1, this.seek(a)) : this._waitSeek = "NaN"
                }
            },
            onSeeking: function (a) {
                if (debug.log("seeking"), this.isOnePiece() || a.target == this.video) {
                    var b = this;
                    setTimeout(function () {
                        b.controls.onWaiting(a)
                    }, 100)
                }
            },
            onDurationChange: function () {
                if (this.startM3u8Time && YKP.isSupportH5M3U8) {
                    var a = (new Date).getTime() - this.startM3u8Time;
                    YKP.sendLog("m3u8", 200, a / 1e3),
                        this.startM3u8Time = 0
                }
            },
            onProgress: function () {
            },
            onRateChange: function () {
            },
            customWaiting: function () {
                var a = this;
                0 == this.video.paused && this._lastTime === this.currentTime && (debug.log("custom waiting!:) networkstate=" + this.video.networkState), this.controls.onWaiting()),
                    this._lastTime = this.currentTime,
                    setTimeout(function (b) {
                        a.customWaiting()
                    }, 5e3)
            },
            sendLoadedTime: function () {
                var a = 0;
                a = this._startPlayTime == -1 ? 0 : (new Date).getTime() - this._startPlayTime,
                    this._reporter.sendLoadedTime(a)
            },
            onTimeUpdate: function (a) {
                if (this.isOnePiece()) this.currentTime = this.video.currentTime,
                YK.unitedTag && (this.currentTime -= YK.unitedTag.offset);
                else {
                    for (var b = 0, c = 0; c < g_cur_num; c++) b += parseInt(YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType][c].seconds);
                    this.currentTime = b + this.video.currentTime
                }
                this.controls.onTimeUpdate(a),
                this._firstflag || (this._firstflag = !0, this.customWaiting(), this.recordLocalPlayPoint(), this.sendLoadedTime(), LocalStorage.appendItem("phase", "videotimeupdate"), YKP.isNeedAdrTrick() && debug.log("adrInvalidPauseCheck11")),
                this._comscoreflag || (this._comscoreflag = !0, this._reporter.sendThirdPartyReport("xplayer_h5")),
                    this.skipTail(this.currentTime),
                this.currentTime > 5 && this.controls.hideRegisterNum()
            },
            curVideo: function () {
                return "m3u8" == YK.config.content ? this.video : this.video
            },
            getQuality: function () {
                if ("m3u8" != YK.config.content) return "m";
                var a = this.video.src;
                return a.indexOf("mp4") !== -1 ? "m" : a.indexOf("flv") !== -1 ? "f" : a.indexOf("hd2") !== -1 ? "h" : void 0
            },
            bufferedEnd: function () {
                var a = this.curVideo().buffered;
                return 0 == a.length ? 0 : a.end(a.length - 1)
            },
            loadNextVideo: function (a) {
                var b = YK.v.data.videos.next,
                    c = this;
                if (debug.log("loadNextVideo vid = " + b.encodevid), b.encodevid) {
                    var d = {
                        isFullScreen: !0,
                        vid: b.vid,
                        encodevid: b.encodevid,
                        Pt: 2 == window.playmode ? b.seq : null
                    };
                    YK.config.nextAutoPlay = !0,
                        BuildVideoInfo.start(b.encodevid, "", YK.config.content, function (a, b) {
                            c.startPlay(a, b);
                            try {
                                onPlayerStart(d)
                            } catch (e) {
                                console.log("onPlayerStart error")
                            }
                        })
                }
            },
            onPlayEnd: function () {
                if (YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_END, debug.log(YKP.playerCurrentState), YK.config.events && YK.config.events.onPlayEnd && YK.v.data.videos) {
                    debug.log("callback: on play end");
                    var a = YK.v.data.videos.next,
                        b = null;
                    a && (b = a.encodevid),
                        YK.config.events.onPlayEnd(a)
                }
            },
            onPlayStart: function () {
                YK.config.events && YK.config.events.onPlayStart && (YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_PLAYING, debug.log(YKP.playerCurrentState), debug.log("callback: on play start"), YK.config.events.onPlayStart())
            },
            onMiddleEnded: function (a) {
                g_cur_num++,
                    this.video.src = YK.multiPieceSrc(g_cur_num),
                    this.video.load(),
                    this.video.play(),
                    this.video.style.display = "block",
                    debug.log("middle src = " + this.video.src)
            },
            onEnded: function (a) {
                1 != this.controls.checkPlayLimit() && (this.isOnePiece() || g_cur_num == YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType].length - 1 ? (g_isVEnded = !0, this._reporter.addPlayerDurationReport(61), this._reporter.sendTSLog(61), this.clearLocalPlayPoint(), this.showEndCard(a), LocalStorage.appendItem("phase", "videoended")) : this.onMiddleEnded(a))
            },
            showEndCard: function (a) {
                this.video.style.display = "none",
                    this.controls.onEnded(a),
                    this.onPlayEnd()
            },
            onBeginFullscreen: function () {
            },
            onEndFullscreen: function () {
                (YKP.isIPHONE || YKP.isIPOD) && null != YK.v.data.trial && (this.video.style.display = "none")
            },
            detectIsPlaying: function (a) {
                var b = a || 0,
                    c = this;
                clearTimeout(this.timeoutTimer),
                0 === this.video.currentTime && b <= 60 && (this.video.load(), this.play(), this.timeoutTimer = setTimeout(function () {
                    c.detectIsPlaying(++b)
                }, 1e3))
            },
            isOnePiece: function () {
                return "m3u8" == YK.config.content || "mp4" == YK.config.content && 1 == YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType].length
            },
            bindEvent: function () {
                if (!YK.v.data.error) {
                    var a = {
                        loadstart: "onLoadStart",
                        canplay: "onCanPlay",
                        loadeddata: "onLoadedData",
                        loadedmetadata: "onLoadedMetaData",
                        abort: "onAbort",
                        error: "onError",
                        pause: "onPause",
                        waiting: "onWaiting",
                        stalled: "onStalled",
                        suspend: "onSuspend",
                        play: "onPlay",
                        volumechange: "onVolumeChange",
                        playing: "onPlaying",
                        seeked: "onSeeked",
                        seeking: "onSeeking",
                        durationchange: "onDurationChange",
                        progress: "onProgress",
                        ratechange: "onRateChange",
                        timeupdate: "onTimeUpdate",
                        ended: "onEnded"
                    };
                    if ("directsrc" == YK.config.playType && 0 == YK.isWeixin) return YK.addEventHandler(this.video, "play", YK.bindAsEventListener(this, this.onPlayIPH)),
                        YK.addEventHandler(this.video, "timeupdate", YK.bindAsEventListener(this, this.onTimeUpdateIPH)),
                        YK.addEventHandler(this.video, "ended", YK.bindAsEventListener(this, this.onEndedIPH)),
                        void YK.addEventHandler(this.video, "webkitendfullscreen", YK.bindAsEventListener(this, this.onEndFullscreen));
                    YKP.isSupportH5M3U8 && (a.timeupdate = "onTimeUpdateIPH"),
                        YK.isIOS,
                        a.webkitbeginfullscreen = "onBeginFullscreen",
                        a.webkitendfullscreen = "onEndFullscreen";
                    for (var b in a) YK.addEventHandler(this.video, b, YK.bindAsEventListener(this, this[a[b]]))
                }
            }
        };
        var g_cur_num = -1,
            g_isVEnded = !1,
            g_record_it = null,
            g_playType = null,
            g_db_show_time = 0,
            g_time_gap = 600,
            VIDEOTYPES = {
                flvhd: "标清",
                flv: "标清",
                mp4: "高清",
                hd2: "超清"
            };
        YK.WIN_TYPE = 30,
            YK.defaultVideoType = "mp4",
            YK.defaultLanguage = "guoyu",
            YK.resizeTag = !0,
            YK.getServicechoice = function () {
                var a = Math.random();
                return a >= .5 ? 1 : 0
            },
            YK.randomCode = 0,
            YK.m3u8RandomCode = 0,
            YK.extend = function (a, b) {
                for (var c in b) a[c] = b[c]
            },
            YK.inherits = function (a, b) {
                var c = function () {
                };
                c.prototype = b.prototype,
                    a.prototype = new c,
                    a.prototype.constructor = a
            },
            YK.bind = function (a, b) {
                return function () {
                    return b.apply(a, arguments)
                }
            },
            YK.bindAsEventListener = function (a, b) {
                var c = Array.prototype.slice.call(arguments).slice(2);
                return function (d) {
                    return b.apply(a, [d || window.event].concat(c))
                }
            },
            YK.getCurrentStyle = function (a) {
                return a.currentStyle || document.defaultView.getComputedStyle(a, null)
            },
            YK.addEventHandler = function (a, b, c, d) {
                YK.config.isMobile && "click" == b && !d && (b = "touchend"),
                    a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
            },
            YK.removeEventHandler = function (a, b, c, d) {
                YK.config.isMobile && "click" == b && !d && (b = "touchend"),
                    a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = null
            },
            YK.show = function (a) {
                "video" === a.tagName.toLowerCase() ? a.style.display = "" : a.style.display = "block"
            },
            YK.hide = function (a) {
                a && (a.style.display = "none")
            },
            YK.getLeftPosition = function (a) {
                for (var b = a.offsetLeft; a.offsetParent;) a = a.offsetParent,
                    b += a.offsetLeft;
                return b
            },
            YK.get = function (a) {
                return document.querySelector(a)
            },
            YK.pieceLength = function () {
                return "m3u8" == YK.config.content ? 1 : YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][g_playType].length
            },
            YK.multiPieceSrc = function (a) {
                return a >= YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][g_playType].length ? "" : YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][g_playType][a].src
            },
            YK.getTime = function (a) {
                if (!a) return "00:00";
                var b = Math.floor(a),
                    c = b % 60,
                    d = Math.floor(b / 60);
                return (d < 10 ? "0" + d : d) + ":" + (c < 10 ? "0" + c : c)
            },
            YK.addClass = function (a, b) {
                YK.hasClass(a, b) || (a.className += " " + b)
            },
            YK.hasClass = function (a, b) {
                var c = new RegExp("(^| )" + b + "( |$)");
                return c.test(a.className)
            },
            YK.removeClass = function (a, b) {
                var c = new RegExp("(^| )" + b + "( |$)");
                a.className = a.className.replace(c, " ").replace(/^\s+|\s+$/g, "")
            },
            YK.m3u8src = function (a, b) {
                var c = "//v.youku.com/player/getM3U8/vid/" + a + "/type/" + b + "/ts/" + parseInt((new Date).getTime() / 1e3);
                return (YKP.isIPHONE || YKP.isIPOD) && (c += "/useKeyFrame/0"),
                    c += "/v.m3u8"
            },
            YK.m3u8src_v2 = function (a, b, c) {
                var d = {
                        type: b,
                        ts: parseInt((new Date).getTime() / 1e3),
                        keyframe: YKP.isIPHONE ? 0 : 1
                    },
                    e = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26];
                this.frontAdIds = null,
                    d.vid = a,
                    d.ep = encodeURIComponent(encode64(rc4(translate(YK.mk.a4 + "poz" + YKP.userCache.a2, e).toString(), YKP.userCache.sid + "_" + a + "_" + YKP.userCache.token))),
                YK.password && (d.password = YK.password),
                YK.password && YK.initConfig.client_id && YK.config.partner_config && 1 == YK.config.partner_config.status && 1 == YK.config.partner_config.passless && (d.client_id = YK.initConfig.client_id),
                    d.sid = YKP.userCache.sid,
                    d.token = YKP.userCache.token,
                    d.ctype = "12",
                    d.ev = "1",
                    d.oip = YK.v.data.security.ip;
                var f = "";
                return f = (1 === YK.m3u8RandomCode && !c || 0 === YK.m3u8RandomCode && 1 === c, "//pl-ali.youku.com/playlist/m3u8?"),
                    f += urlParameter(d),
                "" != YK.getUCStr(a, "m3u8src_v2") && (f += YK.getUCStr(a, "m3u8src_v2")),
                    f
            },
            YK.isLandScape = function () {
                return 90 == window.orientation || window.orientation == -90
            },
            YK.getUCStr = function (a, b) {
                var c = "";
                if ("undefined" != typeof getUCSecret) {
                    var d = getUCSecret(a);
                    c += "&xk=" + d
                } else if ("undefined" != typeof uckey) {
                    var e = uckey.getUCKey(a);
                    c += "&uc_param_str=xk&xk=" + e
                } else 1 == YK.isUCBrowserAndValidVersion() && (c += "&uc_param_str=xk");
                return c
            },
            YK.isUCBrowserAndValidVersion = function () {
                var a = navigator.userAgent,
                    b = a.search(/ucbrowser/i);
                return b != -1 && parseFloat(a.substr(b + 10, 4)) >= 9.8
            },
            YK.getSrcProtocol = function (a) {
                return 0 === a.indexOf("http://") ? a.replace("http://", "//") : a.replace("https://", "//")
            };
        var $ = function (a) {
                return document.getElementById(a)
            },
            THX_ = {
                thx: {
                    id: "thxMODE"
                },
                mode: "off",
                real_mode: "off",
                handle_on: "modeturn_on",
                handle_off: "modeturn_off",
                init: function () {
                },
                getStatus: function () {
                    return this.mode
                },
                on: function () {
                    this.mode = "on",
                        $("player_html5").className = $("player_html5").className + " player_html5_thx"
                },
                off: function () {
                    this.mode = "off",
                        this.real_mode = "off";
                    var a = $("player_html5").className;
                    $("player_html5").className = a.replace(/player_html5_thx/g, " ")
                },
                turn: function () {
                    "on" == this.mode ? this.off() : "off" == this.mode && this.on()
                }
            },
            THX = function () {
                return window.THX ? window.THX : THX_
            }();
        YoukuHTML5Player = function (a, b) {
            null == a.parentBox && (a.parentBox = "parentBox"),
                a.expand && parseInt(a.width) > 0 ? ($(a.parentBox).style.width = a.width + "px", $(a.parentBox).style.height = a.height + "px") : (a.width = $(a.parentBox).offsetWidth, a.height = $(a.parentBox).offsetHeight),
                YK.config = a,
                buildDom($(YK.config.parentBox)),
                VideoPlayer.apply(this, arguments),
                this.video.style.width = "100%",
                this.video.style.height = "100%",
                this.video.style.display = "none",
                this.video.style.position = "relative",
                this._firstPlayTag = !1,
                this._retry = 0,
                this.uiAdapter(),
                this.isCanPlay = !0,
                this.isError = !1,
                this.isPlayAd = !1
        },
            YK.inherits(YoukuHTML5Player, VideoPlayer),
            YK.extend(YoukuHTML5Player.prototype, {
                startPlay: function (a, b, c) {
                    if (a && a.data) {
                        if (this._retry = 0, a.data.show = a.data.show || {}, b.abstarttime = (new Date).getTime(), b._playListData = a.data, b._user = a.user, YK.v = a, YK.videoInfo = b, this.setting = {}, YK.extend(this.setting, c), a.data.error) {
                            if (a.data.error.code == -308 || a.data.error.code == -309 || a.data.error.code == -301 || a.data.error.code == -307) this.isCanPlay = !1,
                                this.isError = !0;
                            else if (this.processError(a, b, c)) return
                        } else a.data.pay && !a.data.pay.can_play && (this.isCanPlay = !1);
                        this._reporter = new Reporter(this, YK.v, YK.videoInfo._sid),
                            this.controls = this.setupControls(this),
                            this.controls.init(YK.v, YK.videoInfo),
                        this.isCanPlay && this.initVideo()
                    }
                },
                initVideo: function () {
                    this.mpieceReport(),
                        this.createIdNode(),
                        this.isNeedAdRequest() ? (this.processAd(), this.isPlayAd = !0) : (this.controls.bindVideoBtnEvent(), this.realStartPlay(), console.log("debug-initVideo:autoplay|" + YK.initConfig.autoplay), (1 == YK.initConfig.ucautoplay || YK.initConfig.autoplay) && this.controls.onVideoBtnClick({}))
                },
                isNeedAdRequest: function () {
                    "undefined" == typeof this._frontAdTag && (this._frontAdTag = !1);
                    YK.v.data.vip && YK.v.data.vip.ad;
                    return YKP.isNeedFrontAd = !this._frontAdTag && "directsrc" != YK.config.playType,
                        YKP.isNeedFrontAd
                },
                processAd: function () {
                    this.isNeedAdRequest() && (this._frontAdTag = !0, this._adplugin = new AdPlugin(this, YK.v, YK.videoInfo._sid), this.bind_frontAd = YK.bindAsEventListener(this, this.onFrontAdInfoOK), this.bind_frontAdInfoTimeout = YK.bindAsEventListener(this, this.onFrontAdInfoTimeout), this._adplugin.addEventListener(ADConstant.FRONT_AD_INFO_OK, this.bind_frontAd, !1), this._adplugin.addEventListener(ADConstant.FRONT_AD_INFO_TIMEOUT, this.bind_frontAdInfoTimeout), this.bind_unitedFrontAd = YK.bindAsEventListener(this, this.onUnitedFrontAdInfoOK), this._adplugin.addEventListener(ADConstant.FRONT_AD_UNITED_INFO_OK, this.bind_unitedFrontAd, !1), this.bind_backAdInfoOK = YK.bindAsEventListener(this, this.onBackAdInfoOK), this.bind_backAdInfoTimeout = YK.bindAsEventListener(this, this.onBackAdInfoTimeout), this._adplugin.addEventListener(ADConstant.BACK_AD_INFO_OK, this.bind_backAdInfoOK, !1), this._adplugin.addEventListener(ADConstant.BACK_AD_INFO_TIMEOUT, this.bind_backAdInfoTimeout), this.bind_uglyCloseAd = YK.bindAsEventListener(this, this.onUglyCloseAd), this._adplugin.addEventListener(ADConstant.UGLY_CLOSE_AD, this.bind_uglyCloseAd), this.controls.bindAdVideoBtnEvent(), this.controls.backAdPrepare(), window[ADConstant.AdPluginObject] = this._adplugin, console.log("debug-processAd:autoplay|" + YK.initConfig.autoplay), (1 == YK.initConfig.ucautoplay || YK.initConfig.autoplay) && this.controls.onVideoBtnTouchEnd({}))
                },
                requestAd: function () {
                    this._adplugin && this._adplugin.frontAd()
                },
                onUglyCloseHint: function () {
                    this.controls.showUglyHint()
                },
                onUglyCloseAd: function (a) {
                    debug.log("ugly close"),
                        this.controls.closeUglyHint(),
                        this.adplayer.uglyClose()
                },
                onFrontAdInfoTimeout: function (a) {
                    this._hasStartPlay = !0,
                        this.realStartPlay(!0)
                },
                onUnitedFrontAdInfoOK: function (a) {
                    debug.log("<b>on united front adinfo ok</b>");
                    var b = a.data.info;
                    if (0 == a.data.info.VAL.length) return debug.log("<b>onUnitedFrontAdInfoOK val length == 0 </b>"),
                        this.loadVTVC(a.data.vtvc),
                        this.video.src = YK.m3u8src_v2(YK.v.data.video.encodeid, YK.defaultVideoType),
                        void this.unitedStartPlay(b, !0);
                    this.adplayer = new UnitedADPlayer(this, a);
                    var c = this;
                    this.adplayer.addEventListener(ADConstant.AD_END, function (a) {
                        debug.log("<font color=red>united ad end</font>"),
                        c._realFlag || (c._realFlag = !0, c.adplayer.clearTimer(), c.unitedStartPlay(b))
                    }, !1),
                        this.adplayer.addEventListener(ADConstant.AD_ERROR, function (a) {
                            debug.log("<font color=red>united ad error</font>"),
                            c._realFlag || (YK.unitedTag = null, c._realFlag = !0, c.adplayer.clearTimer(), c.video.src = YK.m3u8src_v2(YK.v.data.video.encodeid, YK.defaultVideoType, 1), c.unitedStartPlay(b, !0))
                        }, !1),
                        this.adplayer.addEventListener(ADConstant.UGLY_CLOSE_AD_HINT, function (a) {
                            debug.log("<b>ugly hint</b>"),
                                c.onUglyCloseHint()
                        }, !1),
                    YK.config.events && YK.config.events.onAdPlayStart && YK.config.events.onAdPlayStart(YK.v.data),
                        this.adplayer.play(),
                        this.createIdNode()
                },
                loadVTVC: function (a) {
                    for (var b = 0; b < a.length; b++) loadjscssfile(a[b].VC, "js")
                },
                onFrontAdInfoOK: function (a) {
                    if (debug.log("onFrontAdInfoOK"), this._hasStartPlay !== !0) {
                        var b = a.data.urls.length;
                        if (0 == b) return this.loadVTVC(a.data.vtvc),
                            void this.realStartPlay(!0);
                        YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_AD,
                            debug.log(YKP.playerCurrentState),
                            this.adplayer = new ADPlayer(this, a);
                        var c = this;
                        this.adplayer.addEventListener(ADConstant.AD_END, function (a) {
                            debug.log("ad end"),
                            c._realFlag || (c._realFlag = !0, c.adplayer.clearTimer(), c.realStartPlay(a.data))
                        }, !1),
                            this.adplayer.addEventListener(ADConstant.AD_ERROR, function (a) {
                                debug.log("<font color=red>ad error</font>"),
                                c._realFlag || (c._realFlag = !0, c.adplayer.clearTimer(), c.realStartPlay(a.data))
                            }, !1),
                            this.adplayer.addEventListener(ADConstant.UGLY_CLOSE_AD_HINT, function (a) {
                                debug.log("<b>ugly hint</b>"),
                                    c.onUglyCloseHint()
                            }, !1),
                        YK.config.events && YK.config.events.onAdPlayStart && YK.config.events.onAdPlayStart(YK.v.data),
                            this.adplayer.play(),
                            this.createIdNode()
                    }
                },
                onBackAdInfoTimeout: function (a) {
                    debug.log("onBackAdInfoTimeout"),
                        this.showEndCard()
                },
                onBackAdInfoOK: function (a) {
                    debug.log("onBackAdInfoOK");
                    var b = a.data.urls.length;
                    if (0 == b) return void this.showEndCard();
                    this.adplayer = new ADPlayer(this, a);
                    var c = this;
                    this.adplayer.addEventListener(ADConstant.AD_END, function (a) {
                        c.showEndCard()
                    }),
                        this.adplayer.addEventListener(ADConstant.AD_ERROR, function (a) {
                            c.showEndCard()
                        }),
                        this.adplayer.play()
                },
                prepareVideoTag: function () {
                    this.video.preload = "none",
                        "m3u8" == YK.config.content ? this.video.src = YK.videoInfo.src : null != YK.videoInfo._videoSegsDic && null != YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType] && (this.video.src = YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType][0].src),
                    YK.v.data.trial && "episodes" != YK.v.data.trial.type && 0 == YK.v.data.trial.time && (this.video.src = null),
                        this.createIdNode()
                },
                createIdNode: function () {
                    if (!$(YK.config.id)) {
                        var a = document.createElement("div");
                        a.id = YK.config.id,
                            $(YK.config.parentBox).appendChild(a)
                    }
                },
                redirect: function (a) {
                    var b = "";
                    "m3u8" == YK.config.content ? b = YK.videoInfo.src : null != YK.videoInfo._videoSegsDic && null != YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType] && (b = YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType][0].src),
                        debug.log("redirect play src=" + b),
                        this._reporter.addPlayerStaticReport(),
                        this._reporter.addPlayerDurationReport(60),
                        this._reporter.sendTSLog(60),
                        this._reporter.sendUserActionReport("xps", "c"),
                        window.open(b, "", "", !1),
                        this._reporter.sendClientConsumeReport(),
                        this.onPlayStart()
                },
                realStartPlay: function (a) {
                    debug.log("realStartPlay " + a),
                        this.controls.bindEvent(),
                        this.controls.showRegisterNum(),
                        this.bindEvent(),
                        this.prepareVideoTag(),
                        this.playVideos(a)
                },
                unitedStartPlay: function (a, b) {
                    debug.log("<b>united start play </b>"),
                        YK.unitedTag = {
                            offset: a.VAL.length ? a.VAL[0].AL : 0
                        },
                        this.controls.bindEvent(),
                        this.bindEvent(),
                        b === !0 ? (this.video.load(), this.video.play(), debug.log("the is no ad this src is :" + this.video.src), YKP.isSupportH5M3U8 && (YKP.sendLog("m3u8", 0, 0), this.startM3u8Time = (new Date).getTime())) : this.onPlay(),
                        this.controls.onPlay()
                },
                playVideos: function (a) {
                    debug.log("playVideos " + a),
                        g_isVEnded = !1,
                        g_cur_num = 0,
                        YKP.isSupportH5M3U8 && null != YK.v.data.trial ? this.video.style.display = "none" : this.video.style.display = "block",
                    (YK.config.autoplay || YK.config.nextAutoPlay || a) && (debug.log("src= " + this.video.src + " auto = " + a), this.video.load(), this.video.play())
                },
                processError: function (a, b, c) {
                    var d = a.data.error.code;
                    return d == -301 ? (a.data.trial = {
                        time: 0
                    }, !1) : (YK.hide(YK.get(".x-video-poster")), this.feedbackPanel = new FeedBackPanel(this, a), !0)
                },
                mpieceReport: function () {
                    if ("mp4" == YK.config.content && YK.videoInfo._videoSegsDic && null != YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType] && YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType].length > 1) {
                        debug.log("mpiece report");
                        YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType].length
                    }
                },
                resize_: function (a, b, c) {
                    if (debug.log("resize=" + YK.resizeTag), b && c && YK.resizeTag && this.controls) {
                        var d = this.controls.xplayer.className;
                        this.controls && this.controls.xplayer && (d.indexOf("fullscreen") === -1 ? this.controls.xplayer.className = cssAdapt(b) : (b = window.innerWidth, this.controls.xplayer.className = cssAdapt(b) + " x-player-fullscreen"))
                    }
                },
                uiAdapter: function () {
                    "index" == YK.config.wintype ? (YK.hide(YK.get(".x-localization")), YK.hide(YK.get(".x-quality")), YK.get("#x-video-button").className = "x-video-button") : YK.get("#x-video-button").className = "x-video-button",
                    "m3u8" != YK.config.content && YK.hide(YK.get(".x-quality"));
                    var a = this;
                    window.addEventListener("resize", function (b) {
                        debug.log("window.resize"),
                        a.controls && a.controls.onResize(b)
                    }, !1)
                },
                isOutTryDuration: function (a) {
                    return !!this.tryDuration && a >= this.tryDuration
                },
                replay: function () {
                    g_cur_num = 0,
                        this._comscoreflag = !1,
                        this._ireflag = !1,
                        YKP.adrPlayTrick = !1,
                        this._firstflag = !1,
                        this._retry = 0,
                        this.video.style.display = "block",
                    this.isOnePiece() || (this.video.src = YK.multiPieceSrc(g_cur_num)),
                    YKP.isSupportH5M3U8 && (this.video.src = YK.m3u8src_v2(YK.v.data.video.encodeid, YK.defaultVideoType), YK.unitedTag = null),
                        this.video.load(),
                        this.video.play(),
                        this._reporter.tsInit(),
                        this._reporter.sendTSLog(60),
                        this._reporter.addPlayerDurationReport(62),
                        this._reporter.addPlayerDurationReport(60)
                },
                seekToLastPoint: function () {
                    var a = YK.v.data.id,
                        b = -1;
                    YK.v.data.playlog && (b = YK.v.data.playlog.lastpoint / 1e3);
                    var c = parseInt(LocalStorage.getItem(a + "_playpoint")) || -1,
                        d = -1;
                    d = b > 0 ? b : c,
                        debug.log("lastpoint=" + d);
                    var e = LocalStorage.getItem("youku_ignore_lasttime");
                    e = parseInt(e) || 0;
                    var f = YK.v.data.trial ? YK.v.data.trial.time : YK.v.data.video.seconds,
                        g = YK.v.data.trial ? YK.v.data.trial.type : null;
                    return !YK.v.data.trial && YK.v.data.controller.html5_disable && (f = 3e3),
                    !(d < 120 || g && f <= 600 || d >= f || d > f - 120) && (this.controls.showLastTimeTip(d), YKP.isAndroid && (this._waitSeek = d), this.seek(d), !0)
                },
                clearLocalPlayPoint: function () {
                    var a = YK.v.data.id;
                    clearTimeout(this._recordLPPTimer),
                        LocalStorage.removeItem(a + "_playpoint")
                },
                recordLocalPlayPoint: function () {
                    var a = YK.v.data.id + "",
                        b = this.currentTime || 0,
                        c = this;
                    if (this._recordLPPTimer = setTimeout(function (a) {
                            c.recordLocalPlayPoint()
                        }, 1e4), LocalStorage.removeItem(a + "_playpoint"), YK.v.data.video.seconds >= 600 && b < YK.videoInfo.totalTime - 120 && b >= 120) {
                        if (LocalStorage.setItem(a + "_playpoint", b), this.updatePPVids) return;
                        this.updatePPVids = !0;
                        var d = LocalStorage.getItem("youku_playpoint_vids") || "";
                        if ("" == d) d = a;
                        else {
                            d = d.split(":");
                            for (var e = 0; e < d.length; e++) d[e] == a && (d[e] = "");
                            d.push(a),
                                d = d.join(":");
                            for (var f = 0;
                                 ":" == d.charAt(f);) f++;
                            d = d.substring(f),
                                d = d.replace(/:(:)+/g, ":")
                        }
                        var g = d.split(":");
                        g.length > 30 && (debug.log("slice"), LocalStorage.removeItem(g[0] + "_playpoint"), d = g.slice(1).join(":")),
                            debug.log("youku_playpoint_vids=" + d),
                            LocalStorage.setItem("youku_playpoint_vids", d)
                    }
                },
                skipHead: function () {
                    var a = parseInt((YK.v.data.dvd || {}).head || -1);
                    debug.log("skiphead = " + a),
                    a != -1 && (this.controls.tipPanel.onSkipHead(), "true" == LocalStorage.getItem("youku_conf_skip") && 1e3 * this.currentTime < a && (YKP.isAndroid && (this._waitSeek = a / 1e3), this.seek(a / 1e3)))
                },
                skipTail: function (a) {
                    var b = parseInt((YK.v.data.dvd || {}).tail || -1);
                    if (b != -1 && a >= b / 1e3 - 10 && !this._tailTip && (debug.log("skiptail(act before 10) =" + b), this._tailTip = !0, this.controls.tipPanel.onSkipTail()), b != -1 && a >= b / 1e3 && !this._tailSkipped && (this._tailSkipped = !0, "true" == LocalStorage.getItem("youku_conf_skip"))) {
                        var c = parseInt(YK.v.data.video.seconds);
                        this.seek(c - 1)
                    }
                },
                assistSkipTail: function (a) {
                    var b = parseInt((YK.v.data.dvd || {}).tail || -1);
                    b /= 1e3,
                        a >= b ? (this._tailSkipped = !0, this._tailTip = !0) : (this._tailSkipped = !1, this._tailTip = !1)
                },
                seek: function (a, b) {
                    a = a || 0,
                        a = Math.max(a, 0),
                    YK.videoInfo.totalTime && (a = Math.min(a, YK.videoInfo.totalTime - 5)),
                    this.isOutTryDuration(a) && (a = this.tryDuration - 5),
                        this.assistSkipTail(a);
                    var c = this;
                    if (this.switchTimer && clearTimeout(this.switchTimer), this.currentTime = a, this.isOnePiece()) {
                        var d = this.video.seekable,
                            e = d.length > 0 ? d.end(0) : 0;
                        YK.unitedTag && (a += YK.unitedTag.offset, e += YK.unitedTag.offset),
                            1 == d.length && a < e ? (debug.log("seek ct = " + a + ",end = " + d.end(0)), this.seekTo(a, b)) : (this.controls.onWaiting(), this.switchTimer = setTimeout(function () {
                                c.seek(a, b)
                            }, 100))
                    } else debug.log("multi seek"),
                        this.multiSeekTo(a)
                },
                seekTo: function (a, b) {
                    if (this.isOnePiece()) {
                        debug.log("is one piece");
                        var c = this;
                        try {
                            c.video.currentTime = a
                        } catch (d) {
                            var e = 0;
                            this.video.addEventListener("canplay", function () {
                                1 !== e && (e = 1, debug.log("canplay time=" + a), c.video.currentTime = a)
                            })
                        }
                        "function" == typeof b && (debug.log("<b>seekto callback(mayby play)</b>"), b())
                    }
                },
                multiSeekTo_: function (a) {
                    debug.log("YoukuHTML5 ")
                },
                multiSeekTo: function (a) {
                    debug.log("YoukuHTML5Player multiSeekTo !");
                    for (var b = 0, c = 0, d = 0, e = 0; e < YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType].length; e++) {
                        var f = parseInt(YK.videoInfo._videoSegsDic.streams[YK.defaultLanguage][YK.defaultVideoType][e].seconds);
                        if (b += f, b > a) {
                            c = e,
                                d = f - (b - a);
                            break
                        }
                        if (b == a) {
                            c = e + 1,
                                d = 0;
                            break
                        }
                    }
                    if (c == g_cur_num) {
                        debug.log(" piece time = " + d);
                        var g = this,
                            h = 0;
                        this.video.currentTime = d,
                            this.video.addEventListener("canplay", function () {
                                1 !== h && (h = 1, debug.log("canplay time=" + d), g.video.currentTime = d)
                            }),
                            this.video.play()
                    } else {
                        this.video.pause(),
                            g_cur_num = c;
                        var h = 0,
                            g = this;
                        this.video.addEventListener("canplay", function () {
                            1 !== h && (h = 1, debug.log("canplay time=" + d), g.video.currentTime = d)
                        });
                        var i = YK.multiPieceSrc(g_cur_num);
                        i ? (this.video.src = i, this.video.load(), this.video.play()) : this.video.pause()
                    }
                    this.video.style.display = "block"
                },
                adjustVideoRatio: function (a) {
                    if (!YKP.isIOS) {
                        if (("onorientationchange" in window || "orientation" in window) && !this._avrTag) {
                            this._avrTag = !0;
                            var b = this;
                            window.addEventListener("orientationchange", function (a) {
                                b.controls.fullscreenPanel.fullFlag() === !0 && b.adjustVideoRatio()
                            })
                        }
                        var b = this,
                            c = this.video;
                        setTimeout(function (b) {
                            if (1 === a) c.style.width = "100%",
                                c.style.height = "100%",
                                c.style.top = null,
                                c.style.left = null;
                            else {
                                var d = YK.get(".x-player"),
                                    e = d.offsetWidth / d.offsetHeight,
                                    f = c.videoWidth / c.videoHeight;
                                if (isNaN(f) || isNaN(e) || !isFinite(e) || !isFinite(f)) return c.style.width = "100%",
                                    c.style.height = "100%",
                                    c.style.top = null,
                                    void(c.style.left = null);
                                e < f ? (c.style.width = "100%", c.style.height = e / f * 100 + "%", c.style.top = (1 / e - 1 / f) / 2 * e * 100 + "%", c.style.left = null) : (c.style.height = "100%", c.style.width = f / e * 100 + "%", c.style.left = (e - f) / 2 / e * 100 + "%", c.style.top = null)
                            }
                        }, 2e3)
                    }
                }
            }),
            window.YoukuPlayerSelect = YoukuPlayerSelect,
            window.BuildVideoInfo = BuildVideoInfo,
            window.checkSrc = checkSrc,
            window.QS = QS,
            window.YKP = YKP,
            window.YKU = YKU,
            window.YoukuHTML5Player = YoukuHTML5Player;
        for (var scripts = document.getElementsByTagName("script"), i = 0; i < scripts.length; i++) if (scripts[i].src.indexOf("player.youku.com/jsapi") !== -1) {
            eval(scripts[i].innerHTML);
            break
        }
        window.notifyYKU = function () {
            YKU.swfLoaded = 1
        },
            window.onPlayerStart = function () {
                YK.initConfig.events && YK.initConfig.events.onPlayStart && (YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_PLAYING, debug.log(YKP.playerCurrentState), debug.log("api:flash play start"), YK.initConfig.events.onPlayStart())
            },
            window.onPlayerComplete = function () {
                YK.initConfig.events && YK.initConfig.events.onPlayEnd && (YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_END, debug.log(YKP.playerCurrentState), debug.log("api:flash play end"), YK.initConfig.events.onPlayEnd())
            }
    }();