//logs.js
const util = require('../../utils/util.js')
import request from "../../utils/request.js"
Page({
  data: {
    logs: [],
    id: "",
    textData: {},
    textContent: [],
    pushTextDate: [],
    number: 2,
    time: []
  },
  onLoad: function(options) {
    this.setData({
      title: options.id
    })
    let id = options.id;
    // console.log(id)
    request.get("https://im.meiriv.com/test/get.php", {
      type: "GetAll",
      page: "1",
      count: "5"
    }).then(res => {
      // console.log(res.data)
      res.data = this.tradeTime(res.data)
      this.setData({
        pushTextDate: res.data
      });

    })

    request.get("https://im.meiriv.com/test/get.php", {
      type: "GetGraphic",
      id: id
    }).then(res => {
      // console.log(res.data)
      this.setData({
        textData: res.data
      })
    }).then(res => {
      let textContent = this.data.textData.content;
      textContent = JSON.parse(textContent)

      let resArr = []

      for (var i = 0; i < textContent.length; i++) {
        var res = [];
        res[0] = textContent[i];
        if (++i < textContent.length - 1) {
          res[1] = textContent[i];
        }
        resArr.push(res);
      }
      this.setData({
        textContent: resArr
      })
      console.log()

      let cltime = this.getLocalTime(+this.data.textData.time)
      console.log(cltime)
      this.setData({
        time: cltime
      })

    })

  },
  tradeTime: function(can) {
    console.log("haia")
    let time1 = []
    for (var i = 0; i < can.length; i++) {
      if (can[i].time.length>10){
        can[i].time = this.getLocalTime(+can[i].time)
        time1.push(can[i].time)
      }
    }
    console.log(time1)
    return can
  },
  onReachBottom: function() {
    let that = this;
    // var hah = that.data.content
    // console.log(hah)
    let pushID = this.data.number;
    request.get("https://im.meiriv.com/test/get.php", {
      type: "GetAll",
      page: pushID,
      count: "5"
    }).then(res => {
      // console.log(this.data.content)
      let arr = that.data.pushTextDate.concat(res.data);
      // console.log(arr)
      //(数据处理一下 然后setData)
      arr = that.tradeTime(arr)

      console.log(arr)
      that.setData({
          pushTextDate: arr
        })
        ++pushID
      that.setData({
        number: pushID
      })

    }).then(res => {
      // that.tradeTime()
    })
  },

  goHome: function() {
    console.log(222)
    wx.switchTab({
      url: "../index/index"
    })
  },

  getLocalTime: function (obj) {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
  },


})