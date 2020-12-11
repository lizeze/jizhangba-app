//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
    onLoad: function () {
        // util.getCurrentUser()
    },
    onShareAppMessage: function (res) {
        return {
            title: '记一笔',
            path: '/pages/index/index'
        }
    },
    data: {
        message: '',
        billAmount: '',
        billTime: util.formatTime(new Date),
        billRemark: '',
        billType: 'out',
        billClass: '社交',
        userId: '',
        billAmountRules: {
            required: true,
            message: '金额不能为空',
            icon: 'error'
        },
        grids1: [{
            text: '社交',
            icon: 'shejiao'
        }, {
            text: '水电费',
            icon: 'shuidian'
        }, {
            text: '房租',
            icon: 'fangzu'
        }, {
            text: '教育',
            icon: 'jiaoyu'
        }, {
            text: '娱乐',
            icon: 'yule'
        }, {
            text: '交通',
            icon: 'jiaotong'
        }, {
            text: '生活费',
            icon: 'shenghuofei'
        }, {
            text: '购物',
            icon: 'gouwu'
        }, {
            text: '理财',
            icon: 'licai'
        }, {
            text: '工资',
            icon: 'gongzi'
        }]
    },
    bindPickerChange: function (e) {
        this.setData({
            billTime: e.detail.value
        })
    },
    changeCurrentType: function (e) {
        this.setData({
            billType: e.currentTarget.dataset['type']
        })
    },
    lintap: function (e) {
        this.setData({
            billClass: e.detail.cell.text
        })
    },
    handleAmountChange: function (e) {
        let value = e.detail.value;
        if (isNaN(value)) {
            value = ''
            util.showToast({
                title: '请输入正确的数字',
                icon: 'error'
            })
        }
        this.setData({
            billAmount: value
        })
    },
    handleRemarkChange: function (e) {
        this.setData({
            billRemark: e.detail.value
        })
    },

    saveData: async function () {
        if (!this.data.billAmount) {
            util.showToast({
                title: '金额不能为空',
                icon: 'error'
            })
            return
        }

        const billAmount = this.data.billAmount
        const billRemark = this.data.billRemark;
        const billType = this.data.billType;
        const billTime = this.data.billTime;
        const billClass = this.data.billClass
        let mod = {
            billRemark,
            billAmount,
            billType,
            billTime,
            billClass
        };
        await util.httpRequest({
            // url: 'http://xx996.cn/jzb/api/bill/',
            url: 'api/bill/',

            method: 'post',
            data: mod
        })
        this.setData({

            billRemark: '',
            billAmount: '',
            billTime: util.formatTime(new Date)
        })
        util.showMessage("保存成功")

    }
})
