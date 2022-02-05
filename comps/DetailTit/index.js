import Head from 'next/head';
import ax from 'axios';
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
  background: url(${props => props.barUrl});
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
  barUrl = "./images/icon_verBar.svg",
  text = "",

}) => {

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
        barUrl = {barUrl}
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
