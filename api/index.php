<?php

// Connecting to the database
require_once('database.php');


// Return encoded true if the connection is valid
if ($conn)
    die(json_encode(true));