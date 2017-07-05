import React from 'react';
import './App.css';

//register this handleClick event handler so that user can tap on mobile phone to see the tooltip
const handleClick = (e) => {
};

//destructure table contents and make default values'N/A':
const TableEntry = ({No, agency='N/A', expiration_date='N/A', lot_number='N/A', manufacturing_date='N/A', serial_number='N/A', UDI}) => {
  console.log('lot in entry: ', lot_number);
  return (
    <tr>
      <td>{No + 1}</td>
      <td>{lot_number}</td>
      <td>{serial_number}</td>
      <td>{expiration_date}</td>
      <td>{manufacturing_date}</td>
      <td>{agency}</td>
      <td className="UDIContainer" data-udi={UDI}>
        <a className="seeUDI">Hover to see UDI</a>
        <span className="UDItip" onClick={handleClick}>{UDI}</span>
      </td>
    </tr>)
};

export default TableEntry;
