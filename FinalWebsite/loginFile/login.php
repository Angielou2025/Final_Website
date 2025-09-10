<?php
include "db.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo "Register first!";
    } else {
        $user = $result->fetch_assoc();

        // verify hashed password
        if (password_verify($password, $user["password"])) {
            $_SESSION["user_id"] = $user["id"];

            // update last_login
            $update = $conn->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
            $update->bind_param("i", $user["id"]);
            $update->execute();

            echo "Login successful!";
        } else {
            echo "Wrong password, try again";
        }
    }
}
?>
