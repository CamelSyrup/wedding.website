<!-- login.php -->
<?php
session_start();

// Set a hashed password (you can use password_hash to generate it)
$hashed_password = '$2y$10$wHh8cEZ7Hg4D3BfNMEWwjuVD.q5E7OMe8/YhGObZClyDTj6Aub0P6'; // example hashed password for 'password123'

if (isset($_POST['password'])) {
    if (password_verify($_POST['password'], $hashed_password)) {
        $_SESSION['authenticated'] = true;
        header("Location: index.html");
        exit();
    } else {
        $error = "Invalid password.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2>Enter Password to Access the Site</h2>
    <?php if (isset($error)): ?>
        <p style="color:red;"><?php echo $error; ?></p>
    <?php endif; ?>
    <form action="login.php" method="POST">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>
        <button type="submit">Submit</button>
    </form>
</body>
</html>
