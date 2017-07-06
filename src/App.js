import React, { Component } from 'react';
import TableEntry from './TableEntry.js';
import TableHead from './TableHead.js';
import qstrings from './inputData.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gudids: []
    };
  }

  componentDidMount() {
    const data = new Array(qstrings.length);
    // use Promise.all to get all 3 piecies of data we need for display
    Promise.all(qstrings.map((qstring, index) => 
      fetch(`https://accessgudid.nlm.nih.gov/api/v1/devices/lookup.json?udi=${qstring.udi}`)
      .then(response => {

        const transit = Object.assign({}, qstring);
        transit.lot_number = response.headers.get('lot_number') === null ? undefined : response.headers.get('lot_number');
        transit.serial_number = response.headers.get('serial_number') === null ? undefined : response.headers.get('serial_number');
        transit.expiration_date = response.headers.get('expiration_date') === null ? undefined : response.headers.get('expiration_date');
        transit.manufacturing_date = response.headers.get('manufacturing_date') === null ? undefined: response.headers.get('manufacturing_date');

        data[index] = transit;
      })))
      .catch(err => {
        throw new UserException('Fetch data error');
      })
    .then(()=> {
      this.setState({gudids: data});
    })
    .catch(err => {
      console.log('Error: ', err.message);
    });

    window.addEventListener('touchend', touchNonUDIHandle);
    window.addEventListener('touchend',touchUDIHandler);
  }

//before unmount, clear event listeners:
  componentWillUnmount() {
    window.removeEventListener('touchend', touchNonUDIHandle);
    window.removeEventListener('touchend', touchUDIHandler);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    const udi = e.target.previousSibling.value;
    const validUDI = encodeURIComponent(udi);
    console.log(validUDI);
    fetch(`https://accessgudid.nlm.nih.gov/api/v1/devices/lookup.json?udi=${validUDI}`)
    .then(response => {

      const transit = Object.assign({}, qstring);
      transit.lot_number = response.headers.get('lot_number') === null ? undefined : response.headers.get('lot_number');
      transit.serial_number = response.headers.get('serial_number') === null ? undefined : response.headers.get('serial_number');
      transit.expiration_date = response.headers.get('expiration_date') === null ? undefined : response.headers.get('expiration_date');
      transit.manufacturing_date = response.headers.get('manufacturing_date') === null ? undefined: response.headers.get('manufacturing_date');

      data[index] = transit;
    })
    .catch(err => {
      console.error('uh')
    });
  }

  render() {
    if (this.state.gudids.length === 0) {
      return (
      <div className="loader"></div>)
    }
    return (
      <div>
        <header className="tableName">Device Lookup Results</header>
        <table className="dataTable">
          <thead>
            <TableHead />
          </thead>
          <tbody>
            {this.state.gudids.map((gudid, index) => 
              <TableEntry key={index} No={index} agency={gudid.agency} expiration_date={gudid.expiration_date} lot_number={gudid.lot_number} manufacturing_date={gudid.manufacturing_date} serial_number={gudid.serial_number} UDI={gudid.udi}/>
            )}
          </tbody>
        </table>
        <div className="form">
          <input type="text"/>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </div>
        <footer>&#169; Alison Zhang</footer>
      </div>
    );
  }
}

const UserException = (message) => {
  this.message = message;
  this.name = 'UserException';
};

const touchNonUDIHandle = (e) => {
  const udiTags = Array.prototype.slice.call(document.querySelectorAll('.seeUDI'));
  if (!udiTags.includes(e.target)) {
    for (var i = 0; i < udiTags.length; i++) {
      udiTags[i].nextSibling.style.visibility = 'hidden';
    }
  }
};

const touchUDIHandler = (e) => {
  const udiTags = Array.prototype.slice.call(document.querySelectorAll('.seeUDI'));
  if (udiTags.includes(e.target)) {
     e.target.nextSibling.style.visibility = 'visible';
  }
};

export default App;
