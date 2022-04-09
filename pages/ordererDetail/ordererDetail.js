// pages/ordererDetail/ordererDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ordererDetail:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        //详情页面有imagurl、项目名称、项目描述、项目步骤
        var that = this
        wx.request({
            //后端接口的url
            url: 'http://42.193.5.185:8080/swust/order/getOrderDetailById', //仅为示例，并非真实的接口地址
            data: {
                id: options.id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success (res) {
                console.log(res.data)
                that.setData({
                    ordererDetail:res.data.data
                })
            }

        })
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})