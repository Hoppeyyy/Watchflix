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
    flex:1;
`

const Title = styled.h3`
    padding-left:20px;
    padding-right:20px;
`

const HeaderCont = styled.div`
    display:flex;
    align-items:center;
`

const Divider = ({
    text="Review"
}) => {

    return <Cont>

        <HeaderCont>
        <LeftLine></LeftLine>
        <Title>{text}</Title>
        <RightLine></RightLine>
        </HeaderCont>

    </Cont>
}

export default Divider

