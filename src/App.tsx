import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Accounts from './AccountsPage';
import './App.css';
import MenuAppBar from './Menu';
import Payments from './PaymentsPage';

class App extends React.Component<any> {

  constructor(props:any) {
    super(props);

    fetch('https://us-central1-charon-lb.cloudfunctions.net/api/healthcheck')
      .then(response => response.json())
      .then(jsonResponse => alert(jsonResponse));
  }

  public render() {
    const Home = () => (
      <header className="App-header">
        <img src={"https://assets.l.is/img/logo.png"} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Charon</h1>
    </header>
    );

    const Base = (props:any) => (
      <div>
        <CssBaseline />
        <MenuAppBar history={props.history}/>
        <div className="App">
          <Route path='/' exact={true} component={Home}/>
          <Route path='/accounts' component={Accounts}/>
          <Route path='/payments' component={Payments}/>
        </div>
      </div>
    );
    
    return (
      <Router>
        <div>
          <Route render={Base}/>
        </div>
      </Router>
    );
  }
}

export default App;
