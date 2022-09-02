// ==UserScript==
// @name              HDTIME签到
// @namespace         https://hdtime.org
// @version           1.0.0
// @author            byron
// @loginURL          https://hdtime.org
// @expire            
// @domain            hdtime.org
// ==/UserScript==

function get_status(data_str) {
    var ifr = document.createElement("div")
    ifr.innerHTML = data_str
    let a_list = ifr.getElementsByTagName('a'),
        done_text = ""
    for (let i = 0; i < a_list.length; i++) {
        if (/attendance.php$/.test(a_list[i].href)) {
            done_text = a_list[i].innerText.replace("[", '').replace("]", '')
            break
        }
    }
    return done_text
}
/**
 * 签到接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
 * throw 签到失败并抛出失败原因
 * return 签到成功并返回成功信息
 */
exports.run = async function () {
    var ret = await axios.get('https://hdtime.org'),
        done_text = get_status(ret.data)
    if (/签到已得/.test(done_text)) return done_text;

    var ret = await axios.get('https://hdtime.org/attendance.php');
    if (ret.status != 200) throw '需要登录';
    if (/签到成功/.test(ret.data)) return get_status(ret.data);
    let m = /redeem\?once=(.*?)'/.exec(ret.data);
    if (!m) throw '失败1';
}

/**
 * 检查是否在线接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
 * return true 代表在线
 */
exports.check = async function () {
    var ret = await axios.get('https://hdtime.org/attendance.php');
    return ret.status == 200;
};
