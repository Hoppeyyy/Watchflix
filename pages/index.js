
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React from 'react';
import { useTheme } from "@/utils/provider";


export default function Home() {

  const {theme, setTheme} = useTheme();
  
  return (
    <div>
      <Head>
        <title>Watchflix</title>



      <h1>Hello</h1>
      <h2>hi</h2>
      <h3>lol</h3>
      <h4>what</h4>
      <h5>to</h5>
      <p>say?</p>
      <p className='link'>link</p>



    </div>
  )
}
