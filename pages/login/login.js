// pages/me/me.js
const app = getApp()
let util = require('../../utils/util.js');
Page({
    onLoad: function (options) {
        console.log(options);
        const scene = decodeURIComponent(options.clientId);
        wx.setStorage({
            key: "clientId",
            data: scene
        })
    },
    login: async function (e) {
        let result = await util.getLoginInfo()
        if (result) {
            let clientId = wx.getStorageSync('clientId')
            await util.httpRequest({
                method: 'post',
                url: 'api/wx/qrlogin/' + clientId
            })
            wx.switchTab({
                url: '../index/index',
            })
        }
    },
    loginSuccess: function (res) {
        // console.log(res.detail);
    },
    loginFail: function (res) {

    }

})
