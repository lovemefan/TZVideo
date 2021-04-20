// pages/videoPlayInfo/videoPlayInfo.js
const scawler = require('../../utils/scrawler.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      curOrder: '正序'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.title = options.title
    this.data.type_id = options.type_id
    this.data.vod_urls = options.vod_urls,
    this.data.list_name = options.list_name,
    this.data.vod_addtime = options.vod_addtime
    this.data.vod_id = options.vod_id
    this.getMovieList()
    
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.VideoContext = wx.createVideoContext('player')
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

  },
  getMoviesResource:function(query){
    this.getMovieList()
  },
  //获取播放链接
  getMovieList:function() {
    var res 
    let that = this
    var list = []
    if(this.data.vod_urls){
      let item = this.data.vod_urls
      item = item.split("\r\n")

      item.forEach(element => {
        console.log(element.split("$").length)
        if(element.split("$").length == 2){
          list.push(element.split("$"))
        }
      });
    }else{
      
    }
 
    console.log('list',list)
    this.setData({
      movieList:list,
      // 设置当前播放链接为第一个
      currentUrl:list[0][1]
    })
  },
  setCurrentUrl:function(e){
    var url = e.target.dataset.src
    this.setData({
      currentUrl : url
    })
    wx.setNavigationBarTitle({
      title: this.data.title + e.target.dataset.name
    })
  },
  /**
   * 倍速播放
   * @param {*} e 
   */
  bindButtonRate:function(e){
    let rate = e.currentTarget.dataset.rate
    wx.showToast({
      title: '当前为倍速' + rate,
      icon: "none",
      duration: 2000
    })
    this.VideoContext.playbackRate(Number(rate))
  },

  reverseList: function(e){
    let that = this
    let order = e.currentTarget.dataset.order
    console.log(e)
    if(this.data.curOrder=='正序'){
      this.setData({
        curOrder: '倒序'
      })
    }else{
      this.setData({
        curOrder: '正序'
      })
    }
    this.setData({
      movieList: that.data.movieList.reverse()
    })
  }
})