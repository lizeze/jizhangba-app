//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    list: [{
      bill_time: '11月01日',
      bill_remark: '吃饭',
      bill_amount: '22.00'
    }]
  },
  onLoad: function () {


    let {
      userId
    } = util.getCurrentUser()
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1
    util.httpRequest({
      url:'jzb/bill/' + userId + '/' + year + "/" + month
    })

  }
})