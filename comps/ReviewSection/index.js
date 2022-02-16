import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Comment from '../Comment';
import Image from 'next/image';
import down_arrow from '../../public/images/down-arrow.png';
import up_arrow from '../../public/images/up-arrow.png';
import CommentForm from '../CommentForm';
import { v4 as uuidv4 } from "uuid";

const arrows = {down_arrow, up_arrow}

const Cont = styled.div`
    display:flex;
    flex-direction: column;
    aligh-items: center;
    justify-content: center;
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

const PostBtn = styled.button`
    width:100px;
    height:30px;
`

const CommentBox = styled.input`
    width:100px;
    height:50px;
`


const ReviewSection = ({
    text="Reviews",
    down=down_arrow,
    up=up_arrow,
    pk="https://placekitten.com/200/300",
    mypk="https://placekitten.com/100/100"
    
}) => {

    const [open, setOpen] = useState(true);
    const onClick = () => setOpen(!open);

    // const [selected, setSelected] = useState(arrows.down_arrow)
    // const onArrowClick = () => setSelected(!selected)

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

        <form onSubmit={onSubmit}>

    
        <UserComments>

        

        {items.map(item => (
            <Comment comment={value} key={item.id}>{"subtitle"}</Comment>
        ))}
        
        {open ? <Comment/>: null}

        </UserComments>

        {/* <CommentBox value={value} 
        onChange={e=>{setValue(e.currentTarget.value)}} 
        > */}
        
        <CommentBox value={value} 
        onChange={saveValue}
        >
        
        </CommentBox>
        <PostBtn type="submit" onClick={createItems}>Post</PostBtn>
        

        </form>

        {/* <CommentForm></CommentForm> */}

    </Cont>
}

export default ReviewSection