// var nameAnswers = ["ans","ans1","ans2","ans3","ans4"];

// var checkQuestions = function(answerName) {
// 	var correctlyAnswered = 0 ;
//    var radios = document.getElementsByName(answerName);
//    for(var i = 0; i < radios.length; i++) {
//    	if(radios[i].checked) {

//    		if(radios[i].value === "correct") {
//            correctlyAnswered++;
           
//    		}
//    	}
//    }
//    return correctlyAnswered;
// };

// var checkAllQuestions = function() {
// 	var total = 0;
// 	for(var x = 0; x < nameAnswers.length; x++) {
//        total += checkQuestions(nameAnswers[x]);
// 	}
//    test.correctAnswer.value = total;
//    return false;
// };

var questions = [{Question: "What is 5+2 ?",  answerChoices: [7, 10, 12, 6], correctAnswer: 7}, 
                {Question: "What is 30/15 ?",  answerChoices: [3, 4, 2, 5], correctAnswer: 2}, 
                {Question: "What is 23*3 ?",  answerChoices: [68, 69, 67, 66], correctAnswer: 69}, 
                {Question: "What is 45*3 ?",  answerChoices: [145, 115, 125, 135], correctAnswer: 135}, 
                {Question: "What is 15*45 ?",  answerChoices: [695, 665, 670, 675], correctAnswer: 675}];

// var numberQuestions = 0;
// var userSelection = [];


// var getQuestion = function() {
//     // for( var i = 0; i < question.length; i++){
//     // }
//     var numberQuestions = 0;
//     var questionClass = $(".question");
//     var questions = $("<p>").append(question[numberQuestions].Question);
//     questionClass.append(questions);

//     return questionClass;
// };

var count = 0;

questions.forEach(function(item){
	count++;
	var html = '<legend class ="questionText"> Question ' + count + ' of ' + questions.length + '</legend>' +
		'<div class = "question">' + item.Question + '</div>' +
		'<div class = "answerList">';

	item.answerChoices.forEach(function(choice){
		html += '<input class = "answer" type="radio" value="' + choice + '" count=' + count +
			' name ="question'+ count + '" /> ' + choice;
	});
	html += '</div>';

	$(".test").append('<fieldset>' + html + '</fieldset>');
});

$("input.answer").click(function(){
	var ans = $(this);
	var number = ans.attr("count");
	console.log(number);
	if(ans === questions[number].correctAnswer) {
		console.log("correct answer");
	}
	else {
		console.log("wrong answer");
	}
})
