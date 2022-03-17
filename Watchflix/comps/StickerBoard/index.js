import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'

const DropCont = styled.div`
height:70vh;
background:${({bg})=>bg || '#AAD6DC'};
width:100%;
position:relative;
`
const Cont = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
`
const Top = styled.div`
width:100%;
height:20%;
display:flex;
flex-direction:row;
justify-content:space-between;
border-bottom:5px solid #FFFFFF;
`
const Text = styled.h3`
font-size: 36px;
display: flex;
align-items: center;
text-align:center;
justify-content:center;
color: #FFFFFF;
padding:6rem;

`
const Bot = styled.div`
width:100%;
height:80%;
display:flex;
flex-direction:row;
`
const Box = styled.div`
width:100%;
display:flex;
flex-direction:row;
border-right:5px solid #FFFFFF;
`
const StickerBoard = ({
  //props
  children=null,
  onDropItem=()=>{}
}) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept:['sticker'],
    drop:(item, monitor)=>{
      onDropItem(item);
    },
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

	return <DropCont
      ref={drop}
      bg = {canDrop && isOver ? '#538D95':'#AAD6DC'}
		>
        {children}
    <Cont>
    <Top>
      <Text>Ost</Text>
      <Text>Scene</Text>
      <Text>Cast</Text>
      <Text>Plot</Text>
    </Top>
    <Bot>
      <Box/>
      <Box/>
      <Box/>
      <Box style={{borderRight:'none'}}/>
    </Bot>
      </Cont>
		</DropCont>
}

export default StickerBoard