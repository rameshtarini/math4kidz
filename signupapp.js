/*import firebase from './node_modules/firebase';
require('firebase/auth')*/

$(function(){

    const $message = $('#message');
    $message.html('');


    const config = {
        apiKey: "AIzaSyA8o4q_9Tc8RHKtJGdx178O0TCMMuqvrE4",
        authDomain: "comp426finalproject-6d9aa.firebaseapp.com",
        databaseURL: "https://comp426finalproject-6d9aa.firebaseio.com",
        projectId: "comp426finalproject-6d9aa",
        storageBucket: "comp426finalproject-6d9aa.appspot.com",
        messagingSenderId: "1035621630993",
        appId: "1:1035621630993:web:3b67767b4fe5792b1addb0",
        measurementId: "G-HS3V1BDPJ4"
    };
    // Initialize Firebase
    firebase.initializeApp(config);

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const grade = document.getElementById('grade');
    const school = document.getElementById('school');
    const state = document.getElementById('search_');
    const btnSignUp = document.getElementById('btnSignUp');


    btnSignUp.addEventListener('click', e => {
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const fName = firstName.value;
            const lName = lastName.value;
            const realGrade = grade.value;
            const realSchool = school.value;
            const realState = state.value;
            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(email,pass);
            promise.catch(e => $message.html('<span class="has-text-danger">'+e.message+'</span>'));

            let reallID = 0

            firebase.auth().onAuthStateChanged(firebaseUser => {
              if(firebaseUser){
                reallID = firebaseUser.uid;
                firebase.database().ref('users/'+reallID).set({
                  realID: reallID,
                  email: email,
                  pass: pass,
                  fName: fName,
                  lName: lName,
                  realGrade: realGrade,
                  realSchool: realSchool,
                  realState: realState,
                  score: 0            
                });
              } else {
              }
            }
          )
        }
    )

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          let new_message = '<span class="has-text-success">You are logged in with '+ firebaseUser.email +'</span>'
          new_message += '<div>Click here to play the game and boost your score!<a href="./game.html" class="button is-primary">Game</a></div>'
          $message.html(new_message);
          btnLogout.classList.remove('hide');
        } else {
          $message.html('<span class="has-text-danger">You are not logged in.</span>');
          btnLogout.classList.add('hide');
        }
      }
    )

}());




                
                /*<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css" />

                // Initialize the FirebaseUI Widget using Firebase.
            var ui = new firebaseui.auth.AuthUI(firebase.auth());

            ui.start('#firebaseui-auth-container', {
                signInOptions: [
                  firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
                // Other config options...
              });

              ui.start('#firebaseui-auth-container', {
                signInOptions: [
                  {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                  }
                ]
              });*/
