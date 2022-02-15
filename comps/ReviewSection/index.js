import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Comment from '../Comment';

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
   
    
`

const Title = styled.h3`
    padding-left:20px;
    padding-right:20px;
`

const Dropdown = styled.div`
    font-size:30px;
    padding-right:20px;
    cursor:pointer
`

const HeaderCont = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`

const ReviewSection = ({
    text="Review"
}) => {

    const [open, setOpen] = useState(true);
    const onClick = () => setOpen(!open);

    return <Cont>

        <HeaderCont>
        <LeftLine></LeftLine>
        <Title>{text}</Title>
        <Dropdown onClick={onClick}>&#x25BC;</Dropdown>
        <RightLine></RightLine>
        </HeaderCont>

        {open ? <Comment/> : null}

    </Cont>
}

export default ReviewSection

