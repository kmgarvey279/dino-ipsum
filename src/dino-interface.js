import { Hangman } from './hangman.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

let newGame = new Hangman();

function startGame(newResponse) {
  $("#start-game").hide();
  let myString = JSON.stringify(newResponse);
  let answer = myString.replace(/\W/g, '').toLowerCase();
  newGame.setAnswer(answer);
  newGame.setTime();
  console.log(answer);
  $("#correct-guesses").append(newGame.correctGuesses);
  $(".display-game").show();
}

function timeUp() {
  if(newGame.timeLeft == 0) {
    newGame.totalWrong++;
    $("#display-hangman").append('<img src="img/dino' + newGame.totalWrong + '.jpg" weight="100px" height="300px" />');
    newGame.resetTime();
  }
}
function endGame() {
  newGame.gameOverCheck();
  if (newGame.game === false){
    $("#game-over").append(newGame.gameOverCheck());
    resetGame();
  }
}

function resetGame() {
  setTimeout(() => {
    $("#correct-guesses").empty();
    $("#wrong-guesses").empty();
    $("#display-hangman").empty();
    $(".display-game").hide();
    $("#start-game").show();
    newGame.resetAll();
  }, 4000); 
}

$(document).ready(function() {
  $('#dinoSubmit').click(function() {
    let paragraphs = $('#paragraphs').val();
    let words = $('#words').val();
    $.ajax({
      url : `http://dinoipsum.herokuapp.com/api/?paragraphs=${paragraphs}&words=${words}`,
      type: 'GET',
      data: {
        format: 'html'
      },
      success: function(response) {
        $('.showDinos').html(response);
      },
      error: function() {
        $('.errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
  $('#randomDino').click(function() {
    $.ajax({
      url : `http://dinoipsum.herokuapp.com/api/?paragraphs=1&words=1`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('.showRandomDino').html(`<a href="https://en.wikipedia.org/wiki/${response}">${response}</a>`);
      },
      error: function() {
          $('.errors').text("There was an error processing your request. Please try again.");
      }
    });
  });

  $('#start-game').click(function() {
    $.ajax({
      url : `http://dinoipsum.herokuapp.com/api/?paragraphs=1&words=1`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function( response ) {
        startGame(response);
        let displayTimer = setInterval(function() {
          $("#timer").empty().append(newGame.timeLeft);
          timeUp();
          endGame();
          if(newGame.game == false) {
            clearInterval(displayTimer);
          }
        }, 1000);
      },
      error: function() {
          $('.errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
  $('#check-letter').click(function() {
    let newGuess = $("#guess").val().toLowerCase();
    // try catch example:
    // function checkLetter(char) {
    //   if(!char.match(/[a-z]/i)) {
    //     return new Error("not a valid letter!");
    //   } else {
    //     return true;
    //   }
    // }
    //
    // try {
    //   const isInputALetter = checkLetter(newGuess);
    //   if (isInputALetter instanceof Error) {
    //     console.error(isInputALetter.message);
    //     throw Error("Not a valid letter!");
    //   } else {
    //     console.log("Try was successful");
    //   }
    // } catch(error) {
    //   console.error(`Error: ${error.message}`)
    // }
    let result = newGame.guess(newGuess);
    if(result == false) {
      let count = newGame.totalWrong;
      $("#display-hangman").append('<img src="img/dino' + count + '.jpg" weight="100px" height="300px" />');
    }
    $("#correct-guesses").empty().append(newGame.correctGuesses);
    $("#wrong-guesses").empty().append(newGame.wrongGuesses);
    $("#timer").empty().append(newGame.timeLeft);

    $("#guess").val("");
  });
});
