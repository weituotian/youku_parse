<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/22
 * Time: 17:33
 */

echo '<meta charset="utf-8">';

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://ups.youku.com/ups/get.json?vid=XMzQ3ODQ0OTA2MA%3D%3D&ccode=0502&client_ip=192.168.1.1&utid=2V06EwrKJjICAbczegzDzfoV&client_ts=" . intval(time())
        . "&ckey=DIl58SLFxFNndSV1GFNnMQVYkx1PP5tKe1siZu%2F86PR1u%2FWh1Ptd%2BWOZsHHWxysSfAOhNJpdVWsdVJNsfJ8Sxd8WKVvNfAS8aS8fAOzYARzPyPc3JvtnPHjTdKfESTdnuTW6ZPvk2pNDh4uFzotgdMEFkzQ5wZVXl2Pf1%2FY6hLK0OnCNxBj3%2Bnb0v72gZ6b0td%2BWOZsHHWxysSo%2F0y9D2K42SaB8Y%2F%2BaD2K42SaB8Y%2F%2BahU%2BWOZsHcrxysooUeND%20HTTP%2F1.1",
    CURLOPT_RETURNTRANSFER => true,

    CURLOPT_HEADER => true,
    CURLINFO_HEADER_OUT => true,

    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_SSLVERSION => 1,

    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
//    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_COOKIE => "__ysuid=" . intval(time()),
    CURLOPT_HTTPHEADER => array(
        "accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-encoding: gzip, deflate",
        "accept-language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3",
        "cache-control: no-cache",
        "connection: close",
        //"cookie: __ysuid=" . intval(time()),
        "Host: ups.youku.com",
        "Referer: http://v.youku.com",
        "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:38.0) Gecko/20100101 Firefox/38.0 Iceweasel/38.2.1"
    ),
));


$response = curl_exec($curl);

$curl_getinfo = curl_getinfo($curl);
// var_dump($curl_getinfo) ;
echo $curl_getinfo['request_header'];
echo "<br>";

$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}