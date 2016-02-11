$(document).ready(function(){
  var showModal = (Math.floor((Math.random() * 10) + 1) % 3) == 1;

  if(showModal) {
    if($("#modalDonate").data('show')){
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
    }
  }
});
