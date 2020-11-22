// pages/me/me.js
const app = getApp()
let util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {

        hasLogin: app.globalData.hasLogin

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.globalData.userInfo);
    },
    login: function () {
        wx.login({
            success(res) {
                if (res.code) {
                    //发起网络请求
                    util.httpRequest({
                        url: 'http://192.168.0.103:8080/api/user/login/' + res.code
                    }).then(data=>{
                        console.log(data);
                    })

                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

    }, loginSuccess: function (res) {
        console.log(res.detail);
    },
    loginFail: function (res) {
        console.log(res);
    }
})
