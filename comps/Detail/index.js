import Head from 'next/head';
import ax from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTheme } from "@/utils/provider";
import { bkColor, themes } from '@/utils/variables';
import DetailTit from '@/comps/DetailTit';

const Cont = styled.div`
  width: ${props => props.conWidth};
  display: flex;
  flex-direction: row;
  justify-contents: center;
  align-items: center;  

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    flex-direction: column;
  }
`

const PostCont = styled.div`
  width: ${props => props.picConWidth};
  height: ${props => props.picConHeight};
  min-width: 424px; min-height: 594px;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  margin-right: 20px;  
  box-sizing: border-box;

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    margin-bottom: 50px;
  }
`

const Post = styled.img`
  width: 100%; height: 100%;
  
  display: block;
  src: ${props => props.src};
  object-fit: ${props => props.fit};

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    min-width: 360px; min-height: 594px;
  }
`

const DetailCont = styled.div`
  width: ${props => props.detConWidth};
  height: ${props => props.detConHeight};
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: flex-start;
  background-color: ${props => props.bkColor};
  border-radius: 20px;
  box-sizing: border-box;

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    width: ${props => props.mdetConWidth};
  }
`

const Detail = ({
  conWidth = "100%",
  picConWidth = "auto",
  picConHeight = "596px",
  src="http://placekitten.com/297/397",
  fit = "cover",
  alt = "Undifined",
  detConWidth = "60%",
  mdetConWidth = '100%',
  title="undifined",
  director="undifined",
  genre="undifined",
  cast="undifined",
  description="undifined"
}) => {

  const {theme, setTheme} = useTheme();

  return (
    <Cont
      width = {conWidth}
    >
      <PostCont 
        picConWidth = {picConWidth}
        picConHeight = {picConHeight}
      >
        <Post 
          src = {src}
          fit = {fit} 
          alt = {alt}       
        />
      </PostCont>

      <DetailCont
        detConWidth = {detConWidth}
        detConHeight = {picConHeight}
        mdetConWidth = {mdetConWidth}
        bkColor = {bkColor[theme]}
      >
        <DetailTit 
        movieTitle ={title}
        />
        <DetailTit 
          title = "Director"
          movieTitle = ""
          text={director}
        />
        <DetailTit 
          title = "Genre"
          movieTitle = ""
          text={genre}
        />
        <DetailTit
          title = "Cast" 
          movieTitle = ""
          text={cast}
        />
        <DetailTit 
          title = "Synopsys"
          conAlign = "flex-start"
          movieTitle = ""
          text={description}
        />

      </DetailCont>
    </Cont>
  )
}

export default Detail;
