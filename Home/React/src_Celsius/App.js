// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Result} from './add_module/add';
/* Все относительные пути, начинающиеся c './' или '../' будут обрабатываться только относительно рабочей папки проекта. Пути с '/' будут обрабатываться как абсолютные пути файловой системы.*/

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

// console.log(tryConvert(50, toFahrenheit))


class ScaleTemp extends React.Component {
  constructor(props) {
    super(props);
    // this.props = {temperature: ''};
    this.handleState = this.handleState.bind(this);
  }

  handleState(e) {
      // console.log(this)
      // console.log(e.target)
      // console.log(e.currentTarget)

      // this.setState({temperature: e.target.value});
      this.props.onTemperatureChange(e.target.value);
  }

  render() {
      const temperature = this.props.temperature;
    return (
        <div>
            <p>Введите температуру {this.props.scale}:</p>
          <input type="text"
                 value={temperature}
                 onChange={this.handleState}/>
        </div>
    )
  }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'Цельсия'};
    }

    handleCelsiusChange(temp) {
        this.setState({scale: 'Цельсия', temperature: temp})
    }

    handleFahrenheitChange(temp) {
        this.setState({scale: 'Фаренгейта', temperature: temp})
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'Цельсия' ? temperature : tryConvert(temperature, toCelsius);
        const fahrenheit = scale === 'Фаренгейта' ? temperature : tryConvert(temperature, toFahrenheit);

        return (
            <div>
                <ScaleTemp scale='Цельсия' temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
                <hr/>
                <ScaleTemp scale='Фаренгейта' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
                <Result temperature={parseFloat(celsius)}/>
            </div>
        )
    }
}


export default App;
