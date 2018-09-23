import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {

  constructor(props:any) {
    super(props);

    fetch('https://us-central1-charon-lb.cloudfunctions.net/api/healthcheck')
      .then(response => response.json())
      .then(jsonResponse => alert(jsonResponse));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
