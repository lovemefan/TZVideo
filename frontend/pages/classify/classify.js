// pages/classify/classify.js
const douban = require('../../utils/douban.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curtags: ['全部','全部地区','全部类型','全部年代','全部特色'],
    curstart:0,
    items:[],
    curquery:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieRecommend("")
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
      this.setData({
        curstart:this.data.curstart + 8
      })
      this.getMovieRecommend(this.data.curquery,this.data.curstart)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMovieRecommend:function(tag,start=0){
    let that = this
    douban.getMovieRecommend(tag,start).then((res)=>{
      console.log("标签正在准备")
      console.log(res)
      that.setData({
        tags:res.tags,
        items:this.data.items.concat(res.items),
        curquery:tag
      })
    })
  },
  // 点击标签处理
  getMovieRecommendByTapTags:function(e){
    var index = e.currentTarget.dataset.index
    var curtag = e.currentTarget.dataset.tag
    var tags = this.data.curtags
    tags[index] = curtag
    console.log(tags)
    this.setData({
      curtags:tags,
      items: []
    })
    // tags 如果包含全部的类型 ,默认标签为空
    // var tagstring = tags[0] + ',' + (tags[1].indexOf("全部") != -1)? '' :tag[1] +',' + (tags[2].indexOf("全部") != -1)? '' :tag[2] + ',' + (tags[3].indexOf("全部") != -1)? '' :tag[3] + ',' + (tags[4].indexOf("全部") != -1)? '' :tag[4]
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      if (!element.indexOf('全部')) {
        tags[index] = ''
      }
    }
      
    let tagstring = tags.join(',')
    this.getMovieRecommend(tagstring)
  }
})