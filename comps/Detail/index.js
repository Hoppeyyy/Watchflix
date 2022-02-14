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
  src="http://placekitten.com/297/397",
  fit = "cover",
  alt = "Undifined",
  detConWidth = "60%",
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
