/* $(function (){}) is the same as $(document).ready(function() {}), it tell the JavaScript
  not to execute until the DOM is ready */
$(function() {
/* create an array of objects to hold the questions, answers and the correct answer */
var questions = [{Question: "Lionel is younger than Maria" +"<br>" + "<table style ='width: 50%'><tr>" +
                "<th style ='width: 50%; text-align: center; text-decoration:underline'> Quantity A </th>" + 
                "<th style='width:50%; text-align: center; text-decoration:underline'>" +
                "Quantity B </th></tr>" + "<tr><td style ='width:50%; text-align: center'> Twice Lionel's age </td>" +
                "<td style ='width: 50%; text-align: center'> Maria's age </td></tr></table>" ,

                 answerChoices: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", 
                 "The relationship cannot be determined from the information given"], 
                 correctAnswer: "The relationship cannot be determined from the information given"}, 

                {Question:"<table style='width: 50%'><tr><th style = 'width: 50%; text-align: center; text-decoration:underline'>" + 
                "Quantity A </th>" + "<th style='width: 50%; text-align: center; text-decoration:underline'>" + 
                " Quantity B </th></tr><br>" + "<tr><td style = 'width: 50%; text-align: center'> 54% of 360 </td>" +
                "<td style ='width: 50%; text-align: center'> 150 </td></tr></table>",

                 answerChoices: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", 
                 "The relationship cannot be determined from the information given"], 
                 correctAnswer: "Quantity A is greater"}, 

                {Question: "<table style ='width: 50%'><tr><th style ='width: 50%; text-align: center; text-decoration:underline'>" + 
                " Quantity A </th>" + "<th style ='width: 50%; text-align: center; text-decoration:underline'> Quantity B</th></tr>"+
                "<tr><td style = 'width: 50%; text-align:center'> The least prime number greater than 24 </td>" +
                "<td style = 'width: 50%; text-align:center'> The greatest prime number less than 28 </td></tr></table>" ,

                answerChoices: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", 
                 "The relationship cannot be determined from the information given"], 
                correctAnswer: "Quantity A is greater"}, 

                {Question: "<table style ='width: 50%'><tr><th style ='width: 50%; text-align: center; text-decoration:underline'>" + 
                "Quantity A </th>" + "<th style ='width: 50%; text-align: center; text-decoration:underline'> Quantity B </th></tr><br>"+ 
                "<tr><td style ='width: 50%; text-align: center'> ((2^30)-(2^29))/2 </td>" +
                "<td style ='width: 50%; text-align: center'> (2^28) </td></tr></table>", 

                answerChoices: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", 
                 "The relationship cannot be determined from the information given"], 
                correctAnswer: "The two quantities are equal"}, 

                {Question: "<table style ='width: 50%'><tr><th style ='width: 50%; text-align: center; text-decoration:underline'>" + 
                " Quantity A </th>" + "<th style ='width: 50%; text-align: center; text-decoration:underline'> Quantity B </th></tr><br>"+ 
                "<tr><td style ='width: 50%; text-align: center'> (x^2) + 1 </td>" +
                "<td style ='width: 50%; text-align: center'> 2x - 1 </td></tr></table>",  

                answerChoices: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", 
                 "The relationship cannot be determined from the information given"],
                correctAnswer: "Quantity A is greater"}];
                
var questionCount = 0; //count the questions
var userSelection = []; // stores the user choices in an array
var test = $("#test"); // cache the div id in the html file

$("#submit").hide();

/* create and return the div element that will have the questions and the answer choices to be selected */
var questionAnswerElement = function(index) {
	//creating a new fieldset element 
	var questionDiv = $("<fieldset />", {
        "id" : 'quiz'
	});
    
  //creating the content of  the <legend> tag for each question and add it to the fieldset element 
	var questionInfo = $("<legend> Question " + (index+1) + " of " + questions.length +"</legend>" );
	questionDiv.append(questionInfo);

	//create a <p> tag and add the question to it, then add the p tag and its content to the fieldset 
	var question = $("<p>").append(questions[index].Question);
	questionDiv.append(question);

	/* call the function for creating the radio buttons and answers and assign its return value to 
	the variable radios, then append it to the fieldset */
	var radios = radioAnswers(index);
	questionDiv.append(radios);

	//return the fieldset element to be used in another function 
	return questionDiv; 
}; // end of function


/* create a function that list the answers in a list with radio buttons */
var radioAnswers = function(number) {
	var radioList = $("<ul>"); //create a ul element and cache it
	var item;
	var input="";

	for(var i = 0; i < questions[number].answerChoices.length; i++)  {
		item = $("<li>"); //create a list element 

  //create the radio buttons and attach the answers to them 
		input = "<input type = 'radio' name ='answer' value =" + i + " />";
		input += questions[number].answerChoices[i];

		//append the input to the li element then the li element to the ul element 
		item.append(input); 
		radioList.append(item); 
	}

	return radioList; 
}; //end of function

/* create a function to compute the score and display the result once a person finishes 
the test and clicks submit */
var getScore = function() {
	// create a new p element with a different i
	var score = $("<p />", {
       "id" :'score'
	});

	var correct = 0;
	//loop through the user choices and compute the score 
	for(var x = 0; x < userSelection.length ; x++){
		if(userSelection[x] === questions[x].correctAnswer) {
			correct++;
		}
	} 
	// write the score to the DOM 
  var output = "Congratulations for finishing the quiz! " + "<br><br>" +
               "Your score is " + correct + " out of " + questions.length;
  
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

   	 //getting the next question 
   	if(questionCount < questions.length) {
   	 	var nextQuestion = questionAnswerElement(questionCount);
   	 	test.append(nextQuestion).fadeIn();
   	 	if(questionCount === (questions.length - 1)){
   	 		$("#next").hide();
   	 		$("#submit").show();

   	 		//event handler for the submit button 
   	 		//append the score to the page when the user clicks submit 
   	 		$("#submit").on('click', function(anEvent) {
   	 			anEvent.preventDefault(); //to prevent the browser's default action from occurring when it sees the submit button
	
			    if(test.is(":animated")) {
				  return false; //stops the default event action from being called as well as the event from propagating
			    }

			    $("#intro").hide();
   	 		  $("h1").hide();
   	 		  $("#quiz").hide();
   	 		  userSelection.push(chosenAnswer()); //push the answer chosen for the last question into the array
               

	        var scoreResult = getScore();
          test.append(scoreResult).fadeIn(); //append the score to the outermost div
          $("#submit").hide();
   	 		});
   	 	}
      
      //check if the radio button is clicked and highlight it
      //use the on() method to attach the event handler for clicking a button
      //use toggleClass() method to add the 'highlight' class to the <li> element if an answer is chosen,
      // i.e. if its 2nd argument is true
      //'this' is a placeholder for the input element.
      //parent() goes one level up the DOM from input, in this case, it goes to <li>
      $("input[type ='radio']").on('click', function(){
      $(this).parent('li').toggleClass('highlight', this.checked);
      }); //end of event handler

   	} //end of outer if
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
  
}); //end of 'next' event handler

}); //end of $(function() {})

//disable next button until user selects an answer
      // if($("input[checked = 'checked']").prop('disabled', true)) {
      //   alert("Please make a selection");
      //   // $("#next").disable();
      //   $("#next").attr('disabled', 'disabled');
      // }
      // else {
      //   $("#next").removeAttr('disabled');
      // }
