import ax from "axios";
import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useTheme, useResult } from "@/utils/provider";
import {
  bkColor,
  themes,
  bgpopup,
  popuptext,
  hovpopbg,
  hovBkColor,
} from "@/utils/variables";
import { v4 as uuidv4 } from 'uuid';



const Cont = styled.div`
position: fixed;
width: 100%;
height: 100vh;
top: 0;
left: 0;
background:rgba(229, 229, 229, 0.5);
z-index:1;

`
const Box = styled.div`
position: relative;
width: 70%;
margin: 0 auto;
height: auto;
max-height: 70vh;
margin-top: calc(100vh - 85vh - 20px);
background:${(props)=>props.bgcolor};
border-radius: 30px;
padding: 20px;
overflow: auto;
`
const Title = styled.p`
font-size: 24px;

color:${(props)=>props.color};
`
const Link = styled.a`
color:#999999;

`
const BtnCont = styled.div`
display:flex;
flex-direction:row;
justify-content:center;
padding:5px;
`
const Btn = styled.button`
width:110px;
height:40px;
padding:0.4rem;
margin:20px;
border-radius:50px;
border:none;
background:${(props)=>props.bgcolor};
filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.20));
:hover{
  background:${(props)=>props.hovpopbg};
  color:#FFFFFF;
}
`
const PopUp = ({
src="url src here",
handleClose=()=>{},
})=>{
  const { theme, setTheme } = useTheme();
  return<Cont >
    <Box bgcolor={bgpopup[theme]}>
      <Title color={popuptext[theme]}>Share with your friend</Title>
      <Link src={src}>{src}</Link>
      <BtnCont>
        <Btn onClick={handleClose} bgcolor={bkColor[theme]} hovpopbg={hovpopbg[theme]}>Cancel</Btn>
        <Btn bgcolor={bkColor[theme]} hovpopbg={hovpopbg[theme]}>Copy link</Btn>
      </BtnCont>
    </Box>
  </Cont>
}

export default PopUp