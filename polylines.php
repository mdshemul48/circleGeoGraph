<?php

// here we are getting all the polylines from the db
$database = "localhost";
$username = "root";
$password = "";
$connection = mysqli_connect($database, $username, $password);

if ($connection->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    $allCoordinates = array();
    $result = $connection->query("SELECT * FROM `geo`.`location`");
    while ($row = $result->fetch_row()) array_push($allCoordinates, $row);
    echo json_encode($allCoordinates);
}
