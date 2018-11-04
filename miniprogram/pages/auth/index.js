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
            wx.redirectTo({
                url: '/pages/index/index'
            });
        }
    },
})