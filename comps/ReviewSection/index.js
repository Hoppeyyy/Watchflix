import styled from "styled-components";
import ax from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme, useResult } from "@/utils/provider";
import Comment from "../Comment";
import Image from "next/image";
import down_arrow from "@/public/images/down-arrow.png";
import up_arrow from "@/public/images/up-arrow.png";
import CommentForm from "../CommentForm";
import { v4 as uuidv4 } from "uuid";

import NewCommentForm from '../NewCommentForm';

import { bkColor, hovColor, popuptext, divcolor } from "@/utils/variables";
import Divider from "../Divider";

const arrows = { down_arrow, up_arrow };


const Cont = styled.div`
  display: flex;
  flex-direction: column;
  aligh-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const LeftLine = styled.hr`
  margin: 0px;
  background-color: ${(props) => props.bkcolor};
  border-radius: 10px;
  border: none;
  flex: 1;
  height: 20px;
`;

const RightLine = styled.hr`
  margin: 0px;
  background-color: ${(props) => props.bkcolor};
  border-radius: 10px;
  border: none;
  flex: 6;
  height: 20px;
`;

const HeaderCont = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.h3`
  padding-left: 20px;
  padding-right: 20px;
  flex: 1.5;
  color: ${(props) => props.color};
`;

const Dropdown = styled.div`
  font-size: 30px;
  padding-right: 20px;
  cursor: pointer;
`;

const UserComments = styled.div``

//----------------------New Comment Form comps----------------------
const NameCont = styled.div`
    padding:10px;
`

const NameText = styled.label`
    color:#E50914;
    font-size:32px;
    
`

const NameInput = styled.input`
    width:345px;
    height:45px;
    border-radius:10px;
    
`

const CommentBox = styled.input`
    width:70%;
    height:100px;
`

const CommentCont = styled.div`
    
`

const SubmitBtn = styled.button`
    width:250px;
    height:70px;
    background-color:#f9E7E7;
    border-radius:20px;
    border:none;
    font-size:36px;
`

const ButtonCont = styled.div`
    display:flex;
    justify-content:end;
    padding:10px;
    padding-right:50px;
`


//--------------------------------------------------------

const ReviewSection = ({
    text="Reviews",
    
}) => {
    const {theme, setTheme} = useTheme();

    const [open, setOpen] = useState(true);
    const onClick = () => setOpen(!open);

    // const [selected, setSelected] = useState(arrows.down_arrow)
    // const onArrowClick = () => setSelected(!selected)

    // const [items, setItems] = useState([])

    // const createItems = () => {
    //     setItems(oldItems => [...oldItems, {
    //         id:1,
    //         title:"new item",
    //         itemId: uuidv4()
    //     }])
    // }

    // const [value, setValue] = useState('');

    // const saveValue = e =>{
    //     setValue(e.target.value)
    // }

    // const onSubmit = (e) => {
    //     e.preventDefault();
        
    // };

    //--------------------------New Comment Form Functions-----------------

       //---------------------User Input COMMENT--------------------------
       const [userInput, setUserInput] = useState('');
       const [todoList, setTodoList] = useState([])
   
       const [userNickname, setUserNickname] = useState('');
       const [nameList, setNameList] = useState([])
   
       //Nickname input
       // const handleChangeName = (e) => {
       //     e.preventDefault()
   
       //     setUserNickname(e.target.value)
       //     console.log(userNickname)
       // }
   
       //Comment box input
       const handleChange = (e) => {
           e.preventDefault()
   
           setUserInput(e.target.value)
           console.log(userInput)
   
           setUserNickname(e.target.value)
           console.log(userNickname)
       }
   
       const handleSubmit = (e) => {
           e.preventDefault()
   
           setTodoList([
               userInput,
               // userNickname,
               ...todoList
           ])
   
           setNameList([
               userNickname,
               ...todoList
           ])
       }
       //-------------------------End Comment-------------------------------------
   

    return <Cont>

        <HeaderCont>
        <LeftLine></LeftLine>
        <Title>{text}</Title>

        {/* <Dropdown onClick={onClick}>&#x25BC;</Dropdown> */}

        <Dropdown>
          {open ? (
            <Image
              src={down_arrow}
              width={44}
              height={22}
              onClick={onClick}
            ></Image>
          ) : (
            <Image
              src={up_arrow}
              width={44}
              height={22}
              onClick={onClick}
            ></Image>
          )}
        </Dropdown>
        <RightLine bkcolor={divcolor[theme]}></RightLine>
      </HeaderCont>


        <UserComments>
        
        {open ? 
        
        <div>
        {
            todoList.length >=1 ? todoList.map((o, i) => {
                return <CommentCont key={i}>
                <Comment 
                comment={o} 
                username={o.userNickname}
                >
                </Comment>
                </CommentCont>
            })
            : 'Enter a comment item'
        }

    </div>
        
        
        : null}

        </UserComments>

    <Divider text="Add Review"></Divider>
        <form>
            <NameCont>
            <NameText>Nickname</NameText>
            <NameInput type="textarea" onChange={handleChange}></NameInput>
            </NameCont>

            <CommentBox type="textarea" onChange={handleChange} 
            placeholder="Share your opinion about this movie!">
            </CommentBox>

            <ButtonCont>
                <SubmitBtn onClick={handleSubmit}>Post</SubmitBtn> 
            </ButtonCont>
            
        </form>
        {/* <ul>
            {
                todoList.length >=1 ? todoList.map((o, i) => {
                    return <CommentCont key={i}>
                    <Comment 
                    comment={o} 
                    username={o.userNickname}
                    >
                    </Comment>
                    </CommentCont>
                })
                : 'Enter a comment item'
            }

        </ul> */}
    

    </Cont>

};

export default ReviewSection;