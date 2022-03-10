import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useTheme, useResult } from "@/utils/provider";
import ax from "axios";
import ClickButton from "@/comps/ClickButton";
import Detail from "@/comps/Detail";
import Divider from "@/comps/Divider";

import ReviewSection from "@/comps/ReviewSection";
import styled from "styled-components";
import Header from "@/comps/Header";
import { basicColor, whiteblack, shadow } from "@/utils/variables";

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

  const inputFilter = async (txt) => {
    console.log(txt);

    // results the timer if the inputs keeps changing
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // start a timer to wait 2 seconds before making an asynchronous call
    if (timer === null) {
      timer = setTimeout(async () => {
        console.log("async call");
        const res = await ax.get("/api/newmovie", {
          params: {
            txt: txt,
            // sort_rating: sbr,
            // sort_type: sbr_type,
          },
        });
        console.log(res.data);
        setData(res.data);
        timer = null;
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
  
  return (
    <Cont>
{/* ====================== Header area ==================================== */}
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

        <ReviewSection text="Reviews" />
      </BodyCont>
    </Cont>
  );
}
