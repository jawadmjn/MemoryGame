var currentOpenImages = 0;
var solvedBoxes = 0;
var openItem1 = false;
var openItem2 = false;
var totalPuzzels = 0;

window.onload = function() {
  totalPuzzels = parseInt( $('#memory ul li').length ) / 2;
};


function  showImage(clickedDiv) {
  var divId = parseInt($(clickedDiv).attr("id"));
  if($(clickedDiv).find('img').length === 0 && (!openItem1 || !openItem2) ) {

    var img = document.createElement("IMG");
    var imgId = parseInt(atob(boxValues[divId])) - 250;
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
    $("#"+divId1).css('visibility','hidden');
    $("#"+divId1).unbind("click");
    
    $("#"+divId2).css('visibility','hidden');
    $("#"+divId2).unbind("click");
    
    solvedBoxes++;
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