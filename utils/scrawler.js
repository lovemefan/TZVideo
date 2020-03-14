// JavaScript source code

var express = require('express');
var Buffer = require('buffer').Buffer;
var iconv = require('iconv-lite');//解决乱码问题
var router = express.Router();
var http = require('https');
var cheerio = require('cheerio');
var querystring = require("querystring");

var server = express();
server.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
})

server.all('/nowplaying', function (req, res) {
  console.log(new Date().toLocaleString() + "          nowplaying");
  getHTML("https://movie.douban.com/cinema/nowplaying/xian/", res, "/nowplaying", filterNow);
})

server.all('/comingAll', function (req, res) {
  console.log(new Date().toLocaleString() + "          comingAll");
  getHTML("https://movie.douban.com/coming", res, "/comingAll", filterComAll);
})

server.all('/comingImp', function (req, res) {
  console.log(new Date().toLocaleString() + "          comingImp");
  getHTML("https://movie.douban.com/cinema/later/xian/", res, "/comingImp", filterComImp);
})

server.all('/index', function (req, res) {
  console.log(new Date().toLocaleString() + "          index  -->  " + req.query.url);
  getHTML(req.query.url, res, "/index", filterindex);
})

server.all('/bigPic', function (req, res) {
  console.log(new Date().toLocaleString() + "          bigPic  -->  " + req.query.url);
  getHTML(req.query.url, res, "/bigPic", filterbigPic);
})

server.all('/showMovie', function (req, res) {
  console.log(new Date().toLocaleString() + "          showMovie  -->  " + req.query.url);
  getHTML(req.query.url, res, "/showMovie", filtershowMovie);
})

server.all('/picAll', function (req, res) {
  console.log(new Date().toLocaleString() + "          picAll  -->  " + req.query.url);
  getHTML(req.query.url, res, "/picAll", filterpicAll);
})

server.all('/showMovieAll', function (req, res) {
  console.log(new Date().toLocaleString() + "          showMovieAll  -->  " + req.query.url);
  getHTML(req.query.url, res, "/showMovieAll", filtershowMovieAll);
})

server.all('/personAll', function (req, res) {
  console.log(new Date().toLocaleString() + "          peopleAll  -->  " + req.query.url);
  getHTML(req.query.url, res, "/personAll", filterpeopleAll);
})

server.all('/person', function (req, res) {
  console.log(new Date().toLocaleString() + "          people  -->  " + req.query.url);
  getHTML(req.query.url, res, "/person", filterpeople);
})

server.all('/top', function (req, res) {
  var url = "";
  if (req.query.url == undefined) {
    url = "https://movie.douban.com/top250";
  } else {
    url = req.query.url;
  }
  console.log(new Date().toLocaleString() + "          top  -->  " + url);
  getHTML(url, res, "/top", filterTop);
})

server.all('/hot', function (req, res) {
  console.log(new Date().toLocaleString() + "          hot");
  getHTML("https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0", res, "/hot", filterHot);
})

server.listen(798);

function filterHot(html) {
  var obj = JSON.parse(html).subjects;
  var arr = new Array();
  for (each in obj) {
    var m = {
      title: obj[each].title,
      link: obj[each].url,
      img: obj[each].cover,
      star: parseFloat(obj[each].rate),
    }
    arr.push(m);
  }
  var back = {
    hot: arr,
  }
  return back;
}
//解析热门电影

function filterTop(html) {
  var $ = cheerio.load(html);
  var obj = {};
  obj.top = List($, '.grid_view  li>.item');
  obj.next = arguments[1] + findPosition($, '.paginator span.next a')[0].attribs.href;
  var back = {
    Ftop: obj,
  }
  return back;

  function List($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        link: httpComplete(findPosition($, link + ' .pic a ')[i].attribs.href),
        name: findPosition($, link + ' .pic a ')[i].attribs.alt,
        star: parseFloat(findPosition($, link + ' .info .star .rating_num')[i].children[0].data),
        num: parseInt(sub(findPosition($, link + ' span:contains("评价")')[i].children[0].data, 1, 3)),
        message: extraction(synopsis($, link + ' .info .bd p[class!="quote"]', i)),
        img: httpComplete(findPosition($, link + ' .pic img')[i].attribs.src),
        quote: findPosition($, link + ' .quote span')[i].children[0].data,
      }
      arr.push(m);
    }
    return arr;
  }

  function synopsis($, link, num) {
    var str = "";
    var event = findPosition($, link)[num].children;
    for (var i = 0; i < event.length; i++) {
      if (event[i].data != undefined) {
        str = str + "~" + event[i].data;
      }
    }
    return str.substr(1);
  }
}
//解析top250

function filterpeople(html) {
  var $ = cheerio.load(html);
  var obj = {
    base: {},
    pic: Pic($, '#photos ul a'),
    recentMovie: Movie($, '#recent_movies .list-s li'),
    goodMovie: Movie($, '#best_movies .list-s li'),
    partner: Partner($, '#partners .list-s li'),
  };
  obj.base.name = findPosition($, '#content h1')[0].children[0].data
  obj.base.sex = extraction(findPosition($, '#headline .info li span')[0].next.data);
  try {
    obj.base.constellation = extraction(findPosition($, '#headline .info li span')[1].next.data);
  } catch (e) {
    obj.base.constellation = null;
  }
  try {
    obj.base.birthday = extraction(findPosition($, '#headline .info li span')[2].next.data);
  } catch (e) {
    obj.base.birthday = null;
  }
  try {
    obj.base.place = extraction(findPosition($, '#headline .info li span')[3].next.data);
  } catch (e) {
    obj.base.place = null;
  }
  try {
    obj.base.job = extraction(findPosition($, '#headline .info li span')[4].next.data);
  } catch (e) {
    obj.base.job = null;
  }
  obj.base.pic = httpComplete(findPosition($, '#headline a.nbg')[0].attribs.href);

  try {
    obj.synopsis = extraction(synopsis($, '#intro .bd .all'));
  } catch (e) {
    obj.synopsis = extraction(synopsis($, '#intro .bd'));
  }
  var back = {
    person: obj,
  }
  return back;

  function Partner($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        link: httpComplete(findPosition($, link + ' .pic a')[i].attribs.href),
        img: httpComplete(findPosition($, link + ' .pic img')[i].attribs.src),
        name: findPosition($, link + ' .pic img')[i].attribs.alt,
        num: parseInt(findPosition($, link + ' .info .pl a')[i].children[0].data),
      }
      arr.push(m);
    }
    return arr;
  }

  function Movie($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        link: httpComplete(findPosition($, link + ' .pic a')[i].attribs.href),
        img: httpComplete(findPosition($, link + ' .pic img')[i].attribs.src),
        name: findPosition($, link + ' .pic img')[i].attribs.title,
      }
      try {
        m.star = parseInt(findPosition($, link + ' .info em')[i].children[0].data);
      } catch (e) {
        m.star = -1;
      }
      arr.push(m);
    }
    return arr;
  }

  function Pic($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        link: httpComplete(event[i].attribs.href),
        img: httpComplete(event[i].children[1].attribs.src),
      }
      arr.push(m);
    }
    return arr;
  }

  function synopsis($, link) {

    var str = "";
    var event = findPosition($, link)[0].children;
    for (var i = 0; i < event.length; i++) {
      if (event[i].data != undefined) {
        str = str + "/" + event[i].data;
      }
    }
    return str.substr(1);
  }

}
//解析人员详情

function filterpeopleAll(html) {
  var $ = cheerio.load(html);
  var obj = {};
  var event = findPosition($, '#celebrities .list-wrapper');
  for (var i = 0; i < event.length; i++) {
    obj[event[i].children[1].children[0].data.split(' ')[0]] = List($, '#celebrities .list-wrapper .celebrities-list', i);
  }
  var arr = [];
  for (each in obj) {
    for (thing in obj[each]) {
      obj[each][thing].type = each;
      arr.push(obj[each][thing]);
    }
  }
  var back = {
    peopleAll: arr
  }
  return back;

  function List($, link, num) {
    var arr = new Array();
    var event = findPosition($, link)[num].children;
    for (var i = 1; i < event.length; i += 2) {
      var m = {
        link: httpComplete(event[i].children[1].attribs.href),
        name: event[i].children[1].attribs.title,
        img: "http" + event[i].children[1].children[1].attribs.style.split('http')[1],

        work: Work(findPosition($, "#celebrities .list-wrapper .celebrities-list .works")[num].children),
      }

      arr.push(m);
    }
    return arr;
  }
  function Work(event) {
    var arr = [];
    for (var i = 1; i < event.length; i += 2) {
      var m = {
        movie: event[i].attribs.title,
        link: event[i].attribs.href,
      }
      arr.push(m);
    }
    return arr;
  }

}
//解析人员列表

function filtershowMovieAll(html) {
  var $ = cheerio.load(html);
  var obj = {};
  obj.showMovieAll = List($, '.video-list  li');

  return obj;

  function List($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        link: httpComplete(event[i].children[1].attribs.href),
        img: httpComplete(event[i].children[1].children[1].attribs.src),
        long: event[i].children[1].children[3].children[0].children[0].data,
        title: extraction(findPosition($, link + " p a")[i].children[0].data),
        time: extraction(findPosition($, link + " p.trail-meta span")[i].children[0].data),
      }

      arr.push(m);
    }
    return arr;
  }

}
//解析预告片列表

function filterpicAll(html) {
  var $ = cheerio.load(html);
  var obj = {};
  obj.pic = List($, '.article .mod  li[class!="last more-pics"]');
  var back = {
    picAll: obj,
  }
  return back;

  function List($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        link: httpComplete(event[i].children[1].attribs.href),
        img: httpComplete(event[i].children[1].children[1].attribs.src),
      }
      arr.push(m);
    }
    return arr;
  }

}
//解析图片列表

function filtershowMovie(html) {
  var $ = cheerio.load(html);
  var obj = {
    movie: httpComplete(findPosition($, '#movie_player video source')[0].attribs.src),
  }
  obj.showMovieList = List($, '#video-list .video-list-col li');
  var back = {
    showMovie: obj,
  }
  return back;

  function List($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        link: httpComplete(event[i].children[1].attribs.href),
        img: httpComplete(event[i].children[1].children[1].attribs.src),
        long: event[i].children[1].children[3].children[0].data,
        title: event[i].children[1].children[5].children[0].data,
      }

      arr.push(m);
    }
    return arr;
  }
}
//解析预告片

function filterbigPic(html) {
  var $ = cheerio.load(html);
  var obj = {
    link: httpComplete(findPosition($, ' .photo-show  img')[0].attribs.src),
    from: findPosition($, ' .poster-info .pl  a')[0].children[0].data,
    time: sub(findPosition($, ' .poster-info  .pl:contains("上传于")')[0].children[0].data, 4, 0),
  }
  var back = {
    pic: obj,
  }
  return back;
}
//解析大图片

function filterindex(html) {
  var $ = cheerio.load(html); //传入文档启动解析
  var obj = {
    base: {},
    star: {},
    person: [],
    moreShortCommentary: {},
    moreMovieCommentary: {},
    moreDiscuss: {},
  };
  obj.base.name = findPosition($, '#content > h1 > span:nth-child(1)')[0].children[0].data;
  obj.base.img = httpComplete(findPosition($, '#mainpic > a > img')[0].attribs.src);
  obj.base.type = attrbite($, 'span[property="v:genre"]');
  obj.base.place = extraction(findPosition($, '.pl:contains("制片国家/地区:")')[0].next.data);
  obj.base.language = extraction(findPosition($, '.pl:contains("语言:")')[0].next.data);
  obj.base.time = attrbite($, 'span[property="v:initialReleaseDate"]');
  obj.base.runtime = parseInt(sub(attrbite($, 'span[property="v:runtime"]'), 1, 2));
  obj.base.remane = extraction(findPosition($, '.pl:contains("又名:")')[0].next.data);
  obj.base.director = personList($, '.pl:contains("导演")');
  obj.base.scenarist = personList($, '.pl:contains("编剧")');
  obj.base.actors = personList($, '.pl:contains("主演")');
  try {
    obj.star.average = parseFloat(attrbite($, 'strong[property="v:average"]'));
    obj.star.votes = parseInt(attrbite($, 'span[property="v:votes"]'));
    for (var i = 5; i > 0; i--) {
      obj.star["star" + i] = parseFloat(sub(findPosition($, '.rating_per')[5 - i].children[0].data, 1, 1));
    }
  } catch (e) {
    obj.star = -1;
  }


  obj.synopsis = extraction(synopsis($, 'span[property="v:summary"]'));

  obj.person = personListMain($, ".celebrities-list");
  obj.personAllLink = httpComplete(findPosition($, '#celebrities > h2 > span > a')[0].attribs.href);
  obj.personNum = parseInt(sub(findPosition($, '#celebrities > h2 > span > a')[0].children[0].data, 3, 0));

  obj.showMovie = Movie($, ".label-trailer");
  obj.moreShowMovie = httpComplete(findPosition($, '#related-pic > h2  a')[0].attribs.href);


  obj.pic = pic($, "#related-pic .related-pic-bd  img");
  obj.morePic = httpComplete(findPosition($, '#related-pic > h2  a:contains("图片")')[0].attribs.href);
  obj.picnum = parseInt(sub(findPosition($, '#related-pic > h2  a:contains("图片")')[0].children[0].data, 3, 0));

  obj.sameMovie = sameMovie($, "#recommendations .recommendations-bd  dl");

  obj.shortCommentary = short($, "#hot-comments  .comment");
  obj.moreShortCommentary.link = httpComplete(findPosition($, '#comments-section .mod-hd  .pl a')[0].attribs.href);
  obj.moreShortCommentary.num = parseInt(sub(findPosition($, '#comments-section .mod-hd  .pl a')[0].children[0].data, 4, 2));

  obj.movieCommentary = movieCommentary($, "section.movie-content  .review-list [data-cid]");
  obj.moreMovieCommentary.link = httpComplete(arguments[1] + findPosition($, 'section.movie-content .pl a')[0].attribs.href);
  obj.moreMovieCommentary.num = parseInt(sub(findPosition($, 'section.movie-content .pl a')[0].children[0].data, 4, 2));

  obj.discuss = Discuss($, "div.section-discussion .olt tr");
  obj.moreDiscuss.link = httpComplete(findPosition($, 'div.section-discussion p.pl a')[0].attribs.href);
  obj.moreDiscuss.num = parseInt(sub(extraction(findPosition($, 'div.section-discussion p.pl a')[0].children[0].data), 14, 2));
  var back = {
    index: obj,
  }
  return back;

  function Discuss($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 1; i < event.length; i++) {
      var m = {
        title: event[i].children[1].children[0].children[0].data,
        link: httpComplete(event[i].children[1].children[0].attribs.href),
        name: event[i].children[3].children[1].children[0].data,
        time: event[i].children[7].children[0].children[0].data,
      }
      try {
        m.backNum = parseInt(sub(event[i].children[5].children[0].children[0].data, 1, 3));
      } catch (e) {
        m.backNum = 0;
      }

      arr.push(m);
    }
    return arr;
  }

  function movieCommentary($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        img: httpComplete(findPosition($, link + " img")[i].attribs.src),
        name: findPosition($, link + " .name")[i].children[0].data,
        link: httpComplete(findPosition($, link + " .main-bd h2 a")[i].attribs.href),
        title: findPosition($, link + " .main-bd h2 a")[i].children[0].data,
        goodNumber: parseInt(findPosition($, link + " .action-btn.up span")[i].children[0].data),
        badNumber: parseInt(findPosition($, link + " .action-btn.down span")[i].children[0].data),
        time: findPosition($, link + " .main-meta")[i].children[0].data.split(' '),
      }

      if (findPosition($, link + " .short-content")[i].children.length == 5) {
        m.message = extraction(findPosition($, link + " .short-content")[i].children[2].data);
      } else {
        m.message = extraction(findPosition($, link + " .short-content")[i].children[0].data);
      }


      try {
        m.star = parseInt(findPosition($, link + " .main-title-rating")[i].attribs.class.substr(7, 1));
      } catch (e) {
        m.star = -1;
      }
      arr.push(m);
    }
    return arr;
  }

  function short($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var m = {
        goodNumber: parseInt(findPosition($, link + " .votes")[i].children[0].data),
        time: findPosition($, link + " .comment-time ")[i].attribs.title.split(' '),
        name: findPosition($, link + " .comment-info a")[i].children[0].data,
        type: findPosition($, link + " .comment-info a")[i].next.next.children[0].data,
        message: extraction(findPosition($, link + " .short")[i].children[0].data),
      }
      try {
        m.star = parseInt(findPosition($, link + " .rating")[i].attribs.class.substr(7, 1));
      } catch (e) {
        m.star = -1;
      }
      arr.push(m);
    }
    return arr;
  }

  function sameMovie($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var movie = {
        link: httpComplete(event[i].children[3].children[1].attribs.href),
        img: httpComplete(event[i].children[1].children[1].children[1].attribs.src),
        name: event[i].children[3].children[1].children[0].data,
      }
      arr.push(movie);
    }
    return arr;
  }

  function pic($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var movie = {
        link: httpComplete(httpComplete(event[i].parent.attribs.href)),
        img: httpComplete(event[i].attribs.src),
      }
      arr.push(movie);
    }
    return arr;
  }

  function Movie($, link) {
    var arr = new Array();
    var event = findPosition($, link);
    for (var i = 0; i < event.length; i++) {
      var movie = {
        link: httpComplete(event[i].children[1].attribs.href),
        img: httpComplete(sub("http" + (event[i].children[1].attribs.style.split('http')[1]), 1, 1)),
      }
      arr.push(movie);
    }
    return arr;
  }

  function synopsis($, link) {

    var str = "";
    var event = findPosition($, link)[0].children;
    for (var i = 0; i < event.length; i++) {
      if (event[i].data != undefined) {
        str = str + "/" + event[i].data;
      }
    }
    return str.substr(1);
  }

  function personListMain($, link) {
    var arr = new Array();
    var event = findPosition($, link)[0].children;
    for (var i = 1; i < event.length; i += 2) {
      var person = {
        name: event[i].children[3].children[1].children[0].children[0].data,
        link: httpComplete(event[i].children[1].attribs.href),
        img: httpComplete(sub("http" + (event[i].children[1].children[1].attribs.style.split('http')[1]), 1, 1)),
        role: event[i].children[3].children[3].children[0].data,
      }
      arr.push(person);
    }
    return arr;
  }

  function personList($, link) {
    var arr = new Array();
    var event = findPosition($, link)[0].next.next.children;
    for (var i = 0; i < event.length; i += 2) {
      var person = {
        name: event[i].children[0].data,
        link: httpComplete(event[i].attribs.href),
      }
      arr.push(person);
    }
    return arr;
  }
}
//解析电影主页

function filterComImp(html) {

  var courseData = new Array(); //返回数据
  var $ = cheerio.load(html); //传入文档启动解析

  var chapters = $('#showing-soon'); //选定正在上映列表
  for (var i = 1; i < chapters[0].children.length - 2; i += 2) {
    var obj = {
      link: httpComplete(chapters[0].children[i].children[1].attribs.href),
      img: httpComplete(chapters[0].children[i].children[1].children[1].attribs.src),
      name: chapters[0].children[i].children[3].children[1].children[1].children[0].data,
      type: chapters[0].children[i].children[3].children[3].children[3].children[0].data,
      place: chapters[0].children[i].children[3].children[3].children[5].children[0].data,
      likeNum: parseInt(chapters[0].children[i].children[3].children[3].children[7].children[0].children[0].data.match(/\d+/)),
      time: timeExtraction(chapters[0].children[i].children[3].children[3].children[1].children[0].data)
    };
    try {
      obj.trailer = httpComplete(chapters[0].children[i].children[3].children[3].children[9].attribs.href);
    } catch (e) {
      obj.trailer = "";
    }
    courseData.push(obj);
  }
  var result = {
    ComingImp: courseData
  }
  return result;
}
//解析即将上映数据(重要)

function filterComAll(html) {

  var courseData = new Array(); //返回数据
  var $ = cheerio.load(html); //传入文档启动解析

  var chapters = $('.article tbody'); //选定正在上映列表

  for (var i = 1; i < chapters[0].children.length; i += 2) {
    var obj = {
      time: timeExtraction(chapters[0].children[i].children[1].children[0].data),
      type: extraction(chapters[0].children[i].children[5].children[0].data),
      place: extraction(chapters[0].children[i].children[7].children[0].data),
      likeNum: parseInt(sub(extraction(chapters[0].children[i].children[9].children[0].data), 1, 1)),
      name: chapters[0].children[i].children[3].children[1].children[0].data,
      link: httpComplete(chapters[0].children[i].children[3].children[1].attribs.href),
    };
    courseData.push(obj);
  }
  var result = {
    ComingAll: courseData
  }
  return result;
}
//解析即将上映数据(全部)

function filterNow(html) {

  var courseData = new Array(); //返回数据
  var $ = cheerio.load(html); //传入文档启动解析

  var chapters = $('.mod-bd>.lists'); //选定正在上映列表
  var type = chapters[0].children; //提取数组

  for (var i = 1; i < type.length; i += 2) {
    var obj = {
      name: type[i]["attribs"]['data-title'],
      score: parseFloat(type[i]["attribs"]['data-score']),
      show: type[i]["attribs"]['data-showed'],
      director: type[i]["attribs"]['data-director'],
      director: type[i]["attribs"]['data-director'],
      actors: type[i]["attribs"]['data-actors'],
      link: httpComplete($('#' + type[i]["attribs"]['id'] + " a")[0].attribs.href),
      img: httpComplete($('#' + type[i]["attribs"]['id'] + " img")[0].attribs.src),
    }
    courseData.push(obj);
  }
  var result = {
    NowPlaying: courseData
  }
  return result;
}
//解析正在上映的电影


var flag = 1;
function getHTML(url, caller, type, fn) {
  if (flag != 1) {
    send(caller, "网络错误！ --->网络请求忙！");
    console.error("\n\n" + new Date().toLocaleString() + "        短时间大量请求!\ntype: " + type + "\t\turl: " + url)
    return;
  }
  flag = 0;
  setTimeout(function () { flag = 1 }, 1000);
  var timer = setTimeout(function () {
    send(caller, "网络错误！ --->无法访问指定的url");
    console.error("\n\n" + new Date().toLocaleString() + "        网络超时!\ntype: " + type + "\t\turl: " + url)
  }, 4000)

  http.get(url, function (res) {
    var chunks = [];
    var size = 0;

    res.on('data', function (chunk) {   //监听事件 传输
      chunks.push(chunk);
      size += chunk.length;
    });
    res.on('end', function () {  //数据传输完
      var data = Buffer.concat(chunks, size); //返回一个合并了 list 中所有 Buffer 的新 Buffer
      var html = data.toString();
      try {
        var back = fn(html, url);
        var flag = 1;
      } catch (e) {
        clearTimeout(timer);
        console.error("\n\n" + new Date().toLocaleString() + "        解析错误!\ntype: " + type + "\t\turl: " + url);
        console.error(e);//抛出错误信息
        send(caller, "解析错误！ --->url与解析模式不匹配");
      }
      if (flag) {
        clearTimeout(timer);
        send(caller, JSON.stringify(back));
      }
    })

  }).on('error', function () {
    clearTimeout(timer);
    send(caller, "网络错误！ --->无法访问指定的url");
  })
}
//获取HTML页面
function send(caller, message) {
  caller.setHeader("Content-type", "text/plain;charset=utf-8")
  caller.write(message);
  caller.end();
}
//返回爬取数据
function extraction(letter) {
  var arr = letter.split(/\s/g);
  var str = "";
  for (each in arr) {
    if (arr[each] != "") {
      str = str + arr[each];
    }
  }
  return str;

}
//字符串解析
function timeExtraction(letter) {
  letter = extraction(letter);
  var arr = letter.split(/[年月日]/g);
  if (arr.length == 4) {
    var time = {
      year: parseInt(arr[0]),
      month: parseInt(arr[1]),
      day: parseInt(arr[2]),
    }
    return time;
  }
  else if (arr.length == 2) {
    var time = {
      year: parseInt(new Date().getFullYear()),
      month: parseInt(arr[0]),
      day: -1,
    }
    return time;
  } else {
    if (arr[0].length == 2) {
      var time = {
        year: parseInt(new Date().getFullYear()),
        month: parseInt(arr[0]),
        day: parseInt(arr[1]),
      }
      return time;
    } else {
      var time = {
        year: parseInt(arr[0]),
        month: parseInt(arr[1]),
        day: -1,
      }
      return time;
    }
  }
}
//电影时期解析
function findPosition($, link) {
  return $(link);
}
//定位电影元素
function attrbite($, link) {
  var str = "";
  var event = findPosition($, link);
  for (var i = 0; i < event.length; i++) {
    str = str + "/" + event[i].children[0].data;
  }
  return str.substr(1);

}
//根据元素属性选择，将标签内容进行“/”拼接
function sub(letter, first, end) {
  long = letter.length;
  return letter.substring(first - 1, long - end);
}
//字符串切割
function httpComplete(letter) {
  var reg = /http/g
  if (reg.test(letter)) {
    return letter;
  } else {
    return "https://movie.douban.com" + letter;
  }
}
//补全http域名
