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
if ($vid != "") {
    require_once "class/VideoInfo.php";
    $videoInfo = new VideoInfo($vid);

    $streams = $videoInfo->getStreams();

    foreach ($streams as $stream) {
        if ($stream->stream_type == "3gphd") {//取3gphd流的视频
            $urls = $videoInfo->getVideoSrcs($stream);
            break;
        }
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

        <? foreach ($urls as $url): ?>
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title"></h3>
                </div>
                <div class="panel-body">
                    <div class="col-sm-12 text-center">
                        <video src="<?php echo $url; ?>" controls></video>
                    </div>
                </div>
            </div>
        <? endforeach; ?>

    </div>

</div><!-- /.container -->

<script src="//cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
<script src="//cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>


</body>
</html>
