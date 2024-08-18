document.addEventListener('DOMContentLoaded', function () {
    let allowedNames = [];

    function loadAllowedNames() {
        fetch('allowed_names.txt')
            .then(response => response.text())
            .then(data => {
                allowedNames = data.split('\n').map(name => name.trim()).filter(name => name.length > 0);
            })
            .catch(error => console.error('Error loading allowed names:', error));
    }

    loadAllowedNames();

    const rsvpForm = document.getElementById('rsvpForm');
    const addRowBtn = document.getElementById('addRowBtn');
    const removeRowBtn = document.getElementById('removeRowBtn');
    const rsvpRows = document.getElementById('rsvpRows');
    const rsvpMessage = document.getElementById('rsvpMessage');

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
        rsvpRows.appendChild(newRow);
    });

    removeRowBtn.addEventListener('click', function () {
        const rows = document.querySelectorAll('.rsvp-row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
        }
    });

    rsvpForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInputs = document.querySelectorAll('.rsvp-name');
    let allValid = true;
    let invalidName = '';

    const names = [];
    const rsvps = [];

    nameInputs.forEach((input, index) => {
        const nameValue = input.value.trim();
        if (!allowedNames.includes(nameValue)) {
            allValid = false;
            invalidName = nameValue;
        }
        names.push(nameValue);
        rsvps.push(document.querySelectorAll('.rsvp-select')[index].value);
    });

    if (allValid) {
        rsvpMessage.textContent = "RSVP successfully submitted!";
        rsvpMessage.style.color = "green";

        const queryString = `name=${encodeURIComponent(names.join(','))}&rsvp=${encodeURIComponent(rsvps.join(','))}`;

        fetch(`https://script.google.com/macros/s/AKfycbyEPlzM8i7MXGTb89pIwNt1Cw7LCJ0ZreLwjZPlKp8aj3miF9zOndiQHFRi_fwNQ6kYbg/exec?${queryString}`, {
            method: 'GET',
        })
        .then(response => response.text())
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
