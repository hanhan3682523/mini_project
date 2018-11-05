/************************************
文 件 名：database.js
作    者：飘落的枫叶
创建日期：2018/11/
功能描述：对数据库进行操作，增、删、改、查
*************************************/
const db = wx.cloud.database();

let dbFun = {
    //获取数据
    getData: function (tablename, params = {}) {
        return new Promise((resolve, reject) => {
            db.collection(tablename).where(params).get({
                success: function (res) {
                    resolve(res.data);
                },
                fail: function (error) {
                    reject(error);
                }
            });
        });
    },

    //添加数据
    addData: function (tablename, params) {
        return new Promise((resolve, reject) => {
            db.collection(tablename).add({
                data: params,
                success: function (res) {
                    resolve(res);
                },
                fail: function (error) {
                    reject(error);
                }
            });
        });
    },

    //根据id更新数据
    updateData: function (tablename, _id, params) { 
        return new Promise((resolve, reject) => {
            db.collection(tablename).doc(_id).update({
                data: params,
                success: function (res) {
                    resolve(res);
                },
                fail: function (error) {
                    reject(error);
                }
            });
        });
    }
};

export default dbFun;
