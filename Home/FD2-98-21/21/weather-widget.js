function WeatherWidget() {

    let field = null;

    this.createWrapWidget = function() {

        field = document.createElement('div');
        field.setAttribute('id', 'weather-widget')
        document.body.append(field);
    };













    this.getWeather = function() {
        this.createWrapWidget();
        // this.events();
        // this.getOneDayWheather(625144);
        // this.getThreeDaysWheather(625144);
    };


}
