import React, {Component} from 'react';
import Router from "./Router";
import './App.css';

class App extends Component {
  state = {
    user: {},
  };

  
  setUser = user => {
    this.setState({ user });
  };
/*
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("USER"));
    if (user) {
      this.setState({ user });
    }
  }
*/
  render() {
    return (
      <div className="App">
        <div className="uk-section">
          <Router />
        </div>
      </div>
    );
  }
}

export default App;
