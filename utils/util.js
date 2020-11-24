let apiUrl = 'http://127.0.0.1:3000/'
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
const httpRequest = (options) => {

  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method ? options.method : 'get',
      data: options.data,
      header: {
        'content-type': 'application/json' // 默认值
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
                    httpRequest({
                      url: apiUrl + 'decrypt',
                      method: 'post',
                      data: {
                        encryptedData: res1.encryptedData,
                        iv: res1.iv,
                        jsCode: res.code
                      }
                    }).then(data => {
                      result.data = data;
                      resolve(result)
                    })
                  }
                })
              } else {
                result.error = '未授权'
                resolve(result)
              }
            }, fail(){
              console.log('登录失败')
            }
          })


        } else {
          result.error = "登录失败"
          resolve(result)
        }
      },fail(){
        result.error = "登录失败"
        resolve(result)
      }
    })

  })

}
module.exports = {
  formatTime: formatTime,
  showToast,
  httpRequest,
  getLoginInfo
}