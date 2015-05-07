<?php

session_start();

define('IN_APP', true);
define('CSRF_TOKEN_KEY', 'csrf_token');
define('DATA_FILE', 'data.json');

$token = array_key_exists(CSRF_TOKEN_KEY, $_SESSION) ? $_SESSION['csrf_token'] : false;

if(!file_exists(DATA_FILE))
  touch(DATA_FILE);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  require_once('data_handler.php');
} else {
  $newToken = md5(time() + rand(-100, 10000));
  $app = file_get_contents('app.html');
  print(str_replace("{CSRF_TOKEN}", $newToken, $app));
  $_SESSION[CSRF_TOKEN_KEY] = $newToken;
}
