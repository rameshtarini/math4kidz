$(function(){

    const $message = $('#message');
    $message.html('');

    const $object = $('#object');
    $object.html('');

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
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');

    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,pass);
        promise.catch(e => catchfunc(e));
    }
  )

  function catchfunc(e) {
    $message.html('<span class="has-text-danger">'+e.message+'</span>'); 
    $object.html('');
  }

    btnLogout.addEventListener('click', e => {
      $object.html('');
      firebase.auth().signOut();
    }

    )

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          let new_message = '<span class="has-text-success">You are logged in with '+ firebaseUser.email +'</span>'
          new_message += '<div>Click here to play the game and boost your score!<a href="./game.html" class="button is-primary">Game</a></div>'
          $message.html(new_message);
          btnLogout.classList.remove('hide');

          firebase.database().ref().child("users").once('value', function (snapshot) {
            snapshot.forEach(function(childSnapshot) {
             if(childSnapshot.val().realID==firebaseUser.uid){
               let scored = '<div> Score: ' + (Number(childSnapshot.val().score)-1).toString() + '</div>'
              $object.html(scored);
             }
           });
         }); 
        } else {
          $message.html('<span class="has-text-danger">You are not logged in.</span>');
          btnLogout.classList.add('hide');
        }
      }

    )


});