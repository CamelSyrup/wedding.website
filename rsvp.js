document.addEventListener('DOMContentLoaded', function () {
    let allowedNames = [];

    // Function to load allowed names from a text file
    function loadAllowedNames() {
        fetch('allowed_names.txt')
            .then(response => response.text())
            .then(data => {
                allowedNames = data.split('\n').map(name => name.trim()).filter(name => name.length > 0);
            })
            .catch(error => console.error('Error loading allowed names:', error));
    }

    loadAllowedNames(); // Load the names when the page loads

    const rsvpForm = document.getElementById('rsvpForm');
    const addRowBtn = document.getElementById('addRowBtn');
    const rsvpMessage = document.getElementById('rsvpMessage');

    // Function to add a new row
    addRowBtn.addEventListener('click', function () {
        const newRow = document.createElement('div');
        newRow.className = 'rsvp-row';
        newRow.innerHTML = `
            <input type="text" name="name" placeholder="Your Name" class="rsvp-name" required>
            <select name="rsvp" class="rsvp-select" required>
                <option value="" disabled selected>Yes/No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>`;
        rsvpForm.insertBefore(newRow, addRowBtn);
    });

    // Function to remove the last added row
    const removeRowBtn = document.getElementById('removeRowBtn');
    removeRowBtn.addEventListener('click', function () {
        const rows = document.querySelectorAll('.rsvp-row');
        if (rows.length > 1) { // Ensure we don't remove the original row
            rows[rows.length - 1].remove();
        }
    });
    
    // Function to validate and submit the form
    rsvpForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const nameInputs = document.querySelectorAll('.rsvp-name');
        let allValid = true;
        let invalidName = '';

        nameInputs.forEach(input => {
            if (!allowedNames.includes(input.value.trim())) {
                allValid = false;
                invalidName = input.value.trim();
            }
        });

        if (allValid) {
            rsvpMessage.textContent = "RSVP successfully submitted!";
            rsvpMessage.style.color = "green";

            // Collect form data
            const formData = [];
            document.querySelectorAll('.rsvp-row').forEach(row => {
                const name = row.querySelector('.rsvp-name').value.trim();
                const rsvp = row.querySelector('.rsvp-select').value;
                formData.push({ name, rsvp });
            });

            // Convert FormData to URL-encoded string
            const params = new URLSearchParams();
            formData.forEach((value, key) => {
                params.append(key, value);
            });

            // Send data to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbyEPlzM8i7MXGTb89pIwNt1Cw7LCJ0ZreLwjZPlKp8aj3miF9zOndiQHFRi_fwNQ6kYbg/exec', {
                method: 'POST',
                body: params
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            rsvpMessage.textContent = `'${invalidName}' has not been found, please note there are no unspecified +1s`;
            rsvpMessage.style.color = "red";
        }
    });
});
