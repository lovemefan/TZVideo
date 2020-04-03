const apikey = '0df993c66c0c636e29ecbb5344252a4a'
const douban = 'https://api.douban.com/v2/movie/top250'

function getMovieList(callback) { 
  wx.request({
    url: douban, 
    data: {
      'apikey': apikey,
      'start' : 0,
      'count' : 10
    },
    header: {
      "Content-Type": "application/text",
      'Cookie': 'bid=OrwCN9f7MSo'
    },
    success(res) {
      console.log('---scrawler.js---')
      return typeof callback == "function" && callback(res)
    }
  })
 
}


module.exports = { 
  getMovieList:getMovieList
}