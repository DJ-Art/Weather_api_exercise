(function () {
    "use strict";
    function buildCurrentConditionsHTML(todays) {
        var html = "";
        var $currentConditionsContainer = $(".current-conditions-container");
        html += '<div class="conditions-list-container">';
        html += '<ul class="current-conditions-list">';
        html += '<li class="min-max-temps">' + todays.high + '&deg;/ ' + todays.low + '&deg;</li>';
        html += '<li class="conditions-icon"><img src="' + todays.icon + '" alt="..."></li>';
        html += '<li class="current-description"><strong>' + todays.general_info + ':</strong> ' +todays.specific_info+'</li>';
        html += '<li class="humidity"><strong>Humidity:</strong> '+todays.humidity+'</li>';
        html += '<li class="wind"><strong>Wind:</strong> '+todays.wind+'</li>';
        html += '<li class="pressure"><strong>Pressure:</strong> '+todays.pressure+'</li>';
        html += '</ul></div>';
        $currentConditionsContainer.append(html);
    }
    $(document).ready(function () {
        var todays = {
            high: 0,
            low: 0,
            current_temp: 0,
            icon: "",
            general_info: '',
            specific_info: '',
            humidity: 0,
            wind: 0,
            pressure: 0
        };
        $("#locationSearch").on('click', function () {
            var latitude = $('#latitude').val();
            var longitude = $('#longitude').val();
            var requestOptions = {
                APPID: "1f8cf5283d525af161fcfbe1a348a256",
                lat: latitude,
                lon: longitude,
                units: "imperial",
                cnt: 3
            };
            var weatherRequest = $.get("http://api.openweathermap.org/data/2.5/forecast", requestOptions);
            weatherRequest.done(function (weatherData) {
                var threeDayCast = weatherData.list;
                $(".current-conditions-container").html('<h2 class="location-name">' + weatherData.city.name + '</h2>');
                for (var i = 0; i < threeDayCast.length; i++) {
                    threeDayCast[i];
                    todays.high = Math.round(threeDayCast[i].main.temp_max);
                    todays.low = Math.round(threeDayCast[i].main.temp_min);
                    todays.current_temp = threeDayCast[i].main.temp;
                    todays.icon = "http://openweathermap.org/img/w/" + threeDayCast[i].weather[0].icon + ".png";
                    todays.general_info = threeDayCast[i].weather[0].main;
                    todays.specific_info = threeDayCast[i].weather[0].description;
                    todays.humidity = threeDayCast[i].main.humidity;
                    todays.wind = threeDayCast[i].wind.speed;
                    todays.pressure = threeDayCast[i].main.pressure;
                    buildCurrentConditionsHTML(todays);
                }
            });
        });
    });

}());