/*
 * @Date: 2020-03-14 22:48:08
 * @Editors: lovemefan
 * @LastEditTime: 2020-05-13 21:03:05
 */
/**
* author:  lovemefan
* date: 2020/4/12
* 解析资源
*/
const util = require('util.js')
// const webSource = require('websourcedata.js')
const apiSource = "https://douban.lovemefan.top/api-okzy"

/**
 * @description: 根据apiSource获取电影播放列表
 * @param {string} quary 查询参数
 * @param {string}ac={'detail','list'},默认为detail详细信息,list为粗略详细
 * @return: 
 */
function getMoviesResource(quary,ac="detail"){
    return util.request(apiSource,{
      'wd': quary,
      'ac':ac
    })
  
}

  
module.exports = { 
 getMoviesResource:getMoviesResource
}