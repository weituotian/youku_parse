<?php
/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017/2/11
 * Time: 13:30
 */
header("Content-Type: text/html; charset=UTF-8");

include_once "Constants.php";
define('BASE_PATH', str_replace('\\', '/', realpath(dirname(__FILE__) . '/')) . "/");


//视频id
//$vid = "XMTQyODc1MzcyMA==";
//$vid = "XMTg5MzgyOTAxMg==";
$vid = "XMTczMzE5MTkwMA==";
//$vid = "XMjQ5Mzk2NDE1Ng==";
//$vid = "XMjUwNzI4MDA3Mg==";


require_once "class/VideoInfo.php";
$videoInfo = new VideoInfo($vid);


$streams = $videoInfo->getStreams();

$urls = array();
foreach ($streams as $stream){
    if ($stream->stream_type=="3gphd") {//取flvhd流的视频
        $urls = $videoInfo->getVideoSrcs($stream);
        break;
    }
}

foreach ($urls as $url){
    echo "<a target='_blank' href='{$url}'>打开视频</a><br>";
}

//print_r($url);
