import Head from 'next/head';
import ax from 'axios';
import styled from 'styled-components';

const Cont = styled.div`
  width: ${props => props.conWidth};
  display: flex;
  flex-direction: row;
  justify-contents: flex-start;
  align-items: center;
`

const PostCont = styled.div`
  width: ${props => props.picConWidth};
  height: ${props => props.picConHeight};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`

const Post = styled.img`
  width: 100%; height: 100%;
  src: ${props => props.src};
  object-fit: ${props => props.fit}
`

const Detail = ({
  conWidth = "100%",
  picConWidth = "424px",
  picConHeight = "596px",
  src = "./images/img_alive.png",
  fit = "contain",
  alt = "Alive poster"


}) => {

  return (
    <Cont
      width = {conWidth}
    >
      <PostCont 
        picConWidth = {picConWidth}
        picConHeight = {picConHeight}
      >
        <Post 
          src = {src}
          fit = {fit} 
          alt = {alt}       
        />
      </PostCont>



    </Cont>
  )
}

export default Detail;
