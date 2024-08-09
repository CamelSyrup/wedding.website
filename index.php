<?php
session_start();
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Wedding</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>We're Getting Married!</h1>
        <p>Join us on <strong>August 24th, 2025</strong></p>
    </header>
    
    <section id="countdown">
        <h2>Countdown to Our Wedding</h2>
        <div id="timer">
            <div><span id="days"></span>Days</div>
            <div><span id="hours"></span>Hours</div>
            <div><span id="minutes"></span>Minutes</div>
            <div><span id="seconds"></span>Seconds</div>
        </div>
    </section>

    <footer>
        <nav>
            <ul>
                <li><a href="rsvp.php">RSVP</a></li>
                <li><a href="location.php">Location</a></li>
                <li><a href="gifts.php">Gifts</a></li>
            </ul>
        </nav>
    </footer>

    <script src="script.js"></script>
</body>
</html>
