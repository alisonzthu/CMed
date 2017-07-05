import React from 'react';
import './App.css';

//destructure table contents here, and if make lot_number's default value equal 'N/A':
const TableEntry = ({agency, expiration_date, lot_number='N/A', manufacturing_date, serial_number, UDI}) => {
  
  return (
    <tr>
      <td>{lot_number}</td>
      <td>{serial_number}</td>
      <td>{expiration_date}</td>
      <td>{manufacturing_date}</td>
      <td>{agency}</td>
      <td className="udiNumber"><a className="seeUDI">see UDI</a></td>

    </tr>)
};

export default TableEntry;

//<td className="udiNumber">{UDI}</td>