<?php
/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017-02-11
 * Time: 9:43
 */

$key = array(19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26);


function fromCharCode($codes)
{
    if (is_scalar($codes)) $codes = func_get_args();
    $str = '';
    foreach ($codes as $code) $str .= chr($code);

    return $str;
}

function charCodeAt($str, $index)
{
    $char = mb_substr($str, $index, 1, 'UTF-8');

    if (mb_check_encoding($char, 'UTF-8')) {
        $ret = mb_convert_encoding($char, 'UTF-32BE', 'UTF-8');
        return hexdec(bin2hex($ret));
    } else {
        return null;
    }
}

function fromCharCode2($codes){
    if (is_scalar($codes)) {
        $codes = func_get_args();
    }
    $str = '';
    foreach ($codes as $code) {
        $str .= chr($code);
    }
    return $str;
}
function charCodeAt2($str, $index){
    static $charCode = array();
    $key = md5($str);
    $index = $index + 1;
    if (isset($charCode[$key])) {
        return $charCode[$key][$index];
    }
    $charCode[$key] = unpack('C*', $str);
    return $charCode[$key][$index];
}


function translate($source, $key)
{
    $newStr = array();
    $d = 0;
    for (; $d < strlen($source); $d++) {
        $char = $source[$d] >= "a" && $source[$d] <= "z" ? charCodeAt($source[$d], 0) - charCodeAt("a", 0) : $source[$d] - "0" + 26;
        for ($f = 0; $f < 36; $f++) if ($key[$f] == $char) {
            $char = $f;
            break;
        }
        $char > 25 ? $newStr[$d] = $char - 26 : $newStr[$d] = chr($char + 97);
    }
    return implode($newStr);
}

function translate2($source, $key)
{
    $newStr = array();
    $d = 0;
    for (; $d < strlen($source); $d++) {
        $char = $source[$d] >= "a" && $source[$d] <= "z" ? charCodeAt2($source[$d], 0) - charCodeAt2("a", 0) : $source[$d] - "0" + 26;
        for ($f = 0; $f < 36; $f++) if ($key[$f] == $char) {
            $char = $f;
            break;
        }
        $char > 25 ? $newStr[$d] = $char - 26 : $newStr[$d] = fromCharCode2($char + 97);
    }
    return implode($newStr);
}

$source = "boa4poz1";
var_dump(translate2($source, $key));
//=>bf7e5f01 right
//translate1 和 translate2都可以