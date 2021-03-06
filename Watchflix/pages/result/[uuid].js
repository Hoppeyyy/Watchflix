import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useTheme, useFav } from "@/utils/provider";
import ax from "axios";
import ClickButton from "@/comps/ClickButton";
import Detail from "@/comps/Detail";
import Divider from "@/comps/Divider";
import ReviewSection from "@/comps/ReviewSection";
import styled from "styled-components";
import Header from "@/comps/Header/index";
import Header2 from "@/comps/Header/index2";
import { bkColor, hovColor, bttnBkColorH, btnColor, basicColor, hovBkDColor, whiteblack, bttnBkColorV, shadow, hBttnBkColor, fShadow, } from "@/utils/variables";
// sticker
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid';
import StickerBoard from '@/comps/StickerBoard';
import Sticker from '@/comps/Sticker';
import Footer from "@/comps/Footer";
//Socket
import { io } from "socket.io-client";
import AnimImage from "@/comps/AnimImage";
import LikesImg from '../../public/images/likes.gif';

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
  margin-top: ${props => props.marginT}px;
  margin-right: 8%;

  @media only screen and (min-width: 950px) and (max-width: 1444px) {
    margin-right: 0;
  }

  @media only screen and (min-width: 561px) and (max-width: 949px) {
    margin-right: 8%;
  }

  @media only screen and (max-width: 560px) {
    justify-content: center;
    margin-top: 30px;
  }
`;

const StickerCont = styled.div`
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  width:100%;
  padding:2rem;
  background:#C4C4C4;
  z-index: 1;
`
const Text = styled.h3`
  color: ${props => props.basicColor};
  margin-bottom: 1rem;
`

const SubmitBtn = styled.button`
  min-width: 250px;
  height: 70px;
  border-radius: 20px;
  border: none;
  font-size: 1.5em;
  padding: 1rem 4rem;
  border-radius: 35px;
  border: none;
  background: ${(props) => props.bgcolor};
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
  cursor: pointer;
  transition: all 0.3s;
  color: ${props => props.color};

  :hover {
    background: ${(props) => props.hovpopbg};
    color: ${(props) => props.hovColor};
    transform: scale(0.95);
    transition-duration: 0.3s;
  }

  @media only screen and (min-width: 421px) and (max-width:680px) {
    min-width: 150px;
    width: 50%; 
    padding: 1rem;
    height: 60px;
    font-size: 1.25rem;  
  }

  @media only screen and (max-width:420px) {
    font-size: 0.875rem; 
    min-width: 150px;
    width: 50%; 
    padding: 1rem;
    height: 60px;   
  }
`;
const FooterCont = styled.div`
  width: 100%;
  padding: 0 2rem;
  background-color: ${(props) => props.colbg};
  box-shadow: ${(props) => props.shadow};
`;

const ReactCont = styled.div`
  
`;

const LikesCont = styled.div`
  display:flex;
`;



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
  const [stickers, setStickers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { theme, setTheme } = useTheme();
  const { fav, setFav } = useFav();
  const [data, setData] = useState()


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
      const FindMovie = async () => {
        const res = await ax.get("/api/findmovie", {
          params: { uuid: r.query.uuid }
        });


        if (res.data !== false) {

          setData([res.data])

        }
       
      };
      FindMovie();

      const UpdateUuid = async () => {
        const res = await ax.get("/api/save", {
          params: { uuid: r.query.uuid }
        });

        if (res.data !== false) {
          setStickers(res.data.stickers)
        }
        console.log("res", res.data)
   
      };

      UpdateUuid();
    }
    if (!globalThis.localStorage) {
      return;
    }
    var token = localStorage.getItem('token');
    var username = localStorage.getItem('user');
    var userData = JSON.parse(username)
    setUser(token)
    setUserName(userData.name)
  }, [uuid]);


  // ============== Authentication

 
  var header_arr = [];
  {
    user ?
      (header_arr.push(<Header2
        onInput={(e) => {
        
        }}
        onSearchClick={(searchTerm) => {

          PageClick(1, searchTerm)

        }}
        isView={View}
        isColor={color}
        handleView={() => onChangeView()}
        handleColor={() => onChangeColor()}

        onAscClick={() => {
          setSbr(sbr);
          setSbrType("");
          setSba(!sba);
          setSbaType(sba_type === "asc" ? "desc" : "asc");
        }}
        onRateClick={() => {
          setSba(sba);
          setSbaType("");
          setSbr(!sbr);
          setSbrType(sbr_type === "desc" ? "asc" : "desc");
        }}
        ascBkColor={sba ? hBttnBkColor[theme] : "white"}
        ascChildren={sba ? "Sort By Z-A" : "Sort By A-Z"}
        rateBkColor={sbr ? hBttnBkColor[theme] : "white"}
        rateChildren={sbr ? "Descending Rate" : "Acending Rate"}

        user={userName}
        AuthOutClick={() => {
          setUser("")
          localStorage.removeItem('token')

        }
        }
      />)) : (
        header_arr.push(<Header
          onInput={(e) => {
       
          }}
          onSearchClick={(searchTerm) => {

            PageClick(1, searchTerm)

          }}


          isView={View}
          isColor={color}
          handleView={() => onChangeView()}
          handleColor={() => onChangeColor()}

          onAscClick={() => {
              setSbr(sbr);
              setSbrType("");
              setSba(!sba);
              setSbaType(sba_type === "asc" ? "desc" : "asc");
            }}
            onRateClick={() => {
              setSba(sba);
              setSbaType("");
              setSbr(!sbr);
              setSbrType(sbr_type === "desc" ? "asc" : "desc");
            }}
            ascBkColor={sba ? hBttnBkColor[theme] : "white"}
            ascChildren={sba ? "Sort By Z-A" : "Sort By A-Z"}
            rateBkColor={sbr ? hBttnBkColor[theme] : "white"}
            rateChildren={sbr ? "Descending Rate" : "Acending Rate"}

          AuthSignClick={() => {
            r.push("/signup");
          }}
          AuthLogClick={() => {
            r.push("/login");
          }}
        />)
      )
  }
  //---------------Moodboard------------------------

  const HandleUpdateSticker = (id, data) => {
    let tempStickers = stickers.map((i) => {
      if (i.id == id) return data
      return i
    })

    setStickers(tempStickers)
    
  }
  const HandleStickerSave = async () => {
    const res = await ax.patch('/api/save', {
      uuid,
      stickers,
    })



  }


  //-----------------------Socket----------------------------
  const [mySoc, setMySoc] = useState(null);
  const [msgs, setMsgs] = useState([]);

  const [isImageActive, setIsImageActive] = useState(false);

  const [users, setUsers] = useState({});

  useEffect(()=>{
    const socket = io("http://localhost:8888");

    socket.on("user_connected", (users)=>{
      setUsers(users);
    })

    socket.on("change", ()=>{
     
      setMsgs((prev)=>[
        ...prev,
        LikesImg,
      ])
    });

    setMySoc(socket);
  }, []);

  const SendToIO = async () =>{
    mySoc.emit("alert_all", isImageActive)
    setIsImageActive(!isImageActive)
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
                year={item.release_year}
                genre={item.Genre}
                country={item.country}
                cast={item.cast}
                description={item.description}
                rate={item["IMDB Score"]}
                src={item.Poster}
              />
            </div>
          ))}
          <ButCont marginT = '50'>
            <ClickButton 
              src={uuid} 
              cwidth='' 
              color={basicColor[theme]}
              bkColor={bkColor[theme]}
              hovBkColor={bttnBkColorH[theme]}
              hovColor={btnColor[theme]}
            />
          </ButCont>
        </PageCont>

        {/*----------------------Watch Party Section----------------------------*/}
        <Divider text="What's Up?"></Divider>
        <Text
          basicColor={basicColor[theme]}
        >Tell others how you feel about the movie</Text>

            <ReactCont>
              <LikesCont>
              {msgs.map((o,i)=><AnimImage src="https://media.giphy.com/media/xThtayC2XaYiQMybss/giphy.gif">
              {o.LikesImg}
              </AnimImage>)}  
              </LikesCont>
            <ButCont marginT = '20'>
            <SubmitBtn 
              onClick={SendToIO}
              color={basicColor[theme]}
              bgcolor={bkColor[theme]}
              hovpopbg={hovBkDColor[theme]}
              hovColor={btnColor[theme]}
            >Like</SubmitBtn>
            </ButCont>
    

          </ReactCont>

        {/*STICKER SECTION*/}

        <Divider text="Moodboard"></Divider>
        <Text
          basicColor={basicColor[theme]}
        >Rate the differenet movie elements with emojis</Text>
        <DndProvider backend={TouchBackend} options={{
          enableTouchEvents: false,
          enableMouseEvents: true
        }}>
          <StickerBoard onDropItem={(item) => {
            const n_id = uuidv4();
            console.log("ondrop", n_id)
            if(item.type === 'sticker'){
        
          setStickers((prev)=>([...prev, {id:n_id, item, src:item.src, img:item.img, pos:item.pos}]))
         
          console.log("stickerboard sticker", stickers)
            }

          }}
          >

            {stickers && Object.values(stickers).map(o => (
              <Sticker
                type='boardsticker'
                key={o?.id}
                id={o?.id}
                dragImg={o?.img}
                stickerpos={o?.pos}
                src={o?.src}
                onUpdateSticker={
                  (obj) => HandleUpdateSticker(o?.id, obj)
                }

              >

              </Sticker>))}
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
          <ButCont marginT = '20'>
            <SubmitBtn 
              onClick={HandleStickerSave}
              color={basicColor[theme]}
              bgcolor={bkColor[theme]}
              hovpopbg={hovBkDColor[theme]}
              hovColor={btnColor[theme]}
            >
              Save
            </SubmitBtn>
          </ButCont>
        </DndProvider>

        {/*REVIEW SECTION*/}
       
        <ReviewSection 
          text="Reviews"        
        />
      </BodyCont>

{/* ====================== Footer area ==================================== */}
      <FooterCont colbg={whiteblack[theme]} shadow={fShadow[theme]}>
        <Footer />
      </FooterCont>
    </Cont>
  );
}
