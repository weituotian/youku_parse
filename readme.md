尚在研究中,还未成功

//测试视频:  
http://m.youku.com/video/id_XMTQyODc1MzcyMA==.html?from=s7.8-1.2&spm=a2h0k.8191393.bodydiv.5!3~5!4~A  

//参考  
http://www.chhua.com/web-note5339  

//获取视频地址的接口2017/2/11  
//代码在http://static.youku.com/h5/player/embed/unifull/unifull_.js中  

相关:  
YKP.userCache{  
a1:"4"  
a2:"1"  
sid:"048677541290712f09e4e"  
token:"0539"  
} 

j = {  
flv: 0,  
flvhd: 0,  
mp4hd: 1,  
mp4hd2: 2,  
mp4hd3: 3,  
"3gphd": 0,  
"3gp": 0  
}  

l = {
flv: "flv",
mp4hd: "mp4",
mp4hd2: "flv",
mp4hd3: "flv",
"3gphd": "mp4",
"3gp": "flv",
flvhd: "flv"
}

url:  
/player/getFlvPath/sid/+（YKP.userCache.sid + "_" + n分段,从0开始）+
"/st/" + （mp4） + "/fileid/" + (0300200100589DD73B9C87080D48DD7C70E103-2BE5-1CD4-262A-8358D4F07B36) + 
"?K=" + p + 
"&hd=" + (上面j的值) + 
"&myp=0&ts=" + （o，时长是一个值，单位秒） + 
"&ypp=0" + （q，"&ymovie=1"或者&ypremium=1）,
"&ep=" + (加密算法),
"&ctype=12",
"&ev=1",
"&token=" + (YKP.userCache.token),
"&oip=" + (YK.v.data.security.ip,可以不写),
(f ? "/password/" + f : "") 可以不写
(g ? g : ""),可以不写

ep加密算法
t = encodeURIComponent(encode64(rc4(translate(YK.mk.a4 + "poz" + YKP.userCache.a2, s).toString(), YKP.userCache.sid + "_" + e + "_" + YKP.userCache.token)));
s = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26],
YK.mk.a4固定为boa4

YK.mk.a4 + "poz" + YKP.userCache.a2
= "boa4poz1"
translate(YK.mk.a4 + "poz" + YKP.userCache.a2, s)
= "bf7e5f01"

YKP.userCache.sid + "_" + e + "_" + YKP.userCache.token
"048677541290712f09e4e_0300200100589DD73B9C87080D48DD7C70E103-2BE5-1CD4-262A-8358D4F07B36_0539"

rc4:
"r&NSÊç*ß?1,ë!sZ\þ	öÒc

encode64
"ciacHE6KU8oB5yrfjz8bMSzrIXNaXP4J9h+HgdJjALshQOHL7TnStZTDRvhCHvltdipyZOyCrNCSa0AXYfIx3G0Q3j3cPfri+PKS5aVQwZh0Ym82db/UslSeRjP4"

urlencode
"ciacHE6KU8oB5yrfjz8bMSzrIXNaXP4J9h%2BHgdJjALshQOHL7TnStZTDRvhCHvltdipyZOyCrNCSa0AXYfIx3G0Q3j3cPfri%2BPKS5aVQwZh0Ym82db%2FUslSeRjP4"
