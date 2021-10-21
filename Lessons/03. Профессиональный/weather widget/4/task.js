(function() {

    window.WheatherWidget = function(cityID) {
        this.cityId = cityID;
        this.apiUrl = "https://api.openweathermap.org/data/2.5/";
        this.apiKey = "04a3b049749707ef800690a2d2685941";
        this.apiQuery = this.apiUrl + "/weather?id=" + this.cityId + "&units=metric&lang=ru&appid=" + this.apiKey;
        this.apiQueryForecast = this.apiUrl + "/forecast?id=" + this.cityId + "&units=metric&lang=ru&appid=" + this.apiKey;

        var body = document.querySelector('body');
        body.innerHTML = '<div class="main"><div class="wetherWidget"><div class="wraper"><div class="title-wraper"><a href="#"><img id="close" src="./img/closeIcon.svg"></a><span id="title">Погода на</span><span id="today"></span></div><div class="weather-container"><section class="weather-descr"><h2 id="location"></h2><div class="description-wrapper"><div id="image"></div><div id="descr"></div></div><div id="wind"></div></section><section class="weather-section"><div id="temp-wraper"><div id="temp"></div><div class="icon-degree"></div></div><button id="forecast">Прогноз на 3 дня</button></section></div><div class="section-wraper section_closed"><a href="#" class="link_back section_closed">Скрыть</a><div class="main-wraper"><div class="forecast-wraper"><div class="daysWraper"><div class="firstDay"><div id="day1"></div><div class="tempWrapper"><div id="temp1"></div><div class="iconCelsium"></div></div><div id="icon1"></div><div id="description1"></div><div id="wind1"></div></div><div class="secondDay"><div id="day2"></div><div class="tempWrapper"><div id="temp2"></div><div class="iconCelsium"></div></div><div id="icon2"></div><div id="description2"></div><div id="wind2"></div></div><div class="thirdDay"><div id="day3"></div><div class="tempWrapper"><div id="temp3"></div><div class="iconCelsium"></div></div><div id="icon3"></div><div id="description3"></div><div id="wind3"></div></div></div></div></div></div></div></div></div>';

        var closeBtn = document.getElementById('close');
        var widget = document.querySelector('.wetherWidget');
        var forecastBtn = document.getElementById('forecast');
        var divForecast = document.querySelector('.section-wraper');
        var linkBack = document.querySelector('.link_back');
        var self = this;
        var gif1;
        var mainWraper;

        var mainDiv = document.querySelector('.main');
        widget.classList.add('section_closed');
        var loading = document.createElement('img');
        loading.setAttribute('src', './img/spiner.gif');
        loading.style.cssText = 'width:102px;height:102px; margin-left:90px;';
        mainDiv.appendChild(loading);

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (day < 10) { day = '0' + day };
        if (month < 10) { month = '0' + month };
        if (year < 10) { year = '0' + year };

        this.getWeather = function() {
            fetch(this.apiQuery, { method: 'get' })
                .then(response => response.json())
                .then(data => {
                    widget.classList.remove('section_closed');
                    mainDiv.removeChild(loading);

                    var iconcels = document.createElement('div');
                    iconcels.classList.add('iconCelsium');

                    var city = document.getElementById('location');
                    var temp = document.getElementById('temp');
                    var todayDay = document.getElementById('today');
                    var iconWeather = document.getElementById('image');
                    var descriptionWeather = document.getElementById('descr');
                    var windDescr = document.getElementById('wind');

                    todayDay.innerHTML = `${day}/${month}/${year}`;
                    city.innerHTML = `<span>Сейчас в городе:</span><span class="city">${data.name}</span>`;
                    temp.innerHTML = `<span>${data.main["temp"]}</span>`;
                    var iconCode = `${data.weather[0]["icon"]}`;
                    iconWeather.innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode}.png"></img>`;
                    descriptionWeather.innerHTML = `<span>${data.weather[0]["description"]}</span>`;
                    windDescr.innerHTML = `<span> Ветер: ${data.wind["speed"]} м/с</span>`;
                })
                .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
        };

        gif1 = document.createElement('img');
        gif1.setAttribute('src', './img/spiner.gif');

        gif1.style.cssText = 'width:102px;height:102px;margin-left:90px;';


        forecastWraper = document.querySelector('.forecast-wraper');
        forecastWraper.classList.add('section_closed');

        mainWraper = document.querySelector('.main-wraper');
        mainWraper.appendChild(gif1);


        this.getForecastWeather = function() {
            fetch(this.apiQueryForecast, { method: 'get' })
                .then(response => response.json())
                .then(result => {
                    gif1.classList.add('section_closed');

                    forecastWraper.classList.remove('section_closed');

                    var todayPlus = new Date();
                    todayPlus.setDate(todayPlus.getDate() + 3);

                    var resultList = result.list.filter(function(item) {

                        var dayItem = new Date(item.dt_txt);

                        if ((item.dt_txt.indexOf("12:00") !== -1) && (todayPlus > dayItem)) {
                            return true;
                        }
                    })
                    var dayFirst = document.getElementById('day1');
                    var daySecond = document.getElementById('day2');
                    var dayThird = document.getElementById('day3');

                    var temp1 = document.getElementById('temp1');
                    var temp2 = document.getElementById('temp2');
                    var temp3 = document.getElementById('temp3');

                    var iconWeather1 = document.getElementById('icon1');
                    var iconWeather2 = document.getElementById('icon2');
                    var iconWeather3 = document.getElementById('icon3');

                    var descriptionWeather1 = document.getElementById('description1');
                    var descriptionWeather2 = document.getElementById('description2');
                    var descriptionWeather3 = document.getElementById('description3');

                    var windDescr1 = document.getElementById('wind1');
                    var windDescr2 = document.getElementById('wind2');
                    var windDescr3 = document.getElementById('wind3');

                    var day1 = result.list[0].dt_txt;
                    var day2 = result.list[8].dt_txt;
                    var day3 = result.list[16].dt_txt;
                    var fullday1 = `${day1.split("-")[2].split(" ")[0]}/${day1.split("-")[1]}`;
                    var fullday2 = `${day2.split("-")[2].split(" ")[0]}/${day2.split("-")[1]}`;
                    var fullday3 = `${day3.split("-")[2].split(" ")[0]}/${day3.split("-")[1]}`;

                    dayFirst.innerHTML = `${fullday1}`;
                    daySecond.innerHTML = `${fullday2}`;
                    dayThird.innerHTML = `${fullday3}`;

                    temp1.innerHTML = `${Math.round(resultList[0].main["temp"])}`;
                    temp2.innerHTML = `${Math.round(resultList[1].main["temp"])}`;
                    temp3.innerHTML = `${Math.round(resultList[2].main["temp"])}`;

                    var iconCode1 = `${resultList[0].weather[0]["icon"]}`;
                    iconWeather1.innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode1}.png"></img>`;

                    var iconCode2 = `${resultList[1].weather[0]["icon"]}`;
                    iconWeather2.innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode2}.png"></img>`;

                    var iconCode3 = `${resultList[2].weather[0]["icon"]}`;
                    iconWeather3.innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode3}.png"></img>`;

                    descriptionWeather1.innerHTML = `<span>${resultList[0].weather[0]["description"]}</span>`;
                    descriptionWeather2.innerHTML = `<span>${resultList[1].weather[0]["description"]}</span>`;
                    descriptionWeather3.innerHTML = `<span>${resultList[2].weather[0]["description"]}</span>`;

                    windDescr1.innerHTML = `<span>${Math.round(resultList[0].wind["speed"])} м/с</span>`;
                    windDescr2.innerHTML = `<span>${Math.round(resultList[1].wind["speed"])} м/с</span>`;
                    windDescr3.innerHTML = `<span>${Math.round(resultList[2].wind["speed"])} м/с</span>`;
                })
                .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
        };

        closeBtn.addEventListener('click', function() {
            mainDiv.classList.add('close__widget');
        });

        forecastBtn.addEventListener('click', function() {
            divForecast.classList.remove('section_closed');
            mainDiv.style.height = `${250}px`;
            forecastBtn.classList.add('close__widget');
            linkBack.classList.remove('section_closed');
            self.getForecastWeather();
        });

        linkBack.addEventListener('click', function() {
            divForecast.classList.add('section_closed');
            mainDiv.style.height = `${120}px`;
            forecastBtn.classList.remove('close__widget');
            linkBack.classList.add('section_closed');
        });
    };


}())