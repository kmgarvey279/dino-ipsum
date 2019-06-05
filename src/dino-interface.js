
$(document).ready(function() {
  $('#dinoSubmit').click(function() {
    let paragraphs = $('#paragraphs').val();
    let words = $('#words').val();
    // $('#paragraphs').val("");
    // $('#location').val("");
    $.ajax({
      url : `http://dinoipsum.herokuapp.com/api/?paragraphs=${paragraphs}&words=${words}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('.showDinos').text(response);
      },
      error: function() {
        $('.errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
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
