$(document).ready(function() {
  var html = "";
  var urltemp = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=";
  var input;
  var snippet;
  var title;
  
$("#wikisearchbtn").on("click", function getTextSearch(){   
  
  $("body").css({
"padding-top":"5vh"
});
  
  input= "";
 input =document.getElementById("wikisearch").value;   
     console.log(input);
     
     if (input){     
       url = urltemp + input;
       
      getWiki(function(response) {
    html = "";
        if(response.query.search.length > 0){
    for (var i = 0; i < response.query.search.length; i++) {
        
     snippet =response.query.search[i].snippet;
      title = response.query.search[i].title;
      html += "<a href = 'https://en.wikipedia.org/wiki/" + title + "' target = '_blank'><div class = 'entry'><b>" + title + " </b></a>" + snippet + "</div>";
      
      $(".result").html(html);

        
       } /* end of for loop */
        }
        
        else {  html = "<div class = 'entry'> No matches </div>";
     $(".result").html(html);} /* end of else */
        });
     } /* end of if */
     
  else{
            html = "";
     $(".result").html(html);} /* end of else */
   
}); /* end of click*/
  
function getWiki(callback) {
    $.ajax({
      url: url,
      dataType: "json",
      success: callback,
       error: function () {
       console.log("error");
    }
    });
  } /*end of ajax request*/

 
}); /*end of jS*/