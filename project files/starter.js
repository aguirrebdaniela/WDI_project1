
$("#myImage").mouseover(function () {
    $(this).attr("class", "image-replacement");
});
$("#myImage").mouseout(function () {
    $(this).attr("class", "ClassBeforeImage-replacement");
});


var totalPlayer1Score = 0;
var totalPlayer2Score = 0;
var playerTurn= 1;
var playerName1= "Player 1";
var playerName2= "Player 2"

var scorePlayer1=document.getElementById("score1").textContent
var scorePlayer2=document.getElementById("score2").textContent

var cells = document.getElementsByTagName("td");
var table= document.getElementById("tableId")
var backButton= document.getElementById("back")
var submitButton= document.getElementById("submitB")

var correctAnswer= ""
var insertCorrect= document.getElementById("questionForm").textContent
var questionBox=document.getElementById("questionBox")

var dataSet=[
	{clicked: false, id:"r1c1", question:"New students need to learn the secrets of the castle. How many staircases does Hogwarts have?", answer:"142", points:500, topic:"Hogwarts"},
	{clicked: false, id:"r1c2", question:"A ____ is a magical creature that can transform itself into a person's worst fear", answer:"boggart", points:500, topic:"Magic"},
	{clicked: false, id:"r1c3", question:"What number is Harry's vault at the Gringotts Wizarding Bank?", answer:"687", points:500, topic:"Harry"},
	{clicked: false, id:"r1c4", question:"What is the proper incantation for casting the Dark Mark?", answer:"Morsmordre", points:500, topic:"Voldemort"},
	{clicked: false, id:"r1c5", question:"In Quidditch, what is the max speed for a Firebolt broomstick? (in mph)", answer:"150", points:500, topic:"Others"},
	{clicked: false, id:"r2c1", question:"What does one say to close the Marauder's Map and make it blank again? (2 words)", answer:"Mischief Managed", points:400, topic:"Hogwarts"},
	{clicked: false, id:"r2c2", question:"________ is the most powerful Love Potion.", answer:"Amortentia", points:400, topic:"Magic"},
	{clicked: false, id:"r2c3", question:"Who is Harry's godson (first and last name)", answer:"Teddy Lupin", points:400, topic:"Harry"},
	{clicked: false, id:"r2c4", question:"Who played Lord Voldemort in the movies?", answer:"Ralph Fiennes", points:400, topic:"Voldemort"},
	{clicked: false, id:"r2c5", question:"Who directed 'Harry Potter and the Prisoner of Azkaban'?", answer:"Alfonso Cuaron", points:400, topic:"Others"},
	{clicked: false, id:"r3c1", question:"Who guards the entrance to the Gryffindor common room? (3 words)", answer:"The fat lady", points:300, topic:"Hogwarts"},
	{clicked: false, id:"r3c2", question:"How do you summon a Patronus?", answer:"Expecto Patronum", points:300, topic:"Magic"},
	{clicked: false, id:"r3c3", question:"Who has been stealing Harry's letters from Ron and Hermione at the beginning of 'Harry Potter and the Chamber of Secrets'?", answer:"Dobby", points:300, topic:"Harry"},
	{clicked: false, id:"r3c4", question:"What is the name of Voldemort's mother?", answer:"Merope", points:300, topic:"Voldemort"},
	{clicked: false, id:"r3c5", question:"Who directed 'Harry Potter and the Philosopher's Stone'? ", answer:"Chris Columbus", points:300, topic:"Others"},
	{clicked: false, id:"r4c1", question:"What's the name of Filch's cat?", answer:"Mrs. Norris", points:200, topic:"Hogwarts"},
	{clicked: false, id:"r4c2", question:"The spell ______ removes parts of someone's memory", answer:"Obliviate ", points:200, topic:"Magic"},
	{clicked: false, id:"r4c3", question:"Who gives Harry the Invisibility cloak?", answer:"Dumbledore", points:200, topic:"Harry"},
	{clicked: false, id:"r4c4", question:"Voldemort's snake is called Nagiri (true/false)", answer:"False. It's called Nagini", points:200, topic:"Voldemort"},
	{clicked: false, id:"r4c5", question:"Who played Ron Weasley in the movies?", answer:"Rupert Grint", points:200, topic:"Others"},
	{clicked: false, id:"r5c1", question:"From what King's Cross platform does the Hogwarts Express leave? (numerical)", answer:["9 3/4"] , points:100, topic:"Hogwarts"},
	{clicked: false, id:"r5c2", question:"The spell 'Wingardium Leviosa' turns the target to stone (true/false)", answer:"false", points:100, topic:"Magic"},
	{clicked: false, id:"r5c3", question:"Who comes to pick up Harry when he's old enough to go to Hogwarts?", answer:"Hagrid", points:100, topic:"Harry"},
	{clicked: false, id:"r5c4", question:"Into which House have most Death Eaters who attended Hogwarts been sorted?", answer:"Slytherin", points:100, topic:"Voldemort"},
	{clicked: false, id:"r5c5", question:"Who played Hermione Granger in the movies?", answer:"Emma Watson", points:100, topic:"Others"},
]

function startGame()
{	
	playerName1 = (document.getElementById("playerName1").value!="") ?document.getElementById("playerName1").value:playerName1
	playerName2 = (document.getElementById("playerName2").value!="") ?document.getElementById("playerName2").value:playerName2
	document.getElementById("name1").innerHTML = playerName1
  document.getElementById("name2").innerHTML = playerName2
  lightbox_close()
  displayCurrentTurn()
}

function evaluateAnswer(correctAnswer, playerAnswer){
	var isCorrect = false;
	correctAnswer = correctAnswer.toUpperCase().trim();
	playerAnswer = playerAnswer.toUpperCase().trim();
	if(correctAnswer == playerAnswer)
		isCorrect = true;
	return isCorrect;
	//True o true true.
	// Harry, Potter, 
}


function enableCellClicks(){
	$("td").click(function () {
		var cell= $(this)
		var cellId= cell.attr("id")
		var question= getQuestion(cellId)
		popQuestion(question)
	});
}

function switchPlayerTurn(){
	if (playerTurn==1){
		playerTurn=2
	}
	else if(playerTurn==2){
		playerTurn=1
	}
}

function displayCurrentTurn(){
  var currentPlayerName = ""
	if (playerTurn==1){
		currentPlayerName=playerName1;
	}
	else if(playerTurn==2){
		currentPlayerName= playerName2;
	}
	document.getElementById("textPlayersTurn").textContent= "It is " + currentPlayerName + "'s turn"
}

function sumPlayersScore(question){
	if (playerTurn==1){
	 	 totalPlayer1Score += question.points
		  document.getElementById("score1").textContent = "score: " + totalPlayer1Score;
	}
	else if (playerTurn==2){
		 totalPlayer2Score += question.points
		  document.getElementById("score2").textContent = "score: " + totalPlayer2Score;
	}
}

function popQuestion(question){
	if (!(question.clicked)){
	setQuestionMode()
	document.getElementById("questionText").textContent= question.question;
	$('#questionButton').unbind("click")
	$('#questionButton').click(function(){

    var thisCorrectAnswer = question.answer
    var writtenAnswer = $("#answer").val()
    var questionId= question.id
    
    
	    if (evaluateAnswer(thisCorrectAnswer, writtenAnswer)){
	    	succesfulAnsMode()
	    	sumPlayersScore(question)
	      document.getElementById("correctAns").textContent="That's correct!"
	     	console.log(questionId)
	     	document.getElementById(questionId).classList.add("correct")
	     	console.log()
	     }
	    else{ 
	    	notSuccesfulAnsMode()	
	    	document.getElementById("wrongAns").textContent="The correct answer is: " + question.answer
	    	document.getElementById(questionId).classList.add("incorrect")
	    }

	   $("#answer").val("")
	   switchPlayerTurn()
	   question.cliked=true
	   updateClickStatus(question.id)
  		if (isGameCompleted()==true){
  			endGame()
  		}
})
}}

function isGameCompleted(){
 var result=true
 $(dataSet).each(function(){
		var question=this;
		if (question.clicked==false){
			result=false
		}
	})
 	return result
}

function endGame(){
	checkWinner()
}

function checkWinner(){
	setFinalMode()
	if(totalPlayer1Score>totalPlayer2Score){	
		document.getElementById("winner").innerHTML= playerName1 + " is the winner!"
	}
	else if(totalPlayer1Score<totalPlayer2Score){
		document.getElementById("winner").innerHTML= playerName2 + " is the winner!"
	}
	else{
		document.getElementById("winner").innerHTML=playerName1 + " and " + playerName2 + " have tied!"
	}
}


function updateClickStatus(id){
	$(dataSet).each(function(){
		var question=this;
		if (question.id==id){
			question.clicked=true
		}
	})

}

function setBlankMode(){
	$("#questionBox").hide();
}  	

function setQuestionMode(){
	$("#questionBox").show();
	$("#questionDiv").show();
	$("#succesfulAns").hide();
	$("#notSuccesfulAns").hide();
	$("#endMode").hide();
}

function notSuccesfulAnsMode(){
	$("#questionBox").show();
	$("#questionDiv").hide();
	$("#succesfulAns").hide();
	$("#notSuccesfulAns").show();
	$("#endMode").hide();
}

function succesfulAnsMode(){
	$("#questionBox").show();
	$("#questionDiv").hide();
	$("#succesfulAns").show();
	$("#notSuccesfulAns").hide();
	$("#endMode").hide();
}

function setFinalMode(){
	$("#questionBox").show();
	$("#questionDiv").hide();
	$("#succesfulAns").hide();
	$("#notSuccesfulAns").hide();
	$("#endMode").show();
}

function enableBack(){
	$("#backQ").click(function (){
		setBlankMode()
		displayCurrentTurn()
	});
	$("#backA").click(function (){
		setBlankMode()
		displayCurrentTurn()
	})
	$("#backW").click(function (){
		setBlankMode()
		displayCurrentTurn()
	})
	$("#backE").click(function (){
		location.href="main_page.html"
	})
}
	

function getQuestion(id){
	var result = null;
	for(var i=0; i<dataSet.length; i++){
		var question= dataSet[i];
		if (question.id == id){
			result =  question
		} 
	}
	return result;
}

function enableTopButton(){
	$("#endGame").click(endGame)
}



$(document).ready(function(){
	console.log("Document ready");
	lightbox_open();
	setBlankMode();
	enableCellClicks();
	enableBack();
	enableTopButton();
})

//----------------------------------------------------
// lightbox content
window.document.onkeydown = function (e)
{
    if (!e){
        e = event;
    }
    if (e.keyCode == 27){
        lightbox_close();
    }
}

function lightbox_open(){
    window.scrollTo(0,0);
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';  
}

function lightbox_close(){
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
}