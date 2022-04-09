// pages/search/search.js
Page({
  data: {
    list:[] ,
    history: true, //隐藏历史记录
    historyArray: [], //清空历史记录数组
    inputText: "", //清空搜索框 
    proname:"",
    searchResult:[],
    proid:"",
    imageid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    
    var that = this
    wx.getStorage({
      key: "historyKey",
      success(res) {
        console.log("历史记录：",res.data)
        that.setData({
          historyArray:res.data
        
        })
        // var list = res.data;
        // that.setData({
        //   histories: data
        // })
      },
    })

  },

   //定义一个响应成功后的函数getSearchResultSucc()，判断响应的数据是否存在。如果存在通过this.setData()方法将响应后的数据赋值给list，如果不存在，list仍然为空数组
   getSearchResultSucc:function(res) {
    // console.log(res)
    if (res.data) {
     var result = res.data.data;
     this.setData({
     searchResult: result
     })
    } else {
     this.setData({
      searchResult:[]
     })
    }
   },

   //监听搜索框变化
  handleInputChange:function(e) {

    var proname = e.detail.value;
    console.log("输入的数据1是：",e.detail)
    this.setData({
      proname:e.detail.value
    })
   },

  //回车搜索事件 并设置搜索关键词缓存
  handleSearch:function(e) {
    // console.log("输入框3的数据是：",e.detail.value)
    var key = e.detail.value
    if (this.data.historyArray.indexOf(key) == -1 & key != '') {
      this.data.historyArray.push(key);
    }
    
    this.setData({
      historyArray: this.data.historyArray, //给新历史记录数组赋值
      noneview: false //隐藏未找到提示
    }) 
    wx.setStorage({
      key:"historyKey",
      data:this.data.historyArray
    })
    this.getSearchResult(e.detail.value)
   },
   
  //调用请求数据的函数getSearchResult()，这样在一进入页面的时候就会获取到所有的数据，不过由于并没有关键字keyword，需要传空字符串
  getSearchResult:function(keyword) {
    var that = this;
    wx.request({
      url: 'http://42.193.5.185:8080/swust/project/getProInfosByProName', //仅为示例，并非真实的接口地址
      data:{
          proname:keyword
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("搜索的项目数据：",res.data)
        if (res.data.code == '0001') {
          that.setData({
            searchResult:res.data.data,
            history: false, //隐藏历史记录
            noneview: false, //隐藏未找到提示
          })
        }else if(res.data.code == '0004'){
          that.setData({
            searchResult:res.data.data,
            history: false, //隐藏历史记录
            noneview: true, //隐藏未找到提示图标
          })
        }else{
          that.setData({
            searchResult:res.data.data,
            history: true, //隐藏历史记录  
            noneview: false, //隐藏未找到提示
          })
        }
      }
    })
   },
  
  //点击搜索结果项跳转
  handleItemTap:function(e) {
    console.log("当前imageid",e.currentTarget.dataset.imageid)
    var that = this
    wx.request({
      url: 'http://42.193.5.185:8080/swust/project/getProInfoByImgid', //仅为示例，并非真实的接口地址
      data:{
          imageid:e.currentTarget.dataset.imageid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("搜索的项目id：",res.data)
        if (res.data.code == '0001') {
          that.setData({
            proid:res.data.data
          })
          // console.log("proid：",res)
          wx.navigateTo({
            url: "/pages/proDetail/proDetail?id="+res.data.data,
          })
        }
      },
      fail:function(res){
        console.log("res",res.data)
        wx.showToast({
          title: '跳转失败',
          icon:"error",
          duration: 2000
        })
      }
    })
  },

  //删除历史记录
  remove: function () {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认清空所有记录?',
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'historyKey',
            success() {
              _this.setData({
                historyArray: []
              })
            }
          })
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //清空输入框内容
  clean:function(){
      this.setData({
        proname:""
      })
  },

  //点击历史记录写到搜索框
  textfz:function(e){
    console.log(e)
    this.setData({
      proname:e.currentTarget.dataset.text
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