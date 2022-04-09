// pages/proSort/proSort.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      proSortData:[],
      proSortInfo:["推荐服务","美甲","美容","美发","睫毛"],
      index:0,
      text:''
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
      var index = options.id
      console.log("点击下标",index)
      //根据navtab下标确定订单状态码
      var proTypeid = '';
      if(index == 6){
        proTypeid = 3
        that.setData({text:"美甲"})
      }else if(index == 7){
        proTypeid = 1
        that.setData({text:"美容"})
      }else if(index == 8){
        proTypeid = 2
        that.setData({text:"美发"})
      }else if(index == 9){
        proTypeid = 4
        that.setData({text:"睫毛"})
      }else{
        proTypeid = 0
        that.setData({text:"推荐服务"})
      }
      console.log('商品分类id',proTypeid)
      //根据typeid需要获取的数据
      wx.request({
        url: 'http://42.193.5.185:8080/swust/project/getProSortDataByTypeId', //仅为示例，并非真实的接口地址
        data:{
          typeid:proTypeid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data),
          that.setData({
            proSortData:res.data.data
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