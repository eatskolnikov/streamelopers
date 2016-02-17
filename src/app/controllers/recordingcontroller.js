app.controller("RecordingCtrl", ['$scope', '$http',"$timeout",'$filter', function($scope, $http, $timeout, $filter)
{
  $(document).mousemove(function(event) {
    if(event.clientY < 200){
      $(".control-panel").fadeIn();
    }else{
      $(".control-panel").fadeOut();
    }
  });
  var recordedBlobs = {
    camera:[],
    desktop:[]
  };
  var downloadHandler = function (name){
    return function(){
      console.log(name);
      console.log(recordedBlobs.camera);
      var blob = new Blob(recordedBlobs.camera, {type: 'video/mpeg4'});
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
  var mediaSource = new MediaSource();
  mediaSource.addEventListener('sourceopen', function(){
    mediaSource.addSourceBuffer('video/mpeg4');
  }, false);
  var mediaRecorder;
  var sourceBuffer;
  var recordedVideo = document.getElementById('recordedVideo');
  var recordButton = document.getElementById('btnRecord');
  var playButton = document.getElementById('btnPlay');
  var downloadButton = document.getElementById('btnDownloadDesktop');
  var downloadCameraButton = document.getElementById('btnDownloadCamera');
  var camera = document.getElementById("camera");
  var cameraRecorder;
  var desktop = document.getElementById("desktop");
  var desktopStream;
  var desktopRecorder;

  var gotStream = function(videoElement, mediaStream, callback){
    return function(stream){
      window[mediaStream] = stream;
      videoElement.src = window.URL.createObjectURL(stream);
      videoElement.play();
      if(typeof(callback)!=='undefined'){
        callback();
      }
    };
  };
  var errorHandler = function(error){
    console.log('navigator.getUserMedia error: ');
    console.log(error);
  };
  var handleDataAvailable = function(blob){
    return function (event) {
      console.log(blob);
      if (event.data && event.data.size > 0) {
        blob.push(event.data);
      }
    };
  };
  var toggleRecording = function() {
    if (recordButton.style.color === 'red') {
      startRecording();
    } else {
      stopRecording();
    }
  };

  var startRecording = function () {
    var options = {mimeType: 'video/mpeg4'};
    recordedBlobs.camera = [];
    recordedBlobs.desktop = [];
    console.log("cameraStream");
    console.log(cameraStream);
    var cameraStream = window.cameraStream;
    try {
      cameraRecorder = new MediaRecorder(cameraStream, options);
    } catch (e0) {
      console.log('Unable to create MediaRecorder with options Object: ', e0);
      try {
        options = {mimeType: 'video/webm,codecs=vp9'};
        cameraRecorder = new MediaRecorder(cameraStream, options);
      } catch (e1) {
        console.log('Unable to create MediaRecorder with options Object: ', e1);
        try {
          options = 'video/vp8';
          cameraRecorder = new MediaRecorder(cameraStream, options);
        } catch (e2) {
          alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
          console.error('Exception while creating MediaRecorder:', e2);
          return false;
        }
      }
    }
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.innerHTML = '<i class="uk-icon-pause"><i>';
    recordButton.style.color="blue";
    playButton.disabled = true;
    downloadButton.disabled = true;
    downloadCameraButton.disabled = false;
    cameraRecorder.ondataavailable = handleDataAvailable(recordedBlobs.camera);
    cameraRecorder.start(10); // collect 10ms of data
    console.log('MediaRecorder started', cameraRecorder);
    return true;
  };
  var stopRecording = function () {
    cameraRecorder.stop();
    recordButton.innerHTML = '<i class="uk-icon-circle"><i>';
    recordButton.style.color = 'red';
    playButton.disabled = false;
    downloadButton.disabled = false;
    downloadCameraButton.disabled = false;
//    recordedVideo.controls = true;
  };

  var play = function () {
    var superBuffer = new Blob(recordedBlobs.camera, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
  };
  var userMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia || navigator.msGetUserMedia;
  this.init = function()
  {
    recordButton.onclick = toggleRecording;
    playButton.onclick = play;
    downloadButton.onclick = downloadHandler("desktop");
    downloadCameraButton.onclick = downloadHandler("camera");
    window.postMessage({
      enableScreenCapturing: true,
      domains: ["streamelopers.org", "stream.meta.do", "localhost"]
    }, "*");
  };
  this.init();
  getScreenId(function (error, sourceId, screen_constraints) {
    if(sourceId === "firefox"){
      screen_constraints.video.mediaSource = "screen";
    }
    var captureScreen = function(){
      navigator.getUserMedia(screen_constraints, gotStream(desktop, 'desktopStream'), errorHandler);
    };
    navigator.getUserMedia({video:true, audio:true }, gotStream(camera, 'cameraStream', captureScreen), errorHandler);
  });
}]);
