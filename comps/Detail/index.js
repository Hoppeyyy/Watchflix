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
  justify-contents: flex-start;
  align-items: center;
`

const PostCont = styled.div`
  width: ${props => props.picConWidth};
  height: ${props => props.picConHeight};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  margin-right: 20px;
`

const Post = styled.img`
  width: 100%; height: 100%;
  src: ${props => props.src};
  object-fit: ${props => props.fit}
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
`

const Detail = ({
  conWidth = "100%",
  picConWidth = "auto",
  picConHeight = "596px",
  src = "./images/img_alive.png",
  fit = "cover",
  alt = "Alive poster",
  detConWidth = "60%",
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
        bkColor = {bkColor[theme]}
      >
        <DetailTit />
        <DetailTit 
          title = "Director"
          movieTitle = ""
          text="Cho Il	Yoo "
        />
        <DetailTit 
          title = "Genre"
          movieTitle = ""
          text="Horror Movies, International Movies, Thrillers"
        />
        <DetailTit
          title = "Cast" 
          movieTitle = ""
          text="Yoo Ah-in, Park Shin-hye"
        />
        <DetailTit 
          title = "Synopsys"
          conAlign = "flex-start"
          movieTitle = ""
          text="As a grisly virus rampages a city, a lone man stays locked inside his apartment, digitally cut off from seeking help and desperate to find a way out."
        />

      </DetailCont>
    </Cont>
  )
}

export default Detail;
