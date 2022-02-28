<?php

// Adding headers
// header("Access-Control-Allow-Headers: Content-Type, X-PINGOTHER");
header('Content-Type', 'application/json');
header("Access-Control-Allow-Headers: x-requested-with, Content-Type, origin, accept, host, date, cookie, cookie2, X-PINGOTHER");
header("Access-Control-Request-Headers: Content-Type, X-PINGOTHER");
header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Max-Age: 86400');


// Connecting to the database
$host = '';
$db = '';
$user = '';
$passwd = '';

$conn = mysqli_connect($host, $user, $passwd, $db);

// Return encoded false if the connection is valid
if (!$conn)
    die(json_encode(false));
else {
    $query = "SET NAMES 'utf8' COLLATE 'utf8_polish_ci'";
    $result = mysqli_query($conn, $query);
}