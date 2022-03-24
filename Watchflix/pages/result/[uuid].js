import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useTheme, useResult, useFav } from "@/utils/provider";
import ax from "axios";
import ClickButton from "@/comps/ClickButton";
import Detail from "@/comps/Detail";
import Divider from "@/comps/Divider";
import ReviewSection from "@/comps/ReviewSection";
import styled from "styled-components";
import Header from "@/comps/Header/index";
import Header2 from "@/comps/Header/index2";
import {
  basicColor,
  whiteblack,
  shadow,
  hBttnBkColor,
  fShadow,
} from "@/utils/variables";
// sticker
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import { v4 as uuidv4, v4 } from "uuid";
import StickerBoard from "@/comps/StickerBoard";
import Sticker from "@/comps/Sticker";
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
  margin-top: 50px;
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
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Text = styled.h3``;
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

const LikesBtn = styled.button`
  border-radius:20px;
  border:none;
  background-color:#F9E7E7;
  width:100px;
  height:50px;
`;

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
  const [user, setUser] = useState(null);
  const { fav, setFav } = useFav();
  const [userName, setUserName] = useState();
  console.log("value is", Object.values(fav));

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

  // ============== Authentication
  useEffect(() => {
    if (!globalThis.localStorage) {
      return;
    }
    var token = localStorage.getItem("token");
    var username = localStorage.getItem("user");
    //console.log(username)
    var userData = JSON.parse(username);
    //console.log(userData.name)
    console.log(token);
    setUser(token);
    // setUserName(userData.name)

    // do server side stuff
  }, []);
  console.log(user);
  var header_arr = [];
  {
    user
      ? header_arr.push(
          <Header2
            onInput={(e) => {
              //PageClick(1, e.target.value);
            }}
            onSearchClick={(searchTerm) => {
              PageClick(1, searchTerm);
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
              setUser("");
              localStorage.removeItem("token");
            }}
          />
        )
      : header_arr.push(
          <Header
            onInput={(e) => {
              //PageClick(1, e.target.value);
            }}
            onSearchClick={(searchTerm) => {
              PageClick(1, searchTerm);
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
          />
        );
  }
  //---------------Moodboard------------------------

  const [sticker, setSticker] = useState({});
  const [img, setImg] = useState(false);
  console.log(sticker);

  const HandleUpdateSticker = (id, data) => {
    sticker[id] = {
      ...sticker[id],
      ...data,
    };
    setSticker({
      ...sticker,
    });
    /*setSticker({
    ...sticker,
    id:{
      data
    }
  })*/
  };

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
      // alert(`${id}has connected"`);
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

  // const MouseMoveUpdate = async (x, y) =>{
  //  // console.log(x,y)
  //   mySoc.emit("mouse_moved", x, y)
  // }

  // const clickEventHandler = async () => {
  //  setIsImageActive(!isImageActive)
  // }
  // // setIsImageActive(!isImageActive);

  // const clickHeart = async () => {
  //   setIsImageActive(!isImageActive)
  //  }

  return (
    <Cont>
      <HeadCont colbg={whiteblack[theme]} shadow={shadow[theme]}>
        {header_arr}
      </HeadCont>

{/* ====================== Body area ==================================== */}
      <BodyCont>
        <Divider text="Result"></Divider>

        <PageCont>
          {Object.values(fav).map((item, i) => (
            // <div>
            <Detail
              alt={item.Title}
              title={item.Title}
              director={item.director}
              genre={item.Genre}
              cast={item.cast}
              description={item.description}
              rate={item["IMDB Score"]}
              src={item.Poster}
              bttnSrc={uuid}
            />
            // </div>
          ))}
          <ButCont>
            <ClickButton src={uuid} cwidth="" />
          </ButCont>
        </PageCont>

        {/*----------------------Watch Party Section----------------------------*/}
        <Divider text="What's Up?"></Divider>
        <Text>Tell others how you feel about the movie</Text>

            <ReactCont>
              <LikesCont>
              {msgs.map((o,i)=><AnimImage src="/images/likes.gif">
              {o.LikesImg}
              </AnimImage>)}  
              </LikesCont>

            <LikesBtn onClick={SendToIO}>Like</LikesBtn>
    

          </ReactCont>

        {/*STICKER SECTION*/}
        <Divider text="Moodboard"></Divider>
        <Text>Rate the differenet elements movie with emoji</Text>
        <DndProvider
          backend={TouchBackend}
          options={{
            enableTouchEvents: false,
            enableMouseEvents: true,
          }}
        >
          <StickerBoard
            onDropItem={(item) => {
              //console.log(ns);
              const n_id = uuidv4();
              // ns[n_id] = {
              //   id:n_id
              // };
              if (item.type === "sticker") {
                setSticker((prev) => ({
                  ...prev,
                  [n_id]: { id: n_id, src: item.src },
                }));
              }
            }}
          >
            {Object.values(sticker).map((o) => {
              return (
                <Sticker
                  type="boardsticker"
                  key={o.id}
                  dragImg={o.img}
                  stickerpos={o.pos}
                  src={o.src}
                  onUpdateSticker={(obj) => HandleUpdateSticker(o.id, obj)}
                ></Sticker>
              );
            })}
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
        </DndProvider>

        {/*REVIEW SECTION*/}
        <ReviewSection text="Reviews" />
      </BodyCont>

{/* ====================== Footer area ==================================== */}
      <FooterCont colbg={whiteblack[theme]} shadow={fShadow[theme]}>
        <Footer />
      </FooterCont>
    </Cont>
  );
}
