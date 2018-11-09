//index.js
const app = getApp()

Page({
    data: {

    },

    onLoad: function() {

    },

    onGetUserInfo: function(e) {
        console.log(123);
        if (e.detail.userInfo) {
            console.log(e.detail.userInfo);
            wx.switchTab({
                url: '/pages/index/index'
            });
        }
    },
})