var config = {
    apiKey: "AIzaSyBOufkehZtx8l7FErtstXY98mlPTXWQ4vU",
    authDomain: "testingappproject.firebaseapp.com",
    databaseURL: "https://testingappproject.firebaseio.com",
    storageBucket: "testingappproject.appspot.com",
    messagingSenderId: "358517152444"
};
firebase.initializeApp(config);

var user = firebase.auth().currentUser;

function showStatistic() {

    $('#statistic').load(document.URL + ' #statistic');

    var firebaseRef = firebase.database().ref();
    var teacherID;
    var PIN = document.getElementById('PIN');
    var groupName = document.getElementById('studentGroup');

    setTimeout(
        function () {
            firebaseRef.child("Tests").child(PIN.value).once('value').then(function (snapshot) {
                teacherID = snapshot.val().teacherID;
                // ...
            });
        }
        , 300);

    setTimeout(
        function () {

            firebaseRef.child("Tests").child(PIN.value).once('value').then(function (snapshot) {
                teacherID = snapshot.val().teacherID;
                // ...
            });

            var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

            firebaseRef.child("Tests").child(PIN.value).child("Questions").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {

                    var answersArray = [];

                    var childKey = childSnapshot.key;
                    var question = childSnapshot.val().question;
                    var answerA = childSnapshot.val().answerA;
                    var answerB = childSnapshot.val().answerB;
                    var answerC = childSnapshot.val().answerC;
                    var answerD = childSnapshot.val().answerD;
                    var answerE = childSnapshot.val().answerE;
                    var answerF = childSnapshot.val().answerF;
                    var answerG = childSnapshot.val().answerJ;
                    var answerH = childSnapshot.val().answerH;
                    var answerI = childSnapshot.val().answerI;
                    var answerJ = childSnapshot.val().answerJ;

                    answersArray.push(answerA);
                    answersArray.push(answerB);
                    answersArray.push(answerC);
                    answersArray.push(answerD);
                    answersArray.push(answerE);
                    answersArray.push(answerF);
                    answersArray.push(answerG);
                    answersArray.push(answerH);
                    answersArray.push(answerI);
                    answersArray.push(answerJ);


                    var histogram = {};
                    histogram["A"] = 0;
                    histogram["B"] = 0;
                    histogram["C"] = 0;
                    histogram["D"] = 0;
                    histogram["E"] = 0;
                    histogram["F"] = 0;
                    histogram["G"] = 0;
                    histogram["H"] = 0;
                    histogram["I"] = 0;
                    histogram["J"] = 0;

                    console.log(childKey);

                    $("#questionsList").append("<h1>" + childKey + "</h1>"
                        + "<div id='" + childKey + "' style='height: 500px; width: 100%;'>"
                        + "<li>&nbsp;</li>"
                        + "</div>");

                    firebaseRef.child("userInformation").child(teacherID).child("teacherQuizes").child(PIN.value).child("groups").child(groupName.value).child("userAnswers").child(childKey).once('value').then(function (snapshot) {
                        var usersAnswerArray = snapshot.val().myAnswer;
                        console.log(usersAnswerArray);

                        for (var i = 0; i < usersAnswerArray.length; i++) {
                            var letter = usersAnswerArray[i];
                            histogram[letter] = (histogram[letter] || 0) + 1;
                        }
                        console.log(histogram["D"]);
                    });

                    setTimeout(
                        function () {

                            var chart = new CanvasJS.Chart(childKey,
                                {
                                    title: {
                                        text: question
                                    },
                                    animationEnabled: true,
                                    legend: {
                                        verticalAlign: "bottom",
                                        horizontalAlign: "center"
                                    },
                                    theme: "theme1",
                                    data: [
                                        {
                                            type: "pie",
                                            indexLabelFontSize: 20,
                                            startAngle: 0,
                                            toolTipContent: "{indexLabel} - #percent %",
                                            legendText: "{name}",
                                            showInLegend: true,
                                            indexLabel: "#percent %",
                                            dataPoints: []
                                        }
                                    ]
                                });

                            for (var i = 0; i < alphabet.length; i++) {

                                if (histogram[alphabet[i]] > 0) {
                                    chart.options.data[0].dataPoints.push({
                                        y: histogram[alphabet[i]],
                                        name: answersArray[i]
                                    });
                                } else if (answersArray[i] != undefined) {
                                    chart.options.data[0].dataPoints.push({
                                        y: histogram[alphabet[i]],
                                        name: answersArray[i]
                                    });
                                }


                                console.log(histogram["D"]);
                                console.log(alphabet[i]);

                            }
                            chart.render();

                        }, 1500);
                });
            });

        }
        , 1000);

}

function showStudentResult() {

    //$('#statistic_studentsResults').load(document.URL +  ' #statistic_studentsResults');

    var firebaseRef = firebase.database().ref();
    var teacherID;
    var userName;
    var userResult;
    var PIN = document.getElementById('PIN_studentsResults');
    var groupName = document.getElementById('studentGroup_studentsResults');

    firebaseRef.child("Tests").child(PIN.value).once('value').then(function (snapshot) {
        teacherID = snapshot.val().teacherID;
        $("#resultList").append("<h1 style='color: #FFFFFF'>" + PIN.value + "</h1>");
        console.log(teacherID)
    });

    setTimeout(
        function () {
            firebaseRef.child("userInformation").child(teacherID).child("teacherQuizes").child(PIN.value).child("groups").child(groupName.value).child("userNames").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {

                    userName = childSnapshot.val().name;
                    userResult = childSnapshot.val().userResult;
                    $("#resultList").append("<h1 style='color: #FFFFFF'>" + userName + "</h1>");
                    $("#resultList").append("<h1 style='color: #FFFFFF'>" + userResult + " correct answers</h1>");
                });
            });

        }
        , 300);
}