
import styled from 'styled-components';
import React from 'react';
import SubButton from '../SubButton'
import { useState } from "react";

const Cont = styled.div`
  width: ${props => props.cwidth};
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const FormBox = styled.form`
  width:${props => props.fwidth};
  height: ${props => props.fheight}; 
  display:flex;
  flex-direction: column;
  align-items: felx-start;
  justify-content: center;   
`
const LabelFor = styled.label`
  font-size: ${props => props.fsize}px; 
  font-family: 'Montserrat', sans-serif;
  color: #E50914;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-weight:600;
`
const InputBox = styled.input`
  width:${props => props.iwidth};
  height: ${props => props.iheight}px; 
  border-radius: 10px;
  border: 3px solid #666666;
  font-size: 20px;
  padding: 16px;
  box-sizing: border-box;
  margin-left: 20px;
  margin-bottom: ${props => props.imarginB}px;
`
const TopCont = styled.div`
  width:70%;
  display:flex;
  flex-direction: row;
  align-items: left;
  justify-content: left;
`
const CmBox = styled.textarea`
  width:${props => props.mwidth};
  height: ${props => props.iheight}px; 
  border-radius: 10px;
  border: 3px solid c;
  font-size: 24px;
  padding: 16px;
  box-sizing: border-box;
  cols:50 ;
  rows:25;
  margin-bottom: ${props => props.imarginB}px;
`

const BCont = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
  justify-content:right;
`

export default function SendForm({addContact}) {

  const [contactInfo, setContactInfo] = useState({
    name: "",
    comment: "",
  });

  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(contactInfo);
    setContactInfo({ name: "", comment: "" });
  };
  
        
           
            return( 
          cwidth = "100%",  
          fwidth = "100%",
          fheight = "100%",
          fsize = 24,
          iwidth = "30%",
          iheight = 35,
            <Cont
            cwidth={cwidth}
          >
            <FormBox onSubmit={handleSubmit}
              fwidth={fwidth} 
              fheight={fheight}
            >
            <TopCont>
            <LabelFor 
              for={title} 
              fsize = {fsize}
            > {title}</LabelFor>
            <InputBox 
              type="text" 
              name="Nickname" required 
              iwidth={iwidth} 
              iheight={iheight}
              placeholder="Your Name"
              value={contactInfo.name}
              onChange={handleChange}
            />
            </TopCont>
            <CmBox
                type="text"
                width="350px"
                height="480px"
                placeholder='Leave your comment in here'
                value={contactInfo.comment}
                onChange={handleChange}/>
        <BCont>
        <SubButton 
        type = "submit"
        text = "Post"
        margintop = "0px"
        border = "none"
        bgcolor = "#F9E7E7"
        color="#000"
        hover = "box-shadow: none"
        justify="right"
        href="/posts"
      />
    </BCont>
    </FormBox> 
    </Cont> 
            )
        }
      