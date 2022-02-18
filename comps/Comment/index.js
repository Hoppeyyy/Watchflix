import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../CommentForm';
import { v4 as uuidv4 } from "uuid";

const Cont = styled.div`
    display:flex;
`

const CommentCont = styled.li`
    width:500px;
    height:100px;
`

const TopCont = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`

const BotCont = styled.div`

`

const Username = styled.h5`
    padding-right:10px;
    padding-left:10px;
`

const Date = styled.div`

`

const UserComment = styled.p`

`

const UserComments = styled.ul`

`

const Dot = styled.div`
    height:10px;
    width:10px;
    border-radius:50%;
    border:${props=>props.border}
`

const PostBtn = styled.button`
    width:100px;
    height:30px;
`

const CommentBox = styled.input`
    width:100px;
    height:50px;
`

const Comment = ({
    username="HooWoo",
    date="01/12/2022",
    comment="OMG, I cried while watching this movie too !",
    border="1px solid red"
    
}) => {

    const [items, setItems] = useState([])

    const createItems = () => {
        setItems(oldItems => [...oldItems, {
            id:1,
            title:"new item",
            itemId: uuidv4()
        }])
    }

    const [value, setValue] = useState('');

    const saveValue = e =>{
        setValue(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
    };


    return <Cont>
        <CommentCont>
            <TopCont>
                <Dot border={border}></Dot>
                <Username>{username}</Username>
                <Date>{date}</Date>
            </TopCont>

            <BotCont>
                <UserComment>{comment}</UserComment>
            </BotCont>
        </CommentCont>



        {/* <CommentForm></CommentForm> */}
        
    </Cont>
}

export default Comment