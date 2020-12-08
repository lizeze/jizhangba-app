 //logs.js
 const util = require('../../utils/util.js')

 Page({
   data: {
     list: {},
     scrollTop: undefined,
     inAmount:'',
     outAmount:''
   },
   onPageScroll(res) {
    wx.lin.setScrollTop(res.scrollTop)
   },
   onShow: async function () {

     this.initData()
   },
   onLoad: async function () {

    //  this.initData()

   },
   initData: async function () {
     let year = new Date().getFullYear();
     let month = new Date().getMonth() + 1
     let result = await util.httpRequest({
       url: 'api/bill/' + '/' + year + "/" + month
     })
      let sumAmount=0;
       let inAmount=0;
       let outAmount=0
      result.data.map(item=>{
 
          if(item.billType=='out'){
            outAmount+=parseFloat(item.billAmount)
          }else{
            inAmount+=parseFloat(item.billAmount)
          }
      })

     this.setData({
       list: result,
       inAmount:inAmount.toFixed(2),
       outAmount:outAmount.toFixed(2)
     })
     wx.lin.flushSticky()
   }
 })