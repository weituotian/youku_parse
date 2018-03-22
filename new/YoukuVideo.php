<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/22
 * Time: 12:09
 */

class YoukuVideo
{

    public $vid;
    public $ccode;
    public $cna;


    /**
     * YoukuVideo constructor.
     */
    public function __construct()
    {
        $this->vid = 'XMzQ3ODQ0OTA2MA==';

        // header('Content-Type', 'content="text/html; charset=utf-8"');
        echo '<meta charset="utf-8">';

        $cna = $this->fetch_cna();
        $cna = '2V06EwrKJjICAbczegzDzfoV';

        $params = array(
            'vid' => $this->vid,
            'ccode' => '0502',
            'client_ip' => '192.168.1.1',
            'utid' => $cna,
            'client_ts' => intval(time()),
            'ckey' => 'DIl58SLFxFNndSV1GFNnMQVYkx1PP5tKe1siZu/86PR1u/Wh1Ptd+WOZsHHWxysSfAOhNJpdVWsdVJNsfJ8Sxd8WKVvNfAS8aS8fAOzYARzPyPc3JvtnPHjTdKfESTdnuTW6ZPvk2pNDh4uFzotgdMEFkzQ5wZVXl2Pf1/Y6hLK0OnCNxBj3+nb0v72gZ6b0td+WOZsHHWxysSo/0y9D2K42SaB8Y/+aD2K42SaB8Y/+ahU+WOZsHcrxysooUeND',
        );

        $cookies = array(
            '__ysuid' => intval(time()),
            'cna' => $cna
        );

        $headers = array(
            'Referer' => 'http://v.youku.com',
            'Host' => 'ups.youku.com'
        );

        $request = new Request();
        $request->http_get('https://ups.youku.com/ups/get.json', $params, $cookies);

        echo($request->info['request_header']);
        echo '<br>';
        echo $request->full_url;
        echo '<br>';
        echo $request->body;
    }

    public function fetch_cna()
    {
        $url = 'http://gm.mmstat.com/yt/ykcomment.play.commentInit?cna=';
        $request = new Request();
        $request->http_get($url);
        //$request->response_headers['Set-Cookie'];

        // echo json_encode($request->info);
        // var_dump($request->info);
        // var_dump($request->response_headers);
        // echo "<textarea>" . $response . "</textarea>";

        $values = $request->get_res_header('Set-Cookie');
        $cna = false;
        foreach ($values as $value) {
            preg_match('/cna=([^;]+)/', $value, $matches);
            if (count($matches) > 0) {
                $cna = $matches[1];
                break;
            }
        }

        if (!$cna) {
            $cna = 'oqikEO1b7CECAbfBdNNf1PM1';
        }

        return $cna;
        /*req = urlopen(url)
        cookies = req.info()['Set-Cookie']
        cna = match1(cookies, "cna=([^;]+)")
        return cna if cna else "oqikEO1b7CECAbfBdNNf1PM1"*/
    }
}

class Request
{

    public $info;

    public $req_cookies;

    public $full_url;
    public $response;
    public $header;
    public $response_headers = array();
    public $body;

    public function merge_default_header($headers)
    {
        $defaults = array(
            'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language' => 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding' => 'gzip, deflate',
            'User-Agent' => "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"
        );
        $array_merge = array_merge($defaults, $headers);
        return $array_merge;
    }

    /**
     * GET 请求
     * @param string $url
     */
    public function http_get($url, $params = array(), $cookies = array(), $headers = array())
    {
        $this->full_url = $url;

        $oCurl = curl_init();
        if (stripos($url, "https://") !== FALSE) {
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
        }

        curl_setopt($oCurl, CURLOPT_HEADER, TRUE);//至关重要，CURLINFO_HEADER_OUT选项可以拿到请求头信息
        curl_setopt($oCurl, CURLINFO_HEADER_OUT, TRUE);//请求头信息
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($oCurl, CURLOPT_NOBODY, TRUE);// 不获取body

        // 参数
        if (is_array($params)) {
            $params_str = $this->get_params_str($params);
            if (strpos($this->full_url, '?') === FAlSE) {
                $this->full_url .= '?' . $params_str;
            } else {
                $this->full_url .= '&' . $params_str;
            }
        }

        // cookies
        if (is_array($cookies)) {
            $cookies_str = $this->get_cookies_str($cookies);
            curl_setopt($oCurl, CURLOPT_COOKIE, $cookies_str); //使用cookies
        }


        // headers
        $headers = $this->merge_default_header($headers);
        $headers = self::flatten($headers);
        curl_setopt($oCurl, CURLOPT_HTTPHEADER, $headers);

        curl_setopt($oCurl, CURLOPT_URL, $this->full_url);
        $response = curl_exec($oCurl);
        $this->info = curl_getinfo($oCurl);
        curl_close($oCurl);
        if (intval($this->info["http_code"]) == 200) {
            $this->process_response_headers($response);
            return $response;
        } else {
            return false;
        }
    }

    public function process_response_headers($response)
    {
        $header_size = $this->info['header_size'];
        $this->header = substr($response, 0, $header_size);
        $this->body = substr($response, $header_size);

        $headArr = explode("\r\n", $this->header);
        foreach ($headArr as $line) {
            preg_match('/(.*?):(.+)/', $line, $matches, PREG_OFFSET_CAPTURE);
            if (count($matches) == 3) {
                $key = trim($matches[1][0]);
                $this->response_headers[] = array($key => trim($matches[2][0]));
                /*if (isset($this->response_headers[$key])) {
                    $this->response_headers[$key] .= ';' . trim($matches[2][0]);
                } else {
                    //$this->response_headers[$key] = trim($matches[2][0]);
                }*/
                // var_dump($matches);
                // echo "<br>";

                /*
                array (size=3)
                  0 =>
                    array (size=2)
                      0 => string 'Date: Thu, 22 Mar 2018 07:35:59 GMT' (length=35)
                      1 => int 0
                  1 =>
                    array (size=2)
                      0 => string 'Date' (length=4)
                      1 => int 0
                  2 =>
                    array (size=2)
                      0 => string ' Thu, 22 Mar 2018 07:35:59 GMT' (length=30)
                      1 => int 5
                 */

            }
//            echo $line . "<br>";
        }
    }

    public function get_res_header($key)
    {
        $arr = array();
        foreach ($this->response_headers as $header) {
            if (isset($header[$key])) {
                $arr[] = $header[$key];
            }
        }
        return $arr;
    }

    private function arr_join_str($arr, $separator)
    {
        $str = '';
        foreach ($arr as $key => $value) {
            $str .= $key . '=' . $value . $separator;
        }
        $str = substr($str, 0, strlen($str) - strlen($separator));
        return $str;
    }

    public function get_params_str($params)
    {
        return $this->arr_join_str($params, '&');
    }

    public function get_cookies_str($cookies_arr)
    {
        return $this->arr_join_str($cookies_arr, ';');
    }

    public static function flatten($array)
    {
        $return = array();
        foreach ($array as $key => $value) {
            $return[] = sprintf('%s: %s', $key, $value);
        }
        return $return;
    }
}