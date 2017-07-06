import React, { Component } from 'react';
import TableEntry from './TableEntry.js';
import TableHead from './TableHead.js';
import UserInputForm from './UserInputForm.js';
import qstrings from './inputData.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gudids: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._fetchData(qstrings, this);
    window.addEventListener('touchend', touchNonUDIHandle);
    window.addEventListener('touchend',touchUDIHandler);
  }

//before unmount, clear event listeners:
  componentWillUnmount() {
    window.removeEventListener('touchend', touchNonUDIHandle);
    window.removeEventListener('touchend', touchUDIHandler);
  }

  _fetchData(udis, context) {
    udis.forEach(udi => {
      fetch(`https://accessgudid.nlm.nih.gov/api/v1/devices/lookup.json?udi=${udi}`)
      .then(response => {

        if (!response.ok) {
          throw new Error('Please double check your UDI');
        }

        const transit = Object.assign({}, {udi: udi});
        //checking null here is to have the TableEntry default values to work
        transit.lot_number = response.headers.get('lot_number') === null ? undefined : response.headers.get('lot_number');
        transit.serial_number = response.headers.get('serial_number') === null ? undefined : response.headers.get('serial_number');
        transit.expiration_date = response.headers.get('expiration_date') === null ? undefined : response.headers.get('expiration_date');
        transit.manufacturing_date = response.headers.get('manufacturing_date') === null ? undefined: response.headers.get('manufacturing_date');

        context.setState({gudids: context.state.gudids.concat(transit)});
        
      })
      .catch(err => {
        if (err.message === 'Please double check your UDI') {
          const badUDIReminder = document.querySelector('.badUDIReminder');
          badUDIReminder.classList.add('show');
        } else {
          console.error('Error: ', err.message);
        }
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    document.querySelector('.repeatUDI').classList.remove('show');
    document.querySelector('.badUDIReminder').classList.remove('show');
    const udi = e.target.previousSibling.value;
    //it'd be better to add a purifier here to purify the udi, thus preventing client side injection
    const validUDI = encodeURIComponent(udi);
    // check if there's repeat UDI: 
    const udiExists = this.state.gudids.some((gudid) => gudid.udi === udi || gudid.udi === validUDI);
    if (udiExists) {
      document.querySelector('.repeatUDI').classList.add('show');
    } else {
      this._fetchData([validUDI], this);
    }
    e.target.previousSibling.value = '';
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
        <UserInputForm handleSubmit={this.handleSubmit} />
        <footer>&#169; Alison Zhang</footer>
      </div>
    );
  }
}

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
