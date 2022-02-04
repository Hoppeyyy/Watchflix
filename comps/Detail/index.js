import Head from 'next/head';
import ax from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';

const Cont = styled.div`
  width: ${props => props.width}100%;
  display: flex;
  flex-direction: row;
  justify-contents: flex-start;
  align-items: center;

`

const Detail = ({


}) => {
  const router = useRouter()

  return (
    <Cont>
      
      <button onClick={()=>{
        //make a new fav list!
      }}>New Favs</button>
    </Cont>
  )
}

export default Detail;
