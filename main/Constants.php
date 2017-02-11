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
            'mp4hd' => 1,
            'mp4hd2' => 2,
            'mp4hd3' => 3,
            "3gphd" => 0,
            "3gp" => 0
        );
    }

    public static function getHdName()
    {
        return array('flv' => "flv",
            'mp4hd' => "mp4",
            'mp4hd2' => "flv",
            'mp4hd3' => "flv",
            "3gphd" => "mp4",
            "3gp" => "flv",
            'flvhd' => "flv",
        );
    }


}

