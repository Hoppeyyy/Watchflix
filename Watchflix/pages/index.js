import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTheme, useResult } from "@/utils/provider";
import { useRouter, Router } from "next/router";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import { setRequestMeta } from "next/dist/server/request-meta";
import HMovie from "@/comps/HMovie";
import PosterBox from "@/comps/PosterBox";
import Pagination from "@/pages/_old/index2-pagination";
import PageBttn from "@/comps/PageBttn";
//mport newmovie from "@/utils/newmovie";
import React from "react";
import Header from "@/comps/Header/index";
import { basicColor, whiteblack, shadow, hBttnBkColor } from "@/utils/variables";

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
  margin-bottom: 50px;
  flex-wrap: wrap;
  padding: 2rem 1rem;
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

  const HandleSave = async() => {
    const resp = await ax.post('/api/save', {
      uuid,
      ns
    })
  }

 
  const StoreResult = (item) => {
    console.log(item);

    console.log(item);
    console.log("clicked");

    const b_obj = {};
    b_obj[item.imdbId] = item;
    setResult(b_obj);
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
      //  console.log(res.data.nummovies); // total movie numbers including after sorting
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
        // bgcolor = {cur_page === ind ? '#F9E7E7' : ""}
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

  return (
    <Cont>
      <HeadCont colbg={whiteblack[theme]} shadow={shadow[theme]}>
{/* ====================== Input and Button area ==================================== */}
        <Header
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
        />
      </HeadCont>

{/* ====================== Filtering result show below  ==================================== */}
      {View ? (
        <PagCont>
          <Wrap>            
            {data && data.length > 0
              ? data.map((item) => (
                  <HMovie
                    key={item.imdbId}
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
                    onClick={() => {
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
                      HandleSave
                    }}
                    //pages = {item.num_pages}
                  />
                ))
              : data.slice(0, 10).map((item) => (
                  <HMovie
                    key={item.imdbId}
                    title={item.Title}
                    alt={item.Title}
                    year={item.release_year}
                    src={item.Poster}
                    place={item.country}
                    director={item.director}
                    text={item.description}
                    genre={item.Genre}
                    rate={item["IMDB Score"]}
                    onClick={() => {
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
                      HandleSave
                    }}
                    //pages = {item.num_pages}
                  />
                ))}
          </Wrap>
          {/* <Pagination /> */}
          <PageCont>{butt_arr}</PageCont>
        </PagCont>
      ) : (
        <PagCont>
          <Wrap>
            {data && data.length > 0
              ? data.map((item) => (
                  <PosterBox
                    key={item.imdbId}
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
                      r.push(`/result/${uuidv4()}`);
                      HandleSave;
                    }}

                    //pages = {item.num_pages}
                  />
                ))
              : data.slice(0, 10).map((item) => (
                  <PosterBox
                    key={item.imdbId}
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
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
                      HandleSave;
                    }}
                    //pages = {item.num_pages}
                  />
                ))}
          </Wrap>
          {/* <Pagination /> */}
          <PageCont>{butt_arr}</PageCont>
        </PagCont>
      )}
    </Cont>
  );
}
