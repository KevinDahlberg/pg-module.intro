$(function(){
  console.log("JQ F-in Sourced!");

  $.ajax({
    type: "GET",
    url: "/books",
    success: function(response){
      console.log("in response path", response);
    }
  });
});
