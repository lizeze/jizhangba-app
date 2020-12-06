let apiUrl = 'https://xx996.cn/jzb/'
// apiUrl = 'http://localhost:8086/auth/'
  // apiUrl = 'http://192.168.0.100:3000/'
let unifyResult = function (status, data, mess) {
  return {
    data: data || null,
    status: status || true,
    mess: mess || ''

  }
}
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
const makeToken = (options) => {
  return new Promise((resolve, reject) => {
    // options.data['v']=new Date().getTime()
    wx.request({
      url: options.url,
      method: options.method ? options.method : 'get',
      data: options.data,
      header: {
        'content-type': 'application/json', // 默认值,
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
      url: apiUrl + options.url + '?v=' + new Date().getTime(),
      method: options.method ? options.method : 'get',
      data: options.data,
      header: {
        'content-type': 'application/json', // 默认值,
        "accessToken": getCurrentUser()
      },

      complete: function (data) {

        if (data.statusCode != 200) {
          showToast({
            title: '失败',
            icon: 'error',
            callback: () => {
              throw new Error('网络超时');
            }
          })
        } else {
          resolve(data.data)

        }

      }

    })
  })
}

const checkSession = () => {

  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        resolve(unifyResult())

      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        resolve(unifyResult(false))
      }
    })
  })

}
const getLoginInfo = async () => {

  let result = {
    data: '',
    error: ''
  }
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code, 'code')
          //发起网络请求
          wx.getSetting({
            success(user) {
              if (user.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function (res1) {
                    makeToken({
                      url: apiUrl + 'api/wx/decrypt',
                      // url: apiUrl + 'api/a',

                      method: 'POST',
                      data: {
                        encryptedData: res1.encryptedData,
                        iv: res1.iv,
                        jsCode: res.code
                      }
                    }).then(data => {
                      result.data = data;
                      wx.setStorage({
                        key: "accessToken",
                        data: result.data
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
    // showToast("请重新登录")
    wx.navigateTo({
      url: '../me/me',
    })
  }
  return accessToken

}

const showMessage = (options) => {
  if (typeof options === 'object') {
    wx.lin.showMessage({
      type: options.type,
      content: options.message
    })
  } else {
    wx.lin.showMessage({
      type: "success",
      content: options
    })

  }

}

module.exports = {
  formatTime: formatTime,
  showToast,
  httpRequest,
  getLoginInfo,
  getCurrentUser,
  checkSession,
  showMessage
}