function checkPassword() {
    var enteredPassword = document.getElementById('password').value;
    var correctPassword = '150825'; // Change this to your password

    if (enteredPassword === correctPassword) {
        window.location.href = 'home.html'; // Redirect to the main content page
    } else {
        document.getElementById('error-message').innerText = 'Incorrect password, please try again. The password can be found on your invite.';
    }
}

// Add an event listener to detect "Enter" keypress
document.getElementById('password').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkPassword(); // Call the checkPassword function when Enter is pressed
    }
});
