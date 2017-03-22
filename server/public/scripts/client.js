$(function(){
  console.log("JQ F-in Sourced!");
getBooks();
$('#bookForm').on('submit', function(event){
  event.preventDefault();
  console.log($('#title').val(), $('#author').val());
    $.ajax({
    type: "POST",
    url: "/books/add",
    data: {title: $('#title').val(), author:$('#author').val()},
    success: function(response) {
      getBooks();
      submitForm();
    }
  });
});

function getBooks(){
  $.ajax({
    type: "GET",
    url: "/books",
    success: function(response){
      console.log("in response path", response);
      $('#books').empty();
      for (var i = 0; i < response.length; i++) {
        var book = response[i];
        $('#books').append('<tr>');
        var $el = $('#books').children().last();
        $el.append('<td>' + book.id + '</td>');
        $el.append('<td>' + book.author + '</td>');
        $el.append('<td>' + book.title + '</td>');
        }
      }
    });
  }

  function submitFormClear (){
    $('#title').val('');
    $('#author').val('');
  }

}); // ends document ready function
