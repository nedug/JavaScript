function WeatherWidget() {

    let field = null;
    let forecastNow = null;
    let forecast3day = null;


    this.createWrapWidget = function() {

        field = document.createElement('div');
        field.setAttribute('id', 'weather-widget');

        const innerWrap = `
            <div id="more-info">
                <a href="#" id="oneDay">Сейчас</a>
                <a href="#" id="threeDays">Прогноз на 3 дня</a>
            </div>
    
            <h1>Погода</h1>
            
            <div id="forecast-3-days"></div>
            
            <div id="forecast-now">
                <div class="icon-weather"></div>
                <h2 class="location"></h2>
                <h1 class="temperature"></h1>
                <div class="description"></div>
                <div class="wind"></div>
                <div id="image"></div>
            </div>
    
            <a href="#" class="modal__close" title="Закрыть"></a>`;

        field.innerHTML = innerWrap;
        document.body.append(field);

        forecastNow = document.getElementById('forecast-now');
        forecast3day = document.getElementById('forecast-3-days');
    };



    this.getNowWeather = function(_cityID) {

        let cityID = _cityID;
        let apiUrl = "https://api.openweathermap.org/data/2.5/";
        let apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
        let apiQuery = apiUrl+"/weather?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;


        fetch(apiQuery, {method: 'get'})
            .then((response) => response.json())
            .then((data) => this.showNowWeather(data))
            .catch((error) => console.error("Ошибка получение погоды. Причина: " + error));

    };


    this.showNowWeather = function(data) {

        forecast3day.style.display = "none";
        forecastNow.style.display = "block";

        let icon = forecastNow.querySelector('.icon-weather');
        icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;

        let location = forecastNow.querySelector('.location');
        location.innerHTML = `<strong>${data.name}</strong>`;

        let temperature = forecastNow.querySelector('.temperature');
        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;

        let description = forecastNow.querySelector('.description');
        description.innerHTML = data.weather[0].description;

        let wind = forecastNow.querySelector('.wind');
        wind.innerHTML = `Ветер ${roundMod(data.wind.speed, 0.1)} м/с`;


        function roundMod(n, m) {
            return Math.round(n / m) * m;
        }
    };













    this.getWeather = function() {
        this.createWrapWidget();
        // this.events();
        this.getNowWeather(625144); /* Минск */
        // this.getThreeDaysWheather(625144);
    };


}
