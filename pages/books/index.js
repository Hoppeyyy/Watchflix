import Head from 'next/head';
import ax from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import {useRouter} from 'next/router';
import Detail from '@/comps/Detail';
import DetailTit from '@/comps/DetailTit';

export default function Books() {
  const router = useRouter()

  return (
    <div>
      
      <button onClick={()=>{
        //make a new fav list!
      }}>New Favs</button>

      <Detail />
      <DetailTit />
    </div>
  )
}
