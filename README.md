<img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/170546203.png" alt="mark" style="zoom:80%;" />
<br>

# TZVideo
> 截至202104020豆瓣接口通过后端模拟手机请求已恢复使用，后续将完善接口文档

TZVideo你的追剧小助手
TZVideo属于第三方信息收集工具,仅提供第三方资源网站的搜索收集,本微信小程序仅供作者测试和学习使用,内部所有资源都来着第三方资源网站
感谢colorUI的作者,本小程序UI均采用ColorUI的css库.该项目是开源的，不收取任何费用，如果这个项目有帮到你，或者你觉得很赞，可以在GitHub支持并star！
由于这是作者第一个微信小程序,本人代码水平也有限,欢迎指出不足的地方

前端为微信小程序

后端使用spring boot搭建，模拟安卓客户端请求，绕过豆瓣接口限制。

## 后端部署
在Releases 中下载好backend-0.0.1.jar后运行
默认监听localhost:8080

```bash
# java 1.8
java -jar backend-0.0.1.jar
```
如果还想用于微信小程序开发，还配置需要域名，以及https证书
如果你不想折腾可以使用我的接口：https://douban.lovemefan.top

请不要过分滥用此接口，学生个人开发者不易。
此接口只提供小程序中所使用的接口，如果由其他豆瓣接口需求，可以自己修改后端，或者提issue。

[项目及api文档 2021.04.23（持续完善）](https://docs.apipost.cn/view/370d5c9238dd67ef)

豆瓣反编译破解以及后端代码借鉴于[DoubanAPI](https://github.com/bestyize/DoubanAPI)项目
## 小程序上线问题
由于小程序限制，线上版本无法播放视频

目前是体验版内部使用，体验版可以体验完整功能，适合内部使用，感兴趣的朋友可以自行部署，有什么问题尽管提交issues。


![ercode](https://raw.githubusercontent.com/lovemefan/TZVideo/TZVideo2.0/frontend/images/ercode.jpg)
## 主要原理

首先通过豆瓣查询影片信息,然后通过相关接口(后面附上)和爬虫提取直链
由于豆瓣检测到微信小程序发送的请求的话,豆瓣会拒绝提供服务,并且小程序是无法更改user-agent的,
微信小程序端也是使用不了豆瓣的域名的
本人通过后端模拟手机请求并提供接口绕过了微信与豆瓣的检测




## UI及功能

![home](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/home.png)
![palylit](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/playlist.png)
![hot_dm](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/hot_dm.png)
![hot_movie](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/hot_movie.png)
![hot_tv](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/hot_tv.png)
![hot_zy](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/hot_zy.png)
![movie_info](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/movie_info.png)
![recommend](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/recommend.png)
![play](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/play.png)
![my](https://github.com/lovemefan/TZVideo/raw/TZVideo2.0/pictures/my.png)

## 功能预期



**五大模块**

- [x] 首页 有片单,热剧,电影,综艺,动漫推荐 (豆瓣获取)

- [x] 分类功能

- [x] 搜索 先搜豆瓣,后搜资源

- [ ] 我的   收藏(保存收藏)和历史记录

- [x] 资源更新信息  从ok资源网爬取 

## 资源网站收集
1.  [ok资源网](https://www.okzyw.com)
2.  [酷云资源网](http://www.kuyunzyw.tv)
3.  [最大资源网](http://www.zuidazy2.net)
4.  [看看资源网](http://www.kuyunzyw.tv)
5.  [哈酷资源网](http://www.666zy.com)
6.  [605资源网](http://www.765zy.com)
7.  [最新资源网](http://www.zuixinzy.cc)
8.  [速播资源网](https://www.subo8988.com)
9.  [百万资源网](http://www.baiwanzy.com)
10.  [云站资源网](http://www.zy.itono.cn)
11.  [酷云资源网](http://www.123ku.com)
12.  [极快资源网](https://www.jikzy.com)
13.  [高清资源网](http://www.gaoqingzy.com)
14.  [卧龙资源网](http://www.wolongzy.net)
15.  [超快资源网](http://265zy.cc)
16.  [麻花资源网](http://www.mahuazy.net)
17.  [永久资源网](http://www.yongjiuzy1.com)
18.  [158资源网](http://www.158zyz.com)
19.  [牛牛资源网](http://niuniuzy.com)
20.  [1156资源网](http://www.1156zy.net)
21.  [飘花资源网](https://www.xinpianzy.com)
22.  [酷播资源网](http://www.kubozy.net)
23.  [摩卡资源网](https://mokazy.com)
24.  [1886资源网](http://www.1886zy.net)
25.  [豆瓣资源网](http://douban666.com)
26.  [135资源网](http://135zy0.com)
27.  [123资源网](http://www.123ku.com)
28.  [极快资源网](https://www.jikzy.com)
29.  [398资源网](https://398zyz.com)
30.  [八戒资源网](http://bajiezy.cc)
31.  [158资源网](http://www.158zyz.com)
32.  [88资源网](http://www.88zyw.net)


