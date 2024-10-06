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

  // Function to handle form submission
  function submitForm() {
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

      const params = [];
      document.querySelectorAll('.rsvp-row').forEach((row, index) => {
        const name = row.querySelector('.rsvp-name').value.trim();
        const rsvp = row.querySelector('.rsvp-select').value;
        params.push(`name${index + 1}=${encodeURIComponent(name)}`);
        params.push(`rsvp${index + 1}=${encodeURIComponent(rsvp)}`);
      });

      const queryString = params.join('&');

      fetch('https://script.google.com/macros/s/AKfycbyEPlzM8i7MXGTb89pIwNt1Cw7LCJ0ZreLwjZPlKp8aj3miF9zOndiQHFRi_fwNQ6kYbg/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString,
      })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    } else {
      rsvpMessage.textContent = `'${invalidName}' has not been found, please check the spelling is correct. Please also note there are no unspecified plus ones.`;
      rsvpMessage.style.color = "red";
    }
  }

  // Add event listener to dynamically add RSVP rows
  addRowBtn.addEventListener('click', function () {
    const newRow = document.createElement('div');
    newRow.className = 'rsvp-row';
    newRow.innerHTML = `
        <input type="text" name="name" placeholder="Full Name (First Last)" class="rsvp-name" required>
        <select name="rsvp" class="rsvp-select" required>
            <option value="" disabled selected>Yes/No</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>`;
    rsvpRows.appendChild(newRow);

    // Re-add 'Enter' key functionality to newly added input fields
    addEnterKeyFunctionality();
  });

  // Add event listener to remove RSVP rows
  removeRowBtn.addEventListener('click', function () {
    const rows = document.querySelectorAll('.rsvp-row');
    if (rows.length > 1) {
      rows[rows.length - 1].remove();
    }
  });

  // Add event listener for form submission
  rsvpForm.addEventListener('submit', function (event) {
    event.preventDefault();
    submitForm();
  });

  // Function to add 'Enter' key functionality to all input fields
  function addEnterKeyFunctionality() {
    const nameInputs = document.querySelectorAll('.rsvp-name');

    nameInputs.forEach(function (input) {
      input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default form submission (if inside form)
          submitForm(); // Trigger form submission on Enter key press
        }
      });
    });
  }

  // Initial call to add Enter key functionality
  addEnterKeyFunctionality();
});
