(function(factory) {
    var isBrowser = typeof window === "object",
        chai, core;
    if (isBrowser) {
        chai = window.chai;
        factory(chai.assert, window.VideoUrlParser, window.VideoProvider, window.VideoUrlParserUtil, window.cnVideoUrlParser, true);
    } else {
        chai = require("chai");
        core = require("../src/video-url-parser.js");
        factory(chai.assert, core.VideoUrlParser, core.VideoProvider, core.util, require("../src/cn-video-url-parser.js"), false);
    }
})(function(assert, VideoUrlParser, VideoProvider, util, cnVideoUrlParser, isBrowser) {
    function tester() {
        describe("youku.com", function() {
            it("直接粘贴页面url", function() {
                var info = cnVideoUrlParser.parser("http://v.youku.com/v_show/id_XMTg3NjAyNzQ2MA==.html?f=28984933&spm=a2hww.20023042.m_223465.5~5~5~5!2~5~1~3!4~A&from=y1.3-idx-beta-1519-23042.223465.4-3");
                info = info[0];
                assert.equal(info.id, "XMTg3NjAyNzQ2MA==");
            });

            it("复制通用代码", function() {
                var info = cnVideoUrlParser.parser('<iframe height=498 width=510 src="http://player.youku.com/embed/XMTg3NjAyNzQ2MA==" frameborder=0 "allowfullscreen"></iframe>');
                info = info[0];
                assert.equal(info.id, "XMTg3NjAyNzQ2MA==");
            });

            it("复制flash地址", function() {
                var info = cnVideoUrlParser.parser("http://player.youku.com/player.php/Type/Folder/Fid//Ob//sid/XMTg3NjAyNzQ2MA==/v.swf");
                console.log(info);
                info = info[0];
                assert.equal(info.id, "XMTg3NjAyNzQ2MA==");
            });

            it("复制HTML代码=>embed", function() {
                var info = cnVideoUrlParser.parser('<embed src="http://player.youku.com/player.php/Type/Folder/Fid//Ob//sid/XMTg3NjAyNzQ2MA==/v.swf" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>');
                info = info[0];
                assert.equal(info.id, "XMTg3NjAyNzQ2MA==");
            });

            it("复制大段HTML代码", function() {
                var info = cnVideoUrlParser.parser('<div class="panel panel-share" id="panel_share" style="display: block;"><span class="pointer"><i class="icon icon-pointer"></i></span><div class="close" id="handle_share" title="关闭"><i class="ico-close"></i></div><div class="panel-con clearfix"><div class="p0"><ul><li class="first"><a href="/wechatShare/?beta&amp;url=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html?refer=pc-sns-1&amp;content=风就要来了！今夜起风雨将驱散多日雾霾" target="_blank" title="分享到微信"><i class="icon-fn-weixin-40"></i></a></li><li><a title="分享到QQ空间" charset="400-03-8" id="s_qq1" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html" target="_blank"><i class="icon-fn-qzone-40"></i></a></li><li><a title="分享到微博" charset="400-03-10" id="s_sina1" href="http://v.t.sina.com.cn/share/share.php?appkey=2684493555&amp;url=http%3A%2F%2Fv-wb.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html&amp;title=%E9%A3%8E%E5%B0%B1%E8%A6%81%E6%9D%A5%E4%BA%86%EF%BC%81%E4%BB%8A%E5%A4%9C%E8%B5%B7%E9%A3%8E%E9%9B%A8%E5%B0%86%E9%A9%B1%E6%95%A3%E5%A4%9A%E6%97%A5%E9%9B%BE%E9%9C%BE&amp;ralateUid=1642904381&amp;source=%E4%BC%98%E9%85%B7%E7%BD%91&amp;sourceUrl=http%3A%2F%2Fwww.youku.com%2F&amp;content=utf8&amp;searchPic=false" target="_blank"><i class="icon-fn-weibo-40"></i></a></li><li><a title="分享给QQ好友" id="s_qq_haoyou1" href="http://connect.qq.com/widget/shareqq/index.html?title=风就要来了！今夜起风雨将驱散多日雾霾&amp;url=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html%3Ftpa%3DdW5pb25faWQ9MTAzMjUyXzEwMDAwMV8wMV8wMQ+&amp;desc=在优酷上看见这条视频还不错哦：风就要来了！今夜起风雨将驱散多日雾霾&amp;pics=&amp;site=优酷" target="_blank"><i class="icon-fn-qq-40"></i></a></li><li><a title="分享到百度贴吧" charset="400-03-12" id="s_baidu1" href="http://tieba.baidu.com/f/commit/share/openShareApi?url=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html&amp;title=风就要来了！今夜起风雨将驱散多日雾霾&amp;desc=&amp;pic=" target="_blank"><i class="icon-fn-tieba-40"></i></a></li><li><a title="分享到腾讯微博" charset="400-03-16" id="s_qq_t1" href="http://v.t.qq.com/share/share.php?title=风就要来了！今夜起风雨将驱散多日雾霾&amp;url=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html&amp;appkey=e7ad0b0199994bda85ecc0a44ce9915f&amp;site=www.youku.com&amp;assname=youku2010" target="_blank"><i class="icon-fn-qqweibo-40"></i></a></li><li><a title="分享到人人网" charset="400-03-7" id="s_renren1" href="http://share.renren.com/share/buttonshare.do?link=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html" target="_blank"><i class="icon-fn-renren-40"></i></a></li><li><a title="分享到豆瓣" charset="400-03-17" id="s_douban1" href="http://www.douban.com/recommend/?url=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html&amp;title=风就要来了！今夜起风雨将驱散多日雾霾" target="_blank"><i class="icon-fn-douban-40"></i></a></li><li><a href="/yixinShare/?beta&amp;url=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTg3NjAyNzQ2MA%3D%3D.html&amp;content=风就要来了！今夜起风雨将驱散多日雾霾" target="_blank" title="分享到易信"><i class="icon-fn-yixin-40"></i></a></li></ul></div><div class="p1"><h4>把视频贴到Blog或BBS&nbsp;&nbsp;<a href="http://www.youku.com/help/view/fid/4#q2" target="_blank">怎么贴?</a></h4><div class="tipinfo"><span class="ps-label">推荐</span>通用代码可以让你的视频在iPhone、iPad上播放！</div><div class="item"><span class="label">通用代码: </span><input id="link4" type="text" class="form_input form_input_s" value="<iframe height=498 width=510 src="http://player.youku.com/embed/XMTg3NjAyNzQ2MA==" frameborder=0 "allowfullscreen"></iframe>"><div class="form_btn form_btn_s form_btnsub_s"><span class="form_btn_text">复 制</span></div></div><div class="item"><span class="label">flash地址: </span><input type="text" class="form_input form_input_s" id="link2" value="http://player.youku.com/player.php/Type/Folder/Fid//Ob//sid/XMTg3NjAyNzQ2MA==/v.swf"><div class="form_btn form_btn_s form_btnsub_s"><span class="form_btn_text">复 制</span></div></div><div class="item"><span class="label">html代码: </span><input type="text" class="form_input form_input_s" id="link3" value="<embed src="http://player.youku.com/player.php/Type/Folder/Fid//Ob//sid/XMTg3NjAyNzQ2MA==/v.swf" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>"><div class="form_btn form_btn_s form_btnsub_s"><span class="form_btn_text">复 制</span></div></div><div class="share-item">分享视频到站外获取收益&nbsp;&nbsp;<a href="http://hz.youku.com/red/click.php?tp=1&amp;cp=4010780&amp;cpp=1000980&amp;url=http://cloud.youku.com/services/info?serid=8" target="_blank">查看详情</a></div></div><div class="p2"><p>手机扫码分享视频</p><p>二维码2小时内有效</p><div class="two-code" id="share_dimcode_pic"><img id="share_qrcode_img" src="//qr.youku.com/qr?sc=video_play&amp;ac=open&amp;ps={vid:"XMTg3NjAyNzQ2MA==",spot:1,tp:1,cp:0,cpp:100049}&amp;size=123"></div><div class="clear"></div></div></div></div>');
                assert.equal(info.length, 1);
                info = info[0];
                assert.equal(info.id, "XMTg3NjAyNzQ2MA==");
            });
        });
    }

    if (isBrowser) {
        describe("test video-url-parser.js", tester);
    } else {
        return tester();
    }
});