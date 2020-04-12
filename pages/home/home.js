// pages/home/home.js
var scrawler = require('../../utils/scrawler.js')
var douban = require('../../utils/douban.js')
var searchComponent = require('../component/search/search.js')
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
    
    startIndex:[0,0,0,0,0],
    // 当前片单,热剧,电影,综艺,动漫显示数量,下拉增加
    countIndex: [15,15,15,15,15],
    wxSearchData:{
      view:{
        isShow: false
      }
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.flushPlayList()
    //初始化的时候渲染测试
    searchComponent.init(this, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    // searchComponent.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
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
    switch (this.data.TabCur) {
      case '0':
        this.data.countIndex[0] = this.data.countIndex[0] + 15
        this.flushPlayList(this.data.startIndex[0],this.data.countIndex[0])
        break

      case '1':
        console.log('1')
        this.data.countIndex[1] = this.data.countIndex[1] + 15
        this.flushHotTv(this.data.startIndex[1], this.data.countIndex[1])
        break

      case '2':
        this.data.countIndex[2] = this.data.countIndex[2] + 15
        this.flushHotMovie(this.data.startIndex[2], this.data.countIndex[2])
        break

      case '3':
        this.data.countIndex[3] = this.data.countIndex[3] + 15
        this.flushHotShow(this.data.startIndex[3], this.data.countIndex[3])
        break

      case '4':
        this.data.countIndex[4] = this.data.countIndex[4] + 15
        this.flushHotAnimation(this.data.startIndex[4], this.data.countIndex[4])
        break

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 刷新加载片单数据
   */
  flushPlayList: function (start=0,count=15) {
    var that = this
    console.log('----------test---------')
    // 当前数据为空或返回数据状态异常

    if (typeof (that.data.playLists) == "undefined" || this.playListCode != '200') {

      douban.getDoubanPlayList(start, count, "selected", (res) => {
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
  flushHotTv: function (start = 0, count = 15) {
    var that = this
    if (typeof (that.data.hotTv) == "undefined" || this.hotTvCode != '200') {

      douban.getDoubanHotTv(start, count, (res) => {
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
  flushHotShow: function (start = 0, count = 15) {
    var that = this
    if (typeof (that.data.hotShow) == "undefined" || this.hotShowCode != '200') {

      douban.getDoubanHotShow(start, count, (res) => {
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
  flushHotMovie: function (start = 0, count = 15) {
    var that = this
    if (typeof (that.data.hotMovie) == "undefined" || this.hotMovieCode != '200') {

      douban.getDoubanHotMovie(start, count, (res) => {
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
  flushHotAnimation: function (start = 0, count = 15) {
    var that = this
    if (typeof (that.data.hotAnimation) == "undefined" || this.hotAnimationCode != '200') {

      douban.getDoubanHotAnimation(start, count, (res) => {
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
  },

  inputChange: function(e) {

    this.setData({
      keyword: e.detail.value,
      // searchStatus: false
    });
    console.log('input:'+this.data.keyword)
    this.getSearchSuggestion(this.data.keyword);
  },
  
  //搜索建议辅助api
  getSearchSuggestion: function (query = "") {
    let that = this;
    douban.searchSuggestion(query).then(function (res) {
      console.log(res)
      that.setData({
        suggestion: res.result
      });
      console.log(that.data.suggestion)
    });
  },
  /**
   * 搜索框相关
   */
  wxSearchFn: function(e){
    var that = this
    // searchComponent.wxSearchAddHisKey(that);
    
  },
  wxSearchInput: function(e){
    var that = this
    searchComponent.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    searchComponent.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    searchComponent.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    // 点击关键词跳转详情界面
    searchComponent.wxSearchKeyTap(e, that, (options)=>{
  
      wx.navigateTo({
        url: '/pages/movieInfo/movieInfo?id=' + options.id + '&title=' + options.title
      })
    });
  },
  wxSearchDeleteKey: function(e){
    var that = this
    searchComponent.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    searchComponent.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    searchComponent.wxSearchHiddenPancel(that);
  }
})