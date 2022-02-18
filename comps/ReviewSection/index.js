import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Comment from '../Comment';
import Image from 'next/image';
import down_arrow from '../../public/images/down-arrow.png';
import up_arrow from '../../public/images/up-arrow.png';
const arrows = {down_arrow, up_arrow}
import CommentForm from '../CommentForm';
import { v4 as uuidv4 } from "uuid";
import NewCommentForm from '../NewCommentForm';
import Divider from '../Divider';


const Cont = styled.div`
    display:flex;
    flex-direction:column;
`

const LeftLine = styled.hr`
    margin:0px; 
    background-color:red;
    border-radius:5px;
    border:none;
    width:100px;
    height:20px;
`

const RightLine = styled.hr`
    margin:0px;
    background-color:red;
    border-radius:5px;
    border:none;
    width:800px;
    height:20px;
    flex:1;
`

const Title = styled.h3`
    padding-left:20px;
    padding-right:20px;
`

const Dropdown = styled.div`
    font-size:30px;
    padding-right:20px;
    cursor:pointer;
`

const HeaderCont = styled.div`
    display:flex;
    align-items:center;

`

const UserComments = styled.ul`

`
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
        <Dropdown >
        <Image src={down_arrow} width={44} height={22} onClick={onClick}>
            
        </Image>
        </Dropdown>
        <RightLine></RightLine>
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
}

export default ReviewSection