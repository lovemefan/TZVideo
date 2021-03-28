// pages/videoPlayInfo/videoPlayInfo.js
const scawler = require('../../utils/scrawler.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.title = options.title
    this.data.type_id = options.type_id
    this.data.vod_id = options.vod_id
    this.getMoviesResource(this.data.title)
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  
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
  getMoviesResource:function(query){
    scawler.getMoviesResource(query).then((res)=>{
    
      this.setData({
        moviesResources:res
      })
      this.getMovieList()
    })
  },
  //获取播放链接
  getMovieList:function() {
    var res 
    this.data.moviesResources.list.forEach(element => {
  
      // 判断在电影信息界面传来的参数是否与查询的电影细节信息一致
        if(this.data.vod_id==element.vod_id && element.type_id==this.data.type_id)
        {
          res = element.vod_play_url
          this.data.info = element
        }
    });
    console.log(this.data.info)
    var list = []
    if(res){
      let item = res.split("$$$")[1]
      item = item.split("#")
      item.forEach(element => {
        list.push(element.split("$"))
      });
    }else{
      
    }
    console.log(list)
    this.setData({
      movieList:list,
      currentUrl:list[0][1]
    })
  },
  setCurrentUrl:function(e){
    var url = e.target.dataset.src
    this.setData({
      currentUrl : url
    })
  },
  

})