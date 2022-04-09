// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerData:[],
        navData:[],
        proData:[],
        page:1,
        isData:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        // 轮播图：后端提供数据，js发请求
        wx.request({
            url: 'http://42.193.5.185:8080/swust/image/queryImageByType?imagetype=banner', //后端的请求路径
            data: {
              imageType: 'banner'
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)//请求成功，输出后端代码的data数据
              if(res.data.code=="0001"){//后端数据的code为0001，将数据存储起来，在前端显示数据具体内容
                that.setData({
                    bannerData:res.data.data//为bannerData赋值
                })
              }
            }
        }),

        //后端调用轮播图的接口，js发起请求
        wx.request({
          url: 'http://42.193.5.185:8080/swust/image/queryImageByType?imagetype=nav', //后端的请求路径
          data: {
            imageType: 'nav'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)//请求成功，输出后端代码的data数据
            if(res.data.code=="0001"){//后端数据的code为0001，将数据存储起来，在前端显示数据具体内容
              that.setData({
                  navData:res.data.data//为navData赋值
              })
            }
          }
        }),
        
        wx.request({
          url: 'http://42.193.5.185:8080/swust/project/getProInfos', //后端的请求路径
           data: {
             page: that.data.page,
             limit: '10'
           },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)//请求成功，输出后端代码的data数据
            if(res.data.code=="0001"){//后端数据的code为0001，将数据存储起来，在前端显示数据具体内容
              that.setData({
                  proData:res.data.data//为proData赋值
              })
              console.log(that.data.proData)
            }
          }
        })
    },

    toProDetail:function(e){
      //输出项目的id
      console.log("点击商品的id为：",e.currentTarget.dataset.id)
      //跳转到详情页面
      wx.navigateTo({
        url: '/pages/proDetail/proDetail?id='+e.currentTarget.dataset.id,
      })
    },
    
    toProSort:function(e){
      console.log("商品Typeid为：",e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "/pages/proSort/proSort?id="+e.currentTarget.dataset.id,
      })
    },

    toSearch:function(e){
      console.log(e)
      wx.navigateTo({
        url: "/pages/search/search"
      })
    },
    lower:function(){
      var that = this
      if(that.data.isData){
        console.log("下一页")
        that.data.page++//当前页面加1
        console.log("当前页面为：", that.data.page)
        wx.request({
          url: 'http://42.193.5.185:8080/swust/project/getProInfos', //仅为示例，并非真实的接口地址
          data: {
            page: that.data.page,
            limit: '10'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)
            if(res.data.code == "0001"){//后端数据的code为0001，将数据存储起来，在前端显示数据具体内容
              var proList = [...that.data.proData, ...res.data.data]

              var isData = true//默认有数据
              if(proList.length >= res.data.count){
                //没有数据
                isData = false
                that.setData({
                  isData:isData
                })
              }

              that.setData({
                  proData:proList//为proData赋值
              })
              console.log(that.data.proData)
            }
          }
        })
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