 //logs.js
 const util = require('../../utils/util.js')

 Page({
   data: {
     list: [],
     scrollTop: undefined
   },
   onPageScroll(res) {
     this.setData({
       scrollTop: res.scrollTop
     })
   },
   onShow: async function () {

     this.initData()
   },
   onLoad: async function () {

     this.initData()

   },
   initData: async function () {
     let year = new Date().getFullYear();
     let month = new Date().getMonth() + 1
     let result = await util.httpRequest({
       url: 'api/bill/' + '/' + year + "/" + month
     })
     console.log(result)
     this.setData({
       list: result
     })
   }
 })