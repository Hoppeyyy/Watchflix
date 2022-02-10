import styled from 'styled-components'
import HMovie from '../comps/HMovie'
import Head from 'next/head'
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/provider";

import PopUp from 'comps/PopUp';
import PosterBox from '@/comps/PosterBox';
import { useRouter  } from 'next/router';

const Cont = styled.div`
width:100%;
height:100%;
`
const Wrap = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
`
const Test = ({
  href = "/testing",
}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const {theme, setTheme} = useTheme();
  const togglePopup = () => {
    setIsOpen(!isOpen);
  } 

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

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
      <input
      type="button"
      value="Click to Open Popup"
      onClick={togglePopup}
    />
      {isOpen && <PopUp
     
      handleClose={togglePopup}
    />}

    <PosterBox
      onClick={handleClick }
    />

       <title>Watchflix</title>
      <h1>Hello</h1>
      <h2>hi</h2>
      <h3>lol</h3>
      <h4>what</h4>
      <h5>to</h5>
      <p>say?</p>
      <p className='link'>link</p>

    </Cont>
  )
}

export default Test;
