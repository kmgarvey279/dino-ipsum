import { Hangman } from './hangman.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

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
      success: function( response ) {
        let myString = JSON.stringify(response);
        let answer = myString.replace(/\W/g, '').toLowerCase();
        newGame.setAnswer(answer);
        $("#correct-guesses").append(newGame.correctGuesses);
        $(".display-game").show();
      },
      error: function() {
          $('.errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
  $('#check-letter').click(function() {

    let newGuess = $("#guess").val();
    let result = newGame.guess(newGuess);
    if(result == false) {
      let count = newGame.totalWrong;
      $("#display-hangman").append('<img src="img/dino' + count + '.jpg" weight="100px" height="300px" />');
    }
    $("#correct-guesses").empty().append(newGame.correctGuesses);
    $("#wrong-guesses").empty().append(newGame.wrongGuesses);
  })
});
