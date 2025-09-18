<?php
include "db.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Safely get POST values
    $email = isset($_POST["email"]) ? trim($_POST["email"]) : null;
    $password = isset($_POST["password"]) ? $_POST["password"] : null;

    if (empty($email) || empty($password)) {
        echo "Please fill in both email and password.";
    } else {
        // Prepare SQL to prevent SQL Injection
        $stmt = $conn->prepare("SELECT * FROM user_access_db WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            echo "No account found with this email. Please register first!";
        } else {
            $user = $result->fetch_assoc();

            if (password_verify($password, $user["password"])) {
                // Store session data
                $_SESSION["user_id"] = $user["user_id"];
                $_SESSION["username"] = $user["username"];
                $_SESSION["role"] = $user["role"];

                // Update login time
                $update = $conn->prepare("UPDATE user_access_db SET time_login = NOW() WHERE user_id = ?");
                $update->bind_param("i", $user["user_id"]);
                $update->execute();

                // Redirect to dashboard or home
                header("Location: ../HomeFile/Homepage.html");
                exit();
            } else {
                echo "Wrong password. Please try again.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Double Slider Login / Registration Form</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
  <!-- Navbar -->
  <div class="navbar">
    <img class="logo" src="../img/logo.jpeg" alt="Logo">
    <div class="nav-links">
      <a href="../HomeFile/Homepage.html"><span class="home_span">Home</span></a>
      <a href="../OurMissionFile/OurMission.html">Our mission</a>
      <a href="../AdoptFile/Adopt.html">Adopt</a>
      <a href="../RehomeFile/Rehome.html">Rehome</a>
      <a href="#">How to help</a>
      <a href="#">Contact</a>
    </div>
    <div class="login-btn">
      <button class="btn_login"><a href="../loginFile/login.php">Log In</a></button>
    </div>
  </div>

  <div class="container" id="container">
    <div class="form-container register-container">
      <form action="register.php" method="POST">
        <h1>Register here.</h1>
        <div class="input-field">
          <input type="text" name="username" placeholder="Name" required>
        </div>
        <div class="input-field">
          <i class="lni lni-envelope"></i>
          <input type="email" name="email" placeholder="Email" required>
        </div>
        <div class="input-field">
          <i class="lni lni-lock-alt"></i>
          <input type="password" name="password" placeholder="Password" id="register-password" required>
          <i class="lni lni-eye-alt toggle-password" data-target="register-password"></i>
        </div>
        <div class="input-field">
          <i class="lni lni-shield"></i>
          <input type="password" name="confirm_password" placeholder="Confirm Password" id="confirm-password" required>
          <i class="lni lni-eye-alt toggle-password" data-target="confirm-password"></i>
        </div>
        <button type="submit" name="register">Register</button>
      </form>
    </div>

    <div class="form-container login-container">
      <form action="login.php" method="POST">
        <h1>Sign in</h1>
        <div class="input-field">
          <i class="lni lni-envelope"></i>
          <input type="email" name="email" placeholder="Email" required>
        </div>
        <div class="input-field">
          <i class="lni lni-lock-alt"></i>
          <input type="password" name="password" placeholder="Password" id="login-password" required>
          <i class="lni lni-eye-alt toggle-password" data-target="login-password"></i>
        </div>
        <div class="content">
          <div class="checkbox">
            <input type="checkbox" name="remember" id="checkbox">
            <label for="checkbox">Remember me</label>
          </div>
          <div class="pass-link">
            <a href="recovery.html">Recovery Password</a>
          </div>
        </div>
        <div class="button1">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1 class="title">Hello, friends!</h1>
          <p>If you have an account, login here and have fun.</p>
          <button class="ghost" id="login">Login
            <i class="lni lni-arrow-left login"></i>
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1 class="title">Start your journey now</h1>
          <p>If you don’t have an account yet, join us and start your journey.</p>
          <button class="ghost" id="register">Register
            <i class="lni lni-arrow-right register"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
