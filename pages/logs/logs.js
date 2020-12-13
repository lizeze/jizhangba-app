//logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        list: {},
        scrollTop: undefined,
        inAmount: '',
        outAmount: '',
        show: false,

    },
    showActionSheet() {
        wx.lin.showActionSheet({
            title:'223efe',
            itemList: [{
                name: '今日不再出现此类内容'
            },
                {
                    name: '屏蔽'
                }
            ], showCancel: true, cancelText: '22',
            success: function (e) {
            },fail:function (e){
                 console.log('取消了')
            }
        })
    },
    lincancel() {
        console.log('取消')
    },

    lintapItem(e) {


        console.log(e.detail.item.name)
    },
    onPageScroll(res) {
        wx.lin.setScrollTop(res.scrollTop)
    },
    onShow: async function () {

        this.initData()
    },

    onLoad: async function () {

        // this.initData()

    },
    initData: async function () {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1
        let result = await util.httpRequest({
            url: 'api/bill/' + '/' + year + "/" + month
        })
        if (result != "请重新登录") {
            let sumAmount = 0;
            let inAmount = 0;
            let outAmount = 0
            result.data.map(item => {

                if (item.billType == 'out') {
                    outAmount += parseFloat(item.billAmount)
                } else {
                    inAmount += parseFloat(item.billAmount)
                }
            })

            this.setData({
                list: result,
                inAmount: inAmount.toFixed(2),
                outAmount: outAmount.toFixed(2)
            })
            wx.lin.flushSticky()
        }
    }
})
