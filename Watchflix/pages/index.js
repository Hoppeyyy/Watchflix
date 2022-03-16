import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTheme, useResult, useFav } from "@/utils/provider";
import { useRouter, Router } from "next/router";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import { setRequestMeta } from "next/dist/server/request-meta";
import HMovie from "@/comps/HMovie";
import PosterBox from "@/comps/PosterBox";
import PageBttn from "@/comps/PageBttn";
import React from "react";
import Header from "@/comps/Header/index";
import Header2 from "@/comps/Header/index2";
import Footer from "@/comps/Footer";
import { basicColor, whiteblack, shadow, hBttnBkColor, fShadow,} from "@/utils/variables";

const Cont = styled.div`
  width: 100%;
  height: 100%;
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

const PagCont = styled.div`
  width: 100%;
  dislplay: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Button = styled.button`
  margin-bottom: 50px;
`;

const PageCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FooterCont = styled.div`
  width: 100%;
  background-color: ${(props) => props.colbg};
  box-shadow: ${(props) => props.shadow};
`;

var timer = null;

export default function Home() {
  const r = useRouter();
  const [data, setData] = useState([]);
  const [View, setView] = useState(true);
  const [color, setColor] = useState(true);
  const [sbr, setSbr] = useState(false);
  const [sba, setSba] = useState(false);
  const [sba_type, setSbaType] = useState("asc");
  const [sbr_type, setSbrType] = useState("desc");
  const [inptxt, setInpTxt] = useState("");
  const { result, setResult } = useResult();
  const [cur_page, setCurPage] = useState([]);
  const [movie_num, setMovie_num] = useState();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  const { fav, setFav } = useFav();
  const [uid, setUid] = useState(uuidv4());

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

  const { uuid } = r.query;

  const HandleSave = async (item) => {
    const m_obj = {};

    m_obj[item.imdbId] = item;

    console.log("this is my fav", uuid);
    const resp = await ax.post("/api/save", {
      uuid: uid,
      item: m_obj,
    });
  };

  const StoreResult = (item) => {
    console.log(item);
    console.log("clicked");

    const b_obj = {};
    b_obj[item.imdbId] = item;
    setResult(b_obj);
  };

// ============== Pagination Starts
  const PageClick = async (p, txt) => {
    var obj = {};
    if (txt) {
      obj.txt = txt;
      obj.sort_alpha = sba_type;
      obj.sort_rating = sbr_type;
    }

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (timer === null) {
      timer = setTimeout(async () => {
        console.log("async call");
        const res = await ax.get("/api/movie", {
          params: {
            page: p,
            num: 10,
            // sort_rating:sbr_type,
            ...obj,
          },
        });
        setData(res.data.lists);
        setCurPage(p);
        setInpTxt(txt);
        setMovie_num(res.data.nummovies);

        timer = null;

        if (res.data.nummovies <= 0) {
          alert("no movie found");
        }
      }, 1000);
    }
  };

  useEffect(() => {
    PageClick(1, r.query.search || "");
  }, []);

  var butt_arr = [];
  var ind = 1;
  for (var i = 0; i < movie_num; i += 10) {
    butt_arr.push(
      <PageBttn
        onClick={PageClick.bind(this, ind, inptxt)}
        bgcolor={
          cur_page === ind && theme === "light"
            ? "#F9E7E7"
            : cur_page === ind && theme === "dark"
            ? "#B08584"
            : "transparent"
        }
        btnnumber={ind}
      />
    );
    ind++;
  }

  var lastpage = cur_page + 2;

  var numpages = Math.ceil(movie_num / 10);
  console.log(numpages); // number of pages need to have to show the movies

  if (lastpage > numpages) {
    lastpage = numpages;
  }

  butt_arr = butt_arr.slice(cur_page - 2 < 0 ? 0 : cur_page - 2, lastpage);
// ============== Pagination ends

// ============== Authentication
  useEffect(() => {
    if (!globalThis.localStorage) {
      return;
    }
    var token = localStorage.getItem("token");
    var username = localStorage.getItem("user");
    //console.log(username)
    var userData = JSON.parse(username);
    console.log(token);
    setUser(token);
    setUserName(userData.name);
    //LogoutClick(token, forget)

    // do server side stuff
  }, []);

  console.log(user);
  console.log(userName);
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
              setSbr(false);
              setSba(true);
              setSbrType(null);
              setSbaType(sba_type === "asc" ? "desc" : "asc");
            }}
            onRateClick={() => {
              setSba(false);
              setSbr(true);
              setSbaType(null);
              setSbrType(sbr_type === "desc" ? "asc" : "desc");
            }}
            ascBkColor={sba_type === "desc" ? hBttnBkColor[theme] : "white"}
            ascChildren={sba_type === "asc" ? "Sort By A-Z" : "Sort By Z-A"}
            rateBkColor={sbr_type === "desc" ? "white" : hBttnBkColor[theme]}
            rateChildren={
              sbr_type === "asc" ? "Acending Rate" : "Descending Rate"
            }
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
              setSbr(false);
              setSba(true);
              setSbrType(null);
              setSbaType(sba_type === "asc" ? "desc" : "asc");
            }}
            onRateClick={() => {
              setSba(false);
              setSbr(true);
              setSbaType(null);
              setSbrType(sbr_type === "desc" ? "asc" : "desc");
            }}
            ascBkColor={sba_type === "desc" ? hBttnBkColor[theme] : "white"}
            ascChildren={sba_type === "asc" ? "Sort By A-Z" : "Sort By Z-A"}
            rateBkColor={sbr_type === "desc" ? "white" : hBttnBkColor[theme]}
            rateChildren={
              sbr_type === "asc" ? "Acending Rate" : "Descending Rate"
            }
            AuthSignClick={() => {
              r.push("/signup");
            }}
            AuthLogClick={() => {
              r.push("/login");
            }}
          />
        );
  }

  return (
    <Cont>
      <HeadCont colbg={whiteblack[theme]} shadow={shadow[theme]}>
{/* ====================== Input and Button area ==================================== */}
        {header_arr}
      </HeadCont>

{/* ====================== Filtering result show below  ==================================== */}
      {View ? (
        <PagCont>
          <Wrap>
            {data &&
              data.length > 0 &&
              data.map((item, i) => (
                <HMovie
                  key={item.imdbId + "ind" + i}
                  title={item.Title}
                  alt={item.Title}
                  year={item.release_year}
                  src={item.Poster}
                  place={item.country}
                  text={item.description}
                  genre={item.Genre}
                  rate={item["IMDB Score"]}
                  director={item.director}
                  clicked={
                    result[item.imdbId] != undefined &&
                    result[item.imdbId] !== null
                  }
                  onClick={(e) => {
                    // let uid = uuidv4()
                    StoreResult(item);
                    HandleSave(item);
                    r.push(`/result/${uid}`);
                  }}
                />
              ))}
          </Wrap>
          {/* <Pagination /> */}
          <PageCont>{butt_arr}</PageCont>
        </PagCont>
      ) : (
        <PagCont>
          <Wrap>
            {data &&
              data.length > 0 &&
              data.map((item, i) => (
                <PosterBox
                  key={item.imdbId + "ind" + i}
                  title={item.Title}
                  alt={item.Title}
                  year={item.release_year}
                  src={item.Poster}
                  place={item.country}
                  director={item.director}
                  genre={item.Genre}
                  rate={item["IMDB Score"]}
                  text={item.description}
                  clicked={
                    result[item.imdbId] != undefined &&
                    result[item.imdbId] !== null
                  }
                  onClick={() => {
                    StoreResult(item);
                    HandleSave(item);
                    r.push(`/result/${uid}`);
                  }}
                />
              ))}
          </Wrap>
          {/* <Pagination /> */}
          <PageCont>{butt_arr}</PageCont>
        </PagCont>
      )}

      <FooterCont colbg={whiteblack[theme]} shadow={fShadow[theme]}>
        <Footer />
      </FooterCont>
    </Cont>
  );
}
