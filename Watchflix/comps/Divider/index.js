import styled from "styled-components";
import ax from "axios";
import { useTheme } from "@/utils/provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Comment from "../Comment";

import { bkColor, hovColor, basicColor, divcolor } from "@/utils/variables";

const Cont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  width: 100%;
`;

const LeftLine = styled.div`
  background-color: ${props => props.bkcolor};
  border-radius: 10px;
  border: none;
  width: 15%;
  height: 20px;
  transition: all 0.3s;

  @media only screen and (min-width: 951px) and (max-width: 1200px)  {
    width: 20%;
  }

  @media only screen and (min-width: 651px) and (max-width: 950px)  {
    width: 25%;
  }

  @media only screen and (min-width: 451px) and (max-width: 650px) {
    width: 30%;
  }

  @media only screen and (min-width: 1px)  and (max-width: 450px) {
    width: 25%;
  }
`;

const RightLine = styled.div`
  background-color: ${props => props.bkcolor};
  border-radius: 10px;
  border: none;
  width: 70%;
  height: 20px;
  transition: all 0.3s;

  @media only screen and (min-width: 951px) and (max-width: 1200px) {
    width: 65%;
  }

  @media only screen and (min-width: 651px) and (max-width: 950px) {
    width: 50%;
  }

  @media only screen and (min-width: 451px) and (max-width: 650px) {
    width: 30%;
  }

  @media only screen and (min-width: 1px)  and (max-width: 450px) {
    width: 25%;
  }
`;

const TitleCont = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  width: 15%;
  box-sizing: border-box;
  transition: all 0.3s;

  @media only screen and (min-width: 951px) and (max-width: 1200px) {
    width: 20%;
  }
  
  @media only screen and (min-width: 651px) and (max-width: 950px) {
    width: 25%;
  }

  @media only screen and (min-width: 451px) and (max-width: 650px) {
    width: 40%;
  }

  @media only screen and (max-width: 450px) {
    width: 50%;
  }
`

const Title = styled.h3`  
  color: ${props => props.color};
  
  @media only screen and (min-width: 651px) and (max-width: 700px) {
    font-size: 1.75em;   
  }

  @media only screen and (min-width: 396px) and (max-width: 650px) {
    font-size: 1.75em;
    text-align: center;
  }

  @media only screen and (max-width: 395px) {
    font-size: 1.25em;
    text-align: center;
  }
`;


const Divider = ({ 
    text = "Review",

}) => {

  const { theme, setTheme } = useTheme();

  return (
    <Cont>
        <LeftLine bkcolor = {divcolor[theme]}></LeftLine>
        <TitleCont>
          <Title color = {basicColor[theme]}>{text}</Title>
        </TitleCont>
        <RightLine bkcolor = {divcolor[theme]}></RightLine>
    </Cont>
  );
};

export default Divider;
