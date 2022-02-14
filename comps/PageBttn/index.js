import ax from "axios";
import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/provider";
import { hovColor, themes, bgpopup, popuptext, hovpopbg, hBttnBkColor } from "@/utils/variables";
import {useResult} from '@/utils/resultProvider';

const Cont = styled.div`
  width: 3em;
  height: 3em;
`

const Btn = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  border:none;
  border-radius: 50%;
  margin-right: 10px;
  background-color:${(props)=>props.bgcolor};
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.20));
  cursor: pointer;
  
  :hover{
    background:${(props)=>props.hovpopbg};
  }

  :active{
    background-color: "pink";
  }
`
const PageBttn = ({
  number= null,
  bgcolor = null,
  onClick=()=>{},
})=>{
  const { theme, setTheme } = useTheme();
  return<Cont>
    <Btn 
      onClick={onClick}
      bgcolor={bgcolor} hovpopbg={hBttnBkColor[theme]}
    >{number}</Btn>
  </Cont>
}

export default PageBttn