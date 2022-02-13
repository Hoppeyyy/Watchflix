import ax from "axios";
import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/provider";
import {
  bkColor,
  themes,
  bttnBkColor,
  hovBkColor,
  hovColor,
} from "@/utils/variables";
import {movie} from '@/utils/combine';

const Cont = styled.div`
@media only screen and (max-width: 600px){
  width: 100%;
  max-height:220px;
 
}
max-width: 594px;
max-height:440px;
display:flex;
flex-direction:row;
`
const Img = styled.img`
@media only screen and (max-width: 600px){
  width: 148.5px;
 
}
width: ${(props) => props.imgWidth};
height: ${(props) => props.imgHeight};
src: ${(props) => props.src};
object-fit: ${(props) => props.fit};
flex;1;

`
const DescCont = styled.div`
@media only screen and (max-width: 600px){
  width: 148.5px;
  border-radius:0
 
}
display:flex;
flex:1;
flex-direction:column;
border-radius: 0 20px 20px 0;
padding:1.5rem;
:hover{
  background-color:${(props)=>props.bkColor};
}
`
const Top = styled.div`
@media only screen and (max-width: 600px){
  display:flex;
  flex-direction:column;
  padding:0.3rem;
}
@media only screen and (min-width:600px){
  display:flex;
  flex-direction:column;
  padding:0.8rem;
}


`

const SubWrap = styled.div`
display: flex;
flex-direction: row;
align-items: flex-end;
justify-contents: flex-start;
`
const Title = styled.h3`
@media only screen and (max-width: 600px){
  width: 95%;
 font-size:20px;
}




`
const SubText = styled.p`

  width: 95%;
 font-size:16px;
 font-weight: 600;


`

const Desc = styled.p`
@media only screen and (max-width: 600px){
  width: 95%;
 font-size:12px;
 padding:0.3rem;
 overflow: hidden;
 margin-bottom:5px;
 text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 4; 
   -webkit-box-orient: vertical;
}
@media only screen and (min-width: 600px){
padding:0.8rem;
-webkit-line-clamp: 8; 

}
`
const BtnCont = styled.div`
width:95%;
display:flex;
justify-content:right;
`
const Btn = styled.button`
@media only screen and (max-width: 600px){
  max-width:30px;
  max-height:30px;
  font-size:12px;
  background-color: ${(props) => props.bkColor};
  text-transform: uppercase;
  border-radius: 50px;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  :hover {
    background-color: ${(props) => props.hovBkColor};
    color: ${(props) => props.hovColor};
  }
  }
  width: 80%;
  min-width: 150px;
  height: 50px;
  padding: 5px 10px;
  background-color: ${(props) => props.bkColor};
  text-transform: uppercase;
  border-radius: 50px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s;

  :hover {
    background-color: ${(props) => props.hovBkColor};
    color: ${(props) => props.hovColor};
  }
`
const HMovie = ({
conWidth = "594px",
imgWidth = "297px",
imgHeight = "auto",
src="http://placekitten.com/297/397",
fit = "cover",
alt = "Undifined",
year = "Undefined",
place = "Undefined",
text="Movie description",
bttnTxt = "check this movie",
title="Undefined",
onClick = ()=>{},
}) => {
  const { theme, setTheme } = useTheme();
 
return<Cont>
  <Img    
  imgWidth={imgWidth}
  imgHeight={imgHeight}
  src={src}
  fit={fit}
  alt={alt}/>
  
  <DescCont width={conWidth}  bkColor={bkColor[theme]}>
    <Top>
    <Title>{title}</Title>
    <SubWrap>
    <SubText>{year}</SubText>
    <SubText>{place}</SubText>
    </SubWrap>
    </Top>
    <Desc>{text}</Desc>
    <BtnCont>
    <Btn
    bkColor={bttnBkColor[theme]}
    hovBkColor={hovBkColor[theme]}
    hovColor={hovColor[theme]}
    onClick = {onClick}
          >
            {bttnTxt}
          </Btn>
    </BtnCont>
  </DescCont>
</Cont>
}

export default HMovie;