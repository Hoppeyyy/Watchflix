import styled from 'styled-components'
import HMovieData from '../comps/HMovie/index2'
import PosterBoxData from '../comps/PosterBox/index2'
import Head from 'next/head'
import PopUp from 'comps/PopUp'
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/provider";
import {movie, filtering, sortArr} from '@/utils/combine';




const Cont = styled.div`
width:100%;
height:100%;
`
const Wrap = styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
`
const Button = styled.button`
`
export default function Test() {
 const [View, setView] = useState(false);
 const onChangeView = ()=>{
    setView(true);
    console.log("clicked")
 }
  return (
    <Cont>
      <Button 
      onClick={onChangeView}
      >Change</Button>

      <Wrap>
        {View ?(<HMovieData/>):(<PosterBoxData/>)}
      </Wrap> 
    </Cont>
  )
}
