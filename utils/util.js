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
            success: function (res) {
                resolve(res.data)
            }
        })
    })

}
module.exports = {
    formatTime: formatTime,
    showToast,
    httpRequest
}
