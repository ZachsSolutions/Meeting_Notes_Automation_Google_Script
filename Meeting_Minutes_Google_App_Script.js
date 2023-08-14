function createSummaryDocument() {
  // Your GPT-3 API key and endpoint
  var apiKey = "ENTER_API_KEY; //Your API Key goes Here
  var endpoint = "https://api.openai.com/v1/completions";

  
  var document = DocumentApp.openById('ENTER FOLDER NAME'); // This part needs to be updated to grab the most recent documents in a folder. Still to be done.
  var documentname = DocumentApp.openById('ENTER DOC NAME').getName();
  
  // Get the text body
var textbody = document.getBody().getText(); 

  // The transcript of the meeting
  var transcript = '"'+'Can you please provide a summary of the following meetings transcripts into a two column table, with the headers subject, and points discussed: '+textbody+'"';
  
  // Set up the request body
  var requestBody = {"model":"text-davinci-003",
        "prompt": transcript,
        "temperature":0.5,
        "max_tokens":60,
        "top_p":0.3,
        "frequency_penalty":0.5,
        "presence_penalty":0}
  
  // Call out to the GPT-3 API
  var options = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    "payload": JSON.stringify(requestBody)
  };
  var response = UrlFetchApp.fetch(endpoint, options);
  console.log(response);
  // Parse the API response
  var json = JSON.parse(response.getContentText());
  var summary = json.choices[0].text;
  console.log(summary);
  // Extract the subjects and points discussed from the summary
  var subjects = [];
  var points = [];
  var lines = summary.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.startsWith("Subject:")) {
      subjects.push(line.substring("Subject: ".length));
    } else if (line.startsWith("Points Discussed:")) {
      points.push(line.substring("Points Discussed: ".length));
    }
  }
   var d = new Date();
    var currentTime = d.toLocaleTimeString();
  // Create a new Google Document
  var doc = DocumentApp.create("Meeting Summary" +currentTime);
  var body = doc.getBody();
  
  // Create a table and add it to the document
  var table = body.appendTable([["Subject", "Points Discussed"]]);
  
  //Populate the table with the subjects and points discussed
  for (var i = 0; i < subjects.length; i++) {
    table.appendRow([summary, points[i]]);
  }
  

  // creating an email to send the body in
  var recipient ='zj.linehan@gmail.com';
  var subject ='Meeting minutes for today '+documentname ;
  var body = '"'+'Hi,  Here are the points discussed for today...'+summary+'"';

MailApp.sendEmail(recipient,subject,body)
  // Return the document's URL
  return doc.getUrl();

  
}
