import ax from "axios";
import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useTheme, useResult } from "@/utils/provider";
import { hovBttnColor, themes, fImg, whiteblack, basicColor, shadow, hBttnBkColor } from "@/utils/variables";


const Cont = styled.div`
  width: 100%;
  height: 100px;
  dislplay: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem; 
  box-sizing: border-box;
`


const Btn = styled.button`
  width: 4em;
  height: 4em;
  padding: 0.4rem;
  border:none;
  border-radius: 50%;  
  background-image: ${props => props.bkImg};
  background-repeat: no-repeat;
  background-position: center;
  background-color:${(props)=>props.bgcolor};
  color: ${props => props.color};
  box-shadow: ${props => props.bshadow};
  cursor: pointer;
  
  :hover{
    transform: scale(0.95);
    transition-duration: 0.3s;
  }
`
const Footer = ({
  btnnumber= null,
  bgcolor = null,
  onClick=()=>{},
})=>{

  const { theme, setTheme } = useTheme();
  
  return<Cont>
    <Btn 
      onClick={onClick}
      bgcolor={hBttnBkColor[theme]}
      bshadow={shadow[theme]}
      bkImg = {fImg[theme]}
    >{btnnumber}</Btn>

  </Cont>
}

export default Footer;