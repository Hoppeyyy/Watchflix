import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React from 'react';
import { useTheme } from "@/utils/provider";
import SubButton from '@/comps/SubButton';
import CommentForm from '@/comps/CommentForm';

import Comment from '@/comps/Comment';
import ReviewSection from '@/comps/ReviewSection';


export default function Home() {

  const {theme, setTheme} = useTheme();
  
  const Cont = styled.div`
  width: 100%;
  height: 100%;
`;

  return (
    <Cont>
    <ReviewSection></ReviewSection>
    <Comment/>
   
    <CommentForm> </CommentForm>
    </Cont>
  )
}
