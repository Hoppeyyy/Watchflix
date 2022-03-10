import React, { useState } from 'react'
import styled from "styled-components";

const Cont = styled.div`
  display:flex;
  margin-right: ${props => props.marginR}rem;

`

const LableBox = styled.label`
 
  
`

const ToggleSlide = ({  
  marginR = 2,
  isOn, 
  handleToggle =() =>{}, 
  id,
  src= './images/icon_view.svg',
}) => {
  return (
    <Cont marginR={marginR}>
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
       
      >
        <img src={src}/>
        <span className={`react-switch-button`} />
      </LableBox>
    </Cont>
  );
};

export default ToggleSlide;
