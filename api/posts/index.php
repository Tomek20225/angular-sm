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
        $query = "SELECT * FROM posts ORDER BY date DESC";
        $result = mysqli_query($conn, $query);
    
        if ($result) {
            while ($json[] = mysqli_fetch_array($result)) {  }
            array_pop($json);
        }
        
        die(json_encode($json));
    }
    else {
        $baseQuery = "SELECT * FROM posts";
        $where = array();
        $limit = "";

        if (isset($_GET['id']) && is_numeric($_GET['id']))
            array_push($where, "id=".$_GET['id']);

        if (isset($_GET['author_id']) && is_numeric($_GET['author_id']))
            array_push($where, "author_id=".$_GET['author_id']);

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
        $author_id = $received['author_id'];
        $title = $received['title'];
        $body = $received['body'];
        $date = date('Y-m-d H:i:s');

        if (empty($author_id) || empty($title) || empty($body))
        {
            die(json_encode($json));
            return;
        }

        $query = "INSERT INTO posts (author_id, title, body, date) VALUES ($author_id, '$title', '$body', '$date')";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $query = "SELECT * FROM posts WHERE date = '$date' ORDER BY date DESC LIMIT 1";
            $result = mysqli_query($conn, $query);

            if ($result) {
                while ($json[] = mysqli_fetch_array($result)) { }
                array_pop($json);
            }
        }
        
        die(json_encode($json));
    }
}
