//app.js
let util = require('./utils/util.js');
App({
    onLaunch: async function (options) {
        let result = await util.getLoginInfo();
        if (result) {
            this.globalData.hasLogin = true
        }
        const scene = decodeURIComponent(options.query.clientId);
        console.log(scene);
        wx.setStorage({
            key: "clientId",
            data: scene
        })
        ;


    },
    globalData: {
        hasLogin: false
    }
})
