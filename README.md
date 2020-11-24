# COMP426-Final

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
realState    |  string   |  "Hawaii"     | State the student lives in at the time of sign up
 score       |  number   |      1      | The score the student has
 
 
 
 Everytime we want to update a student's data in the database we must use firebase.auth() to check the logged in user and then find the corresponding student in the database.
 The rest of the documentation to use this web app can be found in Firebase's documentation.
