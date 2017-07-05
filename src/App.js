import React, { Component } from 'react';
import TableEntry from './TableEntry.js';
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
    const qstrings = [
    {'agency': 'GS1 Issuing Agency', 
     'udi': '(01)10884521062856(11)141231(17)150707(10)A213B1(21)1234'}, 
    {'agency': 'HIBCC',
     'udi': '%2BB066000325011NS1/$$420020216LOT123456789012345/SXYZ456789012345678/16D20130202C1'}, 
    {'agency': 'ICCBBA',
     'udi': '=/W4146EB0010T0475=,000025=A99971312345600=>014032=}013032&,1000000000000XYZ123'}];
    const data = new Array(qstrings.length);
    // use Promise.all to get all 3 piecies of data we need for display
    Promise.all(qstrings.map((qstring, index) => 
      fetch(`https://accessgudid.nlm.nih.gov/api/v1/devices/lookup.json?udi=${qstring.udi}`)
      .then(response => {

        const transit = {agency: qstring.agency, udi: qstring.udi};
        for (var pair of response.headers.entries()) {
          // console.log(pair[0] + ': ' + pair[1]);
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
  }

  render() {
    console.log(this.state.gudids);
    return (
      <div>
        <div className="tableName">Device Lookup Results</div>
        <table className="dataTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Lot Number</th>
              <th>Serial Number</th>
              <th>Expiration Date</th>
              <th>Manufacturing Date</th>
              <th>Agency</th>
              <th>UDI</th>
            </tr>
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

export default App;

function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}
