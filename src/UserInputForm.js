import React from 'react';

const UserInputForm = ({handleSubmit}) => {
  return(
    <form className="form">
      <input type="text" className="UDIInput" placeholder="Please type in UDI..."/>
      <input type="submit" value="Submit" onClick={handleSubmit}/>
      <span className="badUDIReminder">Please double check your UDI</span>
      <span className="repeatUDI">Device with the same UDI exists in the table</span>
    </form>
    )
};

export default UserInputForm;
