// Initialize Firebase
var config = {
    apiKey: "AIzaSyBOufkehZtx8l7FErtstXY98mlPTXWQ4vU",
    authDomain: "testingappproject.firebaseapp.com",
    databaseURL: "https://testingappproject.firebaseio.com",
    storageBucket: "testingappproject.appspot.com",
    messagingSenderId: "358517152444"
};
firebase.initializeApp(config);

var count = 1;
var submitBtn = document.getElementById("submitBtn");
var randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
document.getElementById("quizID").innerHTML = randomNumber;
var userRole = "";


//Get elements
const preObject = document.getElementById('object');

//Create references
const dbRefObject = firebase.database().ref().child('object');

//
dbRefObject.on('value', snap => console.log(snap.val())
)
;


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById('signUp').style.visibility = "hidden";
        document.getElementById('signIn').style.visibility = "hidden";
        document.getElementById('signOut').style.visibility = "visible";
    } else {
        // No user is signed in.
        document.getElementById('signOut').style.visibility = "hidden";
    }
});

function signIn() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("signed out");
    }, function (error) {
        // An error happened.
    });

    var emailSignIn = document.getElementById("inputEmailSignIn");
    var passwordSignIn = document.getElementById("inputPasswordSignIn");


    firebase.auth().signInWithEmailAndPassword(emailSignIn.value, passwordSignIn.value).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("user is not signed in ", errorMessage);
        // ...
    });

    $('#myModalHorizontalSignIn').modal('hide');

    var myDelay = 1000;
    setTimeout(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          alert("User is signed in")
            location.reload();
        } else {
           alert("incorrect password")
        }
    });
    }, myDelay);
}

function signUp() {

    console.log("signed in working");
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("signed out");
    }, function (error) {
        // An error happened.
    });

    var inputName = document.getElementById("inputName3");
    var inputEmail = document.getElementById('inputEmail3');
    var inputPassword = document.getElementById('inputPassword3');
    var checkRole = document.getElementById("");
    var inputGroup = document.getElementById("inputGroup3");
    if (inputGroup.value == null || inputGroup.value == "") {
        var inputGroup = "teachers";
        console.log(inputGroup)
    } else {
        var inputGroup = inputGroup.value;
    }

    firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputPassword.value).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });

    var myDelay = 2000;

    setTimeout(function () {
        var user = firebase.auth().currentUser;
        var firebaseRef = firebase.database().ref();

        user.providerData.forEach(function (profile) {
            console.log("  Provider-specific UID: " + user.uid);
			alert("User created")
        })

        firebaseRef.child("userInformation").child(user.uid).set({
            email: inputEmail.value,
            group: inputGroup,
            name: inputName.value,
            role: userRole
        });

    }, myDelay);
    $('#myModalHorizontal').modal('hide');
}

function signOut() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("signed out");
    }, function (error) {
        // An error happened.
    });
    location.reload();

}

function setRole(role) {

    if (document.getElementById('studentRole').checked) {
        document.getElementById('ifStudent').style.display = 'block';
    }
    else document.getElementById('ifStudent').style.display = 'none';

    userRole = role;
    console.log(userRole)
}

var timer

function setTime(time) {
    console.log(time)

    timer = time

}

function submitClick() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("signed out");
    }, function (error) {
        // An error happened.
    });

    var content = $("<form onsubmit='submitQuiz(); return false;' role='form'><div>Submit your quiz <br> Only teachers can apply new quizes <br /><br /><input id='email' class='form-control' type='email' placeholder='Enter your email' required /> <br><input id='password' class='form-control' type='password' placeholder='Enter your password'  pattern='^(?=.*[A-Za-z]).{6,}$' title='6 or more characters' required /> <br><br><button type='submit' class='btn btn-default'> Submit </button> </div></form>");
    var button = $("<br><input style='display:none' type='submit' class='btn btn-default' value='Submit!' />");
    content.append(button);

    $.fancybox({content: content});

}

function submitQuiz() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("signed out");
    }, function (error) {
        // An error happened.
    });

    var email1 = document.getElementById('email');
    var password1 = document.getElementById('password');

    firebase.auth().signInWithEmailAndPassword(email1.value, password1.value).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR while signin");
    });

    var delayMillis = 1000; //1 second


    setTimeout(function () {
        //your code to be executed after 1 second

        var user = firebase.auth().currentUser;
        var uid = 1;


        if (user) {
            // User is signed in.
            console.log("loggedd in");

            user.providerData.forEach(function (profile) {

                console.log("  Provider-specific UID: " + user.uid);


                var firebaseRef = firebase.database().ref();
                var newTestForm = document.getElementById("newTestForm");
                var questions = newTestForm.elements['question[]'];
                var quizTitle = newTestForm.elements['quizTitle'];

                var answersLength = newTestForm.elements['answer1[]'];

                console.log("stage 1");

                firebaseRef.child("Tests").child(randomNumber).set({
                    quizTitle: quizTitle.value,
                    teacherID: user.uid,
                    quizTime: timer
                });


                for (var i = 0; i < questions.length; i++) {


                    answersLength = newTestForm.elements['answer' + count + '[]'];
                    console.log("I have " + answersLength.length + " Answers");
                    console.log("I have " + questions.length + " Questions");

                    var stupidCounter = 0;
                    var anotherStupidCounter = 0;

                    var correctAnswer = $('input[name="group' + count + '"]:checked').attr('id');

                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerA: answersLength[0].value,
                            correctAnswer: correctAnswer,
                            question: questions[i].value,
                            questionNumber: String(i + 1)
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerB: answersLength[1].value
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerC: answersLength[2].value
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerD: answersLength[3].value
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerE: answersLength[4].value
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerF: answersLength[5].value
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerG: answersLength[6].value
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerH: answersLength[7].value
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerI: answersLength[8].value
                        });
                        stupidCounter++;
                    }
                    if (stupidCounter < answersLength.length) {
                        firebaseRef.child("Tests").child(randomNumber).child("Questions").child("Question " + count).update({
                            answerJ: answersLength[9].value
                        });
                        stupidCounter++;
                    }

                    count++;
                }

            });
            closeFancy();
            alert("Quiz created")

        } else {
            // No user is signed in.
            console.log("not logged in");
        }
    }, delayMillis);

    function closeFancy() {
        $.fancybox.close();
    }

}
	

	

