import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gudids: []
    };
  }

  componentDidMount() {
    //this is our 3 udi strings. The second one needs percent-encoding to parse '+' to '%2B' to let the API consider it as a valid string
    const qstrings = ['(01)10884521062856(11)141231(17)150707(10)A213B1(21)1234', '%2BB066000325011NS1/$$420020216LOT123456789012345/SXYZ456789012345678/16D20130202C1', '=/W4146EB0010T0475=,000025=A99971312345600=>014032=}013032&,1000000000000XYZ123'];

//version 1, get the response body, which barely has any useful info
    Promise.all(qstrings.map(qstring => fetch(`https://accessgudid.nlm.nih.gov/api/v1/devices/lookup.json?udi=${qstring}`)
      .then(resp => resp.json())
    ))
    .then(data => {
      console.log('data in promise all: ', data);
      this.setState({gudids: data});
    })
    .catch(e => {
      console.error('Error: ', e.message);
    });
  }

  render() {
    console.log(this.state.gudids);
    return (
      <div>Hello Alison</div>
    );
  }
}

export default App;

/*<div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
*/