import Head from 'next/head';
import styled from 'styled-components';
import React from 'react';
import {useRouter} from 'next/router';


const ButtonCont = styled.div`
    margin-top: ${props=>props.mtop}px;
    margin-right: ${props=>props.mright}px;
    width: ${props=>props.cwidth};
    display:flex;
    justify-content:${props=>props.justify};
`;

const ButtonInput = styled.button`
    type: ${props=>props.type};
    display:flex;
    background-color:${props=>props.bg};
    border: ${props=>props.border};
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
    bgcolor = "#F9E7E7",
    radius = 20,
    cwidth = "100%",
    width = 360,
    height = 72,
    bshadow = "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    color="#000",
    fontSize="24px",
    justify="center",

    clickHandler = () => {},
    href="/posts"

}) => {
    // const router = useRouter();

    return (
        <ButtonCont 
            mtop={margintop}
            mright={marginright}
            justify={justify}
            cwidth={cwidth}

            onClick={()=>{ clickHandler()} }
            href={href}
            // onClick={()=>router.push(routeTo)}
        >
            <ButtonInput
                type={type}
                bg={bgcolor}
                radius={radius}
                width={width}
                height={height}
                border={border}
                bshadow={bshadow}
            >
                <ButtonText
                    color={color}
                    fontSize={fontSize}
                >
                    {text}</ButtonText>
            </ButtonInput>
        </ButtonCont>
    );
}

export default ClickButton;