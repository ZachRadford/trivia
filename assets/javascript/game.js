
(function() {

  var questions = [{
    question: "What is 2*5?",
    choices: [2, 5, 10, 15, 20],
    correctAnswer: 2
  }, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
  }, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
  }, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
  }, {
    question: "What is 10*10?",
    choices: [100, 300, 99, 101, 200],
    correctAnswer: 0    
  }


  ];
  
  var questionCounter = 0; 
  var accuracy = 0
  var quiz = $('#quiz'); //quiz div object

  var timeoutID
  var timerRun = false
  var intervalId
  var stopwatch = {
      time: 20
    }
  
  

  drawBoard();
 
  
  // Click answer button
  $('#quiz').on('click', "#question button", function (event) {
    if(quiz.is(':animated')) {        
      return;
    }

    if (!timerRun) {
      countdown()
    }

    var answer = $(this).attr("value")
    if(answer == questions[questionCounter].correctAnswer){
      accuracy++;
      rightWrong(true);
    } else {
      rightWrong(false);
    }
    
    questionCounter++;
  });
  



  $('#start').on('click', function (event) {
    event.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    accuracy = 0;
    drawBoard();
    $('#start').hide();
  });
  

   

  function createQuestion(index) {
    var powerman5000 = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    powerman5000.append(header);
    
    var robZombie = $('<p>').append(questions[index].question);
    powerman5000.append(robZombie);
    
    var buttons = createButtons(index);
    powerman5000.append(buttons);
    
    return powerman5000;
  }
  

  function createButtons(index) {
    var buttonList = $('<ul>');
    var answerChoice;
    var button = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      answerChoice = $('<li>');
      button = '<button name="answer" value=' + i + '>';
      button += questions[index].choices[i];
      button += "</button>";
      answerChoice.append(button);
      buttonList.append(answerChoice);
    }
    return buttonList;
  }
  



  function drawBoard() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length && stopwatch.time > 0){
        var nextQuestion = createQuestion(questionCounter);
        quiz.append(nextQuestion).fadeIn();
      }else {
        quiz.append(displayScore()).fadeIn();
        $('#start').show();
      }
    });
  }
  
 
  function displayScore() {
    var score = $('<p>',{id: 'question'});       
    score.append('<h2>You got ' + accuracy + ' questions out of ' +
                 questions.length + ' right!</h2>');
    return score;
  }


  function countdown(){
    if (!timerRun){
      intervalId = setInterval(upTime, 1000);
      timerRun = true;
    }
  }



  function upTime (){
    stopwatch.time--;
    if (stopwatch.time <= 0){
      drawBoard();
      clearInterval(intervalId)
    }   
    $("#timer").html("Time left " + stopwatch.time);
  }


  function stopClock(){
    clearInterval(intervalId);
    timerRun = false;
    console.log(intervalId)
  }


  
  function rightWrong(correct){
    stopClock();

    $("#quiz").fadeOut();
    console.log($("#quiz"))

    if (correct){
      $("#correct").show()
    } else {
      $("#wrong").show()
    }

    setTimeout(function(){
      drawBoard();
      countdown();
      $("#correct").hide();
      $("#wrong").hide();
    }, 3000)
   }


console.log(stopClock)

})();