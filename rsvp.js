document.getElementById('rsvp-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const rsvp = document.getElementById('rsvp').value;

    // Airtable Configuration
    const airtableToken = '8f1785a651a764acb0e0a517b1a39b7d27529ec4ad480037304b43a6e00f1f97'; // Replace with your PAT
    const baseId = 'UWZ9bOtOKv2eVU'; // Replace with your Base ID
    const tableName = 'RSVPs'; // Replace with your Table Name

    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const airtableData = {
        records: [
            {
                fields: {
                    Name: name,
                    Email: email,
                    Mobile: mobile,
                    RSVP: rsvp
                }
            }
        ]
    };

    const responseMessage = document.getElementById('response-message');

    try {
        console.log('Submitting data to Airtable:', airtableData);

        // Send data to Airtable
        const airtableResponse = await fetch(airtableUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${airtableToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(airtableData)
        });

        console.log('Airtable response status:', airtableResponse.status);

        // Check if response is OK
        if (!airtableResponse.ok) {
            const errorResponse = await airtableResponse.text(); // Get error message
            console.error('Airtable response error:', errorResponse);
            throw new Error(`Airtable Error: ${airtableResponse.statusText}`);
        }

        const responseData = await airtableResponse.json();
        console.log('Airtable response data:', responseData);

        // Send email notification via Formspree
        const formspreeUrl = 'https://formspree.io/f/xkgwbboz'; // Replace with your Formspree form ID

        const emailData = {
            name: name,
            email: email,
            mobile: mobile,
            rsvp: rsvp
        };

        console.log('Submitting data to Formspree:', emailData);

        const emailResponse = await fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        console.log('Formspree response status:', emailResponse.status);

        // Check if response is OK
        if (!emailResponse.ok) {
            const emailErrorResponse = await emailResponse.text(); // Get error message
            console.error('Formspree response error:', emailErrorResponse);
            throw new Error(`Formspree Error: ${emailResponse.statusText}`);
        }

        // Success feedback
        responseMessage.textContent = 'Thank you for your RSVP!';
        responseMessage.style.color = 'green';
        document.getElementById('rsvp-form').reset();
    } catch (error) {
        console.error('Submission Error:', error);
        responseMessage.textContent = `There was an issue submitting your RSVP: ${error.message}`;
        responseMessage.style.color = 'red';
    }
});

