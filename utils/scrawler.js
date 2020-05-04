/**
* author:  lovemefan
* date: 2020/4/12
* 解析资源
*/
const util = require('util.js')
// const webSource = require('websourcedata.js')
const apiSource = "https://douban.lovemefan.top/api-okzy"

function getMoviesResource(quary,ac="detail"){
    return util.request(apiSource,{
      'wd': quary,
      'ac':ac
    })
  
}

  
module.exports = { 
 getMoviesResource:getMoviesResource
}