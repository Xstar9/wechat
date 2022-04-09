// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    //点击登录按钮触法提交事件 
    formSubmit:function(e){
        //输出用户信息
        console.log(e.detail.value)
        wx.login({
            success (res) {
              console.log(res.code)
              if (res.code) {
                //发起请求
                wx.request({
                    url: 'http://42.193.5.185:8080/swust/user/userLogin', //仅为示例，并非真实的接口地址
                    data: {
                        code: res.code,
                        phone: e.detail.value.phone,
                        password:e.detail.value.password
                    },
                    // POST请求
                    method:"POST",
                    header: {
                        // post请求的header
                        'Content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success (res) {
                        console.log(res.data)
                        //登录成功
                        if(res.data.code == "0003"){
                          //跳转到个人界面
                          wx.switchTab({
                            url: '/pages/my/my',
                          })
                          //提示登录成功
                          wx.showToast({
                            title: res.data.msg,
                            icon: 'success',
                            duration: 2000
                          })
                          //将token存入到数据缓存中
                          wx.setStorage({
                            key:"token",
                            data: res.data.data
                          })
                        }

                        else{
                          wx.showToast({
                            title: res.data.msg,
                            icon: 'error',
                            duration: 2000
                          })
                        }
                    }
                })
              }
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