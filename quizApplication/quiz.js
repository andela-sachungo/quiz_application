var nameAnswers = ["ans","ans1","ans2","ans3","ans4"];

var checkQuestions = function(answerName) {
	var correctlyAnswered = 0 ;
   var radios = document.getElementsByName(answerName);
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