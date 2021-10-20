function WeatherWidget() {

    let that = this;
    let cityID = null;
    let field = null;
    let forecastNow = null;
    let forecast3day = null;
    let loader = null;

    this.createWrapWidget = function() {

        field = document.createElement('div');
        field.setAttribute('id', 'weather-widget');

        const innerWrap = `
            <div id="more-info">
                <a href="#" class="now-weather">Сейчас</a>
                <a href="#" class="day3-weather">Прогноз на 3 дня</a>
            </div>
    
            <h1>Погода</h1>
            
            <div id="forecast-now">
                <div class="icon-weather"></div>
                <h2 class="location"></h2>
                <h1 class="temperature"></h1>
                <div class="description"></div>
                <div class="wind"></div>
            </div>
            
            <div id="forecast-3-days">
               <div class="today"></div>       
               <div class="tomorrow"></div>       
               <div class="after-tomorrow"></div>       
            </div>
            
            <div id="loader"><img src="loader.gif"></div>
    
            <a href="#" class="modal__close" title="Закрыть"></a>`;

        field.innerHTML = innerWrap;
        document.body.append(field);

        forecastNow = document.getElementById('forecast-now');
        forecast3day = document.getElementById('forecast-3-days');

        loader = document.getElementById('loader');
    };


    this.getNowWeather = function() {

        forecastNow.style.display = "none";
        forecast3day.style.display = "none";
        loader.style.display = "";


        let apiUrl = "https://api.openweathermap.org/data/2.5/";
        let apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
        let apiQuery = apiUrl+"/weather?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;


        fetch(apiQuery, {method: 'get'})
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                loader.style.display = "none";
                this.showNowWeather(data)
            })
            .catch((error) => console.error("Ошибка получение погоды. Причина: " + error));

    };


    this.get3dayWeather = function() {

        forecastNow.style.display = "none";
        forecast3day.style.display = "none";
        loader.style.display = "";

        let apiUrl = "https://api.openweathermap.org/data/2.5/";
        let apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
        let apiQuery = apiUrl+"/forecast?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;

        fetch(apiQuery, {method: 'get'})
            .then(response => response.json())
            .then(data3day => {
                // console.log(data3day);
                loader.style.display = "none";
                this.show3dayWeather(data3day);
            })
            .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
    };


    this.showNowWeather = function(data) {

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
        wind.innerHTML = `Ветер ${data.wind.speed} м/с`;
    };


    this.show3dayWeather = function(data3day) {

        forecast3day.style.display = "flex";

        const today = forecast3day.querySelector('.today');
        today.innerHTML = `
        Сегодня:<br>
        <img src="http://openweathermap.org/img/w/${data3day.list[1].weather[0]["icon"]}.png">
        <h3>${Math.round(data3day.list[1].main.temp)} °C</h3> 
        <p>${data3day.list[1].weather[0]["description"]}</p>
        Ветер:<br>
        ${data3day.list[1].wind.speed} м/с`;

        const tomorrow = forecast3day.querySelector('.tomorrow');
        tomorrow.innerHTML = `
        Завтра:<br>
        <img src="http://openweathermap.org/img/w/${data3day.list[9].weather[0]["icon"]}.png">
        <h3>${Math.round(data3day.list[9].main.temp)} °C</h3>
        <p>${data3day.list[9].weather[0]["description"]}</p>
        Ветер:<br>
        ${data3day.list[9].wind.speed} м/с`;

        const afterTomorrow = forecast3day.querySelector('.after-tomorrow');
        afterTomorrow.innerHTML = `
        Послезавтра:<br>
        <img src="http://openweathermap.org/img/w/${data3day.list[17].weather[0]["icon"]}.png">
        <h3>${Math.round(data3day.list[17].main.temp)} °C</h3>
        <p>${data3day.list[17].weather[0]["description"]}</p>
        Ветер:<br>
        ${data3day.list[17].wind.speed} м/с`;
    };


    this.controller = function() {

        const btnClose = field.querySelector('.modal__close');
        btnClose.addEventListener('click', function(e) {

            e.preventDefault();
            field.style.display = "none";
        });

        const btnNowWeather = field.querySelector('.now-weather');
        btnNowWeather.addEventListener('click', function(e) {

            e.preventDefault();
            that.getNowWeather();
        });

        const btnDay3Weather = field.querySelector('.day3-weather');
        btnDay3Weather.addEventListener('click', function(e) {

            e.preventDefault();
            that.get3dayWeather();
        });
    };


    this.getWeather = function(_cityID) {

        cityID = _cityID;

        this.createWrapWidget();
        this.controller();
        this.getNowWeather();
    };

}