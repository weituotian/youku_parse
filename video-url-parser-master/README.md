# video-url-parser
解析Youtube，Youku，Tudou，iQiyi，Souhu，QQ，Sina，LeTV等视频网站的url，得到视频的id等源信息；同时可以根据得到的源信息创建不同格式的播放链接。

[![Build Status](https://travis-ci.org/imingyu/video-url-parser.svg?branch=master)](https://travis-ci.org/imingyu/video-url-parser)
[![image](https://img.shields.io/npm/v/video-url-parser.svg)](https://www.npmjs.com/package/video-url-parser)
[![image](https://img.shields.io/npm/dt/video-url-parser.svg)](https://www.npmjs.com/package/video-url-parser)

目前解析服务对视频网站的支持情况：
<table style="font-family:Microsoft Yahei;">
    <thead>
        <tr>
            <th colspan="5">中国（CN）</th>
        </tr>
        <tr>
            <th>网站</th>
            <th>网址</th>
            <th>支持状态</th>
            <th>解析器</th>
            <th>更新日期</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>优酷（Youku）</td>
            <td>www.youku.com</td>
            <td>已支持</td>
            <td>
                <p>video-provider-youku.com</p>
                <a href="https://www.npmjs.com/package/video-provider-youku.com" title="NPM Version">
                    <img src="https://img.shields.io/npm/v/video-provider-youku.com.svg" alt="NPM Version">
                </a>
                <a href="https://www.npmjs.com/package/video-provider-youku.com" title="NPM Downloads">
                    <img src="https://img.shields.io/npm/dt/video-provider-youku.com.svg" alt="NPM Downloads">
                </a>
            </td>
            <td>2016/12/22</td>
        </tr>
        <tr>
            <td>土豆、56、乐视、腾讯、搜狐、i奇艺、新浪等</td>
            <td>--</td>
            <td>开发中</td>
            <td>--</td>
            <td>--</td>
        </tr>
    </tbody>
</table>


安装
===
```
npm install video-url-parser
```

使用
===
使用可以解析中国区视频网站的解析器
---
```javascript

var cnVideoUrlParser = require("video-url-parser").cnVideoUrlParser;

//解析一个url
cnVideoUrlParser.parser("http://v.youku.com/v_show/id_XMTg4ODE3NDYwOA==.html");
//[ { "id":"XMTg4ODE3NDYwOA==", "provider":{ "host":"youku.com", ...} } ]

//解析一段字符串中包含的视频信息
var str='播放 <a href="http://v.youku.com/v_show/id_XMTg4ODE3NDYwOA==.html">放弃我，抓紧我</a><br />播放 <a href="http://v.youku.com/v_show/id_XMTg3OTgwODE0NA==.html">飞到又见飞刀</a><br />';

cnVideoUrlParser.parser(str);
/*[
    { "id":"XMTg4ODE3NDYwOA==", "provider":{ "host":"youku.com", ...} }, 
    { "id":"XMTg3OTgwODE0NA==", "provider":{ "host":"youku.com", ...} } 
]*/

//根据视频源信息创建播放URL
cnVideoUrlParser.create({
    provider: "youku.com",
    id: "XMTg4ODE3NDYwOA==",
    params: {
        from: "github"
    }
});// http://player.youku.com/embed/XMTg4ODE3NDYwOA==?from=github

```


自定义解析器
---
> 下面的示例演示了如何创建一个自定义解析器并使用它，这会让你了解`video-url-parser`包的运行机制。

```javascript
var vup = require("video-url-parser"),
    VideoUrlParser = vup.VideoUrlParser,
    VideoProvider = vup.VideoProvider,
    util = vup.util;

//创建一个解析器
var parser = new VideoUrlParser("我的视频URL解析器");

//像解析器中添加一个VideoProvider实例，负责对特定URL的解析
parser.addProvider(new VideoProvider({
    host: "xxx.com", //唯一
    hostMatch: function(source) {
        if (/xxx.com/.test(source)) {
            return this.host;
        }
    },
    parser: function(source) {
        source = source + "";
        var provider = JSON.parse(JSON.stringify(this));
        return [{
            provider: provider,
            id: "1"
        }];
    },
    create: function(videoInfo) {
        return "http://" + this.host + "/play/" + videoInfo.id + ".html";
    }
}));

var videoInfo = parser.parser("http://xxx.com/123");
console.log(videoInfo); //[ { provider: { host: 'xxx.com' }, id: '1' } ]

var url = parser.create(videoInfo[0]);
console.log(url); //http://xxx.com/play/1.html

```

文件说明
---
- `src/video-url-parser.js`提供核心功能：`VideoUrlParser`（URL解析器类），`VideoProvider`（视频供应商类）和`util`（工具函数），`VideoUrlParser`实例可以包括多个`VideoProvider`实例；
- `src/cn-video-url-parser.js`提供中国区的视频网站URL解析。