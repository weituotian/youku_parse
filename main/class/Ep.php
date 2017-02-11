<?php
/**
 * Created by PhpStorm.
 * User: 嘉辉
 * Date: 2017/2/11
 * Time: 16:50
 */
//优酷的ep加密算法
class Ep
{

    static $key = array(19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26);

    public static function translate($source)
    {
        $newStr = array();
        $d = 0;
        for (; $d < strlen($source); $d++) {
            $char = $source[$d] >= "a" && $source[$d] <= "z" ? self::charCodeAt($source[$d], 0) - self::charCodeAt("a", 0) : $source[$d] - "0" + 26;
            for ($f = 0; $f < 36; $f++) if (self::$key[$f] == $char) {
                $char = $f;
                break;
            }
            $char > 25 ? $newStr[$d] = $char - 26 : $newStr[$d] = chr($char + 97);
        }
        return implode($newStr);
    }

    public static function generate($sid, $fileId, $token)
    {
        $userCache = Constants::getUserCache();
        $mk = Constants::getMk();

        $source = $mk['a4'] . "poz" . $userCache['a2'];
        $pwd = self::translate($source);
        $data = $sid . "_" . $fileId . "_" . $token;
        $strBase64 = base64_encode(self::rc4($pwd, $data));
        return urlencode($strBase64);
    }

    public static function decode($encrypt_string)
    {
        $userCache = Constants::getUserCache();
        $mk = Constants::getMk();

        $pwd = self::translate($mk['a3'] . "o0b" . $userCache['a1']);

        $data = base64_decode($encrypt_string);
        $result = self::rc4($pwd, $data);
        $arr = explode("_", $result);
        return $arr;
    }

    public static function rc4($pwd, $data)//$pwd密钥　$data需加密字符串
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

    public static function fromCharCode($codes)
    {
        if (is_scalar($codes)) $codes = func_get_args();
        $str = '';
        foreach ($codes as $code) $str .= chr($code);

        return $str;
    }

    public static function charCodeAt($str, $index)
    {
        $char = mb_substr($str, $index, 1, 'UTF-8');

        if (mb_check_encoding($char, 'UTF-8')) {
            $ret = mb_convert_encoding($char, 'UTF-32BE', 'UTF-8');
            return hexdec(bin2hex($ret));
        } else {
            return null;
        }
    }

}