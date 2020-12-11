let apiUrl = 'https://xx996.cn/jzb/'
// apiUrl = 'http://localhost:8086/auth/'
apiUrl = 'http://localhost:3000/'
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
        }
    })
}
const makeToken = (options) => {
    return new Promise((resolve, reject) => {
        wx.lin.showLoading()
        wx.request({
            url: options.url,
            method: options.method ? options.method : 'get',
            data: options.data,
            header: {
                'content-type': 'application/json', // 默认值,
            },
            fail: failMessage,
            success: function (res) {
                resolve(res.data)
            }, complete: function (data) {
                wx.lin.hideLoading()
            }
        })
    })
}
const httpRequest = (options) => {
    return new Promise((resolve, reject) => {
        wx.lin.showLoading()
        wx.request({
            url: apiUrl + options.url + '?v=' + new Date().getTime(),
            method: options.method ? options.method : 'get',
            data: options.data,
            header: {
                'content-type': 'application/json', // 默认值,
                "accessToken": getCurrentUser()
            },
            fail: failMessage,
            success(res) {
                resolve(res.data)
            },
            complete: function () {
                wx.lin.hideLoading()
            }
        })
    })
}
const failMessage = (response) => {
    switch (response.statusCode) {
        case 403:
            showMessage({
                type: "warning",
                message: '授权过期,请重新登录'
            })
            break;
        case 500:
        default:
            showMessage({
                type: "error",
                message: '服务异常'
            })
    }
}
const getWxUserInfo = async () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(user) {
                if (user.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (user) {
                            resolve(user)
                        }
                    })
                } else {
                    resolve(null)
                }
            },
            fail() {
                resolve(null)
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
            async success(res) {
                if (res.code) {
                    //发起网络请求
                    let userInfo = await getWxUserInfo();
                    makeToken({
                        url: apiUrl + 'api/wx/decrypt',
                        method: 'POST',
                        data: {
                            encryptedData: userInfo.encryptedData,
                            iv: userInfo.iv,
                            jsCode: res.code
                        }
                    }).then(data => {
                        result.data = data;
                        wx.setStorage({
                            key: "accessToken",
                            data: data
                        })
                        resolve(result)
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
    let accessTokenData = wx.getStorageSync('accessToken')
    if (!accessTokenData) {
        showMessage({
            message: '似乎还没有登录',
            type: 'warning'
        })
        wx.switchTab({
            url: '/pages/me/me'
        })
        return
    }
    return accessTokenData
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
    showMessage
}
