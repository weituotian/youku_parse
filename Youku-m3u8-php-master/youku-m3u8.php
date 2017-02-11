<?php
header('Content-Type:text/plain');

function yk_e($a, $c){
	for ($f=0, $i, $e='', $h=0; 256 > $h; $h++) {
	$b[$h]=$h;
	}
	for ($h=0; 256 > $h; $h++) {
	$f=(($f + $b[$h]) + charCodeAt($a, $h % strlen($a))) % 256;
	$i=$b[$h];
	$b[$h]=$b[$f];
	$b[$f]=$i;
	}
	for ($q=($f=($h=0)); $q < strlen($c); $q++) {
	$h=($h + 1) % 256;
	$f=($f + $b[$h]) % 256;
	$i=$b[$h];
	$b[$h]=$b[$f];
	$b[$f]=$i;
	$e .= fromCharCode(charCodeAt($c, $q) ^ $b[($b[$h] + $b[$f]) % 256]);
	}
	return $e;
}
	
function fromCharCode($codes){
	if (is_scalar($codes)) {
	$codes=func_get_args();
	}
	$str='';
	foreach ($codes as $code) {
	$str .= chr($code);
	}
	return $str;
}

function charCodeAt($str, $index){
	$charCode=array();
	$key=md5($str);
	$index=$index + 1;
	if (isset($charCode[$key])) {
	return $charCode[$key][$index];
	}
	$charCode[$key]=unpack('C*', $str);
	return $charCode[$key][$index];
}

function charAt($str, $index=0){
	return substr($str, $index, 1);
}


if(!empty($_GET['vid'])){
	$vid=$_GET['vid'];
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_URL,'http://p.l.youku.com/ypvlog');
	curl_setopt($curl,CURLOPT_ENCODING, 'gzip,deflate');
	curl_setopt($curl,CURLOPT_HEADER,1);
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($curl,CURLOPT_TIMEOUT,10);
	$return=curl_exec($curl);
	$headerSize=curl_getinfo($curl, CURLINFO_HEADER_SIZE);
	curl_close($curl);
	$header=explode("\r\n",substr($return, 0, $headerSize));
	foreach($header as $headeritem){
		if(substr($headeritem,12,7)=='__ysuid')
		$ysuid=substr($headeritem,20);
	}
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_URL,'http://v.youku.com/v_show/id_'.$vid.'.html?x');
	curl_setopt($curl,CURLOPT_ENCODING, 'gzip,deflate');
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('User-Agent: Mozilla/5.0 (iPod; CPU iPhone OS_5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3'));
	curl_setopt($curl,CURLOPT_HEADER,1);
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($curl,CURLOPT_TIMEOUT,10);
	$return=curl_exec($curl);
	$headerSize=curl_getinfo($curl, CURLINFO_HEADER_SIZE);
	curl_close($curl);
	$header=explode("\r\n",substr($return, 0, $headerSize));
	foreach($header as $headeritem){
		if(substr($headeritem,12,4)=='ykss')
		$ykss=substr($headeritem,20);
	}
	$cookie='';
	if(empty($ysuid)||empty($ykss)){
		echo 'Fetch Required Cookie Failed';
		exit;
	}
	$ysuid=substr($ysuid,0,strpos($ysuid,';'));
	$ykss=substr($ykss,0,strpos($ykss,';'));
	$cookie='Cookie: ykss='.$ykss.'; __ysuid='.$ysuid.';';
	
	$link='http://play.youku.com/play/get.json?vid='.$vid.'&ct=12';
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_ENCODING, 'gzip,deflate');
	curl_setopt($curl,CURLOPT_HEADER,0);
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Referer: http://v.youku.com/v_show/'.$vid.'.html?x',$cookie));
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($curl,CURLOPT_TIMEOUT,10);
	$retval=curl_exec($curl);
	curl_close($curl);
	
	if(!empty($retval)){
		$rs=json_decode($retval, true);
		$ep=$rs['data']['security']['encrypt_string'];
		if (!empty($ep)){
			$ip=$rs['data']['security']['ip'];
			$videoid=$rs['data']['id'];
			list($sid, $token)=explode('_',yk_e('becaf9be', base64_decode($ep)));
			$ep=urlencode(base64_encode(yk_e('bf7e5f01',$sid.'_'.$videoid.'_'.$token)));
			$final_url='http://pl.youku.com/playlist/m3u8?ctype=12&ep='.$ep.'&ev=1&keyframe=1&oip='.$ip.'&sid='.$sid.'&token='.$token.'&vid='.$videoid.'&type=mp4';
			echo $final_url;
		} else
			echo 'Invalid vid.';
	} else
		echo 'Error fetching.';
} else
	echo 'No input.';
?>