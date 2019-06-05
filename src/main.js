import { Tamagotchi } from './tamagotchi.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

let newPet = new Tamagotchi("");

$(document).ready(function() {
  $("form#start").submit(function(event) {
    event.preventDefault();
    let petName = $("#name").val();
    let petSpecies = $("input[name='select-pokemon']:checked").val();
    newPet.setName(petName);
    $("#petName").append(petName);
    $("#petSpecies").append(petSpecies);
    newPet.setSpecies(petSpecies);
    if (petSpecies == "Bulbasaur") {
      $("#petImage").append('<img src="img/Bulbasaur.png" weight="200px" height="200px" />');
    } else if (petSpecies == "Charmander") {
      $("#petImage").append('<img src="img/Charmander.png" weight="200px" height="200px" />');
    } else {
      $("#petImage").append('<img src="img/Squirtle.png" weight="200px" height="200px" />');
    }
    $("form#start").hide();
    $(".game").show();
    $("#text-box").append(newPet.setHunger());
    $("#text-box").append(newPet.setExercise());
    $("#text-box").append(newPet.setSleepiness());
    $("#text-box").append(newPet.setHappiness());
  });

  $("form#feed").submit(function(event) {
    event.preventDefault();
    let foodType = $("input[name='food-type']:checked").val();
    if (foodType == "small treat") {
      $("#text-box").append(newPet.eatSmall(foodType));
    } else if (foodType == "bowl of food") {
      $("#text-box").append(newPet.eatMedium(foodType));
    } else {
      $("#text-box").append(newPet.eatFavorite(foodType));
    }
  });

  $("form#play").submit(function(event) {
    event.preventDefault();
    let toyType = $("input[name='toy-type']:checked").val();
    if (toyType == "ball") {
      $("#text-box").append(newPet.giveCheapToy(toyType));
    } else {
      $("#text-box").append(newPet.giveExpensiveToy(toyType));
    }
  });

  $("form#sleep").submit(function(event) {
    event.preventDefault();
    let foodType = $("input[name='food-type']:checked").val();
    if (foodType == "small treat") {
      $("#text-box").append(newPet.eatSmall(foodType));
    } else if (foodType == "bowl of food") {
      $("#text-box").append(newPet.eatMedium(foodType));
    } else {
      $("#text-box").append(newPet.eatFavorite(foodType));
    }
  });

  $("form#exercise").submit(function(event) {
    event.preventDefault();
    let foodType = $("input[name='food-type']:checked").val();
    if (foodType == "small treat") {
      $("#text-box").append(newPet.eatSmall(foodType));
    } else if (foodType == "bowl of food") {
      $("#text-box").append(newPet.eatMedium(foodType));
    } else {
      $("#text-box").append(newPet.eatFavorite(foodType));
    }
  });

});
