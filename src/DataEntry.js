import React from 'react';
import './App.css';

//destructure table contents here, and if make lot_number's default value equal 'N/A':
const DataEntry = ({agency, expiration_date, lot_number='N/A', manufacturing_date, serial_number, UDI}) => {
  
  return (
    <tr>
      <td>{agency}</td>
      <td>{expiration_date}</td>
      <td>{lot_number}</td>
      <td>{manufacturing_date}</td>
      <td>{serial_number}</td>
      <td>{UDI}</td>

    </tr>)
};

export default DataEntry;
