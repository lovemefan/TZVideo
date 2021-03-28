<img src="http://pan-lovemefan.oss-cn-shenzhen.aliyuncs.com/blog/20201019/170546203.png" alt="mark" style="zoom:80%;" />
<br>

# TZVideo（豆瓣接口暂时挂了,正在解决）

TZVideo你的追剧小助手
TZVideo属于第三方信息收集工具,仅提供第三方资源网站的搜索收集,本微信小程序仅供作者测试和学习使用,内部所有资源都来着第三方资源网站
感谢colorUI的作者,本小程序UI均采用ColorUI的css库.该项目是开源的，不收取任何费用，如果这个项目有帮到你，或者你觉得很赞，可以在GitHu支持一下！

由于这是作者第一个微信小程序,本人代码水平也有限,欢迎指出不足的地方

[项目文档 2021.03.28](https://docs.apipost.cn/view/fe20d74e59e21501#4189494)
## 主要原理

首先通过豆瓣查询影片信息,然后通过相关接口(后面附上)和爬虫提取直链

## 反向代理服务器

由于豆瓣检测到微信小程序发送的请求的话,豆瓣会拒绝提供服务,而小程序是无法更改user-agent的,

本人使用nginx的反向代理解决这个问题

配置文件如下:

```bash
events {
    worker_connections  1024;
}
http{
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
	server {
	  listen 80;
	  listen [::]:80;

	  server_name douban.lovemefan.com;

	  access_log /var/log/nginx/douban.com-access.log;
	  error_log /var/log/nginx/douban.com-error.log;

	  location / {
		root /var/www/lovemefan;
	  }

	  location /api {
		# 问题核心在这里
		proxy_set_header Referer "https://www.douban.com";
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header User-Agent  "Mozilla/5.0 (Linux; Android 9;ELE-AL00 Build/HUAWEIELE-AL0001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/67.0.3396.87 XWEB/1168 MMWEBSDK/191201 Mobile Safari/537.36 MMWEBID/873 MicroMessenger/7.0.10.1580(0x27000AFE) Process/tools NetType/WIFI Language/zh_CN ABI/arm64";
		proxy_redirect off;
		proxy_pass  http://frodo.douban.com;
	  }
	}

	server {
	  listen 443 ssl;
	  listen [::]:443 ssl;

	  server_name douban.lovemefan.com;

	  ssl on;
	  ssl_certificate /home/ubuntu/3748746_douban.lovemefan.top.pem;
	  ssl_certificate_key /home/ubuntu/3748746_douban.lovemefan.top.key;
	  ssl_session_timeout 5m;
	  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	  ssl_prefer_server_ciphers on;

	  access_log /var/log/nginx/douban.uieee.com-access.log;
	  error_log /var/log/nginx/douban.uieee.com-error.log;

	  location / {
		root /var/www/lovemefan;
	  }

	  location /api {
		# 问题核心在这里
		proxy_set_header Referer "https://www.douban.com";
		proxy_set_header User-Agent "Mozilla/5.0 (Linux; Android 9; ELE-AL00 Build/HUAWEIELE-AL0001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/67.0.3396.87 XWEB/1168 MMWEBSDK/191201 Mobile Safari/537.36 MMWEBID/873 MicroMessenger/7.0.10.1580(0x27000AFE) Process/tools NetType/WIFI Language/zh_CN ABI/arm64";
		proxy_set_header X-Real-IP $remote_addr;
		proxy_redirect off;
		proxy_pass http://frodo.douban.com;
	  }
	  location /api-okzy {
		# 问题核心在这里
		proxy_set_header Referer "https://www.douban.com";
		proxy_set_header User-Agent "Mozilla/5.0 (Linux; Android 9; ELE-AL00 Build/HUAWEIELE-AL0001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/67.0.3396.87 XWEB/1168 MMWEBSDK/191201 Mobile Safari/537.36 MMWEBID/873 MicroMessenger/7.0.10.1580(0x27000AFE) Process/tools NetType/WIFI Language/zh_CN ABI/arm64";
		proxy_set_header X-Real-IP $remote_addr;
		proxy_redirect off;
		proxy_pass https://api.okzy.tv/api.php/provide/vod/at/json/;
	  }
	}
}

```





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


