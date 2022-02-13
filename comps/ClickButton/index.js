import styled from 'styled-components';
import React,{useState } from 'react';
import { useTheme } from "@/utils/provider";
import {
  bkColor,
  themes,
  bttnBkColor,
  hovBkColor,
  hovColor,
} from "@/utils/variables";
import PopUp from 'comps/PopUp';


const ButtonCont = styled.div`
    width: ${props=>props.cwidth};
    display:flex;
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
    :hover{
        transform: scale(0.85);
        transition-duration: 0.5s;
    }
`;

const ButtonText = styled.p`
    color:${props=>props.color} ;
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
    color="#000",
    fontSize="24px",
    justify="center",
    src={src}
}) => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
    setIsOpen(!isOpen);
  }
    return <ButtonCont 
            mtop={margintop}
            mright={marginright}
            justify={justify}
            cwidth={cwidth}
            onClick={togglePopup}
        >
        {isOpen && <PopUp
     src={src}
     handleClose={togglePopup}
   />}
            <ButtonInput
                type={type}
                bkColor={bkColor[theme]}
                radius={radius}
                width={width}
                height={height}
                bshadow={bshadow}
            >
                <ButtonText
                    color={color}
                    fontSize={fontSize}
                >
                    {text}</ButtonText>
            </ButtonInput>
        </ButtonCont>
}

export default ClickButton;