import React, { Component } from 'react';
import './App.css';
import Home from './scenes/Home';
import Quiz from './scenes/Quiz';
import AppStore from './store/AppStore';

var app = new AppStore();

class App extends Component {
    constructor() {
        super();
        this.state = {
            showHome: true
        }
    }

  render() {

      return (
      <div className="App">
          <h1>Homework Helper</h1>
          {this.state.showHome ? <Home app={app}/> : <Quiz app={app}/>}
          <button onClick={() => this.setState({showHome: !this.state.showHome})}>{this.state.showHome ? "Show Quiz" : "Go Home"}</button>
      </div>
    );
  }
}

export default App;
