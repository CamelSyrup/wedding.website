function doPost(e) {
  // Get the specific sheet by name
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP");
  
  // Check if the sheet exists
  if (!sheet) {
    return ContentService.createTextOutput("Sheet not found.");
  }
  
  // Parse the form data
  const params = e.parameter;
  
  // Append the data to the "RSVP" sheet
  sheet.appendRow([params.name, params.email, params.mobile, params.rsvp, new Date()]);
  
  // Send an email notification (optional)
  MailApp.sendEmail({
    to: "joseph@minchellas.com",
    subject: "New Wedding RSVP",
    body: `New RSVP received:\n\nName: ${params.name}\nEmail: ${params.email}\nMobile: ${params.mobile}\nRSVP: ${params.rsvp}`
  });
  
  // Return a success response
  return ContentService.createTextOutput("RSVP received successfully!");
}
