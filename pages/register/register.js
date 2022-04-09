// pages/register/register.js
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

    //点击注册账号按钮触法提交事件 
    formSubmit:function(e){
        //输出用户信息
        console.log(e.detail.value)

        //获取数据
        wx.getStorage({
            key: 'userInfo',
            success (res) {
              console.log(res.data)
              //发起请求
              wx.request({
                url: 'http://42.193.5.185:8080/swust/user/userRegister', //仅为示例，并非真实的接口地址
                data: {
                 username: e.detail.value.username,
                 phone: e.detail.value.phone,
                 password: e.detail.value.password,
                 nickname: res.data.nickName,
                 imageurl: res.data.avatarUrl
                },
                // POST请求
                method:"POST",
                header: {
                  // post请求的header
                  'Content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success (res) {
                  console.log(res.data)
                  // 用户注册成功(code为0002)
                  if(res.data.code=='0002'){
                    //注册成功跳转个人页面
                    wx.switchTab({
                      url: '/pages/my/my'
                    })
                    //提示注册成功
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'success',
                      duration: 2000
                    })
                  }
                  //code不是0002表示除注册成功之外的其它情况
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