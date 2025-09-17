<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["full_name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // check kung existing email
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo "Email already registered!";
    } else {
        //hash password para hindi plain text
        $hashed = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $hashed);

        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error registering user!";
        }
    }
}
?>
