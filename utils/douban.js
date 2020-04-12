const util = require('util.js')
// const APIKEY = "0dad551ec0f84ed02907ff5c42e8ec70"
const APIKEY = "054022eaeae0b00e0fc068c0c0a2102a"
// https用户代理
const USER_AGENT = "api-client/1 com.douban.frodo/6.32.0(180) Android/22 product/R11 vendor/OPPO model/OPPO R11  rom/android  network/wifi  platform/mobile"
const HOST = ""
const UDID = "a4684a67c5db66436da276d582163766f927d703"
//所有,精选,豆瓣片单,经典,获奖,高分,榜单,冷门佳片,华语,欧美,日本,韩国,喜剧,爱情,科幻,动画
const PLAYLIST_CAREGORIES = {
  all : "all",
  select : "select",
  official : "official",
  classical : "classical",
  prize : "prize",
  high_score : "high_score",
  movie_list : "movie_list",
  dark_horse : "dark_horse",
  chinese : "chinese",
  western : "western",
  japanese : "japanese",
  korea : "korea",
  comedy : "comedy",
  love : "love",
  science_fiction : "science_fiction",
  cartoon : "cartoon"
}

/**
 * 豆瓣片单
 */

// 豆瓣片单 url
const DOUBAN_NEW_PLAYLISTS = "https://douban.lovemefan.top/api/v2/skynet/new_playlists"
// 豆瓣某一片单电影列表
var DOUBAN_MOVIES_LIST = "https://douban.lovemefan.top/api/v2/doulist/{}/posts"
// 电影详情
var DOUBAN_MOVIE_INFO = "https://douban.lovemefan.top/api/v2/movie/{}"
// 电视剧详情,包括电视剧和动漫和综艺
var DOUBAN_TV_INFO = "https://douban.lovemefan.top/api/v2/tv/{}"
/**
 * 豆瓣热播
 */

// 热播电影
const DOUBAN_MOVIE_HOT = "https://douban.lovemefan.top/api/v2/subject_collection/movie_hot_gaia/items"
// 热播电视剧 综合
const DOUBAN_TV_HOT = "https://douban.lovemefan.top/api/v2/subject_collection/tv_hot/items"
// 热播电视剧 国产剧
const DOUBAN_TV_DOMESTIC = "https://douban.lovemefan.top/api/v2/subject_collection/tv_domestic/items"
// 热播电视剧 美剧
const DOUBAN_TV_AMERICAN = "https://douban.lovemefan.top/api/v2/subject_collection/tv_american/items"
// 热播电视剧 日剧
const DOUBAN_TV_JANPANESE = "https://douban.lovemefan.top/api/v2/subject_collection/tv_japanese/items"
// 热播电视剧 韩剧
const DOUBAN_TV_KOREAN = "https://douban.lovemefan.top/api/v2/subject_collection/tv_korean/items"
// 热播动漫
const DOUBAN_TV_ANIMATION = "https://douban.lovemefan.top/api/v2/subject_collection/tv_animation/items"
// 热门综艺 综合
const DOUABN_SHOW_HOT = "https://douban.lovemefan.top/api/v2/subject_collection/show_hot/items"
// 热门综艺 国内
const DOUBAN_SHOW_DOMESTIC = "https://douban.lovemefan.top/api/v2/subject_collection/show_domestic/items"
// 热门综艺 国外
const DOUBAN_TSHOW_FOREIGN = "https://douban.lovemefan.top/api/v2/subject_collection/show_foreign/items"
// 
/**
 * 分类查询接口
 */

const DOUBAN_SEARCH_BY_TAG = "https://douban.lovemefan.top/api/v2/tv/tag"


const DOUBAN_SEARCH_SUGGESTION = "https://douban.lovemefan.top/api/v2/search/suggestion"
/**
 * 根据id返回电影的详情
 */
function getDoubanMovieInfo(id, callback) {
  wx.showLoading({
    title: '加载中',
  })
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUBAN_MOVIE_INFO, ts)

  wx.request({
    url: DOUBAN_MOVIE_INFO.replace('{}', id),
    data: {
      'apikey': APIKEY,
      'channel': 'Douban',
      'udid': UDID,
      '_ts': ts,
      '_sig': sig

    },
    header: {
      'User-Agent': USER_AGENT,
      'Host': 'frodo.douban.com',
    },
    success(res) {
      return typeof callback == "function" && callback(res)
    }
  })
}
/**
 * 根据id返回电视剧,动漫,综艺的详情
 */
function getDoubanTvInfo(id, callback) {
  wx.showLoading({
    title: '加载中',
  })
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUBAN_TV_INFO, ts)

  wx.request({
    url: DOUBAN_TV_INFO.replace('{}', id),
    data: {
      'apikey': APIKEY,
      'channel': 'Douban',
      'udid': UDID,
      '_ts': ts,
      '_sig': sig

    },
    header: {
      'User-Agent': USER_AGENT,
      'Host': 'frodo.douban.com',
    },
    success(res) {
      return typeof callback == "function" && callback(res)
    }
  })
}
/**
 * 根据片单id来返回的电影的详情
 */
function getDoubanMoviesList(start,count,id,callback){
  wx.showLoading({
    title: '加载中',
  })
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUBAN_MOVIES_LIST,ts)
 
  wx.request({
    url: DOUBAN_MOVIES_LIST.replace('{}',id),
    data: {
      'apikey': APIKEY,
      'start': start,
      'count': count,
      'channel' : 'Douban',
      'udid': UDID,
      '_ts': ts,
      '_sig': sig
  
    },
    header: {
      'User-Agent' : USER_AGENT,
      'Host' : 'frodo.douban.com',
    },
    success(res) {
      return typeof callback == "function" && callback(res)
    }
  })
}
/**
 * 根据categories来返回不同的片单
 */
function getDoubanPlayList(start, count, category, callback) {
  wx.showLoading({
    title: '加载中',
  })
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUBAN_NEW_PLAYLISTS, ts)

  wx.request({
    url: DOUBAN_NEW_PLAYLISTS,
    data: {
      'apikey': APIKEY,
      'start': start,
      'count': count,
      'category': category,
      '_sig': sig,
      '_ts': ts
    },
    header: {
      'User-Agent': USER_AGENT,
      'Host': 'frodo.douban.com',
      'Accept-Encoding': 'gzip',
    },
    success(res) {
      console.log(res.statusCode)
      return typeof callback == "function" && callback(res)
    }
  })
}
// 豆瓣片单 经典

// 豆瓣片单 豆瓣片单

// 豆瓣片单 高分


//综艺
function getDoubanHotShow(start, count, callback) {
  wx.showLoading({
    title: '加载中',
  })
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUABN_SHOW_HOT, ts)
  wx.request({
    url: DOUABN_SHOW_HOT,
    data: {
      'apikey': APIKEY,
      'start': start,
      'count': count,
      'channel': 'Douban',
      'udid': UDID,
      '_sig': sig,
      '_ts': ts,
    },
    header: {
      'User-Agent': USER_AGENT,
      'Host': 'frodo.douban.com',
      "Content-Type": "application/text",
    },
    success(res) {
      return typeof callback == "function" && callback(res)
    }
  })
}

//热剧
function getDoubanHotTv(start, count, callback) {
  wx.showLoading({
    title: '加载中',
  })
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUBAN_TV_HOT, ts)
  wx.request({
    url: DOUBAN_TV_HOT,
    data: {
      'apikey': APIKEY,
      'start': start,
      'count': count,
      'channel': 'Douban',
      'udid': UDID,
      '_sig': sig,
      '_ts': ts,

    },
    header: {
      'User-Agent': USER_AGENT,
      'Host': 'frodo.douban.com',
      "Content-Type": "application/text",
    },
    success(res) {
      console.log("hot请求成功")
      return typeof callback == "function" && callback(res)
    }
  })
}
//热播电影
function getDoubanHotMovie(start, count, callback) {
  wx.showLoading({
    title: '加载中',
  })
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUBAN_MOVIE_HOT, ts)
  wx.request({
    url: DOUBAN_MOVIE_HOT,
    data: {
      'apikey': APIKEY,
      'start': start,
      'count': count,
      'channel': 'Douban',
      'udid': UDID,
      '_sig': sig,
      '_ts': ts,

    },
    header: {
      'User-Agent': USER_AGENT,
      'Host': 'frodo.douban.com',
      "Content-Type": "application/text",
    },
    success(res) {
      return typeof callback == "function" && callback(res)
    }
  })
}
// 热播动漫
function getDoubanHotAnimation(start, count, callback) {
  wx.showLoading({
    title: '加载中',
  })
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUBAN_TV_ANIMATION, ts)
  wx.request({
    url: DOUBAN_TV_ANIMATION,
    data: {
      'apikey': APIKEY,
      'start': start,
      'count': count,
      'channel': 'Douban',
      'udid': UDID,
      '_sig': sig,
      '_ts': ts,

    },
    header: {
      'User-Agent': USER_AGENT,
      'Host': 'frodo.douban.com',
      "Content-Type": "application/text",
    },
    success(res) {
      return typeof callback == "function" && callback(res)
    },
    fail(){
      consle.log('请求失败'+this.url)
    }
  })
}
/**
 * 搜索建议
 * 使用promise封装,比之前的callback高级多了
 */
function searchSuggestion(query) {
  let that = this;
  var ts = util.getTimeStamp()
  var sig = util.makeSignature(DOUBAN_SEARCH_SUGGESTION, ts)
  return util.request(DOUBAN_SEARCH_SUGGESTION, {
    'q': query,
    'apikey': APIKEY,
    'count': 20,
    'channel': 'Douban',
    'udid': UDID,
    '_sig': sig,
    '_ts': ts,
  }, 
  {
      'User-Agent': USER_AGENT,
      'Host': 'frodo.douban.com',
  })

}

module.exports = {
  getDoubanPlayList : getDoubanPlayList,
  getDoubanHotTv : getDoubanHotTv,
  getDoubanHotShow: getDoubanHotShow,
  getDoubanHotAnimation: getDoubanHotAnimation,
  getDoubanHotMovie: getDoubanHotMovie,
  getDoubanMoviesList: getDoubanMoviesList,
  getDoubanMovieInfo: getDoubanMovieInfo,
  getDoubanTvInfo: getDoubanTvInfo,
  searchSuggestion: searchSuggestion
}