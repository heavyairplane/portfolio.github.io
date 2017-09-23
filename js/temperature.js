$(document).ready(function() {
  var lat;
  var lon;
  var temp;
  var tempC;
  var url;
  var unit = 0; /*unit 0 = C, 1 is F*/
  var myKey = "7b2147a64dd1b7c734a19b13fc85d6a6";
  

  $("#changeTemp").on("click", function(event) {
    event.preventDefault();
    if (unit == 0){
    getTemp(function(response) {
      temp = Math.round(response.currently.temperature) + "&deg;F";
      tempC = Math.round((response.currently.temperature - 32) * 5 / 9);
      console.log(tempC);
      $(".temp").html(temp);
      $("#changeTemp").html("Change to &deg;C");
      changeBackground(tempC);
      unit = 1;
      console.log(unit);
    });
    }
    if (unit == 1){
    getTemp(function(response) {
      temp = Math.round((response.currently.temperature - 32) * 5 / 9) + "&deg;C"; /*Celcius*/
      console.log(temp);
      $(".temp").html(temp);
      $("#changeTemp").html("Change to &deg;F");
      changeBackground(temp);
      unit = 0;
      console.log(unit);
    });
    }
  });

  function getTemp(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        url =
          "https://api.darksky.net/forecast/" + myKey + "/" +
          lat +
          "," +
          lon;
        /*console.log(lat,lon);*/

        $.ajax({
          url: url,
          dataType: "jsonp",
          success: callback
        });

      });
    }
  }
  
  function changeBackground(val){
    if (val <= 18){
      document.getElementById("temp-section").style.background = "url('https://lh6.ggpht.com/_JfjOKoPd__wFCzD9KNJVdMsZZM0ok7ptIG1u5-CnWkeqrX2Q27zYVm7IjCk9K-gWrPi=h900') center";
      $("h1").css("color", "white");
    }
    else if (val > 18 && val < 33){
    document.getElementById("temp-section").style.background = "url('https://lh6.ggpht.com/sNz9MNJ78ZFiAt98t3v8qjH1boncSDJQvljlZnFlCNyd6D03mt9GKdFQVm2-CALaUw=h900') center";
     $("h1").css("color", "white");
  }
  
  else if (val >= 33){
    document.getElementById("temp-section").style.background = "url('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-373216.png') no-repeat bottom";
    $("h1").css("color", "white");
  }
    
  }
  
  getTemp(function(response) {
    temp = Math.round((response.currently.temperature - 32) * 5 / 9) + "&deg;C";
    changeBackground(temp);
    console.log(temp);
    $(".temp").html(temp);
    $("#changeTemp").html("Change to &deg;F");
    
  });  /*call default C on load*/
 
}); /*end of jS*/
