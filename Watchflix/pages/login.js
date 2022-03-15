import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter, Router } from "next/router";
import ax from "axios";
import React from "react";
import Auth from '@/comps/Auth2'


const Cont = styled.div`
  width: 100vw;
  height: 100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  align-items:center;
  background:#F9E7E7;
`
export default function LogIn() {

return(
  
<Cont>
  <Auth
  value="Log In" 
  />
</Cont>
);}