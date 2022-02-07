import Head from 'next/head';
import ax from 'axios';
import { useState, useEffect } from "react";
import styled from 'styled-components';

const Cont = styled.div`
  width: ${props => props.conWidth};
  min-height: ${props => props.conHeight};
  display: flex;
  flex-direction: row;
  justify-contents: flex-start;
  align-items: ${props => props.conAlign};
  box-sizing: border-box;
  margin-bottom: ${props => props.marginB}
`

const Title = styled.h4`
  padding-left: 1em;
  min-width: ${props => props.minWidth};
  // background: url(${props => props.barUrl});
  // background: url(${props => props.barUrl === 'light' ? `url('./images/icon_verBar.svg)` : `url('./images/icon_verBar.svg)`});
  background-size: auto;
  background-repeat: no-repeat;
  background-position: left center;  
`

const Movie = styled.h3``

const Text  = styled.p`
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

const DetailTit = ({
  conWidth = "100%",
  conHeight = "4.5em",
  conAlign = "center",
  marginB = "2em",
  minWidth = "8.75em",
  title = "Title",
  movieTitle = "Alive",
  // barUrl = "bar ? 'url(./images/icon_verBarLight.svg)' : 'url(./images/icon_verBarDark.svg)'",
  text = "",

}) => {

  const [bar, setBar] = useState("light");

  return (
    <Cont
      width = {conWidth}
      conHeight = {conHeight}
      conAlign = {conAlign}
      marginB= {marginB}
    >
      {/* <Rect /> */}
      <Title
        minWidth = {minWidth}
        style = {{
          background: bar ? "url(./images/icon_verBarLight.svg)" : "url(./images/icon_verBarDark.svg)",
          backgroundRepeat: bar ? "no-repeat" : "no-repeat",
        }}
        // barUrl = {barUrl}
      >
        {title}
      </Title>
      <Movie>
        {movieTitle}
      </Movie>
      <Text>
        {text}
      </Text>
    </Cont>
  )
}

export default DetailTit;
