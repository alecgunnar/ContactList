<?php

if(!defined('IN_APP'))
  die('Cannot access directly!');

header('Content-type: application/json');

//---------------
// Resp. helpers
//---------------
function respond_with_error($msg) {
  http_response_code(500);
  print('{"status": 500, "message": "' . $msg . '"}');
  exit();
}

function respond_with_good_news($msg) {
  print('{"status": 200, "message": "' . $msg . '"}');
  exit();
}

//---------------
// Anti-CSRF
//---------------
if((array_key_exists(CSRF_TOKEN_KEY, $_POST) && array_key_exists(CSRF_TOKEN_KEY, $_SESSION)) && $_POST[CSRF_TOKEN_KEY] != $_SESSION[CSRF_TOKEN_KEY])
  respond_with_error('Invalid CSRF token.');

//---------------
// Verification
//---------------
$action = 'action_' . $_POST['action'];

if(!function_exists($action))
  respond_with_error('Invalid action.');

//---------------
// Some variables
//---------------
$data = [
  [
    'header'     => true,
    'auto_count' => 0
  ]
];

//---------------
// Helpers
//---------------
function load_data() {
  global $data;

  if(!$dataFile = fopen(DATA_FILE, 'a+'))
    return false;

  if($size = filesize(DATA_FILE))
    if(($data = json_decode(fread($dataFile, $size), true)) == false)
      return false;

  return fclose($dataFile);
}

function save_data() {
  global $data;

  return ($jsonData = json_encode($data))
    && ($dataFile = fopen(DATA_FILE, 'w+'))
    && fwrite($dataFile, $jsonData)
    && fclose($dataFile);
}

function email_exists($email, $id=-1) {
  global $data;
  $n = count($data);
  for($i = 1; $i < $n; $i++)
    if(array_key_exists('email', $data[$i]))
      if($data[$i]['email'] == $email && $data[$i]['idx'] != $id)
        return true;
}

function index_of($idx) {
  global $data;
  $n = count($data);
  for($i = 1; $i < $n; $i++)
    if(array_key_exists('idx', $data[$i]))
      if($data[$i]['idx'] == $idx)
        return $i;

  return -1;
}

function get_data_to_save($id=-1) {
  global $data;

  if(!array_key_exists('name', $_POST)
    || !array_key_exists('email', $_POST)
    || !array_key_exists('phone', $_POST)
    || !array_key_exists('position', $_POST))
    respond_with_error('Missing data.');

  $dataToSave = [
    'idx'      => $id,
    'name'     => $_POST['name'],
    'email'    => strtolower($_POST['email']),
    'phone'    => preg_replace('#[^0-9]#', '', $_POST['phone']),
    'position' => $_POST['position']
  ];

  if($dataToSave['position'] < 0 || $dataToSave['position'] > 2)
    respond_with_error('Invalid position.');

  // Just checking for WMU-ish email addresses
  if(!preg_match('#^[A-Z0-9\.]*@[A-Z0-9]*\.[A-Z0-9\.]*$#i', $dataToSave['email']))
    respond_with_error('Invalid email address. Format: ^[A-Z0-9.]*@[A-Z0-9]*.[A-Z0-9.]*$');

  if(email_exists($dataToSave['email'], $id) === true)
    respond_with_error('Email address already in use.');

  if(($phnLen = strlen($dataToSave['phone'])) > 0 && $phnLen != 10 && $phnLen != 11)
    respond_with_error('Invalid phone number');

  return $dataToSave;
}

//---------------
// Actions
//---------------
function action_new() {
  global $data;

  $dataToSave        = get_data_to_save();
  $dataToSave['idx'] = $data[0]['auto_count']++;
  $data[]            = $dataToSave;

  if(save_data())
    respond_with_good_news('New contact saved.');

  respond_with_error('Could not save new contact, there was an unknown error.');
}

function action_update() {
  global $data;

  if(!array_key_exists('idx', $_POST))
    respond_with_error('No index to update provided.');

  if(($i = index_of($_POST['idx'])) < 0)
    respond_with_error('Could not find record you\'re trying to update.');

  $data[$i] = get_data_to_save($_POST['idx']);

  if(save_data())
    respond_with_good_news('Contact saved.');

  respond_with_error('Could not save contact, there was an unknown error.');
}

function action_remove() {
  global $data;

  if(!array_key_exists('idx', $_POST))
    respond_with_error('No index to update provided.');

  if(($i = index_of($_POST['idx'])) < 0)
    respond_with_error('Could not find record you\'re trying to remove.');

  unset($data[$i]);

  if(save_data())
    respond_with_good_news('Contact removed.');

  respond_with_error('Could not remove contact, there was an unknown error.');
}

load_data();
$action();
