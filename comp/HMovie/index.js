import react from 'react';
import * as React from 'react';
import styled from 'styled-components';

const Cont = styled.div`
max-width:645.81px;
max-height:440px;
display:flex;
flex-direction:row;
padding:1.5rem;
`
const Img = styled.img`
display:flex;
flex:1;

`
const DescCont = styled.div`
flex:1;
display:flex;
flex-direction:column;
background-color:${props=>props.bgcolor};
border-radius: 0 20px 20px 0;
`
const Top = styled.div`
@media only screen and (max-width: 600px){
  display:flex;
  flex-direction:column;
  padding:0.3rem;
}
@media only screen and (min-width:600px){
  padding:0.8rem;
}
display:flex;
flex-direction:row;
justify-content:space-between;

`

const SubWrap = styled.div`
display:flex;
flex-direction:row;
margin-top:3px;
`
const Title = styled.h3`
margin:0;


`
const SubText = styled.h5`
@media only screen and (max-width: 600px){
 margin:0;
 margin-right:5px;
}

margin:0;
margin-left:5px;
`

const Desc = styled.p`
@media only screen and (max-width:600px){
  padding:0.3rem;
  margin-top:-5px;
}
@media only screen and (min-width:600px){
padding:0.8rem;
margin-top:-10px;
}
`
const HMovie = ({

bgcolor="#F9E7E7",
title="Movie Title",
year="1997",
contry="Canada",
text="Movie description"
}) => {
return<Cont>
  <Img src="http://placekitten.com/100/100"/>
  <DescCont bgcolor={bgcolor}>
    <Top>
    <Title>{title}</Title>
    <SubWrap>
    <SubText>{year}</SubText>
    <SubText>{contry}</SubText>
    </SubWrap>
    </Top>
    <Desc>{text}</Desc>
  </DescCont>
</Cont>
}

export default HMovie;