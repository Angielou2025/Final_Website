<?php
include "db.php";
session_start();

if (isset($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];

   
    $update = $conn->prepare("UPDATE user_access_db SET time_logout = NOW() WHERE user_id = ?");
    $update->bind_param("i", $user_id);
    $update->execute();

    session_unset();
    session_destroy();

    echo "Logged out successfully!";
}
?>
