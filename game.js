let xGlobal = 0;
let yGlobal = 0;

$(function() {
  
    const $root = $('#root');
    $('#message').append('')

    $root.append(displayMath())
    $root.append(renderResponseForm());

    $root.on('click', '.submit', function(event)
    {
        handleSubmitButtonPress(event);
    } )
})

export const displayMath = function()
{
    var x = Math.floor(Math.random() * Math.floor(100));
    var y = Math.floor(Math.random() * Math.floor(100));
    xGlobal = x;
    yGlobal = y;
    return `<div id="question">${x} + ${y} = ?</div>`;
}
export const renderResponseForm = function()
{
    return '<form class = "formID"> <input id = "editor" type = "textarea" placeholder = "Please enter your answer"> <button class = "submit" type="submit" value = "full send"> Submit </button></form>';
}

export const handleSubmitButtonPress = function(event)
{
    const $root = $('#root');
    const $form = $('.formID');

    event.preventDefault();

    if ($("input[id=editor]").val() == (xGlobal + yGlobal))
    {
        location.reload()
        $('#question').replaceWith(displayMath())
        $form.replaceWith(renderResponseForm());
    }
    else 
    {
        $('#question').replaceWith(displayMath())
        $form.replaceWith(renderResponseForm());
    }
}

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
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      firebase.database().ref().child("users").once('value', function (snapshot) {
        snapshot.forEach(function(childSnapshot) {
         if(childSnapshot.val().realID==firebaseUser.uid){
           let scored = '<span>Score: ' + childSnapshot.val().score + '</span>'
          $('#message').html('<div class="boxName">' + scored + '</div>') 
          let updates = {}
          updates['/users/' + firebaseUser.uid + '/score'] = childSnapshot.val().score + 1;
          firebase.database().ref().update(updates)
         }
       });
     }); 
    }
    else{
        let new_message = '<span class="has-text-danger">You are not logged in!</span>'
        new_message += '<div>Click here to log in and keep track of your skills!<a href="./login.html" class="button is-primary">Log in</a></div>'
        new_message += '<div>If you do not have an account, click here to make one!<a href="./signup.html" class="button is-primary">Sign up</a></div>'
        $('#message').html(new_message);
    }
  }
)
