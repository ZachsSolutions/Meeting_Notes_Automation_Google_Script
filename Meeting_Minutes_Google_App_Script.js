function getMostRecentFile(folderid) {
    var files = DriveApp.getFolderById(folderid).getFiles();
    console.log(files);
 var mostRecentFile;
  var mostRecentTime = new Date(0);
  while (files.hasNext()) {
    var file = files.next();
    if (file.getDateCreated() > mostRecentTime) {
      mostRecentFile = file;
      mostRecentTime = file.getDateCreated();
    }
  }
    
  return mostRecentFile;
  console.log('1exwPWlbGq6dKTg20QXH5a8883KcA6Q4u')
}




function createSummaryDocument() {
  // Your GPT-3 API key and endpoint
  var apiKey = "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";
  var endpoint = "https://api.openai.com/v1/completions";

// get document

var folderID = '1exwPWlbGq6dKTg20QXH5a8883KcA6Q4u';
var document4= getMostRecentFile(folderID);
var documentID = document4.getId();
//console.log(documentname);
  //var folderfiles = DriveApp.getfolderbyname('Meet Transcript');
  var document = DocumentApp.openById(documentID);
  var documentname = DocumentApp.openById(documentID).getName();
// this next var is used in the trigger to determine if the document is done processing
  var tenMinutesAgo = new Date(new Date().getTime() - 2 * 60 * 1000);
  console.log(documentname);
  console.log('checking the index of' + documentname.indexOf("Summarized") != -1);
  console.log(tenMinutesAgo + 'ten minutes ago');
  console.log(document4.getLastUpdated());
  console.log('checking the date ' + document4.getLastUpdated() < tenMinutesAgo);

if( documentname.indexOf("Summarized") == -1 || document4.getLastUpdated() > tenMinutesAgo){
  return null
}  
else{ 
  console.log(documentname);
  // Get the text body
var textbody = document.getBody();

  // The transcript of the meeting
  var transcript = '"'+'Can you please provide a summary of the following meetings transcripts into a 5 bullet point summary: '+textbody+'"';
  
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
  var body ='Hi,  Here are the points discussed for today:'+summary+'"';

document.setName(documentname + ' Summarized');  

MailApp.sendEmail(recipient,subject,body)
  // Return the document's URL
  return doc.getUrl();

 
}
}
