<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $attending = htmlspecialchars($_POST['attending']);
    
    $data = "Name: $name, Email: $email, Attending: $attending\n";
    
    file_put_contents("rsvps.txt", $data, FILE_APPEND);
    
    echo "Thank you for your RSVP!";
} else {
    echo "Something went wrong. Please try again.";
}
?>
