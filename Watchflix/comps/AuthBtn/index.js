import Head from "next/head";
import ax from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useTheme, useResult } from "@/utils/provider";
import { bkColor } from "@/utils/variables";

const Cont = styled.div`
  width: 100px;
  height: 40px;
  padding: 10px;
  background-color: ${(props) => props.bkColor};
  border-radius: 12px;
  margin-left: ${props => props.marginL}px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;

  :hover {    
    transform: scale(0.95);
    transition-duration: 0.3s;
  }
`;
const Text = styled.p`
  text-align: center;
`;

const AuthBtn = ({ 
  text = "Sign up", 
  marginL = 30,
  AuthClick = () => {} 
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <Cont marginL={marginL} bkColor={bkColor[theme]} onClick={AuthClick}>
      <Text>{text}</Text>
    </Cont>
  );
};

export default AuthBtn;
