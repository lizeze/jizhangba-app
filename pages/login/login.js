// pages/me/me.js
const app = getApp()
let util = require('../../utils/util.js');
Page({
    data:{
         clientId:''
    },
    login: async function (e) {
        let result = await util.getLoginInfo()
        if (result) {
             let clientId= wx.getStorageSync('clientId')
             console.log(clientId)
            await util.httpRequest({
                 method:'post',
                url: 'api/wx/qrlogin/'+clientId
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
        console.log(res);
    },
    onLoad: function () {
        wx.setStorage({
            key: "clientId",
            data: this.options.clientId
          })
       ;
    }
})