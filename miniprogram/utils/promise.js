/************************************
文 件 名：promise.js
作    者：飘落的枫叶
创建日期：2018/11/42
功能描述：调用小程序api，返回promise对象
*************************************/

//小程序api promise
const promise = function(wxApi) {
    return new Promise((resolve, reject) => {
        wxApi({
            success: (res) => {
                resolve(res);
            },
            fail: (error) => {
                reject(res);
            }
        });
    });
};

//云端api promise
const cloudPromise = function(name, data = {}) {
    return new Promise((resolve, reject) => {
        // 调用云函数
        wx.cloud.callFunction({
            name: name,
            data: data,
            success: res => {
                resolve(res);
            },
            fail: err => {
                reject(err);
            }
        })
    });
};

export {
    promise,
    cloudPromise
}