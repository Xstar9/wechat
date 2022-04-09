// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      busInfo:[],
      date:'日期选择',
      time:'时间选择',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        console.log("预约页面检测到的商品id为：",options.id)
        //发起http请求
        wx.request({
            url: 'http://42.193.5.185:8080/swust/project/getBusinessAndProById', //仅为示例，并非真实的接口地址
            data: {
              id: options.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)
              that.setData({
                  busInfo: res.data.data
              })
            }
          })
    },

    bindDateChange:function(e){
      this.setData({
        date: e.detail.value
      })
    },

    bindTimeChange:function(e){
      this.setData({
        time: e.detail.value
      })
    },

    formSubmit:function(e){
      var that = this
      console.log(e.detail.value)
      //判断用户是否在线
      wx.getStorage({
        key: 'token',
        success (res) {
          console.log(res.data)
          //发起请求
          wx.request({
            url: 'http://42.193.5.185:8080/swust/order/createOrder', //仅为示例，并非真实的接口地址
            data: {
              //确定后台需要的数据：token（openid根据token获取）、项目名称、预约时间、预约客户姓名、手机号、留言、bid、pid
              token: res.data,
              proname: that.data.busInfo.proname,
              makedate: that.data.date + " " + that.data.time,
              username: e.detail.value.username,
              usertell: e.detail.value.phone,
              information: e.detail.value.information,
              busid: that.data.busInfo.busid,
              proid: that.data.busInfo.id,
            },
            // POST请求
            method:"POST",
            header: {
              // post请求的header
              'Content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success (res) {
              console.log(res.data)
              if(res.data.code == '0001'){
                //下单成功跳转到我的页面
                wx.switchTab({
                  url: '/pages/my/my',
                  //my页面进行实时刷新相应的数据
                  success: function (e) {  
                    var page = getCurrentPages().pop();  
                    if (page == undefined || page == null) return;  
                    page.onLoad();  
                  }  
                })

                wx.showToast({
                  title: '预约成功',
                  icon: 'success',
                  duration: 2000
                })



              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'error',
                  duration: 2000
                })
              }
            }
          })
        },

        fail:function(){
          //跳转
          wx.navigateTo({
            url: '/pages/login/login',
          })

          wx.showToast({
            title: '请先登录再操作',
            icon: 'error',
            duration: 2000
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