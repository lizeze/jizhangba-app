// pages/history/history.js
const util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentMonth: 0,
    currentYear: 0
  },

  onLoad: function (options) {

    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1
    this.setData({
      currentMonth: month,
      currentYear: year


    })
    let result = await util.httpRequest({
      url: 'api/bill/' + '/' + year + "/" + month
    })
  },
 getData:function(year,month){

  
 },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {}


})