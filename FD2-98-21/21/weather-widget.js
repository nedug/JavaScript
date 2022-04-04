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
    
            <h2 class="title">ПОГОДА</h2>
            
            <div id="forecast-now">
                <div class="icon-weather"></div>
                <h1 class="location"></h1>
                <h1 class="temperature"></h1>
                <div class="description"></div>
                <div class="wind"></div>
            </div>
            
            <div id="forecast-3-days">
               <div class="today"></div>       
               <div class="tomorrow"></div>       
               <div class="after-tomorrow"></div>       
            </div>
            
            <div id="loader"><img src="loader.gif" height="110" width="auto"></div>
    
            <a href="#" class="modal__close"></a>`;

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
                console.log(data);
                // loader.style.display = "none";
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
                // loader.style.display = "none";
                this.show3dayWeather(data3day);
            })
            .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
    };


    this.showNowWeather = function(data) {

        loader.style.display = "none";
        forecastNow.style.display = "block";

        const icon = forecastNow.querySelector('.icon-weather');
        icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;

        const location = forecastNow.querySelector('.location');
        location.innerHTML = `${data.name}`;

        const temperature = forecastNow.querySelector('.temperature');
        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;

        const description = forecastNow.querySelector('.description');
        description.innerHTML = data.weather[0].description;

        const wind = forecastNow.querySelector('.wind');
        wind.innerHTML = `Ветер: ${round(data.wind.speed, 1)} м/с`;

        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }
    };


    this.show3dayWeather = function(data3day) {

        loader.style.display = "none";
        forecast3day.style.display = "flex";

        const today = forecast3day.querySelector('.today');
        today.innerHTML = `
        Сегодня:<br>
        <img src="http://openweathermap.org/img/w/${data3day.list[1].weather[0]["icon"]}.png">
        <h3>${Math.round(data3day.list[1].main.temp)} °C</h3> 
        <p>Ветер:<br>
        ${round(data3day.list[1].wind.speed, 1)} м/с</p>
        ${data3day.list[1].weather[0]["description"]}`;

        const tomorrow = forecast3day.querySelector('.tomorrow');
        tomorrow.innerHTML = `
        Завтра:<br>
        <img src="http://openweathermap.org/img/w/${data3day.list[9].weather[0]["icon"]}.png">
        <h3>${Math.round(data3day.list[9].main.temp)} °C</h3>
        <p>Ветер:<br>
        ${round(data3day.list[9].wind.speed, 1)} м/с</p>
        ${data3day.list[9].weather[0]["description"]}`;

        const afterTomorrow = forecast3day.querySelector('.after-tomorrow');
        afterTomorrow.innerHTML = `
        Послезавтра:<br>
        <img src="http://openweathermap.org/img/w/${data3day.list[17].weather[0]["icon"]}.png">
        <h3>${Math.round(data3day.list[17].main.temp)} °C</h3>
        <p>Ветер:<br>
        ${round(data3day.list[17].wind.speed, 1)} м/с</p>
        ${data3day.list[17].weather[0]["description"]}`;

        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }
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