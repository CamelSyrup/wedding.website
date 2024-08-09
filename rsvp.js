document.getElementById('rsvp-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rsvp = document.getElementById('mobile').value;
    const plusOne = document.getElementById('rsvp').value;

    // Save data to Airtable
    const airtableApiKey = 'pat8WDS8uO5hmisQd.8f1785a651a764acb0e0a517b1a39b7d27529ec4ad480037304b43a6e00f1f97';
    const airtableBaseId = 'UWZ9bOtOKv2eVU';
    const airtableTableName = 'Wedding RSVP';
    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;

    const data = {
        fields: {
            Name: name,
            Email: email,
            Mobile: mobile,
            RSVP: rsvp,
        }
    };

    const responseMessage = document.getElementById('response-message');

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${airtableApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Send email using Formspree or EmailJS


        responseMessage.textContent = 'Thank you for your RSVP!';
        responseMessage.style.color = 'green';
        document.getElementById('rsvp-form').reset();
    } catch (error) {
        console.error('Error:', error);
        responseMessage.textContent = 'There was an issue submitting your RSVP. Please try again later.';
        responseMessage.style.color = 'red';
    }
});
