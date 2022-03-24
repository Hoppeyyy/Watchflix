import React, {useState,useEffect} from 'react';
import styled from 'styled-components';

const Img = styled.img`
width:200px;
z-index:999;
`

const AnimImage = ({
  //props
  type='sticker',
  children=null,
  stickerpos=null,
  src,
  dragImg=null,
  
  onUpdateSticker=()=>{},
}) => {
  const [pos,setPos] = useState(stickerpos || {
    left:0,
    top:0,
    position:'relative',
  });
//const [content, setContent] = useState(notecontent || `Add Sticker ${children || ''}`)
const [img, setImg] = useState(dragImg ||`${children||src}`)

	return <div>
   <Img src={img}/>
  </div>
}

export default AnimImage;