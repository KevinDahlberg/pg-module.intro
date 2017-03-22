//Global Variables
var bookId;

$(function(){
  console.log("JQ F-in Sourced!");
  getBooks();

  function getBooks(){
    $.ajax({
      type: "GET",
      url: "/books",
      success: function(response){
        console.log("in getBooks response path");
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
          $el.append("<td><button class='delete' data-book='" + book.id + "'>Delete</button></td>");
          $el.append("<td><button class='edit' data-book='" + book.id + "' data-author='" +
          book.author + "' data-title='" + book.title + "' data-publisher='" +
          book.publisher + "' data-year='" + book.year + "'>Edit</button></td>");
        } //end for loop
      } //end success function
    }); // end AJAX
  } //end getBooks

  //POST function to add new book
  $('#bookForm').on('submit', function(event){
    event.preventDefault();
    console.log($('#title').val(), $('#author').val());
    $.ajax({
      type: "POST",
      url: "/books/add",
      data: {title: $('#title').val(), author:$('#author').val(), publisher: $('#publisher').val(), year: $('#year').val()},
      success: function(response) {
        console.log("book added");
        getBooks();
        submitFormClear();
      }
    });
  });// end bookForm click event

  //Search form
  $('#searchForm').on('submit', function (event){
    event.preventDefault();
    console.log("in search form path");
    var searchTerm = $('#search').val();
    $.ajax({
      type: "GET",
      url: "books/search/" + searchTerm + "/",
      success: function(response){
        submitFormClear();
        $('#/books').empty();
        var book = response;
        $("#books").append('<tr>');
        $el = $('#books').children().last();
        $el.append('<td>' + book.id + '</td>');
        $el.append('<td>' + book.author + '</td>');
        $el.append('<td>' + book.title + '</td>');
        $el.append('<td>' + book.publisher + '</td>');
        $el.append('<td>' + book.year + '</td>');
        $el.append("<td><button>Delete</button></td>");
      }
    });
  });//end click function

  //Delet function
  $('#books').on('click', '.delete', function(){
    console.log('Delete book' + $(this).data('book'));
    var bookId = $(this).data('book');
    $.ajax({
      type: "DELETE",
      url: "books/delete/" + bookId + "/",
      success: function (){
        console.log("in delete book path");
        getBooks();
      }
    });//end ajax
  });
//puts the book you want to edit into the inputs
  $('#books').on('click', '.edit', function(){
    console.log('Edit book ' + $(this).data('book') + $(this).data('author') + $(this).data('publisher') + $(this).data('year'));
    bookId = $(this).data('book');
    $('.input').val('');
    $('#title').val($(this).data('title'));
    $('#author').val($(this).data('author'));
    $('#publisher').val($(this).data('publisher'));
    $('#year').val($(this).data('year'));
    // $('#submit').remove();
    // $('#submitEdit').remove();
    // $('#bookForm').last().append('<input type="submit" name="submit" value="submit" id="submitEdit">');

  }); // end of edit function

  $('#submitEdit').on('click', function (event){
    event.preventDefault();
    console.log("bookId");
    $.ajax({
      type: "PUT",
      url: "/books/edit",
      data: {id: bookId, title: $("#title").val(), author:$('#author').val(), publisher: $('#publisher').val(), year: $('#year').val()},
      success: function (response){
        getBooks();
      }
    });
  });

  function editSubmit (object){

}
  function submitFormClear (){
    $('#title').val('');
    $('#author').val('');
    $('#publisher').val('');
    $('#year').val('');
    $('#submit').val('');
  }


}); // ends document ready function
