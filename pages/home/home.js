// pages/home/home.js
var scrawler = require('../../utils/scrawler.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前tab
    TabCur: 0,
    scrollLeft: 0,
    movies: null
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.flushMovies()
  },
  flushMovies:function(){
    console.log('----------test---------')
    if(!this.movies) {
      scrawler.getMovieList((res) => {
        this.setData({
          movies: res.data
        })
        console.log('----home.js---')
        console.log(res.data)
        return true
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

  },
  /**
   * 导航栏切换
   */
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log('qiehuang' + typeof e.currentTarget.dataset.id)
    switch (e.currentTarget.dataset.id) {
      case '0':
        console.log('0')
        this.flushMovies()
        break

      case '1':
        console.log('1')
        break

      case '2':

        break

      case '3':

        break

      case '4':

        break

    }
  }
})