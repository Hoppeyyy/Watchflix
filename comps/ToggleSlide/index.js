import React, { useState } from 'react'
import styled from "styled-components";

const LableBox = styled.label`
  background-image: url("${props => props.url}");
`

const ToggleSlide = ({  
  isOn, 
  handleToggle =() =>{}, 
  id,
  url= './images/icon_view.svg',
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={id}
        type="checkbox"
      />
      <LableBox
        style={{ background: isOn }}
        className="react-switch-label"
        htmlFor={id}
        url={url}
      >
        <span className={`react-switch-button`} />
      </LableBox>
    </>
  );
};

export default ToggleSlide;
