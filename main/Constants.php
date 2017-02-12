<?php

/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017/2/11
 * Time: 16:03
 */
class Constants
{

    public static function getUserCache()
    {
        return array(
            'a1' => "4",
            'a2' => "1"
        );
    }

    public static function getMk()
    {
        return array("a3" => "b4et", "a4" => "boa4");
    }

    public static function getHd()
    {
        return array(
            'flv' => 0,
            'flvhd' => 0,
            'mp4hd' => 1,
            'mp4hd2' => 2,
            'mp4hd3' => 3,
            "3gphd" => 0,
            "3gp" => 0
        );
    }

    public static function getHdName()
    {
        return array(
            'flv' => "flv",
            'mp4hd' => "mp4",
            'mp4hd2' => "flv",
            'mp4hd3' => "flv",
            "3gphd" => "mp4",
            "3gp" => "flv",
            'flvhd' => "flv",
        );
    }

    const UserAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36";

    const Host = "play-ali.youku.com";

    //根据需要修改,需要正确的cookies才能解析正确的sid和token
    const Cookie = "cna=dz3oD4rmeyECAcponcLuty/n; __ali=148680349353177q; __aliCount=1; __ysuid=1486888912489GInpI1; __ayft=1486888912923; __aysid=1486803490209cip; __arpvid=1486888912924pS9jYx-1486888912936; __arycid=; __ayscnt=1; __arcms=; __aypstp=1; __ayspstp=29; __ayvstp=1; __aysvstp=17; rpvid=1486888913051K9Uyf7-1486889197716";
}

