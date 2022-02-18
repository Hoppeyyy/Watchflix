import styled from 'styled-components';
import React,{useEffect, useState } from 'react';
import { useTheme } from "@/utils/provider";
import { bkColor, hovColor, hovBkColor, hBttnBkColor } from "@/utils/variables";
import PopUp from 'comps/PopUp';
import { useRouter } from 'next/router';
import Link from "next/link";
import axios from 'axios';

const ButtonCont = styled.div`
    width: ${props=>props.cwidth};
    display:flex;
    justify-content: flex-end;
    padding:1.5rem;
    padding-right:0;
    padding-top:4rem;
`;

const ButtonInput = styled.button`
    type: ${props=>props.type};
    display:flex;
    background-color:${(props)=>props.bkColor};
    border:none;
    border-radius:${props=>props.radius}px;
    width: ${props=>props.width}px;
    min-width: ${props=>props.minWidth}px;
    height: ${props=>props.height}px;
    align-items:center;
    justify-content:center;
    box-shadow: ${props=>props.bshadow}; 
    cursor: pointer;
    
    :hover {
        background-color: ${props => props.hovBkColor};
        color: ${props => props.hovColor};
        transform: scale(0.95);
        transition-duration: 0.3s;
    }
`;

const ButtonText = styled.p`
    font-size: ${props=>props.fontSize};
    text-align:center;
    font-weight: ${props=>props.fontWeight};
`;

const ClickButton = ({

    type = "submit",
    text="Share With Your Friend",
    margintop = 100,
    marginright="",
    radius = 20,
    cwidth = "100%",
    width = 360,
    height = 72,
    bshadow = "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    fontSize="24px",
    justify="center",

}) => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  //----------------Share button to get url--------------

  const router = useRouter();
  const {uuid} = router.query
//   console.log('my stored id',storeId)

  useEffect(()=>{
      if(uuid){
          const GetUuid = async () =>{
              const res = await axios.get("/api/save", {
                  params:{
                      uuid 
                  }
              })

              if(res.data !==false){
                  setFav(res.data);
              }
          }
          GetUuid();
      }
  }, [uuid])

    return <ButtonCont 
            mtop={margintop}
            mright={marginright}
            justify={justify}
            cwidth={cwidth}
            onClick={togglePopup}            
        >
        {isOpen && <PopUp src={uuid} 
        myurl={uuid}
        handleClose={togglePopup}
     
   />}
            <ButtonInput
                type={type}
                bkColor={bkColor[theme]}
                radius={radius}
                width={width}
                height={height}
                bshadow={bshadow}
                hovBkColor={hovBkColor[theme]}
                hovColor={hovColor[theme]}
            >
                <ButtonText
                    fontSize={fontSize}
                >
                    {text}</ButtonText>
            </ButtonInput>
        </ButtonCont>
}

export default ClickButton;