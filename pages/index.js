
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React, { useState, useEffect }  from 'react';
import { useTheme } from "@/utils/provider";
import Header from '../comps/Header';
import  {movie, filtering, sortArr} from '@/utils/combine';
import ax from 'axios';
import { useRouter } from 'next/router'

const Cont = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;

`
var timer = null;
var inputData = null;
export default function Home() {

  const {theme, setTheme} = useTheme();
/*

  const [data, setData] = useState([]);
  // sort by asc, des
  const[sbr_type, setSbrType] = useState("asc");
  // sort by rating 
  const [sbr, setSbr] = useState(false);
  // sort by title
  const [title, seTitle] = useState(false);
  // sort by genre
  const [genre, setGenre] = useState(false);
  // sort by duration
  const [dur, setDur] = useState(false);
  // sort by country
  const [cont, setCont] = useState(false);
  // sort by release year
  const [year, setYear] = useState(false);

*/
  return (
    <Cont>
     <Header
     onInputChange={(e)=>inputFilter(e.target.value)}
     />
    </Cont>
  )
}
