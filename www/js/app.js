var AppTempo = angular.module('TempoAgora', ['ionic']);

AppTempo.constant('urlService', 'http://developers.agenciaideias.com.br/tempo/json/');

AppTempo.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
             url: '/home'
            ,templateUrl: 'tpl/home.html'
            ,controller: 'MainController'
        })
        .state('config', {
             url: '/config'
            ,templateUrl: 'tpl/config.html'
            ,controller: 'MainController'
        });
        $urlRouterProvider.otherwise('/home');
});

AppTempo.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        getGeoLocation();
    });
});

AppTempo.factory('TempoAPI', ['$http', '$rootScope', 'urlService', function($http, $rootScope, urlService){
    var dados = [];
    return {
        getTempo: function(local){
            return $http.get(urlService + local).then(function(response) {
                dados = response.data;
                $rootScope.$broadcast('handleSharedOrders', dados);
                return dados;
            });
        }
    };
}]);

AppTempo.controller('MainController', ['$scope', '$rootScope', '$filter', '$location', 'TempoAPI', function($scope, $rootScope, $filter, $location, TempoAPI){
    $scope.content = [];
    var dataStorage = angular.fromJson(localStorage.tempoAgora);
    angular.forEach(dataStorage, function(value, key){
        var location = angular.fromJson(value);
        var cidade = location.cidade.toLowerCase() + '-' + location.estado.toLowerCase();
        TempoAPI.getTempo(cidade).then(function(data){
            var elDataHora = angular.element(document.getElementById('data_hora_' + location.id));
            var elTempoIcon = angular.element(document.getElementById('tempo_icon_' + location.id));
            var elTempoValor = angular.element(document.getElementById('tempo_valor_' + location.id));
            var elTempoDesc = angular.element(document.getElementById('tempo_desc_' + location.id));
            elDataHora.text($filter('date')(Date.now(), 'EEE, MMM dd h:m:s a'));
            elTempoIcon.attr('src', data.agora.imagem);
            elTempoValor.text(data.agora.temperatura + '°C');
            elTempoDesc.text(data.agora.descricao);
            setInterval(function(){
                elDataHora.text($filter('date')(Date.now(), 'EEE, MMM dd h:m:s a'));
            }, 1000);
        });
        $scope.content.push({id:location.id,location:location.cidade + ', ' + location.estado});
    });
}]);