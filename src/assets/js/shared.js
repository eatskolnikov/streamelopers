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
