var geocoder,latLng;

function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
        }
        if (!latLng) {
            latLng = new google.maps.LatLng(latitude, longitude);
        }
        geocoder.geocode({'latLng':latLng}, function(results, status) {
            var result = results[1];
            if (status === google.maps.GeocoderStatus.OK && result) {
                var address = result.address_components;
                var dados = [];
                var exists = false;
                var id = 0;
                if (localStorage.tempoAgora) {
                    dados = angular.fromJson(localStorage.tempoAgora);
                    localStorage.clear();
                }
                for (var i=0; i<dados.length; i++) {
                    if(dados[i].id > id){
                        id = dados[i].id;
                    }
                    if ((dados[i].cidade == address[1].long_name) && (dados[i].estado == address[3].short_name)) {
                        exists = true;
                        break;
                    }
                };
                if (exists === false) {
                    id++;
                    dados.push({id:id,cidade:address[1].long_name,estado:address[3].short_name});
                    window.location.reload();
                }
                localStorage.tempoAgora = angular.toJson(dados);
                delete dados;
                delete address
            }
        });
    });
};