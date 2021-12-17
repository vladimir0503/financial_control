import React from "react";

function Form({ name, children }) {
  return (
    <div className="contentWrapper">
      <div className="formWrapper">
        <div className="formBlock">
          <div className="formHeader">
            <h3>{name}</h3>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Form;
