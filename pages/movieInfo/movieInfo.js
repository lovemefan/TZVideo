// pages/movieInfo/movieInfo.js
const douban = require('../../utils/douban.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 4
    }, {
      id: 5
    }],
    starId: 5,
    src1: '/images/star_red.png',
    src2: '/images/star_gray.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  previewMovie: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [current]// 需要预览的图片http链接列表  
    })
  },
  previewActors: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
    var actors = this.data.actors;
    let urls=[]
    for (var actor in actors){
      urls.push(actors[actor].cover_url);
    }

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: urls// 需要预览的图片http链接列表  
    })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
   // this.getMovieInfo(this.data.id)
    this.getMovieInfo(1401261)
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

  },
  getMovieInfo: function (id) {
    var that = this
    douban.getDoubanMovieInfo(id, (res) => {
      that.setData({
        movieInfo: res.data,
        actors:res.data.actors
      })
      wx.hideLoading()
      console.log(res.data)
      return true
    })
  }
})