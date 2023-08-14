This application is a tool that can be used to automatically generate and send meeting minutes after Google Meets meetings.

There are a number of pre and post installation steps to be completed for this tool to work properly. 

Pre-Installation Steps:
Download Meet Transcript add-on:  https://chrome.google.com/webstore/detail/meet-transcript/jkdogkallbmmdhpdjdpmoejkehfeefnb

<img width="674" alt="image" src="https://github.com/ZachsSolutions/Meeting_Notes_Automation_Google_Script/assets/52823904/e8b5412c-c617-43e9-917d-29856c7bd50f">

Select a new folder and save the folder ID for use later.  


Installation Steps:
Create a new file in Google Apps Script. 
Paste the Javascript into the file.  Update the Variables including API KEY and Folder ID, and email. 
<img width="950" alt="image" src="https://github.com/ZachsSolutions/Meeting_Notes_Automation_Google_Script/assets/52823904/32ecf42b-b47a-4c50-9e12-ea7fb7bcfd5c">


Post Installation Steps:
Create a trigger to run every minute.  The automation will only work once per document.
<img width="380" alt="image" src="https://github.com/ZachsSolutions/Meeting_Notes_Automation_Google_Script/assets/52823904/8e2bbb45-f099-4e81-b66a-6e3dd4e8c022">
