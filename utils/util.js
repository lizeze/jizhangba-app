let apiUrl = 'https://xx996.cn/auth/api/'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const showToast = (options) => {
  wx.lin.showToast({
    title: options.title ? options.title : 'OK',
    icon: options.icon ? options.icon : 'success',
    success: (res) => {
      options.callback && options.callback(res)
    },
    complete: (res) => {
      console.log(res)
    }
  })
}
const makeToken = (options)=>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method ? options.method : 'get',
      data: options.data,
      header: {
        'content-type': 'application/json',// 默认值,
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}
const httpRequest = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method ? options.method : 'get',
      data: options.data,
      header: {
        'content-type': 'application/json' ,// 默认值,
        "authorization":getCurrentUser().accessToken
      },
      success: function(res) {
        resolve(res.data)
      }
    })
  })
}
const getLoginInfo = () => {
  let result = {
    error: '',
    data: null
  }
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.getSetting({
            success(user) {
              if (user.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function(res1) {
                    makeToken({
                      url: apiUrl + 'decrypt',
                      method: 'post',
                      data: {
                        encryptedData: res1.encryptedData,
                        iv: res1.iv,
                        jsCode: res.code
                      }
                    }).then(data => {
                      result.data = data;
                      wx.setStorage({
                        key: "accessToken",
                        data: JSON.stringify(result.data)
                      })
                      resolve(result)
                    })
                  }
                })
              } else {
                result.error = '未授权'
                resolve(result)
              }
            },
            fail() {
              console.log('登录失败')
            }
          })


        } else {
          result.error = "登录失败"
          resolve(result)
        }
      },
      fail() {
        result.error = "登录失败"
        resolve(result)
      }
    })

  })

}

const getCurrentUser = () => {
  let accessToken = wx.getStorageSync('accessToken')
  if (!accessToken) {
    showToast("请重新登录")
    wx.navigateTo({
      url: '../me/me',
    })
  }
  return JSON.parse(accessToken)

}
module.exports = {
  formatTime: formatTime,
  showToast,
  httpRequest,
  getLoginInfo,
  getCurrentUser
}