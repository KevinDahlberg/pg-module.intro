$(function(){
  console.log("JQ F-in Sourced!");
getBooks();

$('#bookForm').on('submit', function(event){
  event.preventDefault();
  console.log($('#title').val(), $('#author').val());
    $.ajax({
    type: "POST",
    url: "/books/add",
    data: {title: $('#title').val(), author:$('#author').val(), publisher: $('#publisher').val(), year: $('#year').val()},
    success: function(response) {
      getBooks();
      submitFormClear();
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

        if (book.publisher === null){
          book.publisher = "N/A";
        }
        if (book.year === null){
          book.year = "N/A";
        }

        $el.append('<td>' + book.id + '</td>');
        $el.append('<td>' + book.author + '</td>');
        $el.append('<td>' + book.title + '</td>');
        $el.append('<td>' + book.publisher + '</td>');
        $el.append('<td>' + book.year + '</td>');

      } //end for loop
      } //end success function
    }); // end getBooks
  }

  function submitFormClear (){
    $('#title').val('');
    $('#author').val('');
    $('#publisher').val('');
    $('#year').val('');
  }

}); // ends document ready function
