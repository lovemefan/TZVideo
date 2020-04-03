// pages/home/home.js
var scrawler = require('../../utils/scrawler.js')
var douban = require('../../utils/douban.js')
// 暂存movie信息 play_lists 为一个五个元素的数组,分别存储榜单数据,热剧,电影,综艺,动漫
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前tab
    TabCur: 0,
    scrollLeft: 0,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.flushPlayList()
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
   * 刷新加载片单数据
   */
  flushPlayList: function () {
    var that = this
    console.log('----------test---------')
    // 当前数据为空或返回数据状态异常

    if (typeof (that.data.playLists) == "undefined" || this.playListCode != '200') {

      douban.getDoubanPlayList(0, 15, "selected", (res) => {
        that.setData({
          playLists: res.data,
          playListCode: res.statusCode
        })
        // this.datas.lists = res.data  
        console.log(res.data)
        wx.hideLoading()
        return true
      })
     
      
    }

  },
  /**
   * 刷新加载热门电视剧
   */
  flushHotTv: function () {
    var that = this
    if (typeof (that.data.hotTv) == "undefined" || this.hotTvCode != '200') {

      douban.getDoubanHotTv(0, 15, (res) => {
        that.setData({
          hotTv : res.data,
          hotTvCode:res.statusCode
        })
        // this.datas.lists = res.data
        wx.hideLoading()
        console.log(res.data)
        return true
      })

    }

  },
  /**
   * 刷新加载热门综艺
   */
  flushHotShow: function () {
    var that = this
    if (typeof (that.data.hotShow) == "undefined" || this.hotShowCode != '200') {

      douban.getDoubanHotShow(0, 15, (res) => {
        that.setData({
          hotShow: res.data,
          hotShowCode: res.statusCode
        })
        // this.datas.lists = res.data
        wx.hideLoading()
        console.log(res.data)
        return true
      })

    }

  },
  /**
   * 刷新加载热门电影
   */
  flushHotMovie: function () {
    var that = this
    if (typeof (that.data.hotMovie) == "undefined" || this.hotMovieCode != '200') {

      douban.getDoubanHotMovie(0, 15, (res) => {
        that.setData({
          hotMovie: res.data,
          hotMovieCode: res.statusCode
        })
        // this.datas.lists = res.data
        wx.hideLoading()
        console.log(res.data)
        return true
      })

    }

  },
  /**
   * 刷新加载热门动漫
   */
  flushHotAnimation: function () {
    var that = this
    if (typeof (that.data.hotAnimation) == "undefined" || this.hotAnimationCode != '200') {

      douban.getDoubanHotAnimation(0, 15, (res) => {
        that.setData({
          hotAnimation: res.data,
          hotAnimationCode: res.statusCode
        })
        // this.datas.lists = res.data
        wx.hideLoading()
        console.log(res.data)
        return true
      })

    }

  },
  /**
   * 首页导航栏切换
   */

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
    console.log('qiehuang' + typeof e.currentTarget.dataset.id)
    switch (e.currentTarget.dataset.id) {
      case '0':
        console.log('0')
        this.flushPlayList()
        break

      case '1':
        console.log('1')
        this.flushHotTv()
        break

      case '2':
        this.flushHotMovie()
        break

      case '3':
        this.flushHotShow()
        break

      case '4':
        this.flushHotAnimation()
        break

    }
  }
})