    // Save data to Airtable
    const airtableApiKey = 'pat8WDS8uO5hmisQd.8f1785a651a764acb0e0a517b1a39b7d27529ec4ad480037304b43a6e00f1f97';
    const airtableBaseId = 'UWZ9bOtOKv2eVU';
    const airtableTableName = 'Wedding RSVP';
    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
    // Above is old


document.getElementById('rsvp-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Capture form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value;
    const rsvp = document.getElementById('rsvp').value.trim();

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
                    RSVP: rsvp,
                }
            }
        ]
    };

    const responseMessage = document.getElementById('response-message');

    try {
        // Send data to Airtable
        const airtableResponse = await fetch(airtableUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${airtableToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(airtableData)
        });

        if (!airtableResponse.ok) {
            throw new Error(`Airtable Error: ${airtableResponse.statusText}`);
        }

        // Send email notification via Formspree
        const formspreeUrl = 'https://formspree.io/f/xkgwbboz'; // Replace with your Formspree form ID

        const emailData = {
            name: name,
            email: email,
            message: `RSVP: ${rsvp}\nPlus One: ${plusOne || 'N/A'}\nComments: ${comments || 'N/A'}`
        };

        const emailResponse = await fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!emailResponse.ok) {
            throw new Error(`Formspree Error: ${emailResponse.statusText}`);
        }

        // Success feedback
        responseMessage.textContent = 'Thank you for your RSVP!';
        responseMessage.style.color = 'green';
        document.getElementById('rsvp-form').reset();
    } catch (error) {
        console.error('Submission Error:', error);
        responseMessage.textContent = 'There was an issue submitting your RSVP. Please try again later.';
        responseMessage.style.color = 'red';
    }
});
