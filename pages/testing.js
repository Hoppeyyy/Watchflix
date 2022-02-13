import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React from 'react';
import { useTheme } from "@/utils/provider";
import ClickButton from '../comps/ClickButton';
import SubButton from '../comps/SubButton';
export default function Home() {

  const {theme, setTheme} = useTheme();
  
  return (
    <div>
      <ClickButton/>
    </div>
  )
}
