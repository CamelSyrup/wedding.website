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
    <title>Wedding Gifts</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Wedding Gifts</h1>
    </header>
    
    <section id="gifts">
        <p>Thank you for your generosity! Here are some items we would love:</p>
        <ul>
            <li><strong>Item 1:</strong> Description <a href="https://www.amazon.com/your-link" target="_blank">Purchase</a></li>
            <li><strong>Item 2:</strong> Description <a href="https://www.amazon.com/your-link" target="_blank">Purchase</a></li>
            <li><strong>Item 3:</strong> Description <a href="https://www.amazon.com/your-link" target="_blank">Purchase</a></li>
            <!-- Add more items as needed -->
        </
