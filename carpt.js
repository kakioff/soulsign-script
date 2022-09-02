// ==UserScript==
// @name              CarPT签到
// @namespace         https://github.com/kakioff/soulsign-script
// @updateURL           https://raw.githubusercontent.com/kakioff/soulsign-script/main/carpt.js
// @version           1.1.0
// @author            byron
// @loginURL          https://carpt.net
// @expire            31100e7
// @domain            carpt.net
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
    throw "要验证码，不支持自动登录"
    if (!name || !password)
        throw "设置用户名密码后自动登录"

    let { data } = await axios.get('https://carpt.net/login.php'),
        login_ifr = document.createElement("div")
    login_ifr.innerHTML = data
    let login_form = login_ifr.getElementsByTagName("form")[1],
        login_url = "https://carpt.net/takelogin.php",
        params = {}
    for (let i = 0; i < login_form.elements.length; i++) {
        if (login_form.elements[i].name) {
            params[login_form.elements[i].name] = login_form.elements[i].value
        }
    }
    params["username"] = name
    params["password"] = password
    let ret = await axios({
        method: 'post',
        url: login_url,
        //    必不可少，修改数据的提交方式
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        params: params
    })
    if (ret.status == 200) {
        return "登录成功"
    } else {
        throw "登录失败"
    }
    // let ret = await axios.post(login_url, params)
    // if (ret.status == 200) {
    //     return "登录成功"
    // }
}

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
exports.run = async function (param) {
    var ret = await axios.get('https://carpt.net'),
        done_text = get_status(ret.data)
    if (/签到已得/.test(done_text)) return done_text;

    var ret = await axios.get('https://carpt.net/attendance.php');
    if (ret.status != 200) throw '需要登录';
    if (/签到成功/.test(ret.data)) return get_status(ret.data);
    return go2login(param.name, param.pwd)
}

/**
 * 检查是否在线接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
 * return true 代表在线
 */
exports.check = async function (param) {
    var ret = await axios.get('https://carpt.net/torrents.php');
    if(ret.status == 200) return true;
    return go2login(param.name, param.pwd)
};
