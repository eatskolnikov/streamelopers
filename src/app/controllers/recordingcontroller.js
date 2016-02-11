app.controller("RecordingCtrl", ['$scope', '$http',"$timeout",'$filter', function($scope, $http, $timeout, $filter)
{
  this.camera = document.getElementById("camera");
  this.desktop = document.getElementById("desktop");
  this.localstream = "";
  var gotStream = function(stream)
  {
    this.camera.src = window.URL.createObjectURL(stream);
    this.camera.play();
    this.localstream = stream;
  };
  var errorHandler = function(error){
    trace('navigator.getUserMedia error: ', error);
  };
  this.init = function()
  {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    //navigator.getUserMedia({video:true, audio:false}, angular.bind(this, gotStream), errorHandler);
  };
  this.init();
  getScreenId(function (error, sourceId, screen_constraints) {
      if(sourceId === "firefox"){
          screen_constraints.video.mediaSource = "screen";
      }
      navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
      navigator.getUserMedia(screen_constraints, angular.bind(this, function(stream){
          this.desktop.src = window.URL.createObjectURL(stream);
          this.desktop.play();
      }), function (error) {
          console.error(error);
      });
  });
}]);
