import { Hangman } from './hangman.js';

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

  let newGame = new Hangman();

  $('#start-game').click(function() {
    $.ajax({
      url : `http://dinoipsum.herokuapp.com/api/?paragraphs=1&words=1`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        let answer = JSON.stringify(response);
        alert(answer);
        newGame.setAnswer(answer);
        $("#correct-guesses").append(newGame.correctGuesses);
      },
      error: function() {
          $('.errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
  $('#check-letter').click(function() {
    let newGuess = $("#guess").val();
    let result = newGame.guess(newGuess);
    if(result == true) {
      $("#display-hangman").append("Correct!");
    } else {
      $("#display-hangman").append("Wrong!");
    }
  })
});



// ///
// var getDinos      = $.get('http://dinoipsum.herokuapp.com/api/?format=html'),
//     fillContainer = function(html) {
//       $('#some-awesome-container').html(html);
//     },
//     oops = function() {
//       console.log('Where did all the dinosaurs go?');
//     };
//
// getDinos.then(fillContainer, oops);
