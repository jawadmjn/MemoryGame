var currentOpenImages = 0;
var solvedBoxes = 0;
var openItem1 = false;
var openItem2 = false;
var totalPuzzels = 0;
var boxValues = [];

window.onload = function () {
  totalPuzzels = parseInt($('#memory ul li').length) / 2;
  boxValues = JSON.parse("[" + getCookie("totalBoxesEncoded_c") + "]");
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
  }

  if(openItem1 && openItem2) {
    try {
      setTimeout(function(){ checkBothImages(); }, 1000);
    }catch(e) {}
  }

}

function checkBothImages() {
  var divId1 = $(openItem1).attr("id");
  var divId2 = $(openItem2).attr("id");

  var imageDiv1 = $(openItem1).children('img').attr('src');
  var imageDiv2 = $(openItem2).children('img').attr('src');

  if(imageDiv1 === imageDiv2){
    $("#"+divId1).addClass("solved");
    $("#"+divId1).unbind("click");

    $("#"+divId2).addClass("solved");
    $("#"+divId2).unbind("click");

    solvedBoxes = $('#memory .solved').length / 2;
  }
  else {
    $("#"+divId1).find('img').fadeOut(100, function() {
      $(this).remove();
    });
    $("#"+divId2).find('img').fadeOut(100, function() {
      $(this).remove();
    });
  }

  openItem1 = false;
  openItem2 = false;

  if(solvedBoxes === totalPuzzels) {
    $("#memory").css('display','none');
    $("#success").css('display','block');
  }
}

function getCookie(cookiename) {
  // Get name followed by anything except a semicolon
  var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}