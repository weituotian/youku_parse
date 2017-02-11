<?php

/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017/2/11
 * Time: 15:33
 */
// 获取视频json 的url
//"http://play-ali.youku.com/play/get.json?vid=XMTQyODc1MzcyMA==&ct=12&callback=asd";

//PHP--获取响应头(Response Header)方法
//http://blog.sina.com.cn/s/blog_5f54f0be0102uvxu.html
class VideoInfo
{

    private $data;
    private $vid;
    private $sid;
    private $token;

    /**
     * VideoInfo constructor.
     * @param $vid
     */
    public function __construct($vid)
    {
        $this->vid = $vid;
        $this->InitData();
        $this->initSid_Token();
    }

    private function initSid_Token()
    {
        require_once "Ep.php";

        $arr = Ep::decode($this->data->security->encrypt_string);
        $this->sid = $arr[0];
        $this->token = $arr[1];
        var_dump($this->sid, $this->token);
    }

    private function InitData()
    {

        require_once BASE_PATH . "../Requests-master/library/Requests.php";

        Requests::register_autoloader();

        $callback = "call";
        $url = "http://play-ali.youku.com/play/get.json?vid={$this->vid}&ct=12&callback={$callback}";

        $request = Requests::get($url, array("Accept" => "application/json"));

        $body = $request->body;
        var_dump($body);

        $regex = "/{$callback}\((.*)\)/i";

        $obj = null;
        if (preg_match($regex, $body, $matches)) {
            $json = $matches[1];
            $obj = json_decode($json);
            $this->data = $obj->data;
        }
    }

    public function getVideoSrcs($stream)
    {
        require_once "Ep.php";
        /*
        $stream的结构:
        {
            audio_lang": "default",
            "milliseconds_video": 206292,
            "milliseconds_audio": 206611,
            "transfer_mode": "http",
            "segs": [
                {
                    "path": "http://k.youku.com/player/getFlvPath/sid/0486801808669125dd053_00/st/flv/fileid/0300010100568216926DB72AB1FA46511ACB75-7464-2576-670C-FCC3FFA9D490?k=7792ae9fa9899cd1261f826a&hd=2&myp=0&ts=207&sign=ca3049e450d76388216adffefef15758",
                    "size": "30994546",
                    "total_milliseconds_video": "206292",
                    "total_milliseconds_audio": "206611",
                    "key": "7792ae9fa9899cd1261f826a&sign=ca3049e450d76388216adffefef15758",
                    "fileid": "0300010100568216926DB72AB1FA46511ACB75-7464-2576-670C-FCC3FFA9D490"
                }
            ],
            "size": 30994546,
            "subtitle_lang": "default",
            "media_type": "standard",
            "drm_type": "default",
            "stream_type": "mp4hd2",
            "width": 1104,
            "logo": "youku",
            "height": 622
        }
        */
        $Hd = Constants::getHd();
        $hdName = Constants::getHdName();
        $videoUrls = array();



        $segs = $stream->segs;
        //遍历分段
        for ($index = 0; $index < count($segs);$index++) {
            $seg = $segs[$index];

            //基本url
            $url = "//k.youku.com/player/getFlvPath/sid/";
            $url .= $this->sid . '_' . dechex($index);
            $url .= '/st/'.$hdName[$stream->stream_type];
            $url .= '/fileid/';
            $url .= $seg->fileid;
            $url .= "?K=" . $seg->key;
            $url .= "&hd=" . $Hd[$stream->stream_type];//流类型
            $url .= "&myp=0&ts=" . ($stream->milliseconds_video / 1000);//总时间,单位s
            $url .= "&ypp=0" . "&ymovie=1"; // （"&ymovie=1"或者&ypremium=1）,
            $url .= "&ep=" . Ep::generate($this->sid, $seg->fileid, $this->token);//(加密算法),
            $url .= "&ctype=12";
            $url .= "&ev=1";
            $url .= "&token=" . $this->token;
            $url .= "&oip=" . $this->data->security->ip;

            $videoUrls[] = $url;
        }

        return $videoUrls;
    }

    public function getStreams()
    {
        return $this->data->stream;
    }

}

/*
返回的json实例

object(stdClass)[4]
  public 'cost' => float 0.013000000268221
  public 'data' =>
    object(stdClass)[1]
      public 'preview' =>
        object(stdClass)[7]
          public 'thumb' =>
            array (size=1)
              ...
          public 'timespan' => string '6000' (length=4)
      public 'security' =>
        object(stdClass)[8]
          public 'encrypt_string' => string 'NwXYSAoXL7jZ1PDD8+JxU4X2vUds1wjDWBs=' (length=36)
          public 'ip' => int 242476739
      public 'controller' =>
        object(stdClass)[9]
          public 'continuous' => boolean false
          public 'share_disable' => boolean false
          public 'download_disable' => boolean false
          public 'play_mode' => int 1
          public 'like_disabled' => boolean false
          public 'stream_mode' => int 1
          public 'circle' => boolean false
          public 'app_disable' => boolean false
          public 'html5_disable' => boolean false
          public 'video_capture' => boolean true
      public 'stream' =>
        array (size=4)
          0 =>
            object(stdClass)[10]
              ...
          1 =>
            object(stdClass)[12]
              ...
          2 =>
            object(stdClass)[14]
              ...
          3 =>
            object(stdClass)[16]
              ...
      public 'uploader' =>
        object(stdClass)[18]
          public 'uid' => string 'UMjg2NTIyODA1Ng==' (length=17)
          public 'reason' => string '吸引更多观众，为更多的关注做服务，打出自己的品牌！使自己的视频做的更好，更出色。' (length=120)
          public 'fan_count' => int 10905
          public 'avatar' =>
            object(stdClass)[19]
              ...
          public 'show_brand' => int 0
          public 'certification' => boolean true
          public 'username' => string '韦驮天车手' (length=15)
          public 'homepage' => string 'http://i.youku.com/u/UMjg2NTIyODA1Ng==' (length=38)
      public 'id' => int 357188430
      public 'video' =>
        object(stdClass)[20]
          public 'category_letter_id' => string 'f' (length=1)
          public 'img_hd' => string 'https://r1.ykimg.com/05420408568216A36A0A4F0472FB3531' (length=53)
          public 'upload' => string 'normal' (length=6)
          public 'privacy' => string 'anybody' (length=7)
          public 'source' => int 1
          public 'title' => string '【迪迦奥特曼MMD】迪迦来砸店了' (length=42)
          public 'restrict' => int 0
          public 'type' =>
            array (size=1)
              ...
          public 'userid' => int 716307014
          public 'encodeid' => string 'XMTQyODc1MzcyMA==' (length=17)
          public 'tags' =>
            array (size=7)
              ...
          public 'seconds' => string '206.00' (length=6)
          public 'category_id' => int 95
          public 'ctype' => string 'UGC' (length=3)
          public 'published_time' => string '2015-12-29 13:09:00' (length=19)
          public 'logo' => string 'https://r1.ykimg.com/05410408568216A36A0A4F0472FB3531' (length=53)
          public 'subcategories' =>
            array (size=1)
              ...
          public 'username' => string '韦驮天车手' (length=15)
      public 'user' =>
        object(stdClass)[22]
          public 'uid' => string '' (length=0)
      public 'network' =>
        object(stdClass)[23]
          public 'country_code' => string 'CN' (length=2)
          public 'area_code' => string '442000' (length=6)
          public 'dma_code' => string '4134' (length=4)
  public 'e' =>
    object(stdClass)[24]
      public 'code' => int 0
      public 'provider' => string 'hsfprovider' (length=11)
      public 'desc' => string '' (length=0)

 */