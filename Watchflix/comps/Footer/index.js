import ax from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useTheme, useResult } from "@/utils/provider";
import {
  hovBttnColor,
  themes,
  fImg,
  whiteblack,
  basicColor,
  basicGColor,
  shadow,
  hBttnBkColor,
} from "@/utils/variables";

const Cont = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;

  @media only screen and (min-width: 480px) and (max-width: 656px) {
    flex-direction: column;
    position: relative;
  }

  @media only screen and (min-width: 1px) and (max-width: 479px) {
    height: auto;
    position: relative;
    padding: 3rem 2rem 2rem;
  }
`;

const ColContL = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;

  @media only screen and (min-width: 480px) and (max-width: 656px) {
    position: absolute;
    left: 0;
  }  
`;

const ColContC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
  flex: 1;
  
`;

const LogoCont = styled.a`
  display: block;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.875em;
  line-height: 2em;
  color: #666;
  text-align: center;

  :hover{
    color: #666;
  }

  @media only screen and (min-width: 1px) and (max-width: 479px) {
    font-size: 0.5em;
  }
`

const Image = styled.img`
  min-width: 120px;
  max-width: 140px;
  height: auto;
  object-position: center center;
  object-fit: contain;
  display: block;
  opacity: 0.9;

  @media only screen and (min-width: 1px) and (max-width: 479px) {
    margin-bottom: 5px;
  }
`

const ColContR = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  flex: 1;

  @media only screen and (min-width: 480px) and (max-width: 656px) {
    position: absolute;
    right: 0;
  }

  @media only screen and (min-width: 1px) and (max-width: 479px) {
    position: absolute;
    top: -1.5rem;
  }
`;

const Link = styled.a`
  display: block;
  font-size: 1em;
  line-height: 2em;
  text-align: left;
  cursor: pointer;
  color: ${(props) => props.lcolor};

  :hover  {
    color: #B08584;
    text-decoration: underline;
  }
`;

const Btn = styled.button`
  width: 3.5em;
  height: 3.5em;
  padding: 0.4rem;
  border: none;
  border-radius: 50%;
  background-image: ${(props) => props.bkImg};
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) => props.bgcolor};
  box-shadow: ${(props) => props.bshadow};
  cursor: pointer;

  :hover {
    transform: scale(0.95);
    transition-duration: 0.3s;
  }
`;


const Footer = ({ 
  src = "/images/watchflix_logo.svg",
}) => {
  const { theme, setTheme } = useTheme();
  const r = useRouter();

  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Cont>
      <ColContL>
        <Link
          onClick={() => {
            r.push("/signup");
          }}

          lcolor = {basicGColor[theme]}
        >
          Sign up
        </Link>

        <Link
          onClick={() => {
            r.push("/login");
          }}
          lcolor = {basicGColor[theme]}
        >
          Login
        </Link>
      </ColContL>

      <ColContC>
        <LogoCont href="/">
          <Image
            src={src}
            alt="Watchflix logo"          
          />
          © WATCHFLIX. We love our users!
        </LogoCont>
      
      </ColContC>

      <ColContR>
        <Btn id="myBtn"
          onClick={topFunction}
          bgcolor={hBttnBkColor[theme]}
          bshadow={shadow[theme]}
          bkImg={fImg[theme]}
        />
      </ColContR>
    </Cont>
  );
};

export default Footer;
