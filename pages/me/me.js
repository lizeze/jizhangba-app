// pages/me/me.js
const app = getApp()
let util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasLogin: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this=this
    wx.getSetting({
        success(res) {
            if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              _this.setData({
               hasLogin: true
             })
            }else{
              _this.setData({
                hasLogin: false
              })

            }
        }
    })
  },
  login: async function(e) {
    let result = await util.getLoginInfo()
    if (result.data) {
      console.log(222)
      this.setData({
        hasLogin: true
      })
      app.globalData.hasLogin = true
    }


  },
  loginSuccess: function(res) {

    // console.log(res.detail);
  },
  loginFail: function(res) {
    console.log(res);
  }
})