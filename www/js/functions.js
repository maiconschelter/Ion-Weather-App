var geocoder,oLatLng;

function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var iLatitude = position.coords.latitude;
        var iLongitude = position.coords.longitude;
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
        }
        if (!oLatLng) {
            oLatLng = new google.maps.LatLng(iLatitude, iLongitude);
        }
        geocoder.geocode({'latLng':oLatLng}, function(results, status) {
            var oResult = results[1];
            if (status === google.maps.GeocoderStatus.OK && oResult) {
                var aAddress = oResult.address_components;
                var aDados = [];
                var bExists = false;
                if (localStorage.tempoAgora) {
                    aDados = angular.fromJson(localStorage.tempoAgora);
                    localStorage.clear();
                }
                for (var i=0; i<aDados.length; i++) {
                    if ((aDados[i].cidade == aAddress[1].long_name) && (aDados[i].estado == aAddress[3].short_name)) {
                        bExists = true;
                        break;
                    }
                };
                if (bExists === false) {
                    aDados.push({cidade: aAddress[1].long_name,estado: aAddress[3].short_name});
                }
                localStorage.tempoAgora = angular.toJson(aDados);
                delete aDados;
                delete aAddress;
            }
        });
    });
}