// ==UserScript==
// @name            天雪论坛
// @namespace       https://github.com/inu1255/soulsign-chrome
// @version         1.0.0
// @author          byron
// @loginURL        https://www.skyey2.com/login.php
// @expire          14400e3
// @domain          www.skyey2.com
// ==/UserScript==

exports.run = async function() {
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

exports.check = async function() {
    var { data } = await axios.get('https://www.skyey2.com');
    return /我的/.test(data);
};
