import styled from 'styled-components'
import HMovie from '../comps/HMovie'
import Detail from 'comps/Detail'
import DetailTit from 'comps/DetailTit'
import Head from 'next/head'
import PosterBox from '@/comps/PosterBox'

const Cont = styled.div`
width:100%;
height:100%;
`
const Wrap = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
`
export default function Test() {
  return (
    <Cont>
      <Wrap>
        
      <HMovie
      bgcolor="#F9E7E7"
      title="Movie Title"
      year="Year"
      contry="Country"
      text="A young Barack Obama forges his identity while dealing with race, divergent cultures and ordinary life as a New York City college student.A young Barack Obama forges his identity while dealing with race, divergent cultures and ordinary life as a New York City college student."
      />
    <HMovie
      bgcolor="#F9E7E7"
      title="Movie Title"
      year="Year"
      contry="Country"
      text="A young Barack Obama forges his identity while dealing with race, divergent cultures and ordinary life as a New York City college student."
      />
      </Wrap>
      <Wrap>
      <PosterBox/>
      <PosterBox/>
      <PosterBox/>
      <PosterBox/>
      <PosterBox/>
      </Wrap>
    </Cont>
  )
}
