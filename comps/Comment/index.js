import styled from 'styled-components';
import ax from 'axios';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

const Cont = styled.div`
    display:flex;
`

const CommentCont = styled.div`
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

const Dot = styled.div`
    height:10px;
    width:10px;
    border-radius:50%;
    border:1px solid red;
`


export default function Comment({contacts}) {
    {contacts.map((contact) => {
        return (
            
    <Cont>
        <CommentCont>
            <TopCont>
                <Dot></Dot>
                <Username {... contact.name}/>
            
                {/* <Date>{date}</Date> */}
            </TopCont>

            <BotCont>
                <UserComment {... contact.comment}/> 
                  
            </BotCont>
        </CommentCont>

    </Cont>
    );}
    }
// const Comment = ({
//     // username="HooWoo",
//     // date="01/12/2022",
//     // comment="OMG, I cried while watching this movie too !",
//     border="1px solid red"
    
// }) => {