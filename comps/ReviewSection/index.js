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

import NewCommentForm from "../NewCommentForm";

import { bkColor, nameColor, hovBkDColor, divcolor, basicColor } from "@/utils/variables";
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
  max-width: 130px;
  border-radius: 10px;
  border: none;
  flex: 1;
  height: 20px;
`;

const RightLine = styled.hr`
  margin: 0px;
  max-width: 950px;
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

const UserComments = styled.div``;

const CmmtCont = styled.div`
  width: 100%; 
  padding: 2rem;
  margin-bottom: 
`;

//----------------------New Comment Form comps----------------------
const NameCont = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameText = styled.label`
  color: ${props => props.color};
  font-size: 2em;
  margin-right: 2rem;

`;

const NameInput = styled.input`
  min-width: 345px;
  height: 45px;
  border-radius: 10px;
  border-style: solid;
  border-weight: 1px;
  border-color: ${props => props.borderColor};
`;

const FormCont = styled.form`
  width: 100%;
  padding: 1rem;
`

const CommentBox = styled.input`
  width: 70%;
  height: 100px;
`;

const CommentCont = styled.div``;

const RevTxt = styled.p`
  width: 100%;
  line-height: 1.5em;
  color: ${props => props.revTxt}
`

const SubmitBtn = styled.button`
  min-width: 250px;
  height: 70px;
  border-radius: 20px;
  border: none;
  font-size: 1.5em;
  padding: 1rem 4rem;
  border-radius: 35px;
  border: none;
  background: ${(props) => props.bgcolor};
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
  cursor: pointer;
  
  :hover {
    background: ${(props) => props.hovpopbg};
    color: #ffffff;
    transform: scale(0.95);
    transition-duration: 0.3s;
  }
`;

const ButtonCont = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px;
  padding-right: 50px;
`;

//--------------------------------------------------------

const ReviewSection = ({ text = "Reviews" }) => {
  const { theme, setTheme } = useTheme();

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
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const [userNickname, setUserNickname] = useState("");

  //Nickname input
  // const handleChangeName = (e) => {
  //     e.preventDefault()

  //     setUserNickname(e.target.value)
  //     console.log(userNickname)
  // }

  //Comment box input

  //-------------Function for comment---------------------
  const handleChange = (e) => {
    e.preventDefault();

    setUserInput(e.target.value);
    console.log(userInput);

    //  setUserNickname(e.target.value)
    //  console.log(userNickname)
  };
  //2 functions and pass in 1 object

  //----------Function for name--------------------
  const handleChangeName = (e) => {
    e.preventDefault();

    setUserNickname(e.target.value);
    console.log(userNickname);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodoList([
      // userInput,
      // userNickname,
      { comment: userInput, nickname: userNickname, date: todayDate },
      ...todoList,
    ]);

    // setNameList([
    //     userNickname,
    //     ...todoList
    // ])
  };
  //-------------------------End Comment-------------------------------------

  //-------------------------Test Date-----------------------------------
  //  const [dateTime, setDateTime] = useState(new Date());

  //  useEffect(() => {
  //      const id = setInterval(() => setDateTime(new Date()), 1000);
  //      return () => {
  //          clearInterval(id);
  //      }
  //  }, []);

  const [todayDate, setTodayDate] = useState();
  const today = new Date().toDateString();

  //----------------------------------------------------------------------

  return (
    <Cont>
      {/* <h4>{`${dateTime.toLocaleDateString()}`}</h4> */}
      <HeaderCont>
        <LeftLine bkcolor = {divcolor[theme]}></LeftLine>
        <Title color = {basicColor[theme]}>{text}</Title>

        {/* <Dropdown onClick={onClick}>&#x25BC;</Dropdown> */}

        <Dropdown>
          {open ? (
            <Image
              src={down_arrow}
              width={33}
              height={18}
              onClick={onClick}
            ></Image>
          ) : (
            <Image
              src={up_arrow}
              width={33}
              height={18}
              onClick={onClick}
            ></Image>
          )}
        </Dropdown>
        <RightLine bkcolor={divcolor[theme]}></RightLine>
      </HeaderCont>

      <UserComments>
        {open ? (
          <CmmtCont>
            {todoList.length >= 1
              ? todoList.map((o, i) => {
                  return (
                    <CommentCont key={i}>
                      <Comment
                        comment={o.comment}
                        username={o.nickname}
                        date={o.date}
                      ></Comment>
                    </CommentCont>
                  );
                })
              : <RevTxt revTxt = {basicColor[theme]}>Enter a comment below</RevTxt>}
          </CmmtCont>
        ) : null}
      </UserComments>

      <Divider text="Add Review"></Divider>

      <FormCont>
        <NameCont>
          <NameText color ={nameColor[theme]}>Nickname</NameText>
          <NameInput borderColor = {}type="textarea" onChange={handleChangeName}></NameInput>
        </NameCont>

        <CommentBox
          type="textarea"
          onChange={handleChange}
          placeholder="Share your opinion about this movie!"
        ></CommentBox>

        <ButtonCont>
          <SubmitBtn 
            bgcolor={bkColor[theme]}
            hovpopbg={hovBkDColor[theme]}
            onClick={handleSubmit}
          >Post</SubmitBtn>
        </ButtonCont>
      </FormCont>
    </Cont>
  );
};

export default ReviewSection;
