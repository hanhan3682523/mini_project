// pages/my/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        openid: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.initPage();
    },

    /**
     * 页面初始化
     */
    initPage() {
        let value = wx.getStorageSync('openid');
        let userInfo = wx.getStorageSync('userinfo');
        console.log('openid:', value);
        console.info('userInfo:', userInfo);
        if (value && userInfo) {
            this.setData({
                userInfo: userInfo,
                openid: value
            });
        } else {
            wx.navigateTo({
                url: '/pages/auth/index'
            });
        }
    },

    /**
     * 接入客服消息
     */
    handleContact(e) {
        console.log(e.path)
        console.log(e.query)
    }
})