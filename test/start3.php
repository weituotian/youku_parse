<?php
/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017-02-10
 * Time: 17:11
 */
require_once '../Requests-master/library/Requests.php';

Requests::register_autoloader();

$url='http://v.youku.com/v_show/id_XMjUwNTE4MzIxMg==.html?f=29447392&spm=a2hww.20023042.m_223465.5~5~5~5!2~5~5~A&from=y1.3-idx-beta-1519-23042.223465.4-1';

// Now let's make a request!
$request = Requests::post('http://www.shokdown.com/parse.php', array(), array('url' => $url));

// Check what we received
//var_dump($request);

$body = $request->body;
var_dump($body, 1);
print_r($body);

