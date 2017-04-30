var inputCounter = 5;
var letter = "E";

$(function () {
    var counter = 2;
    $("#addMore").click(function (e) {
        e.preventDefault();
        $("#fieldList").append("<div id='inputQuestion" + counter + "'>"
            + "<li>&nbsp;</li>"
            + "<li><textarea type='text' name='question[]' placeholder='Type question " + counter + "' /></li>"
            + "<li>&nbsp;</li>"
            + "<li><input type='radio' name='group" + counter + "' id='A' required /><input type='text' name='answer" + counter + "[]' placeholder='A' required /></li>"
            + "<li>&nbsp;</li>"
            + "<li><input type='radio' name='group" + counter + "' id='B'><input type='text' name='answer" + counter + "[]' placeholder='B' required /></li>"
            + "<li>&nbsp;</li>"
            + "<li><input type='radio' name='group" + counter + "' id='C'><input type='text' name='answer" + counter + "[]' placeholder='C' required /></li>"
            + "<li>&nbsp;</li>"
            + "<li><input type='radio' name='group" + counter + "' id='D'><input type='text' name='answer" + counter + "[]' placeholder='D' required /></li></div>"
            + "<li>&nbsp;</li>"
            + "<li><a id='addAnswer' name='addAnswer" + counter + "'  onclick='javascript:addAnswer(" + counter + ");'> Add answer </a></li>");
        counter++;
        inputCounter = 5;
        letter = "E"
    });

});

function addAnswer(id) {


    if (inputCounter <= 10) {
        if (id == 1) {
            $("#inputQuestion1").append("<li>&nbsp;</li><li><input type='radio' name='group" + id + "' id='" + letter + "'><input type='text' name='answer" + id + "[]' placeholder='" + letter + "'  /></li>");
        } else {
            $("#inputQuestion" + id + " ").append("<li>&nbsp;</li><li><input type='radio' name='group" + id + "' id='" + letter + "'><input type='text' name='answer" + id + "[]' placeholder='" + letter + "'  /></li>");
        }
    } else {
        alert("You can't make more than 10 answers");
    }
    inputCounter++;
    letter = String.fromCharCode(letter.charCodeAt(0) + 1);
}

