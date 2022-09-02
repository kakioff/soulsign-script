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

exports.run = async function () {
    var { data } = await axios.get('https://www.skyey2.com');
    var ifr = document.createElement("div")
    ifr.innerHTML = data
    if (/我的/.test(data)) {
        let r_data = ""
        r_data += ifr.getElementsByClassName("showmenu")[1].innerText.replaceAll("  ", "")
        r_data += "  "
        r_data += ifr.getElementsByClassName("showmenu")[4].innerText.replaceAll("  ", "")
        return r_data
    }
    throw '访问失败';
};

exports.check = async function () {
    var { data } = await axios.get('https://www.skyey2.com');
    if (!param.name || !param.pwd) {
        return /我的/.test(data)
    }else{
        var { data } = await axios.get('https://www.skyey2.com/login.php')
        var login_ifr = document.createElement("div")
        login_ifr.innerHTML = data
        login_ifr.innerHTML += `<iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>`
        document.body.appendChild(login_ifr)
        let all_input = login_ifr.getElementsByTagName("input"),
            login_form = login_ifr.getElementsByTagName("form").login
        for(let i=0,len=all_input.length;i<len;i++){
            if(/username/.test(all_input[i].id)){
                all_input[i].value = param.name
            }else if(/password3/.test(all_input[i].id)){
                all_input[i].value = param.pwd
            }else if(/cookietime/.test(all_input[i].id)){
                all_input[i].checked = true
            }
        }
        login_form.action = "https://www.skyey2.com"+login_form.action
        login_form.target='nm_iframe'
        login_form.submit.remove()
        login_form.submit()
        setTimeout(()=>{
            login_ifr.remove()
        }, 3000)
        return "登录成功"
    }
};
