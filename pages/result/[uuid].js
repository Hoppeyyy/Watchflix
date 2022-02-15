import { useRouter } from "next/router";
import  React, { useEffect } from 'react';
import {useResult} from '@/utils/resultProvider';
import ax from 'axios';
import ClickButton from "@/comps/ClickButton";
import Detail from "@/comps/Detail";
import Divider from "@/comps/Divider";

export default function Result(){
  const r = useRouter();
  const {uuid} = r.query;
  const {result, setResult} = useResult();
 

const SaveResult = async ()=>{
  const res = await ax.post("/api/save", {
    uuid,
    result
  })
}


useEffect(()=>{
  if(uuid){
    const GetUuid = async () =>{
      const res = await ax.get("/api/save",{
        params:{
          uuid
        }
      })
      if(res.data !== false){
        setResult(res.data);
        console.log(res.data);

      }
    }
    GetUuid();
  }
  },[uuid])
   return (
    <div>
      
    <Divider text="Result"></Divider>

      <h3>{uuid}</h3>
      Result
      {Object.values(result).map((item)=><div>{item.Title}</div>)}
      <button onClick={SaveResult}>Save</button>
      
      
      {Object.values(result).map((item)=><div><Detail
      alt={item.Title}
      title={item.Title}
      director={item.director}
      genre={item.Genre}
      cast={item.cast}
      description={item.description}
      src={item.Poster}
      /></div>)}
      
      <ClickButton
      src={uuid}
      />
    </div>
  )
}
