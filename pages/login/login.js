// pages/me/me.js
const app = getApp()
let util = require('../../utils/util.js');

Page({
    login: async function (e) {
        let result = await util.getLoginInfo()
        if (result) {
        }
    },
    loginSuccess: function (res) {
        // console.log(res.detail);
    },
    loginFail: function (res) {
        console.log(res);
    }
})
