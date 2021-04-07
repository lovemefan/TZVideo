<img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/170546203.png" alt="mark" style="zoom:80%;" />
<br>

# TZVideo（豆瓣接口问题已解决）
> 截至20210404，豆瓣接口通过后端模拟手机请求已恢复使用，后续将完善接口文档

TZVideo你的追剧小助手
TZVideo属于第三方信息收集工具,仅提供第三方资源网站的搜索收集,本微信小程序仅供作者测试和学习使用,内部所有资源都来着第三方资源网站
感谢colorUI的作者,本小程序UI均采用ColorUI的css库.该项目是开源的，不收取任何费用，如果这个项目有帮到你，或者你觉得很赞，可以在GitHub支持一下！
由于这是作者第一个微信小程序,本人代码水平也有限,欢迎指出不足的地方
前端为微信小程序
后端使用spring boot搭建

[项目文档 2021.04.06](https://docs.apipost.cn/view/370d5c9238dd67ef)

豆瓣反编译破解以及后端代码借鉴于[DoubanAPI](https://github.com/bestyize/DoubanAPI)项目

## 主要原理

首先通过豆瓣查询影片信息,然后通过相关接口(后面附上)和爬虫提取直链
由于豆瓣检测到微信小程序发送的请求的话,豆瓣会拒绝提供服务,并且小程序是无法更改user-agent的,
微信小程序端也是使用不了豆瓣的域名的
本人通过后端模拟手机请求并提供接口绕过了微信与豆瓣的检测




## UI及功能

<img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/154039165.jpg" alt="mark" style="zoom: 50%;" /><img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/154124660.jpg" alt="mark" style="zoom:50%;" /><img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/154752201.jpg" alt="mark" style="zoom:50%;" />

<img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/154832377.jpg" alt="mark" style="zoom:50%;" /><img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/154848531.jpg" alt="mark" style="zoom:50%;" /><img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/155157640.png" alt="mark" style="zoom:50%;" />

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


