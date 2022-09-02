// ==UserScript==
// @name            天雪论坛
// @namespace       https://github.com/kakioff/soulsign-script/tree/main/skyey2
// @version         1.1.0
// @author          byron
// @loginURL        https://www.skyey2.com/login.php
// @updateURL       https://raw.githubusercontent.com/kakioff/soulsign-script/main/skyey2.js
// @expire          14400e3
// @domain          www.skyey2.com
// @param name 用户名
// @param pwd 密码
// ==/UserScript==


/**
 * 登录
 * 
 * @param name 用户名
 * @param password 密码
 * @returns 登录状态
 */
async function go2login(name, password) {
    if (!name || !password)
        throw "设置用户名密码后自动登录"

    let { data } = await axios.get('https://www.skyey2.com/login.php'),
        login_ifr = document.createElement("div")
    login_ifr.innerHTML = data
    let login_form = login_ifr.getElementsByTagName("form").login,
        login_url = "https://www.skyey2.com" + login_form.action.replaceAll(/^chrome-extension:\/\/[a-z]*/ig, ""),
        params = {}
    login_form.cookietime.checked = true
    for (let i = 0; i < login_form.elements.length; i++) {
        if (login_form.elements[i].name) {
            params[login_form.elements[i].name] = login_form.elements[i].value
        }
    }
    params["username"] = name
    params["password"] = password
    let result = await skfaid()
    result.get()
    params["skfaid"] = result.skfaId;
    console.log(login_url, params);
    let ret = axios({
        method: 'post',
        url: login_url,
        //    必不可少，修改数据的提交方式
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        params
    })
    if (ret.status == 200) {
        return "登录成功"
    } else {
        return "登录失败"
    }
    // let ret = await axios.post(login_url, params)
    // if (ret.status == 200) {
    //     return "登录成功"
    // }
}
exports.run = async function (param) {
    var { data } = await axios.get('https://www.skyey2.com');
    var ifr = document.createElement("div")
    ifr.innerHTML = data
    if (/我的/.test(data)) {
        let r_data = ""
        r_data += ifr.getElementsByClassName("showmenu")[1].innerText.replaceAll("  ", "")
        r_data += "  "
        r_data += ifr.getElementsByClassName("showmenu")[4].innerText.replaceAll("  ", "")
        return r_data
    } else {
        return go2login(param.name, param.pwd)
    }
    throw '访问失败';
};

exports.check = async function (param) {
    var { data } = await axios.get('https://www.skyey2.com');
    if (/我的/.test(data)) return true
    return go2login(param.name, param.pwd)
};

function skfaid() {
    function V(a) {
        function c(d, h, e, g, l, n) { d = m(m(h, d), m(g, n)); return m(d << l | d >>> 32 - l, e) } function b(d, h, e, g, l, n, t) { return c(h & e | ~h & g, d, h, l, n, t) } function k(d, h, e, g, l, n, t) { return c(h & g | e & ~g, d, h, l, n, t) } function f(d, h, e, g, l, n, t) { return c(e ^ (h | ~g), d, h, l, n, t) } function m(d, h) { var e = (d & 65535) + (h & 65535); return (d >> 16) + (h >> 16) + (e >> 16) << 16 | e & 65535 } var p = parseInt(Date.parse(new Date) / 3E6); p += a; return function (d, h) {
            h *= 8; d[h >> 5] |= 128 << h % 32; d[(h + 64 >>> 9 << 4) + 14] = h; h = 1732584193; for (var e = -271733879, g = -1732584194,
                l = 271733878, n = 0; n < d.length; n += 16) {
                var t = h, B = e, L = g, D = l; h = b(h, e, g, l, d[n + 0], 7, -680876936); l = b(l, h, e, g, d[n + 1], 12, -389564586); g = b(g, l, h, e, d[n + 2], 17, 606105819); e = b(e, g, l, h, d[n + 3], 22, -1044525330); h = b(h, e, g, l, d[n + 4], 7, -176418897); l = b(l, h, e, g, d[n + 5], 12, 1200080426); g = b(g, l, h, e, d[n + 6], 17, -1473231341); e = b(e, g, l, h, d[n + 7], 22, -45705983); h = b(h, e, g, l, d[n + 8], 7, 1770035416); l = b(l, h, e, g, d[n + 9], 12, -1958414417); g = b(g, l, h, e, d[n + 10], 17, -42063); e = b(e, g, l, h, d[n + 11], 22, -1990404162); h = b(h, e, g, l, d[n + 12], 7, 1804603682); l = b(l, h,
                    e, g, d[n + 13], 12, -40341101); g = b(g, l, h, e, d[n + 14], 17, -1502002290); e = b(e, g, l, h, d[n + 15], 22, 1236535329); h = k(h, e, g, l, d[n + 1], 5, -165796510); l = k(l, h, e, g, d[n + 6], 9, -1069501632); g = k(g, l, h, e, d[n + 11], 14, 643717713); e = k(e, g, l, h, d[n + 0], 20, -373897302); h = k(h, e, g, l, d[n + 5], 5, -701558691); l = k(l, h, e, g, d[n + 10], 9, 38016083); g = k(g, l, h, e, d[n + 15], 14, -660478335); e = k(e, g, l, h, d[n + 4], 20, -405537848); h = k(h, e, g, l, d[n + 9], 5, 568446438); l = k(l, h, e, g, d[n + 14], 9, -1019803690); g = k(g, l, h, e, d[n + 3], 14, -187363961); e = k(e, g, l, h, d[n + 8], 20, 1163531501);
                h = k(h, e, g, l, d[n + 13], 5, -1444681467); l = k(l, h, e, g, d[n + 2], 9, -51403784); g = k(g, l, h, e, d[n + 7], 14, 1735328473); e = k(e, g, l, h, d[n + 12], 20, -1926607734); h = c(e ^ g ^ l, h, e, d[n + 5], 4, -378558); l = c(h ^ e ^ g, l, h, d[n + 8], 11, -2022574463); g = c(l ^ h ^ e, g, l, d[n + 11], 16, 1839030562); e = c(g ^ l ^ h, e, g, d[n + 14], 23, -35309556); h = c(e ^ g ^ l, h, e, d[n + 1], 4, -1530992060); l = c(h ^ e ^ g, l, h, d[n + 4], 11, 1272893353); g = c(l ^ h ^ e, g, l, d[n + 7], 16, -155497632); e = c(g ^ l ^ h, e, g, d[n + 10], 23, -1094730640); h = c(e ^ g ^ l, h, e, d[n + 13], 4, 681279174); l = c(h ^ e ^ g, l, h, d[n + 0], 11, -358537222); g = c(l ^
                    h ^ e, g, l, d[n + 3], 16, -722521979); e = c(g ^ l ^ h, e, g, d[n + 6], 23, 76029189); h = c(e ^ g ^ l, h, e, d[n + 9], 4, -640364487); l = c(h ^ e ^ g, l, h, d[n + 12], 11, -421815835); g = c(l ^ h ^ e, g, l, d[n + 15], 16, 530742520); e = c(g ^ l ^ h, e, g, d[n + 2], 23, -995338651); h = f(h, e, g, l, d[n + 0], 6, -198630844); l = f(l, h, e, g, d[n + 7], 10, 1126891415); g = f(g, l, h, e, d[n + 14], 15, -1416354905); e = f(e, g, l, h, d[n + 5], 21, -57434055); h = f(h, e, g, l, d[n + 12], 6, 1700485571); l = f(l, h, e, g, d[n + 3], 10, -1894986606); g = f(g, l, h, e, d[n + 10], 15, -1051523); e = f(e, g, l, h, d[n + 1], 21, -2054922799); h = f(h, e, g, l, d[n + 8], 6,
                        1873313359); l = f(l, h, e, g, d[n + 15], 10, -30611744); g = f(g, l, h, e, d[n + 6], 15, -1560198380); e = f(e, g, l, h, d[n + 13], 21, 1309151649); h = f(h, e, g, l, d[n + 4], 6, -145523070); l = f(l, h, e, g, d[n + 11], 10, -1120210379); g = f(g, l, h, e, d[n + 2], 15, 718787259); e = f(e, g, l, h, d[n + 9], 21, -343485551); h = m(h, t); e = m(e, B); g = m(g, L); l = m(l, D)
            } return [h, e, g, l]
        }(function (d) { for (var h = [], e = 0; e < 8 * d.length; e += 8)h[e >> 5] |= (d.charCodeAt(e / 8) & 255) << e % 32; return h }(p.toString()), p.toString().length)
    } function A(a, c, b, k) {
        function f(m) { return m instanceof b ? m : new b(function (p) { p(m) }) }
        return new (b || (b = Promise))(function (m, p) { function d(g) { try { e(k.next(g)) } catch (l) { p(l) } } function h(g) { try { e(k["throw"](g)) } catch (l) { p(l) } } function e(g) { g.done ? m(g.value) : f(g.value).then(d, h) } e((k = k.apply(a, c || [])).next()) })
    } function y(a, c) {
        function b(e) { return function (g) { return k([e, g]) } } function k(e) {
            if (m) throw new TypeError("Generator is already executing."); for (; f;)try {
                if (m = 1, p && (d = e[0] & 2 ? p["return"] : e[0] ? p["throw"] || ((d = p["return"]) && d.call(p), 0) : p.next) && !(d = d.call(p, e[1])).done) return d; if (p =
                    0, d) e = [e[0] & 2, d.value]; switch (e[0]) { case 0: case 1: d = e; break; case 4: return f.label++, { value: e[1], done: !1 }; case 5: f.label++; p = e[1]; e = [0]; continue; case 7: e = f.ops.pop(); f.trys.pop(); continue; default: if (!(d = f.trys, d = 0 < d.length && d[d.length - 1]) && (6 === e[0] || 2 === e[0])) { f = 0; continue } if (3 === e[0] && (!d || e[1] > d[0] && e[1] < d[3])) f.label = e[1]; else if (6 === e[0] && f.label < d[1]) f.label = d[1], d = e; else if (d && f.label < d[2]) f.label = d[2], f.ops.push(e); else { d[2] && f.ops.pop(); f.trys.pop(); continue } }e = c.call(a, f)
            } catch (g) {
                e = [6, g],
                    p = 0
            } finally { m = d = 0 } if (e[0] & 5) throw e[1]; return { value: e[0] ? e[1] : void 0, done: !0 }
        } var f = { label: 0, sent: function () { if (d[0] & 1) throw d[1]; return d[1] }, trys: [], ops: [] }, m, p, d, h; return h = { next: b(0), "throw": b(1), "return": b(2) }, "function" === typeof Symbol && (h[Symbol.iterator] = function () { return this }), h
    } function W() { for (var a = 0, c = 0, b = arguments.length; c < b; c++)a += arguments[c].length; a = Array(a); var k = 0; for (c = 0; c < b; c++)for (var f = arguments[c], m = 0, p = f.length; m < p; m++, k++)a[k] = f[m]; return a } function E(a, c) {
        return new Promise(function (b) {
            return setTimeout(b,
                a, c)
        })
    } function ja(a, c) { void 0 === c && (c = Infinity); var b = window.requestIdleCallback; return b ? new Promise(function (k) { return b.call(window, function () { return k() }, { timeout: c }) }) : E(Math.min(a, c)) } function X(a, c) { try { var b = a(); b && "function" === typeof b.then ? b.then(function (k) { return c(!0, k) }, function (k) { return c(!1, k) }) : c(!0, b) } catch (k) { c(!1, k) } } function Y(a, c, b) {
        void 0 === b && (b = 16); return A(this, void 0, void 0, function () {
            var k, f; return y(this, function (m) {
                switch (m.label) {
                    case 0: k = 1E12, f = 0, m.label = 1; case 1: if (!(f <
                        a.length)) return [3, 4]; c(a[f], f); if (!(1E12 >= k + b)) return [3, 3]; k = 1E12; return [4, E(0)]; case 2: m.sent(), m.label = 3; case 3: return ++f, [3, 1]; case 4: return [2]
                }
            })
        })
    } function C(a, c) { a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535]; c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535]; var b = [0, 0, 0, 0]; b[3] += a[3] + c[3]; b[2] += b[3] >>> 16; b[3] &= 65535; b[2] += a[2] + c[2]; b[1] += b[2] >>> 16; b[2] &= 65535; b[1] += a[1] + c[1]; b[0] += b[1] >>> 16; b[1] &= 65535; b[0] += a[0] + c[0]; b[0] &= 65535; return [b[0] << 16 | b[1], b[2] << 16 | b[3]] } function w(a, c) {
        a = [a[0] >>> 16,
        a[0] & 65535, a[1] >>> 16, a[1] & 65535]; c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535]; var b = [0, 0, 0, 0]; b[3] += a[3] * c[3]; b[2] += b[3] >>> 16; b[3] &= 65535; b[2] += a[2] * c[3]; b[1] += b[2] >>> 16; b[2] &= 65535; b[2] += a[3] * c[2]; b[1] += b[2] >>> 16; b[2] &= 65535; b[1] += a[1] * c[3]; b[0] += b[1] >>> 16; b[1] &= 65535; b[1] += a[2] * c[2]; b[0] += b[1] >>> 16; b[1] &= 65535; b[1] += a[3] * c[1]; b[0] += b[1] >>> 16; b[1] &= 65535; b[0] += a[0] * c[3] + a[1] * c[2] + a[2] * c[1] + a[3] * c[0]; b[0] &= 65535; return [b[0] << 16 | b[1], b[2] << 16 | b[3]]
    } function F(a, c) {
        c %= 64; if (32 === c) return [a[1], a[0]];
        if (32 > c) return [a[0] << c | a[1] >>> 32 - c, a[1] << c | a[0] >>> 32 - c]; c -= 32; return [a[1] << c | a[0] >>> 32 - c, a[0] << c | a[1] >>> 32 - c]
    } function v(a, c) { c %= 64; return 0 === c ? a : 32 > c ? [a[0] << c | a[1] >>> 32 - c, a[1] << c] : [a[1] << c - 32, 0] } function r(a, c) { return [a[0] ^ c[0], a[1] ^ c[1]] } function Z(a) { a = r(a, [0, a[0] >>> 1]); a = w(a, [4283543511, 3981806797]); a = r(a, [0, a[0] >>> 1]); a = w(a, [3301882366, 444984403]); return a = r(a, [0, a[0] >>> 1]) } function z(a, c) { return "number" === typeof a && isNaN(a) ? c : a } function x(a) {
        return a.reduce(function (c, b) { return c + (b ? 1 : 0) },
            0)
    } function aa(a, c) { void 0 === c && (c = 1); if (1 <= Math.abs(c)) return Math.round(a / c) * c; c = 1 / c; return Math.round(a * c) / c } function ka(a) {
        var c, b, k = "Unexpected syntax '" + a + "'"; a = /^\s*([a-z-]*)(.*)$/i.exec(a); for (var f = a[1] || void 0, m = {}, p = /([.:#][\w-]+|\[.+?\])/gi, d = function (e, g) { m[e] = m[e] || []; m[e].push(g) }; ;) {
            var h = p.exec(a[2]); if (!h) break; h = h[0]; switch (h[0]) {
                case ".": d("class", h.slice(1)); break; case "#": d("id", h.slice(1)); break; case "[": if (h = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(h)) d(h[1],
                    null !== (b = null !== (c = h[4]) && void 0 !== c ? c : h[5]) && void 0 !== b ? b : ""); else throw Error(k); break; default: throw Error(k);
            }
        } return [f, m]
    } function ba(a) { return a && "object" === typeof a && "message" in a ? a : { message: a } } function la(a, c) {
        var b = new Promise(function (k) {
            X(a.bind(null, c), function () {
                for (var f = [], m = 0; m < arguments.length; m++)f[m] = arguments[m]; if (!f[0]) return k(function () { return { error: ba(f[1]), duration: 0 } }); var p = f[1]; if ("function" !== typeof p) return k(function () { return { value: p, duration: 0 } }); k(function () {
                    return new Promise(function (d) {
                        X(p,
                            function () { for (var h = [], e = 0; e < arguments.length; e++)h[e] = arguments[e]; if (!h[0]) return d({ error: ba(h[1]), duration: 0 }); d({ value: h[1], duration: 0 }) })
                    })
                })
            })
        }); return function () { return b.then(function (k) { return k() }) }
    } function ma(a, c, b) {
        var k = Object.keys(a).filter(function (m) { a: { for (var p = 0, d = b.length; p < d; ++p)if (b[p] === m) { m = !0; break a } m = !1 } return !m }), f = Array(k.length); Y(k, function (m, p) { f[p] = la(a[m], c) }); return function () {
            return A(this, void 0, void 0, function () {
                var m, p, d, h, e, g, l; return y(this, function (n) {
                    switch (n.label) {
                        case 0: m =
                            {}; p = 0; for (d = k; p < d.length; p++)h = d[p], m[h] = void 0; e = Array(k.length); g = function () { var t; return y(this, function (B) { switch (B.label) { case 0: return t = !0, [4, Y(k, function (L, D) { e[D] || (f[D] ? e[D] = f[D]().then(function (na) { return m[L] = na }) : t = !1) })]; case 1: return B.sent(), t ? [2, "break"] : [4, E(1)]; case 2: return B.sent(), [2] } }) }; n.label = 1; case 1: return [5, g()]; case 2: l = n.sent(); if ("break" === l) return [3, 4]; n.label = 3; case 3: return [3, 1]; case 4: return [4, Promise.all(e)]; case 5: return n.sent(), [2, m]
                    }
                })
            })
        }
    } function ca() {
        var a =
            window, c = navigator; return 4 <= x(["MSCSSMatrix" in a, "msSetImmediate" in a, "msIndexedDB" in a, "msMaxTouchPoints" in c, "msPointerEnabled" in c])
    } function M() { var a = window, c = navigator; return 5 <= x(["webkitPersistentStorage" in c, "webkitTemporaryStorage" in c, 0 === c.vendor.indexOf("Google"), "webkitResolveLocalFileSystemURL" in a, "BatteryManager" in a, "webkitMediaStream" in a, "webkitSpeechGrammar" in a]) } function I() {
        var a = window, c = navigator; return 4 <= x(["ApplePayError" in a, "CSSPrimitiveValue" in a, "Counter" in a, 0 ===
            c.vendor.indexOf("Apple"), "getStorageUpdates" in c, "WebKitMediaKeys" in a])
    } function N() { var a = window; return 3 <= x(["safari" in a, !("DeviceMotionEvent" in a), !("ongestureend" in a), !("standalone" in navigator)]) } function oa() { var a = window; return 3 <= x(["DOMRectList" in a, "RTCPeerConnectionIceEvent" in a, "SVGGeometryElement" in a, "ontransitioncancel" in a]) } function da() {
        var a = M(), c, b; var k = window; k = 4 <= x(["buildID" in navigator, "MozAppearance" in (null !== (b = null === (c = document.documentElement) || void 0 === c ? void 0 :
            c.style) && void 0 !== b ? b : {}), "MediaRecorderErrorEvent" in k, "mozInnerScreenX" in k, "CSSMozDocumentRule" in k, "CanvasCaptureMediaStream" in k]); if (!a && !k) return !1; c = window; return 2 <= x(["onorientationchange" in c, "orientation" in c, a && "SharedWorker" in c, k && /android/i.test(navigator.appVersion)])
    } function pa(a) {
        var c = function () { }; return [new Promise(function (b, k) {
            var f = !1, m = 0, p = 0; a.oncomplete = function (e) { return b(e.renderedBuffer) }; var d = function () {
                setTimeout(function () { return k(ea("timeout")) }, Math.min(500,
                    p + 5E3 - 1E12))
            }, h = function () { try { switch (a.startRendering(), a.state) { case "running": p = 1E12; f && d(); break; case "suspended": document.hidden || m++, f && 3 <= m ? k(ea("suspended")) : setTimeout(h, 500) } } catch (e) { k(e) } }; h(); c = function () { f || (f = !0, 0 < p && d()) }
        }), c]
    } function ea(a) { var c = Error(a); c.name = a; return c } function fa(a, c, b) {
        var k, f, m; void 0 === b && (b = 50); return A(this, void 0, void 0, function () {
            var p, d; return y(this, function (h) {
                switch (h.label) {
                    case 0: p = document, h.label = 1; case 1: return p.body ? [3, 3] : [4, E(b)]; case 2: return h.sent(),
                        [3, 1]; case 3: d = p.createElement("iframe"), h.label = 4; case 4: return h.trys.push([4, , 10, 11]), [4, new Promise(function (e, g) { d.onload = e; d.onerror = g; g = d.style; g.setProperty("display", "block", "important"); g.position = "absolute"; g.top = "0"; g.left = "0"; g.visibility = "hidden"; c && "srcdoc" in d ? d.srcdoc = c : d.src = "about:blank"; p.body.appendChild(d); var l = function () { var n, t; "complete" === (null === (t = null === (n = d.contentWindow) || void 0 === n ? void 0 : n.document) || void 0 === t ? void 0 : t.readyState) ? e() : setTimeout(l, 10) }; l() })]; case 5: h.sent(),
                            h.label = 6; case 6: return (null === (f = null === (k = d.contentWindow) || void 0 === k ? void 0 : k.document) || void 0 === f ? 0 : f.body) ? [3, 8] : [4, E(b)]; case 7: return h.sent(), [3, 6]; case 8: return [4, a(d, d.contentWindow)]; case 9: return [2, h.sent()]; case 10: return null === (m = d.parentNode) || void 0 === m ? void 0 : m.removeChild(d), [7]; case 11: return [2]
                }
            })
        })
    } function qa() { if (void 0 === O) { var a = function () { var c = P(); Q(c) ? O = setTimeout(a, 2500) : (J = c, O = void 0) }; a() } } function ra() {
        var a = this; qa(); return function () {
            return A(a, void 0, void 0, function () {
                var c;
                return y(this, function (b) { switch (b.label) { case 0: c = P(); if (!Q(c)) return [3, 2]; if (J) return [2, W(J)]; b = document; if (!(b.fullscreenElement || b.msFullscreenElement || b.mozFullScreenElement || b.webkitFullscreenElement)) return [3, 2]; b = document; return [4, (b.exitFullscreen || b.msExitFullscreen || b.mozCancelFullScreen || b.webkitExitFullscreen).call(b)]; case 1: b.sent(), c = P(), b.label = 2; case 2: return Q(c) || (J = c), [2, c] } })
            })
        }
    } function P() {
        var a = screen; return [z(parseFloat(a.availTop), null), z(parseFloat(a.width) - parseFloat(a.availWidth) -
            z(parseFloat(a.availLeft), 0), null), z(parseFloat(a.height) - parseFloat(a.availHeight) - z(parseFloat(a.availTop), 0), null), z(parseFloat(a.availLeft), null)]
    } function Q(a) { for (var c = 0; 4 > c; ++c)if (a[c]) return !1; return !0 } function sa(a) {
        var c; return A(this, void 0, void 0, function () {
            var b, k, f, m, p, d, h; return y(this, function (e) {
                switch (e.label) {
                    case 0: b = document; k = b.createElement("div"); f = Array(a.length); m = {}; ha(k); for (p = 0; p < a.length; ++p) {
                        var g = ka(a[p]), l = g[0]; g = g[1]; l = document.createElement(null !== l && void 0 !== l ?
                            l : "div"); for (var n = 0, t = Object.keys(g); n < t.length; n++) { var B = t[n]; l.setAttribute(B, g[B].join(" ")) } d = l; h = b.createElement("div"); ha(h); h.appendChild(d); k.appendChild(h); f[p] = d
                    } e.label = 1; case 1: return b.body ? [3, 3] : [4, E(50)]; case 2: return e.sent(), [3, 1]; case 3: b.body.appendChild(k); try { for (p = 0; p < a.length; ++p)f[p].offsetParent || (m[a[p]] = !0) } finally { null === (c = k.parentNode) || void 0 === c ? void 0 : c.removeChild(k) } return [2, m]
                }
            })
        })
    } function ha(a) { a.style.setProperty("display", "block", "important") } function ta(a) {
        for (var c =
            "DOM blockers debug:\n```", b = 0, k = R; b < k.length; b++) { var f = k[b]; c += "\n" + f + ":"; var m = 0; for (f = K[f]; m < f.length; m++) { var p = f[m]; c += "\n  " + p + " " + (a[p] ? "\ud83d\udeab" : "\u27a1\ufe0f") } } console.log(c + "\n```")
    } function G(a) { return matchMedia("(prefers-contrast: " + a + ")").matches } function ia(a) { return matchMedia("(prefers-reduced-motion: " + a + ")").matches } function ua(a, c) {
        void 0 === c && (c = 4E3); return fa(function (b, k) {
            b = k.document; var f = b.body, m = f.style; m.width = c + "px"; m.webkitTextSizeAdjust = m.textSizeAdjust = "none";
            M() ? f.style.zoom = "" + 1 / k.devicePixelRatio : I() && (f.style.zoom = "reset"); k = b.createElement("div"); k.textContent = W(Array(c / 20 << 0)).map(function () { return "word" }).join(" "); f.appendChild(k); return a(b, f)
        }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
    } function va(a) {
        da() ? a = .4 : I() ? a = N() ? .5 : .3 : (a = a.platform.value || "", a = /^Win/.test(a) ? .6 : /^Mac/.test(a) ? .5 : .7); var c = aa(.99 + .01 * a, 1E-4); return {
            score: a, comment: "$ if upgrade to Pro: https://fpjs.dev/pro".replace(/\$/g,
                "" + c)
        }
    } function wa(a) { return JSON.stringify(a, function (c, b) { if (b instanceof Error) { var k; return S({ name: b.name, message: b.message, stack: null === (k = b.stack) || void 0 === k ? void 0 : k.split("\n") }, b) } return b }, 2) } function xa(a) {
        var c; return {
            get skfaId() {
                if (void 0 === c) {
                    for (var b = this.components, k = "", f = 0, m = Object.keys(b).sort(); f < m.length; f++) { var p = m[f], d = b[p]; d = d.error ? "error" : JSON.stringify(d.value); k += (k ? "|" : "") + p.replace(/([:|\\])/g, "\\$1") + ":" + d } f = k || ""; k = 0; m = f.length % 16; p = f.length - m; b = [0, k]; k = [0, k];
                    var h = [2277735313, 289559509], e = [1291169091, 658871167], g; for (g = 0; g < p; g += 16) {
                        d = [f.charCodeAt(g + 4) & 255 | (f.charCodeAt(g + 5) & 255) << 8 | (f.charCodeAt(g + 6) & 255) << 16 | (f.charCodeAt(g + 7) & 255) << 24, f.charCodeAt(g) & 255 | (f.charCodeAt(g + 1) & 255) << 8 | (f.charCodeAt(g + 2) & 255) << 16 | (f.charCodeAt(g + 3) & 255) << 24]; var l = [f.charCodeAt(g + 12) & 255 | (f.charCodeAt(g + 13) & 255) << 8 | (f.charCodeAt(g + 14) & 255) << 16 | (f.charCodeAt(g + 15) & 255) << 24, f.charCodeAt(g + 8) & 255 | (f.charCodeAt(g + 9) & 255) << 8 | (f.charCodeAt(g + 10) & 255) << 16 | (f.charCodeAt(g + 11) &
                            255) << 24]; d = w(d, h); d = F(d, 31); d = w(d, e); b = r(b, d); b = F(b, 27); b = C(b, k); b = C(w(b, [0, 5]), [0, 1390208809]); l = w(l, e); l = F(l, 33); l = w(l, h); k = r(k, l); k = F(k, 31); k = C(k, b); k = C(w(k, [0, 5]), [0, 944331445])
                    } d = [0, 0]; l = [0, 0]; switch (m) {
                        case 15: l = r(l, v([0, f.charCodeAt(g + 14)], 48)); case 14: l = r(l, v([0, f.charCodeAt(g + 13)], 40)); case 13: l = r(l, v([0, f.charCodeAt(g + 12)], 32)); case 12: l = r(l, v([0, f.charCodeAt(g + 11)], 24)); case 11: l = r(l, v([0, f.charCodeAt(g + 10)], 16)); case 10: l = r(l, v([0, f.charCodeAt(g + 9)], 8)); case 9: l = r(l, [0, f.charCodeAt(g +
                            8)]), l = w(l, e), l = F(l, 33), l = w(l, h), k = r(k, l); case 8: d = r(d, v([0, f.charCodeAt(g + 7)], 56)); case 7: d = r(d, v([0, f.charCodeAt(g + 6)], 48)); case 6: d = r(d, v([0, f.charCodeAt(g + 5)], 40)); case 5: d = r(d, v([0, f.charCodeAt(g + 4)], 32)); case 4: d = r(d, v([0, f.charCodeAt(g + 3)], 24)); case 3: d = r(d, v([0, f.charCodeAt(g + 2)], 16)); case 2: d = r(d, v([0, f.charCodeAt(g + 1)], 8)); case 1: d = r(d, [0, f.charCodeAt(g)]), d = w(d, h), d = F(d, 31), d = w(d, e), b = r(b, d)
                    }b = r(b, [0, f.length]); k = r(k, [0, f.length]); b = C(b, k); k = C(k, b); b = Z(b); k = Z(k); b = C(b, k); k = C(k, b); f = [];
                    m = V(0); p = V(1); f[0] = b[0] ^ m[0]; f[1] = b[1] ^ m[1]; f[2] = k[0] ^ m[2]; f[3] = k[1] ^ m[3]; f[4] = b[0] ^ p[0]; f[5] = b[1] ^ p[1]; f[6] = k[0] ^ p[2]; f[7] = k[1] ^ p[3]; b = ""; for (k = 0; k < 4 * f.length; k++)b += "0123456789ABCDEF".charAt(f[k >> 2] >> k % 4 * 8 + 4 & 15) + "0123456789ABCDEF".charAt(f[k >> 2] >> k % 4 * 8 & 15); c = b
                } return c
            }, set skfaId(b) { c = b }, confidence: va(a), components: a, version: "3.3.0"
        }
    } function ya(a, c) {
        return {
            get: function (b) {
                return A(this, void 0, void 0, function () {
                    var k, f, m; return y(this, function (p) {
                        switch (p.label) {
                            case 0: return k = 1E12, [4, a()];
                            case 1: return f = p.sent(), m = xa(f), (c || (null === b || void 0 === b ? 0 : b.debug)) && console.log("Copy the text below to get the debug data:\n\n```\nversion: " + m.version + "\nuserAgent: " + navigator.userAgent + "\ntimeBetweenLoadAndGet: " + (k - 1E12) + "\nskfaId: " + m.skfaId + "\ncomponents: " + wa(f) + "\n```"), [2, m]
                        }
                    })
                })
            }
        }
    } var S = function () {
        S = Object.assign || function (a) { for (var c, b = 1, k = arguments.length; b < k; b++) { c = arguments[b]; for (var f in c) Object.prototype.hasOwnProperty.call(c, f) && (a[f] = c[f]) } return a }; return S.apply(this,
            arguments)
    }, H = ["monospace", "sans-serif", "serif"], T = "sans-serif-thin;ARNO PRO;Agency FB;Arabic Typesetting;Arial Unicode MS;AvantGarde Bk BT;BankGothic Md BT;Batang;Bitstream Vera Sans Mono;Calibri;Century;Century Gothic;Clarendon;EUROSTILE;Franklin Gothic;Futura Bk BT;Futura Md BT;GOTHAM;Gill Sans;HELV;Haettenschweiler;Helvetica Neue;Humanst521 BT;Leelawadee;Letter Gothic;Levenim MT;Lucida Bright;Lucida Sans;Menlo;MS Mincho;MS Outlook;MS Reference Specialty;MS UI Gothic;MT Extra;MYRIAD PRO;Marlett;Meiryo UI;Microsoft Uighur;Minion Pro;Monotype Corsiva;PMingLiU;Pristina;SCRIPTINA;Segoe UI Light;Serifa;SimHei;Small Fonts;Staccato222 BT;TRAJAN PRO;Univers CE 55 Medium;Vrinda;ZWAdobeF".split(";"),
        J, O, K = {
            abpIndo: ["#Iklan-Melayang", "#Kolom-Iklan-728", "#SidebarIklan-wrapper", 'a[title="7naga poker" i]', '[title="ALIENBOLA" i]'], abpvn: ["#quangcaomb", ".i-said-no-thing-can-stop-me-warning.dark", ".quangcao", '[href^="https://r88.vn/"]', '[href^="https://zbet.vn/"]'], adBlockFinland: [".mainostila", ".sponsorit", ".ylamainos", 'a[href*="/clickthrgh.asp?"]', 'a[href^="https://app.readpeak.com/ads"]'], adBlockPersian: ["#navbar_notice_50", 'a[href^="http://g1.v.fwmrm.net/ad/"]', ".kadr", 'TABLE[width="140px"]', "#divAgahi"],
            adBlockWarningRemoval: ["#adblock_message", ".adblockInfo", ".deadblocker-header-bar", ".no-ad-reminder", "#AdBlockDialog"], adGuardAnnoyances: ['amp-embed[type="zen"]', ".hs-sosyal", "#cookieconsentdiv", 'div[class^="app_gdpr"]', ".as-oil"], adGuardBase: ["#ad-fullbanner2-billboard-outer", ".stky-ad-footer", ".BetterJsPopOverlay", "#ad_300X250", "#bannerfloat22"], adGuardChinese: ['#piao_div_0[style*="width:140px;"]', 'a[href*=".ttz5.cn"]', 'a[href*=".yabovip2027.com/"]', ".tm3all2h4b", "#duilian_left"], adGuardFrench: ["#anAdScGp300x25",
                'a[href*=".kfiopkln.com/"]', 'a[href^="https://jsecoin.com/o/?"]', 'a[href^="https://www.clickadu.com/?"]', ".bandeauClosePub"], adGuardGerman: [".banneritemwerbung_head_1", ".boxstartwerbung", ".werbung3", 'a[href^="http://www.eis.de/index.phtml?refid="]', 'a[href^="https://www.tipico.com/?affiliateId="]'], adGuardJapanese: ["#kauli_yad_1", ".adArticleSidetile", ".ads_entrymore", 'a[href^="http://ad2.trafficgate.net/"]', 'a[href^="http://www.rssad.jp/"]'], adGuardMobile: ["amp-auto-ads", "#mgid_iframe", ".amp_ad",
                    "amp-sticky-ad", ".plugin-blogroll"], adGuardRussian: ['a[href^="https://ya-distrib.ru/r/"]', 'a[href^="https://ad.letmeads.com/"]', ".reclama", 'div[id^="smi2adblock"]', 'div[id^="AdFox_banner_"]'], adGuardSocial: ['a[href^="//www.stumbleupon.com/submit?url="]', 'a[href^="//telegram.me/share/url?"]', ".etsy-tweet", "#inlineShare", ".popup-social"], adGuardSpanishPortuguese: ["#barraPublicidade", "#Publicidade", "#publiEspecial", "#queTooltip", '[href^="http://ads.glispa.com/"]'], adGuardTrackingProtection: ['amp-embed[type="taboola"]',
                        "#qoo-counter", 'a[href^="http://click.hotlog.ru/"]', 'a[href^="http://hitcounter.ru/top/stat.php"]', 'a[href^="http://top.mail.ru/jump"]'], adGuardTurkish: ["#backkapat", "#reklami", 'a[href^="http://adserv.ontek.com.tr/"]', 'a[href^="http://izlenzi.com/campaign/"]', 'a[href^="http://www.installads.net/"]'], bulgarian: ["td#freenet_table_ads", "#newAd", "#ea_intext_div", ".lapni-pop-over", "#xenium_hot_offers"], easyList: ["#adlabelheader", "#anAdScGame300x250", "#adTakeOverLeft", "#ad_LargeRec01", "#adundergame"], easyListChina: ['a[href*=".wensixuetang.com/"]',
                            'A[href*="/hth107.com/"]', '.appguide-wrap[onclick*="bcebos.com"]', ".frontpageAdvM", "#taotaole"], easyListCookie: ["#Button_Cookie", "#CWCookie", "#CookieCon", "#DGPR", "#PnlCookie"], easyListCzechSlovak: ["#onlajny-stickers", "#reklamni-box", ".reklama-megaboard", ".sklik", '[id^="sklikReklama"]'], easyListDutch: ["#advertentie", "#vipAdmarktBannerBlock", ".adstekst", 'a[href^="http://adserver.webads.nl/adclick/"]', "#semilo-lrectangle"], easyListGermany: ["#nativendo-hometop", 'a[href^="http://www.kontakt-vermittler.de/?wm="]',
                                "#gwerbung", 'a[href^="https://marketing.net.brillen.de/"]', ".werbenbox"], easyListItaly: [".box_adv_annunci", ".sb-box-pubbliredazionale", 'a[href^="http://affiliazioniads.snai.it/"]', 'a[href^="https://adserver.html.it/"]', 'a[href^="https://affiliazioniads.snai.it/"]'], easyListLithuania: [".reklamos_tarpas", ".reklamos_nuorodos", 'img[alt="Reklaminis skydelis"]', 'img[alt="Dedikuoti.lt serveriai"]', 'img[alt="Hostingas Serveriai.lt"]'], estonian: ['A[href*="http://pay4results24.eu"]'], fanboyAnnoyances: ["#feedback-tab",
                                    "#taboola-below-article", ".feedburnerFeedBlock", ".widget-feedburner-counter", '[title="Subscribe to our blog"]'], fanboyAntiFacebook: [".util-bar-module-firefly-visible"], fanboyEnhancedTrackers: [".open.pushModal", "#issuem-leaky-paywall-articles-zero-remaining-nag", 'div[style*="box-shadow: rgb(136, 136, 136) 0px 0px 12px; color: "]', 'div[class$="-hide"][zoompage-fontsize][style="display: block;"]', ".BlockNag__Card"], fanboySocial: [".td-tags-and-social-wrapper-box", ".twitterContainer", ".youtube-social",
                                        'a[title^="Like us on Facebook"]', 'img[alt^="Share on Digg"]'], frellwitSwedish: ['a[href*="casinopro.se"][target="_blank"]', 'a[href*="doktor-se.onelink.me"]', "article.category-samarbete", "div.holidAds", "ul.adsmodern"], greekAdBlock: ['A[href*="adman.otenet.gr/click?"]', 'A[href*="http://axiabanners.exodus.gr/"]', 'A[href*="http://interactive.forthnet.gr/click?"]', "DIV.agores300", "TABLE.advright"], hungarian: ['A[href*="ad.eval.hu"]', 'A[href*="ad.netmedia.hu"]', 'A[href*="daserver.ultraweb.hu"]', "#cemp_doboz",
                                            ".optimonk-iframe-container"], iDontCareAboutCookies: ['.alert-info[data-block-track*="CookieNotice"]', ".ModuleTemplateCookieIndicator", ".o--cookies--container", ".cookie-msg-info-container", "#cookies-policy-sticky"], icelandicAbp: ['A[href^="/framework/resources/forms/ads.aspx"]'], latvian: ['a[href="http://www.salidzini.lv/"][style="display: block; width: 120px; height: 40px; overflow: hidden; position: relative;"]', 'a[href="http://www.salidzini.lv/"][style="display: block; width: 88px; height: 31px; overflow: hidden; position: relative;"]'],
            listKr: ['a[href*="//kingtoon.slnk.kr"]', 'a[href*="//playdsb.com/kr"]', "div.logly-lift-adz", 'div[data-widget_id="ml6EJ074"]', "ins.daum_ddn_area"], listeAr: [".geminiLB1Ad", ".right-and-left-sponsers", 'a[href*=".aflam.info"]', 'a[href*="booraq.org"]', 'a[href*="dubizzle.com/ar/?utm_source="]'], listeFr: ['a[href^="http://promo.vador.com/"]', "#adcontainer_recherche", 'a[href*="weborama.fr/fcgi-bin/"]', ".site-pub-interstitiel", 'div[id^="crt-"][data-criteo-id]'], officialPolish: ["#ceneo-placeholder-ceneo-12", '[href^="https://aff.sendhub.pl/"]',
                'a[href^="http://advmanager.techfun.pl/redirect/"]', 'a[href^="http://www.trizer.pl/?utm_source"]', "div#skapiec_ad"], ro: ['a[href^="//afftrk.altex.ro/Counter/Click"]', 'a[href^="/magazin/"]', 'a[href^="https://blackfridaysales.ro/trk/shop/"]', 'a[href^="https://event.2performant.com/events/click"]', 'a[href^="https://l.profitshare.ro/"]'], ruAd: ['a[href*="//febrare.ru/"]', 'a[href*="//utimg.ru/"]', 'a[href*="://chikidiki.ru"]', "#pgeldiz", ".yandex-rtb-block"], thaiAds: ["a[href*=macau-uta-popup]", "#ads-google-middle_rectangle-group",
                    ".ads300s", ".bumq", ".img-kosana"], webAnnoyancesUltralist: ["#mod-social-share-2", "#social-tools", ".ctpl-fullbanner", ".zergnet-recommend", ".yt.btn-link.btn-md.btn"]
        }, R = Object.keys(K), q = Math, u = function () { return 0 }, za = q.acos || u, Aa = q.acosh || u, Ba = q.asin || u, Ca = q.asinh || u, Da = q.atanh || u, Ea = q.atan || u, Fa = q.sin || u, Ga = q.sinh || u, Ha = q.cos || u, Ia = q.cosh || u, Ja = q.tan || u, Ka = q.tanh || u, La = q.exp || u, Ma = q.expm1 || u, Na = q.log1p || u, U = {
            default: [], apple: [{ font: "-apple-system-body" }], serif: [{ fontFamily: "serif" }], sans: [{ fontFamily: "sans-serif" }],
            mono: [{ fontFamily: "monospace" }], min: [{ fontSize: "1px" }], system: [{ fontFamily: "system-ui" }]
        }, Oa = {
            fonts: function () {
                return fa(function (a, c) {
                    var b = c.document; c = b.body; c.style.fontSize = "48px"; var k = b.createElement("div"), f = {}, m = {}, p = function (e) { var g = b.createElement("span"), l = g.style; l.position = "absolute"; l.top = "0"; l.left = "0"; l.fontFamily = e; g.textContent = "mmMwWLliI0O&1"; k.appendChild(g); return g }, d = function (e) { return H.some(function (g, l) { return e[l].offsetWidth !== f[g] || e[l].offsetHeight !== m[g] }) }; a = H.map(p);
                    var h = function () { for (var e = {}, g = function (n) { e[n] = H.map(function (t) { return p("'" + n + "'," + t) }) }, l = 0; l < T.length; l++)g(T[l]); return e }(); c.appendChild(k); for (c = 0; c < H.length; c++)f[H[c]] = a[c].offsetWidth, m[H[c]] = a[c].offsetHeight; return T.filter(function (e) { return d(h[e]) })
                })
            }, domBlockers: function (a) {
                var c = (void 0 === a ? {} : a).debug; return A(this, void 0, void 0, function () {
                    var b, k, f, m; return y(this, function (p) {
                        switch (p.label) {
                            case 0: if (!I() && !da()) return [2, void 0]; b = (m = []).concat.apply(m, R.map(function (d) { return K[d] }));
                                return [4, sa(b)]; case 1: return k = p.sent(), c && ta(k), f = R.filter(function (d) { d = K[d]; return x(d.map(function (h) { return k[h] })) > .6 * d.length }), f.sort(), [2, f]
                        }
                    })
                })
            }, fontPreferences: function () {
                return ua(function (a, c) {
                    for (var b = {}, k = {}, f = 0, m = Object.keys(U); f < m.length; f++) {
                        var p = m[f], d = U[p], h = d[0]; h = void 0 === h ? {} : h; d = d[1]; var e = void 0 === d ? "mmMwWLliI0fiflO&1" : d; d = a.createElement("span"); d.textContent = e; d.style.whiteSpace = "nowrap"; e = 0; for (var g = Object.keys(h); e < g.length; e++) {
                            var l = g[e], n = h[l]; void 0 !== n && (d.style[l] =
                                n)
                        } b[p] = d; c.appendChild(a.createElement("br")); c.appendChild(d)
                    } a = 0; for (c = Object.keys(U); a < c.length; a++)p = c[a], k[p] = b[p].getBoundingClientRect().width; return k
                })
            }, audio: function () {
                var a = window; a = a.OfflineAudioContext || a.webkitOfflineAudioContext; if (!a) return -2; if (I() && !N() && !oa()) return -1; a = new a(1, 5E3, 44100); var c = a.createOscillator(); c.type = "triangle"; c.frequency.value = 1E4; var b = a.createDynamicsCompressor(); b.threshold.value = -50; b.knee.value = 40; b.ratio.value = 12; b.attack.value = 0; b.release.value =
                    .25; c.connect(b); b.connect(a.destination); c.start(0); a = pa(a); var k = a[1], f = a[0].then(function (m) { m = m.getChannelData(0).subarray(4500); for (var p = 0, d = 0; d < m.length; ++d)p += Math.abs(m[d]); return p }, function (m) { if ("timeout" === m.name || "suspended" === m.name) return -3; throw m; }); f.catch(function () { }); return function () { k(); return f }
            }, screenFrame: function () {
                var a = this, c = ra(); return function () {
                    return A(a, void 0, void 0, function () {
                        var b, k; return y(this, function (f) {
                            switch (f.label) {
                                case 0: return [4, c()]; case 1: return b =
                                    f.sent(), k = function (m) { return null === m ? null : aa(m, 10) }, [2, [k(b[0]), k(b[1]), k(b[2]), k(b[3])]]
                            }
                        })
                    })
                }
            }, osCpu: function () { return navigator.oscpu }, languages: function () {
                var a = navigator, c = [], b = a.language || a.userLanguage || a.browserLanguage || a.systemLanguage; void 0 !== b && c.push([b]); if (Array.isArray(a.languages)) { if (b = M()) b = window, b = 3 <= x([!("MediaSettingsRange" in b), "RTCEncodedAudioFrame" in b, "[object Intl]" === "" + b.Intl, "[object Reflect]" === "" + b.Reflect]); b || c.push(a.languages) } else "string" === typeof a.languages &&
                    (a = a.languages) && c.push(a.split(",")); return c
            }, colorDepth: function () { return window.screen.colorDepth }, deviceMemory: function () { return z(parseFloat(navigator.deviceMemory), void 0) }, screenResolution: function () { var a = screen; a = [z(parseInt(a.width), null), z(parseInt(a.height), null)]; a.sort().reverse(); return a }, hardwareConcurrency: function () { return z(parseInt(navigator.hardwareConcurrency), void 0) }, timezone: function () {
                var a, c = null === (a = window.Intl) || void 0 === a ? void 0 : a.DateTimeFormat; if (c && (a = (new c).resolvedOptions().timeZone)) return a;
                a = (new Date).getFullYear(); a = -Math.max(parseFloat((new Date(a, 0, 1)).getTimezoneOffset()), parseFloat((new Date(a, 6, 1)).getTimezoneOffset())); return "UTC" + (0 <= a ? "+" : "") + Math.abs(a)
            }, sessionStorage: function () { try { return !!window.sessionStorage } catch (a) { return !0 } }, localStorage: function () { try { return !!window.localStorage } catch (a) { return !0 } }, indexedDB: function () { var a; if (!(a = ca())) { a = window; var c = navigator; a = 3 <= x(["msWriteProfilerMark" in a, "MSStream" in a, "msLaunchUri" in c, "msSaveBlob" in c]) && !ca() } if (!a) try { return !!window.indexedDB } catch (b) { return !0 } },
            openDatabase: function () { return !!window.openDatabase }, cpuClass: function () { return navigator.cpuClass }, platform: function () { var a = navigator.platform; return "MacIntel" === a && I() && !N() ? ("iPad" === navigator.platform ? a = !0 : (a = screen, a = a.width / a.height, a = 2 <= x(["MediaSource" in window, !!Element.prototype.webkitRequestFullscreen, a > 2 / 3 && 1.5 > a])), a ? "iPad" : "iPhone") : a }, plugins: function () {
                var a = navigator.plugins; if (a) {
                    for (var c = [], b = 0; b < a.length; ++b) {
                        var k = a[b]; if (k) {
                            for (var f = [], m = 0; m < k.length; ++m) {
                                var p = k[m]; f.push({
                                    type: p.type,
                                    suffixes: p.suffixes
                                })
                            } c.push({ name: k.name, description: k.description, mimeTypes: f })
                        }
                    } return c
                }
            }, canvas: function () {
                var a = document.createElement("canvas"); a.width = 1; a.height = 1; var c = [a, a.getContext("2d")]; a = c[0]; var b = c[1]; if (!b || !a.toDataURL) return { winding: !1, geometry: "", text: "" }; b.rect(0, 0, 10, 10); b.rect(2, 2, 6, 6); c = !b.isPointInPath(5, 5, "evenodd"); a.width = 122; a.height = 110; b.globalCompositeOperation = "multiply"; var k = 0; for (var f = [["#f2f", 40, 40], ["#2ff", 80, 40], ["#ff2", 60, 80]]; k < f.length; k++) {
                    var m = f[k],
                        p = m[1], d = m[2]; b.fillStyle = m[0]; b.beginPath(); b.arc(p, d, 40, 0, 2 * Math.PI, !0); b.closePath(); b.fill()
                } b.fillStyle = "#f9c"; b.arc(60, 60, 60, 0, 2 * Math.PI, !0); b.arc(60, 60, 20, 0, 2 * Math.PI, !0); b.fill("evenodd"); k = a.toDataURL(); a.width = 240; a.height = 60; b.textBaseline = "alphabetic"; b.fillStyle = "#f60"; b.fillRect(100, 1, 62, 20); b.fillStyle = "#069"; b.font = '11pt "Times New Roman"'; f = "Cwm fjordbank gly " + String.fromCharCode(55357, 56835); b.fillText(f, 2, 15); b.fillStyle = "rgba(102, 204, 0, 0.2)"; b.font = "18pt Arial"; b.fillText(f,
                    4, 45); a = a.toDataURL(); return { winding: c, geometry: k, text: a }
            }, touchSupport: function () { var a = navigator, c = 0; void 0 !== a.maxTouchPoints ? c = parseInt(a.maxTouchPoints) : void 0 !== a.msMaxTouchPoints && (c = a.msMaxTouchPoints); try { document.createEvent("TouchEvent"); var b = !0 } catch (k) { b = !1 } return { maxTouchPoints: c, touchEvent: b, touchStart: "ontouchstart" in window } }, vendor: function () { return navigator.vendor || "" }, vendorFlavors: function () {
                for (var a = [], c = 0, b = "chrome safari __crWeb __gCrWeb yandex __yb __ybro __firefox__ __edgeTrackingPreventionStatistics webkit oprt samsungAr ucweb UCShellJava puffinDevice".split(" "); c <
                    b.length; c++) { var k = b[c], f = window[k]; f && "object" === typeof f && a.push(k) } return a.sort()
            }, cookiesEnabled: function () { var a = document; try { a.cookie = "cookietest=1; SameSite=Strict;"; var c = -1 !== a.cookie.indexOf("cookietest="); a.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT"; return c } catch (b) { return !1 } }, colorGamut: function () { for (var a = 0, c = ["rec2020", "p3", "srgb"]; a < c.length; a++) { var b = c[a]; if (matchMedia("(color-gamut: " + b + ")").matches) return b } }, invertedColors: function () {
                if (matchMedia("(inverted-colors: inverted)").matches) return !0;
                if (matchMedia("(inverted-colors: none)").matches) return !1
            }, forcedColors: function () { if (matchMedia("(forced-colors: active)").matches) return !0; if (matchMedia("(forced-colors: none)").matches) return !1 }, monochrome: function () { if (matchMedia("(min-monochrome: 0)").matches) { for (var a = 0; 100 >= a; ++a)if (matchMedia("(max-monochrome: " + a + ")").matches) return a; throw Error("Too high value"); } }, contrast: function () { if (G("no-preference")) return 0; if (G("high") || G("more")) return 1; if (G("low") || G("less")) return -1; if (G("forced")) return 10 },
            reducedMotion: function () { if (ia("reduce")) return !0; if (ia("no-preference")) return !1 }, hdr: function () { if (matchMedia("(dynamic-range: high)").matches) return !0; if (matchMedia("(dynamic-range: standard)").matches) return !1 }, math: function () {
                return {
                    acos: za(.12312423423423424), acosh: Aa(1E308), acoshPf: q.log(1E154 + q.sqrt(1E154 * 1E154 - 1)), asin: Ba(.12312423423423424), asinh: Ca(1), asinhPf: q.log(1 + q.sqrt(2)), atanh: Da(.5), atanhPf: q.log(3) / 2, atan: Ea(.5), sin: Fa(-1E300), sinh: Ga(1), sinhPf: q.exp(1) - 1 / q.exp(1) / 2, cos: Ha(10.000000000123),
                    cosh: Ia(1), coshPf: (q.exp(1) + 1 / q.exp(1)) / 2, tan: Ja(-1E300), tanh: Ka(1), tanhPf: (q.exp(2) - 1) / (q.exp(2) + 1), exp: La(1), expm1: Ma(1), expm1Pf: q.exp(1) - 1, log1p: Na(10), log1pPf: q.log(11), powPI: q.pow(q.PI, -100)
                }
            }
        }; return function (a) { a = void 0 === a ? {} : a; var c = a.delayFallback, b = a.debug; return A(this, void 0, void 0, function () { var k; return y(this, function (f) { switch (f.label) { case 0: return f = c, void 0 === f && (f = 50), [4, ja(f, 2 * f)]; case 1: return f.sent(), k = ma(Oa, { debug: b }, []), [2, ya(k, b)] } }) }) }()
};
