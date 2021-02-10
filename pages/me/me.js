// pages/me/me.js
const app = getApp()
let util = require('../../utils/util.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        hasLogin: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        if (wx.getStorageSync("loginFail")) {
            this.setData({
                hasLogin: false
            })
            wx.removeStorageSync('loginFail')
            return
        }
    },
    onLoad: async function (options) {
         this.getLocation()
        let _this = this
        if (!wx.getStorageSync('clientId')) {
            if (wx.getStorageSync("loginFail")) {
                _this.setData({
                    hasLogin: false
                })
                wx.removeStorageSync('loginFail')
                return
            }
            await util.getLoginInfo();
            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        _this.setData({
                            hasLogin: true
                        })
                    } else {
                        _this.setData({
                            hasLogin: false
                        })

                    }
                }
            })
        } else {
            _this.setData({
                hasLogin: true
            })
            wx.removeStorageSync('clientId')
        }


    },
    login: async function (e) {
        let result = await util.getLoginInfo()
        if (result) {
            console.log(222)
            this.setData({
                hasLogin: true
            })
            app.globalData.hasLogin = true
        }


    },
    loginSuccess: function (res) {

        // console.log(res.detail);
    },
    loginFail: function (res) {
        console.log(res);
    },
    getLocation: function () {
    },
    historyHandle:function(){
        wx.navigateTo({
            url: '/pages/history/history?id=1',
        })
    }
})
