import Head from "next/head";
import ax from "axios";
import styled from "styled-components";
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
  width: ${(props) => props.conWidth};
  height: ${(props) => props.conHeight};
  background-color: transparent;
  perspective: 1000px;

  :hover .cardCont {
    transform: rotateY(180deg);
  }
`;

const CardCont = styled.div`
  position: relative;
  width: ${(props) => props.cardConWidth};
  height: ${(props) => props.cardConHeight};
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const FrtCont = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;
const Image = styled.img`
  width: ${(props) => props.imgWidth};
  height: ${(props) => props.imgHeight};
  src: ${(props) => props.src};
  object-fit: ${(props) => props.fit};
`;

const BkCont = styled.div`
  position: absolute;
  width: ${(props) => props.bkConWidth};
  height: ${(props) => props.bkConHeight};
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: ${(props) => props.bkColor};
  transform: rotateY(180deg);
  padding: 40px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const TitCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-contents: flex-start;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  width: 50%;
  text-align: left;
`;

const SubTit = styled.p`
  font-weight: 600;
  font-size: 1em;
  width: 25%;
  text-align: left;
`;

const Synop = styled.p`
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  text-align: left;
`;

const Bttn = styled.button`
  width: 60%;
  min-width: 150px;
  height: 50px;
  padding: 5px 10px;
  background-color: ${(props) => props.bkColor};
  text-transform: uppercase;
  border-radius: 50px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 50px; right: 40px;
  transition: all 0.3s;

  :hover {
    background-color: ${(props) => props.hovBkColor};
    color: ${(props) => props.hovColor};
  }
`;

const PosterBox = ({
  conWidth = "297px",
  conHeight = "440px",
  cardConWidth = conWidth,
  cardConHeight = conHeight,
  imgWidth = conWidth,
  imgHeight = "auto",
  src = "http://placekitten.com/297/397",
  fit = "cover",
  alt ="",
  bkConWidth = "297px",
  bkConHeight = "440px",
  title = "Undefined",
  year = "Undefined",
  place = "Undefined",
  text = "Undefined",
  bttnTxt = "check this movie",
  onClick = ()=>{},
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <Cont width={conWidth} conHeight={conHeight}>
      <CardCont
        className="cardCont"
        cardConWidth={cardConWidth}
        cardConHeight={cardConHeight}
      >
        <FrtCont>
          <Image
            imgWidth={imgWidth}
            imgHeight={imgHeight}
            src={src}
            fit={fit}
            alt={alt}
          />
        </FrtCont>

        <BkCont
          bkColor={bkColor[theme]}
          bkConWidth={bkConWidth}
          bkConHeight={bkConHeight}
        >
          <TitCont>
            <Title>{title}</Title>
            <SubTit>{year}</SubTit>
            <SubTit>{place}</SubTit>
          </TitCont>

          <Synop>{text}</Synop>

          <Bttn
            bkColor={bttnBkColor[theme]}
            hovBkColor={hovBkColor[theme]}
            hovColor={hovColor[theme]}
            onClick = {onClick}
          >
            {bttnTxt}
          </Bttn>
        </BkCont>
      </CardCont>
    </Cont>
  );
};

export default PosterBox;
