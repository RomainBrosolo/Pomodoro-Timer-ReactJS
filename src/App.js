import React, {Component} from 'react';
import './App.scss';

class App extends Component {
  state = {
    timeWork : 2*60, timePause : 1*60, timeLast: 2*60, isWorking: true, isTimerOn: false 
  }

  componentDidMount = () => {
    const interval = setInterval(() => {
      if (this.state.isTimerOn) {
          if (this.state.timeLast <= 1) {
              if (this.state.isWorking) {
                  this.setState({timeLast: this.state.timePause});
              } else {
                  this.setState({timeLast: this.state.timeWork});
              }

              this.setState({isWorking: !this.state.isWorking});

              let song = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a");  
              song.play();
          } else {
              this.setState({timeLast: this.state.timeLast - 1});
          }
      }
    }, 250);
  };

  timer = () => {
      //Conversion des minutes et secondes
      const timeLast = this.state.timeLast;
      let timerMinutes = parseInt(timeLast / 60, 10);
      let timerSeconds = parseInt(timeLast % 60, 10);

      // On affiche un 0 devant les chiffres pour avoir un meilleur rendu 
      if (timerMinutes < 10)
      timerMinutes = "0" + timerMinutes 

      if (timerSeconds < 10)
      timerSeconds = "0" + timerSeconds 
      
      return timerMinutes + ":" + timerSeconds;
  }

  startTime = () => {
    this.setState({isTimerOn: true});
  }

  stopTime = () => {
    this.setState({isTimerOn: false});
  }

  resetTime = () => {
    this.setState({isTimerOn: false, timeLast: this.state.timeWork, isWorking: true});
  }

  changeTimeWork = (e) => {
    if (this.state.isWorking == true) {
      this.setState({
        timeWork : e.target.value * 60, 
        isTimerOn: false, 
        timeLast: e.target.value * 60, 
        isWorking: true
      })
    }
    else {
      this.setState({
        timeWork : e.target.value * 60,
      })
    }
    
  }

  changeTimePause = (e) => {
    if (this.state.isWorking == true) {
      this.setState({
        timePause : e.target.value * 60, 
      })
    }
    else {
      this.setState({
        timePause : e.target.value * 60, 
        isTimerOn: false,
        isWorking: true,
        timeLast: this.state.timeWork, 
      })
    }
    
  }

  render() {
    return(
      <div id="container">
        <h1 style={this.state.isWorking ? {color: "green"} : {color: "red"}}>{this.state.isWorking ? "Time to work !" : "Pause"}</h1>
        <h2 style={this.state.timeLast <= 20 ? {color: "red"} : {color: "black"}}>{this.timer()}</h2>
              
        <div className="options">
            <div className="button">
                <button type='button' onClick={this.startTime}>START</button>
                <button type='button' onClick={this.stopTime}>STOP</button>
                <button type='button' onClick={this.resetTime}>RESET</button>
            </div>

            <div className='input'>
              <label htmlFor='input_work'>Time working :</label>
              <input id='input_work' type='number' min='1' value={ this.state.timeWork > 0 ? this.state.timeWork/60 : null} onChange={this.changeTimeWork} />
              <label htmlFor='input_pause'>Time pause :</label>
              <input id='input_pause' type='number' min='1' value={this.state.timePause > 0 ? this.state.timePause/60 : null} onChange={this.changeTimePause} />
            </div>
        </div>
      </div>
    );
  }
}

export default App;