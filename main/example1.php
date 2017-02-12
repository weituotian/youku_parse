<?php
/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017/2/12
 * Time: 10:11
 */

include_once "Constants.php";
define('BASE_PATH', str_replace('\\', '/', realpath(dirname(__FILE__) . '/')) . "/");


$vid = isset($_GET['vid']) ? $_GET['vid'] : "";
$streams = array();
if ($vid != "") {
    require_once "class/VideoInfo.php";
    $videoInfo = new VideoInfo($vid);

    $streams = $videoInfo->getStreams();
    foreach ($streams as $stream) {
        $stream->urls = $videoInfo->getVideoSrcs($stream);
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
            <label for="" class="col-sm-2 control-label">优酷视频id</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" name="vid" id="source" value="XMTQyODc1MzcyMA==">
            </div>
            <div class="col-sm-2">
                <button type="submit" class="btn btn-primary" id="query">查询</button>
            </div>
        </div>

    </form>

    <div class="row">

        <? foreach ($streams as $stream): ?>
            <div class="table-responsive">
                <h4>流类型:<?php echo $stream->stream_type?> 宽:<?php echo $stream->width?> 高:<?php echo $stream->height?></h4>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>url</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($stream->urls as $url) {
                        echo "<tr><td>";
                        $show_url = substr($url, 0, 100)."...";
                        echo "<a href='{$url}' target='_blank'>{$show_url}</a>";
                        echo "</td></tr>";
                    } ?>
                    </tbody>
                </table>
            </div>
        <? endforeach; ?>

    </div>

</div><!-- /.container -->

<script src="//cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
<script src="//cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>


</body>
</html>
