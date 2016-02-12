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
var intallFirefoxScreenCapturingExtension = function () {
  InstallTrigger.install({
    'Foo': {
      URL: 'https://addons.mozilla.org/firefox/downloads/file/355418/enable_screen_capturing_in_firefox-1.0.006-fx.xpi?src=cb-dl-hotness',
      toString: function() {
        return this.URL;
      }
    }
  });
};
