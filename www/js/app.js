angular.module('TempoAgora', ['ionic'])

.constant('urlService', 'http://developers.agenciaideias.com.br/tempo/json/')

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        getGeoLocation();
    });
})

.controller("MainController", function($scope, $http, urlService) {
    $scope.content = [];
    $scope.slideHasChanged = function($index) {
        console.log($index);
    };
    var aDados = angular.fromJson(localStorage.tempoAgora);
    angular.forEach(aDados, function(value, key){
        var oLocation = angular.fromJson(value);
        urlService += oLocation.cidade + ' - ' + oLocation.estado;
        $http.get(urlService).then(function(response) {
            console.log(response.data);
        });
        $scope.content.push({id:key+1,location:oLocation.cidade + ', ' + oLocation.estado});
    });
})

.directive('dateNow', ['$filter', function($filter) {
    return {
        link: function($scope, $element, $attrs) {
            $element.text($filter('date')(new Date(), $attrs.dateNow));
        }
    };
}])