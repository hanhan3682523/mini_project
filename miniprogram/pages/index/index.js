import { promise, cloudPromise } from '../../utils/utils'

const app = getApp()

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: ''
    },

    onLoad: function() {

    },

    /*
        页面展示时执行
    */
    onShow: function() {
        this.init();
    },

    /*
        页面初始化
    */
    init() {
        let _this = this;
        promise(wx.getSetting).then((res) => {
            //已经授权
            if (res.authSetting['scope.userInfo']) {
                //获取用户信息
                _this.getUserInfo();
            } else {
                wx.navigateTo({
                    url: '/pages/auth/index'
                });
            }
        });
    },

    /*
        获取用户信息
    */
    getUserInfo() {
        let _this = this;
        promise(wx.getUserInfo).then((res) => {
            console.info('用户信息：', res);
            _this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
            })
        }).then(() => {
            //获取云端信息
            _this.onGetOpenid();
        });
    },

    /*
        获取openId
    */
    onGetOpenid() {
        let _this = this;
        cloudPromise('login').then(res => {
            console.info('获取云端接口login信息：', res);
            app.globalData.openid = res.result.openid
            console.info('openId:', app.globalData.openid);
            //添加用户
            _this.addUser();
        });
    },

    /*
        保存用户
    */
    addUser() {
        let _this = this;
        const db = wx.cloud.database();
        const user = db.collection('user');
        user.add({
            data: {
                ..._this.data.userInfo
            }
        }).then(res => {
            console.log(res);
        });
    }
})