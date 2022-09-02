// ==UserScript==
// @name              BTSchool签到
// @namespace         https://github.com/kakioff/soulsign-script/tree/main/btschool
// @version           1.0.0
// @author            byron
// @loginURL          https://pt.btschool.club/login.php
// @expire            
// @domain            pt.btschool.club
// ==/UserScript==

/**
 * 签到接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
 * throw 签到失败并抛出失败原因
 * return 签到成功并返回成功信息
 */
 exports.run = async function() {
    var ret = await axios.get('https://pt.btschool.club/');
        if (!/今日签到/.test(ret.data)) return '今日已签到';
    
        var ret = await axios.get('https://pt.btschool.club/index.php?action=addbonus');
        if (ret.status != 200) throw '需要登录';
        else return '已签到';
        let m = /redeem\?once=(.*?)'/.exec(ret.data);
        if (!m) throw '失败1';
    }
    
    /**
     * 检查是否在线接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
     * return true 代表在线
     */
    exports.check = async function() {
        var ret = await axios.get('https://pt.btschool.club/index.php?action=addbonus');
        return ret.status == 200;
    };
