import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {"gudids": []};
  }
  componentDidMount() {
    //use promise.all?
    const qstrings = ['(01)10884521062856(11)141231(17)150707(10)A213B1(21)1234', '%2BB066000325011NS1/$$420020216LOT123456789012345/SXYZ456789012345678/16D20130202C1', '=/W4146EB0010T0475=,000025=A99971312345600=>014032=}013032&,1000000000000XYZ123'];
    // const qs1 = ;
    // const qs2 = ;
    // const qs3 = ;

    qstrings.forEach((qstring, index) => fetch(`https://accessgudid.nlm.nih.gov/api/v1/devices/lookup.json?udi=${qstring}`)
    .then(blob => blob.json())
    .then(data => {
      console.log('data: ', data.gudid);
      console.log('index: ', index);
      this.setState({gudids: data});
      // this.setState({gudids[index]: data});
    })
    .catch(e => {
      console.error('Error: ', e.message);
    }))
  }
  render() {
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