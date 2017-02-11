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
$vid = "XMTQyODc1MzcyMA==";


require_once "class/VideoInfo.php";
$videoInfo = new VideoInfo($vid);

$streams = $videoInfo->getStreams();
$urls = $videoInfo->getVideoSrcs($streams[0]);

echo "<a target='_blank' href='{$urls[0]}'>打开视频</a>";

//print_r($url);
