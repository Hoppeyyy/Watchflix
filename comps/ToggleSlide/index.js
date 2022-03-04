import React, { useState } from 'react'
import styled from "styled-components";

const ToggleSlide = ({  
  isOn, 
  handleToggle =() =>{}, 
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default ToggleSlide;
