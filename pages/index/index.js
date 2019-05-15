//index.js
//获取应用实例
import request from "../../utils/request.js"
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxdata:"",
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    content:"",
    page:10
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    request.get("https://im.meiriv.com/test/get.php",{
      type:"GetAll",
      page:"5",
      count:"10"
    }).then(res=>{
      // console.log(res.data)
      this.setData({
        wxdata:res.data
      });
    })
    request.get("https://im.meiriv.com/test/get.php", {
      type: "GetAll",
      page: "1",
      count: "5"
    }).then(res => {
      // console.log(res.data)
      this.setData({
        content: res.data
      });
    }).then(res=>{
      // var hah = this.data.content
      // console.log(hah)
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReachBottom:function(){
    let that = this;
    // var hah = that.data.content
    // console.log(hah)
    let pageNum = this.data.page;
    request.get("https://im.meiriv.com/test/get.php", {
      type: "GetAll",
      page: pageNum,
      count: "5"
    }).then(res => {
      // console.log(this.data.content)
      if (res.data !== null && res.data.length > 0) {
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
        let arr = that.data.content.concat(res.data);
        // console.log(arr)
        //(数据处理一下 然后setData)
        that.setData({
         content:arr
        })
        ++pageNum
        that.setData({
          page:pageNum
        })
      }
    })
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
