import * as React from 'react';
import { Component } from 'react';

class Accounts extends Component {

  constructor(props:any) {
    super(props);

    fetch('https://us-central1-charon-lb.cloudfunctions.net/api/accounts')
      .then(response => response.json())
      .then(jsonResponse => alert(JSON.stringify(jsonResponse)));
  }

  public render() {
    return (
      <div>
          lol
      </div>
    );
  }
}

export default Accounts;
