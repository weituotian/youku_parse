<?php
/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017-02-11
 * Time: 11:15
 */


$userCache = array(
    'a1' => "4",
    'a2' => "1",
    'sid' => "048677541290712f09e4e",
    'token' => "0539"
);

$url = "//k.youku.com/player/getFlvPath/sid/";

$urlx = "http://k.youku.com/player/getFlvPath/sid/04867837197411251505b_00/st/mp4/fileid/0300080100568215A86DB72AB1FA46511ACB75-7464-2576-670C-FCC3FFA9D490?K=d721f417d7ea507a2412e7ca&sign=7e0c51be35bf16bb3996238c96e37243&hd=1&myp=0&ts=206.292&ypp=0&ep=ciacHE6FVckB7CTbiT8bYi3ndHJdXP4J9h%2BFidJjALshTuC9mDugz5vEPPhAZ4sYBFMCFu7wqqGUGEcRYfdHr2wQ3UuvP%2Frm%2BfCQ5dsgt5N2EGg%2FBsnetFSeRjD4&ctype=12&ev=1&token=0509&oip=1900652190";


/*require_once '../Requests-master/library/Requests.php';

Requests::register_autoloader();

$request = Requests::get($urlx, array("Accept" => "*"));
var_dump($request->headers);*/

//初始化
$ch = curl_init();

//设置选项，包括URL
curl_setopt($ch, CURLOPT_URL, $urlx);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// 返回 response_header, 该选项非常重要,如果不为 true, 只会获得响应的正文
curl_setopt($ch, CURLOPT_HEADER, true);
// 是否不需要响应的正文,为了节省带宽及时间,在只需要响应头的情况下可以不要正文
curl_setopt($ch, CURLOPT_NOBODY, true);

//执行并获取HTML文档内容
$output = curl_exec($ch);

$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);


//释放curl句柄
curl_close($ch);

//打印获得的数据
//print_r($output);
$header = substr($output, 0, $headerSize);

//如果我们想获得 Location  项的内容，可以先把上面头正文件按回车换行切割成数组，然后再遍历匹配，如：
$headArr = explode("\r\n", $header);

foreach ($headArr as $loop) {
    if (strpos($loop, "Location") !== false) {
        $edengUrl = trim(substr($loop, 10));
        print_r($edengUrl);
// 输出: http://www.edeng.cn/s/chuna/
    }
}

