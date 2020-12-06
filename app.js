//app.js
let util = require('./utils/util.js');

App({
  onLaunch: async function() {
    
    let result = await util.getLoginInfo();
    console.log(result)
    if (result) {
    
      this.globalData.hasLogin = true
    }

  },
  globalData: {
    hasLogin: false
  }
})