import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTheme, useFav } from "@/utils/provider";
import { useRouter, Router } from "next/router";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import HMovie from "@/comps/HMovie";
import PosterBox from "@/comps/PosterBox";
import PageBttn from "@/comps/PageBttn";
import React from "react";
import Header from "@/comps/Header/index";
import Header2 from "@/comps/Header/index2";
import Footer from "@/comps/Footer";
import {
  basicColor,
  whiteblack,
  shadow,
  hBttnBkColor,
  fShadow,
} from "@/utils/variables";

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
  padding: 0 2rem;
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
    const resp = await ax.put("/api/save", {
      uuid: item._id,
    });
  };

  const StoreFav = (item) => {
    console.log(item);
    console.log("clicked");

    const b_obj = {};
    b_obj[item.imdbId] = item;
    setFav(b_obj);
  };

// ============== PaginatioWn

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

    if (!globalThis.localStorage) {
      return;
    }
    var token = localStorage.getItem("token");
    var username = localStorage.getItem("user");
    var userData = JSON.parse(username);
    setUser(token);
    setUserName(userData.name);
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
  var header_arr = [];
  {
    user
      ? header_arr.push(
          <Header2
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
              setSbaType(sba_type === "desc" ? "asc" : "desc");
            }}
            onRateClick={() => {
              setSba(false);
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
              setSbaType(sba_type === "desc" ? "asc" : "desc");
            }}
            onRateClick={() => {
              setSba(false);
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
                  onClick={(e) => {
                    StoreFav(item);
                    HandleSave(item);
                    r.push(`/result/${item._id}`);
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
                  onClick={() => {
                    StoreFav(item);
                    HandleSave(item);
                    r.push(`/result/${item._id}`);
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
