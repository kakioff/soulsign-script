// ==UserScript==
// @name              52PT签到
// @namespace         https://github.com/kakioff/soulsign-script/tree/main/52pt
// @version           1.0.0
// @author            byron
// @loginURL          https://52pt.site/login.php
// @expire            
// @domain            52pt.site
// ==/UserScript==

/**
 * 签到 
 * 
 * @param data_str 
 */
function sign_start(data_str){
    var ifr = document.createElement("div")
    ifr.style.display = 'none'
    ifr.innerHTML = data_str
    ifr.innerHTML += `<iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>`
    document.body.appendChild(ifr)
    let form = ifr.getElementsByTagName('form')[0],
        input_list = form.getElementsByTagName('input')
    for (let i = 0; i < input_list.length; i++) {
        if (input_list[i].name == "choice[]" && (input_list[i].type=='checkbox' || input_list[i].type=='radio')) {
            input_list[i].checked=true
        }
    }
    form.action='https://52pt.site/bakatest.php'
    form.target='nm_iframe'
    form.submit.remove()
    form.submit()
    setTimeout(()=>{
        ifr.remove()
    }, 3000)
}
/**
 * 签到接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
 * throw 签到失败并抛出失败原因
 * return 签到成功并返回成功信息
 */
 exports.run = async function () {
    var ret = await axios.get('https://52pt.site/bakatest.php');
    if(!/今天已经签过到了/.test(ret.data)){
        // 开始签到
        sign_start(ret.data)
        setTimeout(run(), 10000)
    }
    ret = await axios.get('https://52pt.site/bakatest.php');
    var ifr = document.createElement("div")
    ifr.innerHTML = ret.data
    return ifr.getElementsByTagName("table")[6].innerText.replace("\n", "")
    // -------
}

/**
 * 检查是否在线接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
 * return true 代表在线
 */
exports.check = async function () {
    var ret = await
        // 先换一道题
        axios.get('https://52pt.site/bakatest.php');
    if (/今天已经签过到了/.test(ret.data)) {
        var ifr = document.createElement("div")
        ifr.innerHTML = ret.data
        return ifr.getElementsByTagName("table")[6].innerText.replaceAll("\n", "")
    }
    return ret.status == 200;
};
