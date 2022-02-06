import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React from 'react';
import { useTheme } from "@/utils/provider";
import Pagination from '@/comps/Pagination';
import Comment from '@/comps/Comment';
import ReviewSection from '@/comps/ReviewSection';

export default function Home() {

  const {theme, setTheme} = useTheme();
  
  return (
    <div>
      <Head>
        <title>Watchflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Pagination></Pagination>
      <Comment></Comment>
      <ReviewSection></ReviewSection>

    </div>
  )
}
