

// var count = 0;

// questions.forEach(function(item){
// 	count++;
// 	var html = '<legend class ="questionText"> Question ' + count + ' of ' + questions.length + '</legend>' +
// 		'<div class = "question">' + item.Question + '</div>' +
// 		'<div class = "answerList">';

// 	item.answerChoices.forEach(function(choice){
// 		html += '<input class = "answer" type="radio" value="' + choice + '" count=' + count +
// 			' name ="question'+ count + '" /> ' + choice;
// 	});
// 	html += '</div>';

// 	$(".test").append('<fieldset>' + html + '</fieldset>');
// });



/* $(function (){}) is the same as $(document).ready(function() {}), it tell the JavaScript
  not to execute until the DOM is ready */
$(function() {
/* create an array of objects to hold the questions, anwers and the correct answer */
var questions = [{Question: "What is 5+2 ?",  answerChoices: [7, 10, 12, 6], correctAnswer: 7}, 
                {Question: "What is 30/15 ?",  answerChoices: [3, 4, 2, 5], correctAnswer: 2}, 
                {Question: "What is 23*3 ?",  answerChoices: [68, 69, 67, 66], correctAnswer: 69}, 
                {Question: "What is 45*3 ?",  answerChoices: [145, 115, 125, 135], correctAnswer: 135}, 
                {Question: "What is 15*45 ?",  answerChoices: [695, 665, 670, 675], correctAnswer: 675}];
                
var questionCount = 0; //count the questions
var userSelection = []; // stores the user choices in an array
var test = $("#test"); // cache the div id in the html file

$("#submit").hide();

/* create and return the div element that will have the questions and the answer choices to be selected */
var questionAnswerElement = function(index) {
	/*creating a new fieldset element */
	var questionDiv = $("<fieldset />", {
        "id" : 'quiz'
	});
    
    /*creating the content of  the <legend> tag for each question and add it to the fieldset element */
	var questionInfo = $("<legend> Question " + (index+1) + " of " + questions.length +"</legend>" );
	questionDiv.append(questionInfo);

	/* create a <p> tag and add the question to it, then add the p tag and its content to the fieldset */
	var question = $("<p>").append(questions[index].Question);
	questionDiv.append(question);

	/* call the function for creating the radio buttons and answers and assign its return value to 
	 the variable radios, then append it to the fieldset */
	 var radios = radioAnswers(index);
	 questionDiv.append(radios);

	/*return the fieldset element to be used in another function */
	return questionDiv; 
}; // end of function


/* create a function that list the answers in a list with radio buttons */
var radioAnswers = function(number) {
	var radioList = $("<ul>"); //create a ul element and cache it
	var item;
	var input="";

	for(var i = 0; i < questions[number].answerChoices.length; i++)  {
		item = $("<li>"); //create a list element 

		/*create the radio buttons and attach the answers to them */
		input = "<input type = 'radio' name ='answer' value =" + i + " />";
		input += questions[number].answerChoices[i];

		/* append the input to the li element then the li element to the ul element */
		item.append(input); 
		radioList.append(item); 
	}

	return radioList; 
}; //end of function

/* create a function to compute the score and display the result once a person finishes 
the test and clicks submit */
var getScore = function() {
	/* create a new p element with a different id */
	var score = $("<p />", {
       "id" :'score'
	});

	var correct = 0;
	/* loop through the user choices and compute the score */
	for(var x = 0; x < userSelection.length ; x++){
		if(userSelection[x] === questions[x].correctAnswer) {
			correct++;
		}
	} 
	/* write the score to the DOM */
  var output = "Congratulations for fininshing the quiz! " + "Your score is " + correct + " out of " + questions.length;
  
	score.append(output);

	return score;

}; //end of function

/* create a function that the questions together with answers each time it's called */
var displayQuestion = function () {
	/*when the function is called, first fade out the element attached to it to transparent then 
	 load the next question, which is faded into the page, by writing the function for it as 
	 the callback of the fadeOut() */
   test.fadeOut(function() {
   	/*  remove the fieldset with the given id together with anything associated 
   	   with it, i.e. the question element */
   	 $("#quiz").remove();

   	 /* getting the next question */
   	 if(questionCount < questions.length) {
   	 	var nextQuestion = questionAnswerElement(questionCount);
   	 	test.append(nextQuestion).fadeIn();
   	 	if(questionCount === (questions.length - 1)){
   	 		$("#next").hide();
   	 		$("#submit").show();

   	 		/* event handler for the submit button */
   	 		/* append the score to the page when the user clicks submit */
   	 		$("#submit").on('click', function(anEvent) {
   	 			anEvent.preventDefault(); //to prevent the browser's default action from occurring when it sees the submit button
	
			    if(test.is(":animated")) {
				  return false; //stops the default event action from being called and stopping the event from propagating
			    }

			    $("#intro").hide();
   	 		    $("h1").hide();
   	 		    $("#quiz").hide();
   	 		    userSelection.push(chosenAnswer()); //push the answer chosen for the last question into the array
               console.log(userSelection);  

	           var scoreResult = getScore();
               test.append(scoreResult).fadeIn();
               $("#submit").hide();
   	 		});
   	 	}
   	 }
    }); //end of fadeout 
 
}; // end of function

 /* display the first question */
  displayQuestion();

/* create a  function to store the user choices in an array */
var chosenAnswer = function () {
   var temp = $("input[name ='answer']:checked").val(); //gets the index of the answer chosen
   var answerChosen = questions[questionCount].answerChoices[temp]; //go to the answer choices and takes the value of the above index
   return answerChosen;
}; // end of function

/* event handler for the next button in the page */
/*created usin the on() method, the event name is the first parameter 
  and  the event handler is the second parameter */

$("#next").on('click', function(argEvent) {
	//stop the click listener from operating when the div with id element is being faded out
	argEvent.preventDefault(); //to prevent the browser's default action from occurring when it sees the next button

	if(test.is(":animated")) {
		return false; //stops the default event action from being called and stopping the event from propagating
	}

	// var choice = chosenAnswer(); //call the function that stores the answer chosen
    userSelection.push(chosenAnswer()); //push the value of the chosenAnswer() return to the array

	questionCount++; //increase the question counter by one
    displayQuestion(); //display the next question
  
});
 
/* change the background color of the selected radio button */
// $("input[type ='radio']").on('click', function() {
//   $(this).css("background", "#40E0D0");
// });

});
