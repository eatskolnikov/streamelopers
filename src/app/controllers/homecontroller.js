app.controller("HomeCtrl", ['$scope', '$http','$filter', function($scope, $http, $filter)
{
  var orderBy = $filter('orderBy');
  this.getSuperDonors = function(value, index, array){
    return value.Amount >= 60;
  };
  this.playlists = [];
  this.donors = [];
  var playlistsUrl = 'https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyCsH_dFYaU0Pvc2KZUE-I4LI8ppg3DmZKk&channelId=UCznWXigAvBa1ZtrgRmJGZgg&part=id,snippet&maxResults=24';
  this.init = function(){
    $http.get(playlistsUrl).success(angular.bind(this, function(data){
      this.playlists = orderBy(data.items,'title', false);
    }));
    Papa.parse("/streamelopers_donations.csv?v=STREAMELOPERS_CURRENT_VERSION", {
    	download: true,
	    header: true,
    	complete: angular.bind(this, function(results) {
        this.donors = orderBy(results.data,'Amount',true);
    	})
    });
  };
  this.init();
}]);
