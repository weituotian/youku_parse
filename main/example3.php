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
$vid = "";

$url = isset($_GET['url']) ? $_GET['url'] : "";
if ($url != "") {
    $regex = "/.*?id_(.*)?\.html\?.*?/i";
    if (preg_match($regex, $url, $matches)) {
        $vid = $matches[1];
        var_dump($vid);
    }
}

$urls = array();
$curStream = null;
if ($vid != "") {
    require_once "class/VideoInfo.php";
    $videoInfo = new VideoInfo($vid);

    $streams = $videoInfo->getStreams();

    foreach ($streams as $stream) {
        if ($stream->stream_type == "mp4hd") {//优先解析MP4hd
            $urls = $videoInfo->getVideoSrcs($stream);
            $curStream = $stream;
            break;
        }
        /*if ($stream->stream_type == "3gphd") {//取3gphd流的视频
            $urls = $videoInfo->getVideoSrcs($stream);
            $curStream = $stream;
            break;
        }*/
    }

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--<link rel="icon" href="../../favicon.ico">-->

    <title>优酷视频解析</title>

    <!-- Bootstrap core CSS -->
    <link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">

    <link href="VideoJs_ie6/css/video-js.min.css" rel="stylesheet">
</head>
<body>

<div class="container">

    <form action="" method="get" class="form-horizontal" role="form">

        <div class="form-group">
            <label for="source" class="col-sm-2 control-label">优酷视频url</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" name="url" id="source" value="<?php echo $url; ?>">
            </div>
            <div class="col-sm-2">
                <button type="submit" class="btn btn-primary" id="query">解析</button>
            </div>
        </div>

    </form>

    <div class="row">

        <!--        --><? // foreach ($urls as $url): ?>
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title"></h3>
            </div>
            <div class="panel-body">
                <div class="col-sm-12 text-center">
                    <video id="myvideo" class="video-js vjs-default-skin"
                           controls preload="auto"></video>
                </div>
            </div>
        </div>
        <!--        --><? // endforeach; ?>

    </div>

</div><!-- /.container -->

<script src="//cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
<script src="//cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

<script src="VideoJs_ie6/js/video.min.js"></script>
<script src="VideoJs_ie6/js/videojs-segment.js"></script>
<script>

    <?php if ($curStream != null):?>
    var player = videojs("myvideo", {
        plugins: {
            segment: {}
        }
    });

    player.src([
        <?php
        for ($index = 0; $index < count($urls); $index++) {
        if ($index != 0) {
        echo ',';
        }
        $second = $curStream->segs[$index]->total_milliseconds_video / 1000;
        echo '{';
        echo "src:'{$urls[$index]}',seconds:{$second}";
        echo '}';
        }
        ?>
    ]);

    <?endif;?>

    /*{
     src: 'http://k.youku.com/player/getFlvPath/sid/04869754079431249245c_0/st/mp4/fileid/030008020058792D98CF4D14A45C8B12DB54FC-59D9-AD12-AF37-39AE9513B695?K=9e1646657ff1aef72412e86a&sign=9f4515429488a554dae89f4b8361640f&hd=1&myp=0&ts=768.835&ypp=0&ep=ciacHECKU8oA4irbiz8bYyXgcHJcXP4J9h%2BFidJgALshQO%2B2m0rYz%2B7GSotDEogdd1EOYurz36LibjZnYfVK3WEQrjqpO%2FqRiPPk5a5ateUJYxg1AMvesVSeRjH4&ctype=12&ev=1&token=0519&oip=1900652190',
     seconds: 46
     },
     {
     src: 'http://k.youku.com/player/getFlvPath/sid/04869754079431249245c_1/st/mp4/fileid/030008020158792D98CF4D14A45C8B12DB54FC-59D9-AD12-AF37-39AE9513B695?K=5aee929ceda10be1282c1e4d&sign=1cd7fc57f010fa47ae741f961f03190f&hd=1&myp=0&ts=768.835&ypp=0&ep=ciacHECKU8oA4irbiz8bYyXgcHJcXP4J9h%2BFidJgALohQO%2B2m0rYz%2B7GSotDEogdd1EOYurz36LibjZnYfVK3WEQrjqpO%2FqRiPPk5a5ateUJYxg1AMvesVSeRjH4&ctype=12&ev=1&token=0519&oip=1900652190',
     seconds: 596
     }*/
</script>

</body>
</html>
