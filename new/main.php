<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/22
 * Time: 14:33
 */

// header('Content-Type', 'content="text/html; charset=utf-8"');
echo '<meta charset="utf-8">';

require_once "YoukuVideo.php";
$youkuVideo = new YoukuVideo('XMzQ3ODQ0OTA2MA==');

echo "<br>";
echo "finish!";