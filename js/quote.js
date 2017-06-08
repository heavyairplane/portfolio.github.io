
$(document).ready(function() {
  var quote;
  /*var year;*/
  var tweet;
  getNewQuote();

  $("#newButton").on("click", function(event) {
    event.preventDefault();
    getNewQuote();
  });

  function getNewQuote() {
    $.ajax({
      url: "https://howmuchisthe.fish/json/random",

      success: function(response) {
        quote = response.quote.text;
       /* year = response.quote.year;*/
        $(".quote").html(quote);
      /*  $(".year").html("Year: " + year);*/
        tweet = "https://twitter.com/intent/tweet?text=" + quote;
        $("#tweetbutton").prop("href", tweet);
      }
    });
  }
}); /*end of jS*/
