<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/23
 * Time: 9:18
 */

require_once "YoukuVideo.php";

$vid = isset($_GET['vid']) ? $_GET['vid'] : "";
$streams = array();

if ($vid != "") {

    $youkuVideo = new YoukuVideo($vid);
    $json = $youkuVideo->get_json();
//    var_dump($json['data']);
    $streams = $json['data']['stream'];

}

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>优酷视频info</title>

    <!-- Bootstrap core CSS -->
    <link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">

</head>
<body>

<div class="container">

    <form action="" method="get" class="form-horizontal" role="form">

        <div class="form-group">
            <label for="" class="col-sm-2 control-label">优酷视频id</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" name="vid" id="source" value="<?php echo $vid; ?>"
                       placeholder="XMTQyODc1MzcyMA==">
            </div>
            <div class="col-sm-2">
                <button type="submit" class="btn btn-primary" id="query">查询</button>
            </div>
        </div>

    </form>

    <div class="row">

        <? foreach ($streams as $stream): ?>
            <div class="table-responsive">
                <h4>流类型:<?php echo $stream['stream_type'] ?> 宽:<?php echo $stream['width'] ?>
                    高:<?php echo $stream['height'] ?></h4>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>url</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($stream['segs'] as $url) {
                        echo "<tr><td>";
                        $show_url = substr($url['cdn_url'], 0, 100) . "...";
                        echo "<a href='{$url['cdn_url']}' target='_blank'>{$show_url}</a>";
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
