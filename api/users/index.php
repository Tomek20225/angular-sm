<?php

// Connecting to the database
require_once('../database.php');


// Preparing variables
$json = array();
$method = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
$rest = 'rest_'.strtolower($_SERVER['REQUEST_METHOD']);

if (function_exists($rest))
    call_user_func($rest, $request, $conn);
else
    die(json_encode($json));


// Handling OPTIONS requests
function rest_options($request, $conn) {
    die(json_encode('hey'));
}


// Handling GET requests
function rest_get($request, $conn)
{
    if (!$_GET) {
        $query = "SELECT * FROM users";
        $result = mysqli_query($conn, $query);
    
        if ($result) {
            while ($json[] = mysqli_fetch_array($result)) { }
            array_pop($json);
        }
        
        die(json_encode($json));
    }
    else {
        $baseQuery = "SELECT * FROM users";
        $where = array();
        $limit = "";

        if (isset($_GET['id']) && is_numeric($_GET['id']))
            array_push($where, "id=".$_GET['id']);

        if (isset($_GET['email']))
            array_push($where, "email='".$_GET['email']."'");

        if (isset($_GET['limit']) && is_numeric($_GET['limit']))
            $limit = "LIMIT ".$_GET['limit'];

        if (!empty($where))
            $where = "WHERE ".implode(" AND ", $where);
        else
            $where = "";

        $query = "$baseQuery $where $limit";
        $result = mysqli_query($conn, $query);

        if ($result) {
            while ($json[] = mysqli_fetch_array($result)) { }
            array_pop($json);
        }
        
        die(json_encode($json));
    }
}


// Handling POST requests
function rest_post($request, $conn)
{
    $received = (array)json_decode(file_get_contents('php://input'));

    if (!$received) {
        die(json_encode($json));
        return;
    }
    else {
        $name = $received['name'];
        $surname = $received['surname'];
        $email = $received['email'];
        $password = $received['password'];

        if (empty($name) || empty($surname) || empty($email) || empty($password))
        {
            die(json_encode($json));
            return;
        }

        $query = "INSERT INTO users (email, password, name, surname) VALUES ('$email', '$password', '$name', '$surname')";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $query = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
            $result = mysqli_query($conn, $query);

            if ($result) {
                while ($json[] = mysqli_fetch_array($result)) { }
                array_pop($json);
            }
        }
        
        die(json_encode($json));
    }
}
