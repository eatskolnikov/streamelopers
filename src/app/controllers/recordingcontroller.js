app.controller("RecordingCtrl", ['$scope', '$http',"$timeout",'$filter', function($scope, $http, $timeout, $filter)
{
  $(document).mousemove(function(event) {
    if(event.clientY < 200){
      $(".control-panel").fadeIn();
    }else{
      $(".control-panel").fadeOut();
    }
  });
  var mediaSource = new MediaSource();
  mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
  var mediaRecorder;
  var recordedBlobs;
  var sourceBuffer;
  var recordedVideo = document.getElementById('recordedVideo');
  var recordButton = document.getElementById('btnRecord');
  var playButton = document.getElementById('btnPlay');
  var downloadButton = document.getElementById('btnDownloadDesktop');
  var downloadCameraButton = document.getElementById('btnDownloadCamera');
  var camera = document.getElementById("camera");
  var desktop = document.getElementById("desktop");

  recordButton.onclick = toggleRecording;
  playButton.onclick = play;
  downloadButton.onclick = download("desktop");
  downloadCameraButton.onClick = download("camera");


  var gotStream = function(videoElement){
    return function(stream){
      videoElement.src = window.URL.createObjectURL(stream);
      console.log(videoElement);
      videoElement.play();
    };
  };
  var errorHandler = function(error){
    console.log('navigator.getUserMedia error: ');
    console.log(error);
  };
  var handleSourceOpen = function (event) {
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  };
  var handleDataAvailable = function (event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  };
  var toggleRecording = function() {
    console.log("Toggle Recording");
    if (recordButton.style.color === 'red') {
      recordButton.innerHTML = '<i class="uk-icon-pause"><i>';
      recordButton.style.color="blue";
      startRecording();
    } else {
      stopRecording();
      recordButton.style.color = 'red';
      playButton.disabled = false;
      downloadButton.disabled = false;
    }
  };

  var startRecording = function () {
    var options = {mimeType: 'video/webm'};
    recordedBlobs = [];
    try {
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e0) {
      console.log('Unable to create MediaRecorder with options Object: ', e0);
      try {
        options = {mimeType: 'video/webm,codecs=vp9'};
        mediaRecorder = new MediaRecorder(window.stream, options);
      } catch (e1) {
        console.log('Unable to create MediaRecorder with options Object: ', e1);
        try {
          options = 'video/vp8';
          mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e2) {
          alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
          console.error('Exception while creating MediaRecorder:', e2);
          return;
        }
      }
    }
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.style.color="blue";
    playButton.disabled = true;
    downloadButton.disabled = true;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10); // collect 10ms of data
    console.log('MediaRecorder started', mediaRecorder);
  };

  var stopRecording = function () {
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', recordedBlobs);
    recordedVideo.controls = true;
  };

  var play = function () {
    var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
  };

  var download = function (name) {
    return function(){
      var blob = new Blob(recordedBlobs, {type: 'video/webm'});
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name+'.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    };
  };

  this.init = function()
  {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.postMessage({
      enableScreenCapturing: true,
      domains: ["streamelopers.org", "stream.meta.do"]
    }, "*");
  };
  this.init();
  getScreenId(function (error, sourceId, screen_constraints) {
    if(sourceId === "firefox"){
      screen_constraints.video.mediaSource = "screen";
    }
    this.desktopMedia = navigator.getUserMedia(screen_constraints, gotStream(desktop), errorHandler);
    this.cameraMedia = navigator.getUserMedia({video:true, audio:true }, gotStream(camera), errorHandler);
  });
}]);
