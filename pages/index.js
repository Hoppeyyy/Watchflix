import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTheme, useResult } from "@/utils/provider";
import { useRouter } from "next/router";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import { setRequestMeta } from "next/dist/server/request-meta";
import HMovie from "@/comps/HMovie";
import PosterBox from "@/comps/PosterBox";
import Pagination from "@/comps/Pagination/index2";
import PageBttn from "@/comps/PageBttn";
import newmovie from "@/utils/newmovie";
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
//var nummovies = 1971;
//var myObj ={};
//var myObj = newmovie.length;
//var count = Object.keys(myObj).length;

export default function Test() {
  const r = useRouter();
  const [data, setData] = useState([]);
  const [View, setView] = useState(true);
  const [color, setColor] = useState(true);
  const [sbr, setSbr] = useState(false);
  const [sbr_type, setSbrType] = useState("asc");
  const [sort_direct, setSbDirect] = useState("asc");
  // const [director, setDirector] = useState(false);
  const [inptxt, setInpTxt] = useState("");
  const { result, setResult } = useResult();
  const [cur_page, setCurPage] = useState([]);
  const [movie_num, setMovie_num] = useState();
  const { theme, setTheme } = useTheme();
  //const [Def, setDef] = useState(false);

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
      // theme === "dark"
      setTheme(theme === "dark" ? "light" : "dark");
      setColor(true);
      // console.log("light mode");
    } else if (color === true) {
      setTheme(theme === "dark" ? "light" : "dark");
      setColor(false);
      // console.log("dark mode");
    }
  };

// setTheme(theme === "dark" ? "light" : "dark")}
  
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
    console.log(txt);
    var obj = {};
    if (txt) {
      obj.txt = txt;
      obj.sort_type = sbr_type
      obj.release_year = sbr_type
      obj.director = sort_direct
      // obj.sort_rating=sbr;
      // obj.sort_type = sbr_type;
    }
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    /*
        txt: txt,
        sort_rating: sbr,
        sort_type: sbr_type
    */
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
        console.log(res.data.lists); // lists of 10 movies
        console.log(res.data); // {}: both lists and nummovies
        setData(res.data.lists);
        setCurPage(p);
        setInpTxt(txt);
        //console.log(txt); // triggering the text
        //console.log(p); // page number
        setMovie_num(res.data.nummovies);
        console.log(res.data.nummovies); // total movie numbers including after sorting
        timer = null;

        if (res.data.nummovies <= 0) {
          alert("no movie found");
        }
      }, 1000);
    }
    //setAllData(res.Alldata);
    //setData(res.data.lists);

    //setNumMovies(res.data.nummovies);
    //setCurPage(p);
    //setInpTxt(txt);
    //myObj = res.data.length;
    // setMovie_num(res.data.length);
    //console.log(res.data);
  };
  useEffect(() => {
    PageClick(1, "");
  }, []);
  console.log(data);

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
  //console.log(movie_num)
  var lastpage = cur_page + 2;

  var numpages = Math.ceil(movie_num / 10);
  console.log(numpages); // number of pages need to have to show the movies

  if (lastpage > numpages) {
    lastpage = numpages;
  }

  butt_arr = butt_arr.slice(cur_page - 2 < 0 ? 0 : cur_page - 2, lastpage);
  //console.log(butt_arr)
// ============== Pagination ends

  // const [searchInput, setSearchInput] = useState("");

  return (
    <Cont>
      <HeadCont colbg={whiteblack[theme]} shadow={shadow[theme]}>
{/* ====================== Input and Button area ==================================== */}
        <Header
          onInput={(e) => {
            PageClick(1, e.target.value);
          }}
          isView={View}
          isColor={color}
          handleView={() => onChangeView()}
          handleColor={() => onChangeColor()}

          onAscClick={() => setSbrType(sbr_type === "asc" ? "desc" : "asc")}
          onDirClick={() => setSbDirect(sort_direct === "asc" ? "desc" : "asc")}

          ascBkColor={
            // theme === "light" ? "#fff"
            // : theme === "dark" ? "#B08584" : "transparent"
            sbr_type === "desc" ? "white" : hBttnBkColor[theme]
          }
          ascChildren ={sbr_type === "desc" ? "Sort By Z-A" : "Sort By A-Z" }


          rateBkColor = {            
            sort_direct === "desc" ? "white" : hBttnBkColor[theme]
          }
          rateChildren = {sort_direct === "desc" ? "Clear" : "Sort By Director" }

          // isColor = {color}
          // handleColor={() => onChangeColor()}
          // handleColor={()=>{setTheme(
          //   (theme === ('light') ? 'dark' : 'light')
          // )}}
        />
      </HeadCont>

{/* ====================== Filtering result show below  ==================================== */}
      {View ? (
        <PagCont>
          <Wrap>            
            {data && data.length > 0
              ? data.map((item) => (
                  <HMovie
                    title={item.Title}
                    alt={item.Title}
                    year={item.release_year}
                    src={item.Poster}
                    place={item.country}
                    text={item.description}
                    director={item.director}
                    clicked={
                      result[item.imdbId] != undefined &&
                      result[item.imdbId] !== null
                    }
                    onClick={() => {
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
                    }}
                    //pages = {item.num_pages}
                  />
                ))
              : newmovie.slice(0, 10).map((item) => (
                  <HMovie
                    title={item.Title}
                    alt={item.Title}
                    year={item.release_year}
                    src={item.Poster}
                    place={item.country}
                    director={item.director}
                    text={item.description}
                    onClick={() => {
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
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
                    title={item.Title}
                    alt={item.Title}
                    year={item.release_year}
                    src={item.Poster}
                    place={item.country}
                    director={item.director}
                    text={item.description}
                    clicked={
                      result[item.imdbId] != undefined &&
                      result[item.imdbId] !== null
                    }
                    onClick={() => {
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
                    }}

                    //pages = {item.num_pages}
                  />
                ))
              : newmovie.slice(0, 10).map((item) => (
                  <PosterBox
                    title={item.Title}
                    alt={item.Title}
                    year={item.release_year}
                    src={item.Poster}
                    place={item.country}
                    director={item.director}
                    text={item.description}
                    onClick={() => {
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
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
