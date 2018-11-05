import {
    promise,
    cloudPromise,
    dbFun
} from '../../utils/utils'
import const_data from '../../utils/const'

const app = getApp()

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        classifyList:[]
    },

    onLoad: function () {

    },

    /*
        页面展示时执行
    */
    onShow: function () {
        this.init();
        //获取分类
        this.getClassify();
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
        let value = wx.getStorageSync('openid')
        if(value){
            app.globalData.openid = value;
            return;
        }
        let _this = this;
        cloudPromise('login').then(res => {
            console.info('获取云端接口login信息：', res);
            app.globalData.openid = res.result.openid
            console.info('openId:', app.globalData.openid);

            let _tablename = const_data.tablename.user;
            let _where = {
                "_openid": app.globalData.openid
            };
            wx.setStorageSync('openid',app.globalData.openid);
            dbFun.getData(_tablename, _where).then(data => {
                if (data.length <= 0) {
                    //添加用户
                    _this.addUser(false);
                }
            });
        });
    },

    /*
        保存用户,isUpdate:是否为更新
    */
    addUser() {
        let _tablename = const_data.tablename.user;
        let _data = this.data.userInfo;
        dbFun.addData(_tablename, _data).then(res => {
            console.info('添加结果：', res);
        });
    },

    /*
        获取数据分类
    */
    getClassify() {
        let _this = this;
        let _tablename = const_data.tablename.classify;
        dbFun.getData(_tablename).then(data => {
            console.info('分类信息：',data);
            _this.setData({
                classifyList:data
            });
        });
    }
})
