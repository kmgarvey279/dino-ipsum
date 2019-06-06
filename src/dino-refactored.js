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
let promise = new Promise(function(resolve, reject) {
     let request = new XMLHttpRequest();
     let url = `http://dinoipsum.herokuapp.com/api/?paragraphs=${paragraphs}&words=${words}`;
     request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      $('.showDinos').html(response);
    },function(error) {
      $('.errors').text("There was an error processing your request. Please try again.");
    });
  });
/////
  $("#randomDino").click(function(){
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=1`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
    promise.then(function(response) {
      let dino = response.replace(/\W/g, '');
      $('.showRandomDino').html(`<a href="https://en.wikipedia.org/wiki/${dino}">${dino}</a>`);
    }, function(error) {
      $('.errors').text("There was an error processing your request. Please try again.");
    });
  });
  /////
  $("#start-game").click(function() {
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=1`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.response);
        }
      }
      request.open("GET", url true);
      request.send();
    });
    promise.then(function(response) {
      let answer = JSON.parse(response);
      let displayTimer = setInterval(function() {
        $("#timer").empty().append(newGame.timeLeft);
        timeUp();
        endGame();
        if(newGame.game == false) {
          clearInterval(displayTimer);
        }
      }, 1000);
      $('.errors').text("There was an error processing your request. Please try again.");
    });
  });
  $('#check-letter').click(function() {
    let newGuess = $("#guess").val().toLowerCase();
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
