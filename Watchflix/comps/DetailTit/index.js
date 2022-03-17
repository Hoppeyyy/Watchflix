import Head from 'next/head';
import ax from 'axios';
import { useState, useEffect } from "react";
import { useTheme } from "@/utils/provider";
import styled from 'styled-components';
import { bkColor, themes, barColor } from "@/utils/variables";

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
  padding-left: 1.25rem;
  min-width: ${props => props.minWidth};
  max-width: 50%;
  background-image: ${props => props.barUrl};
  background-size: 5px 28px;
  background-repeat: no-repeat;
  background-position: left center; 
  
  @media only screen and (max-width: 560px) {
    font-size: 1.125em;
    min-width: 8rem;
  } 
`

const Movie = styled.h3`
  text-align: left;

  @media only screen and (max-width: 480px) {
    font-size: 1.5em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Text  = styled.p`
  white-space: wrap;
  
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.clamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${props => props.marginB}rem;

  @media only screen and (max-width: 560px) {
    font-size: 0.875em;
    word-break: break-word;
  }
`

const DetailTit = ({
  conWidth = "100%",
  conHeight = "4.5em",
  conAlign = "center",
  marginB = "2em",
  minWidth = "8em",
  title = "Title",
  movieTitle = "Alive",
  text = "",
  clamp = '5',
  txtMarginB = '3'

}) => {

  const [bar, setBar] = useState("light");
  const { theme, setTheme } = useTheme();

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
        barUrl =  {barColor[theme]}
        // barUrl = {barUrl}
      >
        {title}
      </Title>
      <Movie>
        {movieTitle}
      </Movie>
      <Text clamp ={clamp} marginB = {txtMarginB}>
        {text}
      </Text>
    </Cont>
  )
}

export default DetailTit;
