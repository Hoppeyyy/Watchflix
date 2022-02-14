
import styled from 'styled-components';
import React from 'react';
import SubButton from '../SubButton'

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
  margin-bottom: 10px;
  margin-left: 20px;
  font-weight:600;
`
const InputBox = styled.input`
  width:${props => props.iwidth};
  height: ${props => props.iheight}px; 
  border-radius: 10px;
  border: 3px solid #666666;
  font-size: 24px;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: ${props => props.imarginB}px;
  
`
const CmBox = styled.textarea`
  width:${props => props.mwidth};
  height: ${props => props.iheight}px; 
  border-radius: 10px;
  border: 3px solid c;
  font-size: 24px;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: ${props => props.imarginB}px;
`

const BCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 80px;
`


const CommentForm =({
  
          cwidth = "100%",  
          fwidth = "100%",
          fheight = "100%",
          fsize = 24,
          iwidth = "100%",
          iheight = 57,
          placeholder = "Type here...",
        
          title = "Nickname",
          type ="text",
        
        }) => {  
           
            return( 
            <Cont
            cwidth={cwidth}
          >
            <FormBox 
              fwidth={fwidth} 
              fheight={fheight}
            >
            <LabelFor 
              for={title} 
              fsize = {fsize}
            > {title}</LabelFor>
            <InputBox 
              type={type} 
              name={title} required 
              iwidth={iwidth} 
              iheight={iheight}
              placeholder={placeholder}
            />
            <CmBox
                type="text"
                width="350px"
                height="180px"
                placeholder='Leave your comment in here'/>
        <BCont>
        <SubButton 
        text = "Post"
        margintop = "0px"
        border = "none"
        bgcolor = "#5333ED"
        color="#fff"
        hover = "box-shadow: none"
        cwidth ="48%"
        width = "95%"
        minWidth="400"
        routeTo=""
        justify="flex-start"
      />
    </BCont>
    </FormBox> 
    </Cont> 
            )
        }

export default CommentForm; 