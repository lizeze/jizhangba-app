//app.js
let util = require('./utils/util.js');

App({
  onLaunch: function () {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
    
          wx.getSetting({
            success(user) {
              if (user.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res1) {
                    console.log(res1)
                    util.httpRequest({
                      url: 'http://192.168.0.107:3000/decrypt',
                      method: 'post',
                      data: {
                        encryptedData: res1.encryptedData,
                        iv:res1.iv,
                        jsCode:res.code
                      }
                    }).then(data => {
                      console.log(data);
                    })
                  }
                })
              }
            }
          })

          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    hasLogin: false
  }
})
