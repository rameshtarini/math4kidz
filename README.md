# Math4Kidz

Math4Kidz is a group project I did for my Web Programming class. We were tasked with building a full stack website from scratch to address a need. Due to the COVID-19 pandemic disrupting education and widening existing inequalities, I wanted to create a web app to ameliorate this issue. Thus, we created Math4Kidz, a gamified way for kids to strengthen their math skills and simulate a classroom environment at home.

This web app deals with student objects. Every student object has the following attributes:

   name      |   type    |   example   |                description
-------------|-----------|-------------|---------------------------------------------
  email      |  string   | "email@gmail.com" | The email a student puts when signing up / uses to log in
  fName      |  string   |   "John"    | The student's first name
   lName     |  string   |   "Smith"   | The student's last name
  pass       |  string   |  "pass123"  | Password to log in
realGrade    |  string   |    "6"      | Grade the student is in at the time of sign up 
   realID    |  number   |    12345    | ID of student in database & authentication to match data with logged in user
realSchool   |  string   |     "UNC"   | School the student attends at the time of sign up 
realState    |  string   |  "Hawaii"   | State the student lives in at the time of sign up
 score       |  number   |      1      | The score the student has
 
A student can create / log into a free account on any chromium-based browser, check out their profile, and play the math game. Everytime they get an answer correct, their score increases! In the backend, everytime we want to update a student's data in the database we must use firebase.auth() to check the logged in user and then find the corresponding student in the database. The rest of the documentation to use this web app can be found in Firebase's documentation.

To check out the website, click here: https://comp426finalproject-6d9aa.web.app/index.html

To learn more about why we created the website and how to use it, watch the YouTube video here: https://www.youtube.com/watch?v=Vd3PqWbjvC0
