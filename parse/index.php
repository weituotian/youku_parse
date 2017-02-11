<?php

//dev add!
//add!!!
//dev add!222!
// This is master
// This is master2!

/*
 * This is Bug Fix!	
 * This is Dev1
 * This is Dev2
 * This is Dev3
 */

 require "youku.class.php";
 $url = "http://v.youku.com/v_show/id_XMTM0MDIwNjkyMA==.html";
 $data = Youku::parse($url);
 print_r($data);

?>