import styled from "styled-components";
import ax from "axios";
import { useTheme } from "@/utils/provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Comment from "../Comment";

import { bkColor, hovColor, hovBkColor, divcolor } from "@/utils/variables";

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  aligh-items: center;
  justify-content: center;
`;

const LeftLine = styled.hr`
  margin: 0px;
  background-color: ${props => props.bkcolor};
  border-radius: 10px;
  border: none;
  flex: 1;
  height: 20px;
`;

const RightLine = styled.hr`
  margin: 0px;
  background-color: ${props => props.bkcolor};
  border-radius: 10px;
  border: none;
  flex: 6;
  height: 20px;
`;

const Title = styled.h3`
  padding-left: 20px;
  padding-right: 20px;
  flex: 1.5;
`;

const HeaderCont = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = ({ 
    text = "Review",

}) => {

  const { theme, setTheme } = useTheme();

  return (
    <Cont>
      <HeaderCont>
        <LeftLine bkcolor = {divcolor[theme]}></LeftLine>
        <Title>{text}</Title>
        <RightLine bkcolor = {divcolor[theme]}></RightLine>
      </HeaderCont>
    </Cont>
  );
};

export default Divider;
