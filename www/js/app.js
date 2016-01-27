angular.module('TempoAgora', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            var iLatitude = position.coords.latitude;
            var iLongitude = position.coords.longitude;
            var oLatLng = new google.maps.LatLng(iLatitude, iLongitude);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'latLng':oLatLng}, function(results, status) {
                var oResult = results[1];
                if (status === google.maps.GeocoderStatus.OK && oResult) {
                    var aAddress = oResult.address_components;
                    var sCidade = aAddress[1].long_name;
                    var sEstado = aAddress[3].short_name;
                }
            });
        });
    });
})

.controller("MainController", function($scope) {
    $scope.slideHasChanged = function($index) {
        console.log($index);
    };
    $scope.content = [{
         id: 2
        ,location: 'B'
    },{
         id: 1
        ,location: 'A'
    }];
})