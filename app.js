//app.js
let util = require('./utils/util.js');
App({
    onLaunch: async function (options) {
        // let result = await util.getLoginInfo();
        // if (result) {
        //     this.globalData.hasLogin = true
        // }

    },
    globalData: {
        hasLogin: false
    }
})
