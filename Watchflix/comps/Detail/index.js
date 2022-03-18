import Head from "next/head";
import ax from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/provider";
import { bkColor, themes } from "@/utils/variables";
import DetailTit from "@/comps/DetailTit";
import ClickButton from "@/comps/ClickButton";

const Cont = styled.div`
  display: flex;
  flex-direction: row;  
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    justify-contents: center;
  }
`;

const Post = styled.img`
  width: auto;
  height: 594px;
  margin-right: 3rem;

  display: block;
  src: ${(props) => props.src};
  object-fit: ${(props) => props.fit};
  
  background-image: url('/images/img_NoImage.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 0.3s;

  @media only screen and (min-width: 561px) and (max-width: 950px) {
    height: 594px;
    width: auto;
    margin-right: 0;
    margin-bottom: 50px;
  }

  @media only screen and (max-width: 560px) {
    height:400px;
    width: auto;
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

const DetailCont = styled.div`
  max-width: ${(props) => props.detConWidth};
  min-height: ${(props) => props.detConHeight};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: flex-start;
  background-color: ${(props) => props.bkColor};
  border-radius: 20px;
  box-sizing: border-box;
  flex: 2;

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    max-width: ${(props) => props.mdetConWidth};
    min-height: 0;
    align-items: flex-start;
    padding: 2rem;
  }
`;

const Detail = ({
  conWidth = "100%",
  picConHeight = "596px",
  src = "http://placekitten.com/297/397",
  fit = "cover",
  alt = "Undifined",
  detConWidth = "60%",
  mdetConWidth = "90%",
  title = "undifined",
  director = "undifined",
  genre = "undifined",
  cast = "undifined",
  description = "undifined",
  bttnSrc,
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <Cont width={conWidth}>
      <Post src={src} fit={fit} alt={alt} />
      <DetailCont
        detConWidth={detConWidth}
        detConHeight={picConHeight}
        mdetConWidth={mdetConWidth}
        bkColor={bkColor[theme]}
      >
        <DetailTit movieTitle={title} />
        <DetailTit
          title="Director"
          movieTitle=""
          conAlign="flex-start"
          text={director}
        />
        <DetailTit
          title="Genre"
          movieTitle=""
          conAlign="flex-start"
          text={genre}
          clamp = '1'
        />
        <DetailTit
          title="Cast"
          movieTitle=""
          conAlign="flex-start"
          text={cast}
          clamp = '3'
        />
        <DetailTit
          title="Synopsys"
          movieTitle=""
          conAlign="flex-start"
          text={description}
          clamp = '10'
        />
      </DetailCont>
    </Cont>
  );
};

export default Detail;
