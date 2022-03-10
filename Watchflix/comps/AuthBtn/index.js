import Head from "next/head";
import ax from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useTheme, useResult } from "@/utils/provider";
import { bkColor } from "@/utils/variables";


const Cont = styled.div`
width:100px;
height:40px;
padding: 10px;
background-color: ${props => props.bkColor};
border-radius: 12px;
margin-left:30px;
`
const Text = styled.p`
text-align:center;
`

const AuthBtn = ({
text="Sign up",
AuthClick=()=>{}
}) =>{
  const { theme, setTheme } = useTheme();
  return(<Cont bkColor={bkColor[theme]} onClick={AuthClick}>
    <Text>{text}</Text>
  </Cont>
 )}

export default AuthBtn;