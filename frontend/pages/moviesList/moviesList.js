// pages/moviesList/moviesList.js
const douban = require('../../utils/douban.js')
var contactItems = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
   offset: 0,
   limit:9,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 片单id
    this.setData({
      id: options.id,
      bg_image :options.bg,
      title : options.title
    })
    console.log(this.data.id)
    this.getMoviesList(this.data.id)
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
    wx.showLoading({
      title: '刷新中，请稍等',
      mask:true,
    })
    this.setData({
      offset:0,
      limit:9
    })
    this.getMoviesList(this.data.id)
   

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  onReachBottom: function () {
    let limit = this.data.limit;
    this.setData({
      limit:limit+9,
      
    })
    wx.showLoading({
      title: '正在加载中',
    })
    
    this.getMoviesList(this.data.id)

   

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMoviesList: function(id) {
    var that = this
    let limit = that.data.limit
    let offset = that.data.offset
     
    douban.getDoubanMoviesList(0, limit,id,(res)=>{
      that.setData({
       moviesList: res.data,
      })
      wx.hideLoading()
      console.log(res.data)
      return true
    })
    
   
  }
})