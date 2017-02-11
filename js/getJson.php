<?php
/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017-02-11
 * Time: 10:43
 *
 *
 */

/*
 *
 * http://play-ali.youku.com/play/get.json?vid=XMTQyODc1MzcyMA==&ct=12&callback=BuildVideoInfo.response
 *
vid:XMTQyODc1MzcyMA==
ct:12
callback:BuildVideoInfo.response
 */

require_once '../Requests-master/library/Requests.php';

Requests::register_autoloader();

//PHP--获取响应头(Response Header)方法
//http://blog.sina.com.cn/s/blog_5f54f0be0102uvxu.html

$vid = "XMTQyODc1MzcyMA==";
$callback = "call";
$url = "http://play-ali.youku.com/play/get.json?vid={$vid}&ct=12&callback={$callback}";

// Now let's make a request!
$request = Requests::get($url, array("Accept" => "application/json"));

// Check what we received
//var_dump($request);

$body = $request->body;
var_dump($body);

$regex = "/{$callback}\((.*)\)/i";

if (preg_match($regex, $body,$matches)) {
    $json = $matches[1];
    $obj = json_decode($json);
    var_dump($obj);
}


