var nameAnswers = new Array ();
    nameAnswers[0] = "ans";
    nameAnswers[1] = "ans1";
    nameAnswers[2] = "ans2";
    nameAnswers[3] = "ans3";
    nameAnswers[4] = "ans4";

// var answers = new Array();
//     answers[0] = 7;
//     answers[1] = 2;
//     answers[2] = 69;
//     answers[3] = 135;
//     answers[4] = 675;

var correctlyAnswered = 0;
var checkQuestions = function(answerName) {
   var radios = document.getElementsByName("answerName");
   for(var i = 0; i < radios.length; i++) {
   	if(radios[i].checked) {
   		if(radios[i].value === "correct") {
           correctlyAnswered++;
   		}
   	}
   }
   return correctlyAnswered;
};

var checkAllQuestions = function() {
	var total = 0;
	for(var x = 0; x < nameAnswers.length; x++) {
       total += checkQuestions(nameAnswers[x]);
	}
   test.correctAnswer.value = total;
   return false;
};