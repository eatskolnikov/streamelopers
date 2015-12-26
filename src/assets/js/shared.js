var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(document).ready(function(){
  $("#modalDonate").on({
    'show.uk.modal': function(){
        $("#btnCloseModalDonate").removeAttr("disabled");
    },
    'hide.uk.modal': function(){
    }
  });
  var modal = UIkit.modal("#modalDonate");
  modal.options.bgclose=false;
  if (!modal.isActive())
  {
      modal.show();
  }
});
