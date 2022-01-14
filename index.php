<?php
$inserted = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $requestData = json_decode(file_get_contents('php://input'), true);

    $database = "localhost";
    $username = "root";
    $password = "";
    $connection = mysqli_connect($database, $username, $password);

    if ($connection->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $coordinates = $_POST["data"];
    $name = $_POST["name"];
    $sql = "INSERT INTO `geo` . `location` (`coordinates`, `name`) VALUES ( '$coordinates', '$name');";

    if ($connection->query($sql) === true) {
        $inserted = true;
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Map with Location</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <?php
    if ($inserted == true) {
        echo '<div class="alert alert-primary" role="alert">
        Location successfully added.
      </div>
      ';
    }

    ?>
    <button id="submit-btn" class="btn btn-primary my-2">ADD</button>
    <input type="text" id="name" class="form-control my-2" placeholder="Enter Connection Name? ">
    <div id="map"></div>


    <!-- scripts files -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <script src="js/script.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=[apiKey]
        &callback=initMap&v=weekly&channel=2" async></script>
</body>

</html>