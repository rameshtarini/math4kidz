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


    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          firebase.database().ref().child("users").on('value', function (snapshot) {
            snapshot.forEach(function(childSnapshot) {
             if(childSnapshot.val().realID==firebaseUser.uid){
                let profile = '<h2 class="boxName">'  + childSnapshot.val().fName + ' ' + childSnapshot.val().lName + '</h2>'
                //profile += '<div>'+ childSnapshot.val().email + '</div>'
                profile += '<div><img src="https://img.icons8.com/cotton/64/000000/student-male--v1.png"/>Grade: ' + childSnapshot.val().realGrade + '</div>'
                profile += '<div><img src="https://img.icons8.com/cotton/64/000000/school-backpack--v1.png"/>School: ' + childSnapshot.val().realSchool + '</div>'
                profile += '<div><img src="https://img.icons8.com/dusk/64/000000/worldwide-location.png"/>State: ' + childSnapshot.val().realState + '</div></br></br>'
                profile += '<div class="boxName">Score: ' + (Number(childSnapshot.val().score)-1).toString() + '</div>'
                profile += '<div>Click here to play the game and boost your score!<a href="./game.html" class="button is-primary">Game</a></div>'
                $message.html(profile) 
             }
           });
         }); 
        } else {
          let new_message = '<span class="has-text-danger">You are not logged in.</span>'
          new_message += '<div>Click here to log in and check yourself out!<a href="./login.html" class="button is-primary">Log in</a></div>'
          new_message += '<div>If you do not have an account, click here to make one!<a href="./signup.html" class="button is-primary">Sign up</a></div>'
          $message.html(new_message);
        }
      }

    )


});