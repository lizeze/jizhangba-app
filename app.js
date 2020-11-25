//app.js
let util = require('./utils/util.js');

App({
  onLaunch: async function() {
    let result = await util.getLoginInfo();
    if (result.data) {
    
      this.globalData.hasLogin = true
    }

  },
  globalData: {
    hasLogin: false
  }
})