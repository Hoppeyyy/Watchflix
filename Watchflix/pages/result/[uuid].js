import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useTheme, useResult } from "@/utils/provider";
import ax from "axios";
import ClickButton from "@/comps/ClickButton";
import Detail from "@/comps/Detail";
import Divider from "@/comps/Divider";
import ReviewSection from "@/comps/ReviewSection";
import styled from "styled-components";
import Header from "@/comps/Header/index";
import { basicColor, whiteblack, shadow, hBttnBkColor } from "@/utils/variables";

//Sticker drag n drop
import StickerBoard from "@/comps/StickerBoard";
import Sticker from "@/comps/Sticker";
import { DndProvider } from "react-dnd";
import { TouchBackend } from 'react-dnd-touch-backend';
import { v4 as uuidv4 } from "uuid";

const Cont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeadCont = styled.div`
  width: 100%;
  dislplay: flex;
  justify-content: center;
  align-items: center;
  // margin-bottom: 80px;
  padding: 0 2rem;
  background-color: ${(props) => props.colbg};
  box-shadow: ${(props) => props.shadow};
`;

const BodyCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 4rem;
`;

const PageCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
const ButCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`;
var timer = null;
export default function Result() {
  const r = useRouter();
  const { uuid } = r.query;
  const { result, setResult } = useResult();
  const [data, setData] = useState([]);
  const [View, setView] = useState(true);

  const [color, setColor] = useState(true);
  const [sbr, setSbr] = useState(false);
  const [sba, setSba] = useState(false);
  const [sba_type, setSbaType] = useState("asc");
  const [sbr_type, setSbrType] = useState("desc");
  const [inptxt, setInpTxt] = useState("");

  const [cur_page, setCurPage] = useState([]);
  const [movie_num, setMovie_num] = useState();
  const { theme, setTheme } = useTheme();

  console.log(Object.values(result));

  /*
const SaveResult = async ()=>{
  const res = await ax.post("/api/save", {
    uuid,
    result
  })
}
*/
  // const [data, setData] = useState([]);
  // const [sbr, setSbr] = useState(false);
  // const [sbr_type, setSbrType] = useState("asc");

  const onChangeView = () => {
    if (View === false) {
      setView(true);
      console.log("set to horizontal");
    } else if (View === true) {
      setView(false);
      console.log("set to posterbox");
    }
  };

  const onChangeColor = () => {
    if (color === false) {
      setTheme(theme === "dark" ? "light" : "dark");
      setColor(true);
    } else if (color === true) {
      setTheme(theme === "dark" ? "light" : "dark");
      setColor(false);
    }
  };



  const inputFilter = async (txt) => {
    console.log(txt);
    var obj = {};
    if (txt) {
    obj.txt = txt;
    obj.sort_alpha = sba_type;
    obj.sort_rating = sbr_type;
    }
    // results the timer if the inputs keeps changing
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // start a timer to wait 2 seconds before making an asynchronous call
    if (timer === null) {
      timer = setTimeout(async () => {
        console.log("async call");
        const res = await ax.get("/api/movie", {
          params: {
            txt: txt,
            ...obj,
            // sort_rating: sbr,
            // sort_type: sbr_type,
          },
        });
        console.log(res.data.lists);
        setData(res.data.lists);
        r.push("/", res.data.lists);
        setInpTxt(txt);
        setMovie_num(res.data.nummovies);
        console.log(res.data.nummovies); 
        
        timer = null;
        if (res.data.nummovies <= 0) {
          alert("no movie found");
        }

      }, 1000);
    } else {
    }
  };


  useEffect(() => {
    if (uuid) {
      const GetUuid = async () => {
        const res = await ax.get("/api/save", {
          params: {
            uuid,
          },
        });
        if (res.data !== false) {
          setResult(res.data);
          console.log(res.data);
        }
      };
      GetUuid();
    }
  }, [uuid]);


 //---------------Moodboard------------------------

 const [ns, setNs] = useState({})

 // useEffect(()=>{
 //   if(uuid){
 //     const GetNotes = async()=>{
 //       const resp = await ax.get('/api/load', {
 //         params:{uuid}
 //       });
 //       if(resp !== false){
 //         setNs(resp.data)
 //       }
 //     }
 //     GetNotes();
 //   }
 // }, [uuid]);

 console.log(ns);

 const HandleUpdateNote = (id, notedata)=>{
   ns[id] = {
     ...ns[id],
     ...notedata
   }

   setNs({
     ...ns
   })
 }

 const HandleSave = async () => {
   const resp = await ax.post('/api/save', {
     uuid,
     ns
   })
 }

 const [src, setSrc] = useState(null);

 const [fname, setFName] = useState('');

 const [op, setOp] = useState(1);

 async function dropHandler(ev) {
   console.log("dropped", ev.dataTransfer.files, ev.dataTransfer.items);
   if (ev.dataTransfer.items) {

     var file = null
     // Use DataTransferItemList interface to access the file(s)
     for (var i = 0; i < ev.dataTransfer.items.length; i++) {
       // If dropped items aren't files, reject them
       if (ev.dataTransfer.items[i].kind === 'file') {
       var file = ev.dataTransfer.items[i].getAsFile();
       console.log('... file[' + i + '].name = ' + file.name);
       }
     }
     
     var reader = new FileReader();
     if(file.type.includes('image')){
       reader.readAsDataURL(file);
     }

     if(file.type.includes('csv')){
       reader.readAsText(file);
     }

     reader.onload = ()=>{
       //console.log("result", reader.result);
       if(file.type.includes('image')){
         setSrc(reader.result);
       }

       if(file.type.includes('csv')){
         console.log(reader.result.split('\n').map(o=>o.split(',')));
       }
       
     }

     console.log(file);
     setFName(`You dropped file ${file.name}`);
     setOp(1);
     } 
   ev.preventDefault();
 }


 function dragOverHandler(ev) {
   console.log("dragged over")
   setOp(0.5);

   ev.preventDefault();
 }

 //--------------Moodboard end-------------------------

  
  return (
    <Cont>

      <HeadCont colbg={whiteblack[theme]} shadow={shadow[theme]}>
      <Header
          onInput={(e) => {
            PageClick(1, e.target.value);
          }}

          onSearchClick={() => r.push('/')}

          isView={View}
          isColor={color}
          handleView={() => onChangeView()}
          handleColor={() => onChangeColor()}

          onAscClick={()=>{
            setSbr(sbr)
            setSba(!sba)
            setSbrType(null)
            setSbaType(sba_type === "asc" ? "desc" : "asc")}          
          }

          onRateClick={()=>{            
            setSba(sba)
            setSbr(!sbr)
            setSbaType(null)
            setSbrType(sbr_type === "asc" ? "desc" : "asc")}
          }

          ascBkColor = {sba_type === "desc" ? hBttnBkColor[theme] : "white"}
          ascChildren = {sba_type === "asc" ? "Sort By A-Z" : "Sort By Z-A" }

          rateBkColor = {sbr_type === "desc" ? "white" : hBttnBkColor[theme]}
          rateChildren = {sbr_type === "asc" ? "Acending Rate" : "Descending Rate"}
        />
      </HeadCont>

{/* ====================== Body area ==================================== */}
      <BodyCont>
       
        <Divider text="Result"></Divider>

        <PageCont>
          {Object.values(result).map((item) => (
            <div>
              <Detail
                alt={item.Title}
                title={item.Title}
                director={item.director}
                genre={item.Genre}
                cast={item.cast}
                description={item.description}
                src={item.Poster}
              />
            </div>
          ))}
          <ButCont>
            <ClickButton src={uuid} cwidth='' />
          </ButCont>
        </PageCont>
        {/*STICKER SECTION*/}


        <Divider text="Moodboard"></Divider>
        <DndProvider backend={TouchBackend} options={{
        enableTouchEvents:false,
        enableMouseEvents:true
      }}>
        <StickerBoard onDropItem={(item)=>{
          //console.log(ns);
          const n_id = uuidv4();
          // ns[n_id] = {
          //   id:n_id
          // };
          setNs((prev)=>({
            ...prev,
            [n_id]:{id:n_id}
          }))
        }}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
				onDragEnd={()=>setOp(1)}
        >
      <h3>Mood Board Notes - {uuid}</h3>
      <button onClick={HandleSave}>Save</button>
      {Object.values(ns).map(o=><Sticker 
        type='boardnotes' 
        key={o.id}
        notepos={o.pos}
        notecontent={o.content}
        onUpdateNote={(obj)=>HandleUpdateNote(o.id, obj)}
        >
        {o.id}
      </Sticker>)}
        </StickerBoard>

      <div>
        <h3>Menu</h3>
        <Sticker />
      </div>

      <div>
        <h3>Sticker</h3>
        {src && <img height ={100} src={src}/> }
        <div>{fname}</div>
        <Sticker/>
      </div>

      </DndProvider>



          {/*REVIEW SECTION*/}
        <ReviewSection text="Reviews" />
      </BodyCont>
    </Cont>
  );
}
