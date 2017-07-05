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
        //extract only the data we need for display:
        for (var pair of response.headers.entries()) {
          switch(pair[0]) {
            case 'lot_number':
              transit[pair[0]] = pair[1];
              break;
            case 'serial_number':
              transit[pair[0]] = pair[1];
              break;
            case 'expiration_date':
              transit[pair[0]] = pair[1];
              break;
            case 'manufacturing_date':
              transit[pair[0]] = pair[1];
              break;
            default:
              break;
          }
        }
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

  render() {
    if (this.state.gudids.length === 0) {
      return (
      <div className="loader"></div>)
    }
    return (
      <div>
        <div className="tableName">Device Lookup Results</div>
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
