/* self note: works without document ready */

$(document).ready(function() {
  var test_names = [
    "OgamingSC2",
    "drdisrespectlive",
    "imaqtpie",
    "netherrealm"
  ]; /* add more as needed*/
  var b;
  var url_ch = [];
  var url_st = [];
  var html = "";
  var name;
  var status;
  var user_url;

  function getStream(url, callback) {
    $.ajax({
      url: url,
      dataType: "json",
      success: callback
    });
  }

  function buildSuccessHtml(name, status, url) {
    html +=
      "<div class='row'><div class='col-md-4 text-center'><h4><a href = '" +
      url +
      "'target='_blank'><b id = 'channel_name'>" +
      name +
      "</b></a></h4></div><div class='col-md-8'><h4><em id = 'channel_status_success'>" +
      status +
      "</em></h4></div></div>";

    $(".result").html(html);
  }

  function buildFailHtml(name, status) {
    html +=
      "<div class='row'><div class='col-md-4 text-center'><h4><b id = 'channel_name'>" +
      name +
      "</b></a></h4></div><div class='col-md-8'><h4><em id = 'channel_status_fail'>" +
      status +
      "</em></h4></div></div>";

    $(".result").html(html);
  }

  for (let i = 0; i < test_names.length; i++) {
    /* jshint loopfunc: true */
    url_ch = "https://wind-bow.glitch.me/twitch-api/channels/" + test_names[i];
    url_st = "https://wind-bow.glitch.me/twitch-api/streams/" + test_names[i];

    var statusChecker = function(response) {
      if (response.stream) {
        name = response.stream.channel.name;
        status = response.stream.channel.status;
        user_url = response.stream.channel.url;

        buildSuccessHtml(name, status, user_url);

        console.log(i + " if in else if 'online'");
      } else {
        name = test_names[i];
        status = "Offline";
        buildFailHtml(name, status);

        console.log(i + " else in else if");
      }
    };

    getStream(url_st, statusChecker);
  }
});
