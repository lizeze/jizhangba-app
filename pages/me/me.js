// pages/me/me.js
const app = getApp()
let util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasLogin: app.globalData.hasLogin

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.getSetting({
        //     success(res) {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        //             wx.getUserInfo({
        //                 success: function (res) {
        //                     console.log(res.userInfo)
        //                 }
        //             })
        //         }
        //     }
        // })
    },
    login: function (e) {
       
       

    }, loginSuccess: function (res) {
      
        // console.log(res.detail);
    },
    loginFail: function (res) {
        console.log(res);
    }
})
