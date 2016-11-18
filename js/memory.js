var currentOpenImages = 0;
var solvedBoxes = 0;
var openItem1 = false;
var openItem2 = false;
var totalPuzzels = 0;
var boxValues = [];
var myTimer = false;
var totalTime = 0;
var minutes = 0;
var seconds = 0;

window.onload = function () {
  totalPuzzels = parseInt($('#memory ul li').length) / 2;
  boxValues = JSON.parse("[" + getCookie("totalBoxesEncoded_c") + "]");
  
  // Set game container width relative to column count.
  $('div#memory').width( $('div#memory ul:first li').length*109 );
};

function  showImage(clickedDiv) {
  var divId = parseInt($(clickedDiv).attr("id"));
  
  if($(clickedDiv).find('img').length === 0 && (!openItem1 || !openItem2) ) {
    var img = document.createElement("IMG");
    var imgId = parseInt( atob(boxValues[0][divId]) ) - 250;
    img.src = "images/"+imgId+".jpg";
    $(clickedDiv).append(img);
    $(clickedDiv).find('img').fadeIn(1000);
    if(!openItem1) {
      openItem1 = clickedDiv;
    }
    else if(!openItem2) {
      openItem2 = clickedDiv;
    }
    
    // start the timer on first click.
    if(!myTimer) {
      myTimer = setInterval(function(){ startTimer(); }, 1000);
    }
  }

  if(openItem1 && openItem2) {
    try {
      setTimeout(function(){ checkBothImages(); }, 1000);
    }catch(e) {}
  }
}

function checkBothImages() {
  var imageDiv1 = $(openItem1).children('img').attr('src');
  var imageDiv2 = $(openItem2).children('img').attr('src');

  if(imageDiv1 === imageDiv2){
    $(openItem1).addClass("solved");
    $(openItem1).unbind("click");

    $(openItem2).addClass("solved");
    $(openItem2).unbind("click");

    solvedBoxes = $('#memory .solved').length / 2;
  }
  else {
    $(openItem1).find('img').fadeOut(100, function() {
      $(this).remove();
    });
    $(openItem2).find('img').fadeOut(100, function() {
      $(this).remove();
    });
  }

  openItem1 = false;
  openItem2 = false;

  if(solvedBoxes === totalPuzzels) {
    $("#memory").css('display','none');
    $("#success").css('display','block');
    clearInterval(myTimer);
    document.getElementById("successMinutes").innerHTML = minutes;
    document.getElementById("successSeconds").innerHTML = seconds;
  }
}

function getCookie(cookiename) {
  // Get name followed by anything except a semicolon
  var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

function startTimer() {
  // +1 in timer after every second.
  totalTime++;
  // Calculate Minutes.
  minutes = Math.floor(totalTime / 60);
  // Calculate Seconds..
  seconds = totalTime - minutes * 60;
  
  // Put Minutes and Seconds in relative spans/div.
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}