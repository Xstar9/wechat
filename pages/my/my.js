// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:[],
        navTabData:['全部订单','已消费','待消费','预定中'],
        currentIndex:0,//默认view标签的下标为0
        orderData:[],//订单容器
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //从本地缓存中异步获取指定 key 的内容
        wx.getStorage({
            key: 'userInfo',
            success (res) {
              that.setData({
                  //将res.data赋值给userInfo容器
                  userInfo:res.data
              })
            }
        })

        wx.getStorage({
            key: 'token',
            success (res) {
              //用户已登录，拿默认页面的订单数据
              wx.request({
                url: 'http://42.193.5.185:8080/swust/order/getOrderByState', //仅为示例，并非真实的接口地址
                data: {
                  token: res.data,
                  orderstate: ''
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success (res) {
                  console.log(res.data)
                  that.setData({
                    orderData: res.data.data,
                  })
                }
              })
            }
        })
    },

    switchToRegister:function(){
        wx.navigateTo({
            url: '/pages/register/register',
            
        })
    },
    switchToLogin:function(){
        wx.navigateTo({
            url: '/pages/login/login',
            
        })
    },

    getOrderData:function(e){
      var that = this 
      console.log("当前页面的下标为：", e.currentTarget.dataset.inx)
      var index = e.currentTarget.dataset.inx;//重新赋值新的下标
      that.setData({
        currentIndex: index
      })

      //预定中的订单状态为0，待消费的状态为1，已消费的订单状态为2
      var orderstate = '';
      if(index == 1){
        orderstate = 2//下标为1时，订单状态为2
      }
      else if(index == 2){
        orderstate = 1//下标为2时，订单状态为1
      }
      else if(index == 3){
        orderstate = 0//下标为3时，订单状态为0
      }

      //获取token，如果成功，则发起请求获取订单数据
      wx.getStorage({
        key: 'token',
        success (res) {
          //用户已登录，拿默认页面的订单数据
          wx.request({
            url: 'http://42.193.5.185:8080/swust/order/getOrderByState', //仅为示例，并非真实的接口地址
            data: {
              token: res.data,
              //订单状态是动态变化的 
              orderstate: orderstate,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)
              that.setData({
                orderData: res.data.data,
              })
            }
          })
        }
      })

    },

    //点击具体的预约订单显示预约人的姓名、电话、备注信息、已经所选择的日期和时间
    getOrdererDetail:function(e){
      wx.navigateTo({
        url: '/pages/ordererDetail/ordererDetail?id='+e.currentTarget.dataset.id,
        
      })
    },

    //点击删除按钮，确认是否删除预约记录，点击确认后删除成功，数据库也发生改变
    delete:function(e){
      var that = this
      //点击删除按钮显示对话框
      wx.showModal({
        title: '提示',
        content: '确认要删除此预约记录？',
        cancelText: "取消",
        confirmText: "确认",
        success (res) {
          //点击确认
          if (res.confirm) {
            //发起删除请求
            wx.request({
              url: 'http://42.193.5.185:8080/swust/order/deleteOrderByID', //后端的请求路径
               data: {
                id:e.currentTarget.dataset.id
               },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (res) {
                if(res.data.code=="0001"){
                  //显示消息提示框，提示删除成功
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1500
                  })
                  //删除成功后对数据进行实时更新
                  that.onLoad()
                }
              },
              fail:function(){
                wx.showToast({
                  title: '删除失败',
                  icon: 'error',
                  duration: 1500
                })
              }
            })
          }
          //点击取消 
          else if (res.cancel) {
            //显示消息提示框，提示取消删除
            wx.showToast({
              title: '取消删除',
              icon: 'error',
              duration: 1000,
              success:function(){
                console.log("删除失败")

              }
            })
          }
        },
        fail:function(){
          console.log("对话框显示失败！");
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