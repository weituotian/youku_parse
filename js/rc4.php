<?php
/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017-02-11
 * Time: 10:09
 */

/*
* rc4加密算法
* $pwd 密钥
* $data 要加密的数据
*/
function rc4($pwd, $data)//$pwd密钥　$data需加密字符串
{
    $key[] = "";
    $box[] = "";

    $pwd_length = strlen($pwd);
    $data_length = strlen($data);

    for ($i = 0; $i < 256; $i++) {
        $key[$i] = ord($pwd[$i % $pwd_length]);
        $box[$i] = $i;
    }

    for ($j = $i = 0; $i < 256; $i++) {
        $j = ($j + $box[$i] + $key[$i]) % 256;
        $tmp = $box[$i];
        $box[$i] = $box[$j];
        $box[$j] = $tmp;
    }

    $cipher = "";

    for ($a = $j = $i = 0; $i < $data_length; $i++) {
        $a = ($a + 1) % 256;
        $j = ($j + $box[$a]) % 256;

        $tmp = $box[$a];
        $box[$a] = $box[$j];
        $box[$j] = $tmp;

        $k = $box[(($box[$a] + $box[$j]) % 256)];
        $cipher .= chr(ord($data[$i]) ^ $k);
    }

    return $cipher;
}

$pwd = "bf7e5f01";
$data = "048677541290712f09e4e_0300200100589DD73B9C87080D48DD7C70E103-2BE5-1CD4-262A-8358D4F07B36_0539";
echo "ciacHE6KU8oB5yrfjz8bMSzrIXNaXP4J9h+HgdJjALshQOHL7TnStZTDRvhCHvltdipyZOyCrNCSa0AXYfIx3G0Q3j3cPfri+PKS5aVQwZh0Ym82db/UslSeRjP4";
$strBase64=base64_encode(rc4($pwd, $data));
echo "<br>".$strBase64;
//成功
echo "<br>".urlencode($strBase64);
