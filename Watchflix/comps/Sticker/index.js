import React, {useState,useEffect} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

const Drag = styled.div`
display:flex;
z-index:3;
${({position,left,top})=> (position ===`fixed` || position === `absolute`)&&`
left:${left}px;
top:${top}px;
position:${position};
`}
`
const Img = styled.img`
width:60px;
height:60px;
margin:1rem;
`

const Sticker = ({
  //props
  id,
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

// each time position changes remember the position
useEffect(()=>{
  if(type ==='boardsticker')
  {
  onUpdateSticker({
    pos,
    img,
    src,
    id,
    })
  }
},[pos,img])

const [{ isDragging,coords }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
    type,
    item: {src,type,img,pos},
    end:(item,monitor)=>{
      if(type ==='boardsticker'){
        setPos({
          left:monitor.getClientOffset().x,
          top:monitor.getClientOffset().y,
          position:'absolute'
        })
      }
    },
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      coords: monitor.getClientOffset(),
    })
  }))

  //console.log(isDragging);
const sty ={
  left:type === 'boardsticker'? pos.left : null,
  top:type === 'boardsticker'? pos.top : null,
  position:type === 'boardsticker'? pos.position : null,

}
if(coords && isDragging){
  sty.left = coords.x;
  sty.top = coords.y;
  sty.position = "fixed";
}
	return <Drag  ref={dragPreview} {...sty} >
   {type === 'boardsticker' && isDragging === false ? <Img src={img} ref={drag} />:<Img src={src} ref={drag} onClick={(e)=>setImg(e.target.src)}/>}
  </Drag>

}

export default Sticker;