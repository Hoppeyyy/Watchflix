import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useTheme,useFav } from "@/utils/provider";
import ax from "axios";
import ClickButton from "@/comps/ClickButton";
import Detail from "@/comps/Detail";
import Divider from "@/comps/Divider";
import ReviewSection from "@/comps/ReviewSection";
import styled from "styled-components";
import Header from "@/comps/Header/index";
import Header2 from "@/comps/Header/index2";
import { basicColor, whiteblack, shadow, hBttnBkColor } from "@/utils/variables";
// sticker
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import { v4 as uuidv4, v4 } from 'uuid';
import StickerBoard from '@/comps/StickerBoard';
import Sticker from '@/comps/Sticker';
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
  background-color: ${props => props.colbg};
  box-shadow: ${props=> props.shadow};
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
const StickerCont = styled.div`
  display:flex;
  justify-content: center;
  width:100%;
`
const Text = styled.h3`
color: ${props => props.basicColor};
`
export default function Result() {
  const r = useRouter();
  const { uuid } = r.query;
  const [View, setView] = useState(true);
  const [color, setColor] = useState(true);
  const [sbr, setSbr] = useState(false);
  const [sba, setSba] = useState(false);
  const [sba_type, setSbaType] = useState("asc");
  const [sbr_type, setSbrType] = useState("desc");
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState();
  const [sticker, setSticker] = useState({})
  const { theme, setTheme } = useTheme();
  const { fav, setFav } = useFav();
  const [data, setData] = useState()

  //console.log("value is", Object.values(fav));

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
  
  useEffect(() => {
    console.log("query", r.query.uuid)
    if (uuid) {
      const GetUuid = async () => {
        const res = await ax.get("/api/save",{
          params:{uuid:r.query.uuid}
        });
        console.log("res",res)
        console.log("item", res.data)
        console.log("fav",fav);
      
        if (res.data !== false) {
          setFav(res.data)
          setData(res.data)
          console.log("data",res.data);
          //setSticker(res.data.stickers)
         
        }
     
      };
      GetUuid();
    }
    if ( !globalThis.localStorage ) {
      return;
    }
    var token = localStorage.getItem('token');
    var username = localStorage.getItem('user');
    //console.log(username)
    var userData = JSON.parse(username)
    //console.log(userData.name)
   //console.log(token)
    setUser(token)
    setUserName(userData.name)
  }, [uuid]);


  // ============== Authentication

//console.log(user)
var header_arr =[];
{user?
  (header_arr.push(<Header2
    onInput={(e) => {
      //PageClick(1, e.target.value);
    }}
    onSearchClick={(searchTerm)=>{
      
        PageClick(1, searchTerm)
      
    }}
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
    user={userName}
    AuthOutClick = {()=>{
      setUser("")
      localStorage.removeItem('token')
    
    }
    }
  />)):(
    header_arr.push(<Header
      onInput={(e) => {
        //PageClick(1, e.target.value);
      }}
      onSearchClick={(searchTerm)=>{
        
          PageClick(1, searchTerm)
        
      }}
  
  
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
      AuthSignClick={() =>{
        r.push("/signup");
      }}
     AuthLogClick={()=>{
      r.push("/login");
     }}
    />)
  )
}
 //---------------Moodboard------------------------


 
 const HandleUpdateSticker = (id,data) =>{
  sticker[id]={
    ...sticker[id],
    ...data
  }
  setSticker({
    ...sticker
  })
}

const HandleSave = async () =>{
  console.log("Generate everything",{
    uuid,
    stickers:[{...sticker}],
    reviews:[{}]
  })
  const res = await ax.patch('/api/save',{
    uuid,
    stickers:[{...sticker}],
    reviews:[{}]
  })

  //console.log("sticker",stickers)

} 


  return (
    <Cont>

      <HeadCont colbg={whiteblack[theme]} shadow={shadow[theme]}>
      {header_arr}
      </HeadCont>

{/* ====================== Body area ==================================== */}
      <BodyCont>
        <Divider text="Result"></Divider>

        <PageCont>
          {data && Object.values(data).map(item => (
            <div>              
              <Detail
                alt={item.Title}
                title={item.Title}
                director={item.director}
                genre={item.Genre}
                cast={item.cast}
                description={item.description}
                rate={item["IMDB Score"]}
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
    <Text
    basicColor={basicColor[theme]}
    >Tell others how you feel about the movie</Text>
        <DndProvider backend={TouchBackend} options={{
        enableTouchEvents:false,
        enableMouseEvents:true
      }}>
        <StickerBoard onDropItem={(item)=>{
          const n_id = uuidv4();  

        if(item.type === 'sticker'){
          setSticker((prev)=>({
            ...prev,
            [n_id]:{id:n_id, src:item.src}
          }))
        } 
        
        }}
        >
     
      {Object.values(sticker).map(o=>{
      return <Sticker 
      type='boardsticker' 
      key={o.id}
      dragImg={o.img}
      stickerpos={o.pos}
      src={o.src}
      onUpdateSticker={
        (obj)=>HandleUpdateSticker(o.id,obj)
       
      }
      >
       
      </Sticker>})}
        </StickerBoard>

{/* Sticker images here */}
      <StickerCont>
        <Sticker src="/images/laughing.png"></Sticker>
        <Sticker src="/images/sad.png"></Sticker>
        <Sticker src="/images/crying.png"></Sticker>
        <Sticker src="/images/love.png"></Sticker>
        <Sticker src="/images/smile.png"></Sticker>
        <Sticker src="/images/dog-happy.png"></Sticker>
        <Sticker src="/images/dog-mad.png"></Sticker>
        <Sticker src="/images/clown.png"></Sticker>
        <Sticker src="/images/angry.png"></Sticker>
      </StickerCont>
      <button onClick={HandleSave}>Save</button>
      </DndProvider>

{/*REVIEW SECTION*/}
        <ReviewSection text="Reviews" />
      </BodyCont>
    </Cont>
  );
}
