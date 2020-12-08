// pages/me/me.js
const app = getApp()
let util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: false,
    grids1: [{
      text: '社交',
      icon: 'shejiao'
    }, {
      text: '水电费',
      icon: 'shuidian'
    }, {
      text: '房租',
      icon: 'fangzu'
    }, {
      text: '教育',
      icon: 'jiaoyu'
    }, {
      text: '娱乐',
      icon: 'yule'
    }, {
      text: '交通',
      icon: 'jiaotong'
    }, {
      text: '生活费',
      icon: 'shenghuofei'
    }, {
      text: '购物',
      icon: 'gouwu'
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this=this
      util.getLoginInfo();
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
    if (result) {
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