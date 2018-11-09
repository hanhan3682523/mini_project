import {
    promise,
    cloudPromise,
    dbFun
} from '../../utils/utils'
import const_data from '../../utils/const'
let timerInterval = null;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '',
        title: '常见面试题',
        currentIndex: -1,
        list: [],
        //已用时
        timer: '',
        myanswer: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //存在分类时，获取数据
        if (options.type) {
            this.setData({
                type: options.type,
                title: options.type.toUpperCase() + '常见面试题'
            });
            this.init();
        } else {
            //返回首页
            wx.switchTab({
                url: '/pages/index/index'
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '前端面试通，助你一路通关。',
            path: '/pages/index/index'
        };
    },

    /**
     * 页面初始化
     */
    getQuestions() {
        let _this = this;
        let _tablename = const_data.tablename.questions;
        let _where = {
            "type": _this.data.type
        };
        dbFun.getData(_tablename, _where).then(data => {
            console.info('问题数据：', data);
            if (data.length > 0) {
                _this.setData({
                    list: data
                });
            } else {
                wx.showToast({
                    title: '暂无数据',
                    duration: 2000,
                    icon: 'none',
                    complete: function () {
                        setTimeout(function () {
                            wx.switchTab({
                                url: '/pages/index/index'
                            });
                        }, 2000);
                    }
                })
            }
        });
    },

    /**
     * 页面初始化
     */
    init() {
        //获取数据
        this.getQuestions();
        this.setTimer();
    },

    /**
     * 设置已用时
     */
    setTimer() {
        let seconds = 0;
        let _this = this;
        timerInterval = setInterval(function () {
            seconds = seconds + 1;
            let mins = parseInt((seconds / 60), 10) + "";
            let ses = (seconds % 60) + "";
            _this.setData({
                timer: (mins.length > 1 ? mins : ('0' + mins.toString())) + ":" + (ses.length > 1 ? ses : ('0' + ses.toString()))
            });
        }, 1000);
    },

    /**
     * 滚动事件
     */
    scrollEvent(e) {
        console.info('tag', e.detail)
    },

    /**
     * 输入框失去焦点获取值
     */
    bindTextAreaBlur: function (e) {
        console.log(e.detail.value)
    },

    /**
     * 显示推荐答案
     */
    showAnswer(e) {
        let currentindex = e.currentTarget.dataset.currentindex;
        this.setData({
            currentIndex: currentindex
        });
    },

    /**
     * 用户输入
     */
    bindKeyInput: function (e) {
        this.setData({
            myanswer:'我的回答：'+ e.detail.value
        })
    },
})
