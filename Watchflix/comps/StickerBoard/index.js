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
  height:10%;
  display:flex;
  flex-wrap: no-wrap;
  flex-direction:row;
  justify-content:  space-between;
  border-bottom:5px solid #FFFFFF;
  padding: 2rem 8rem;
  transition: all 0.3s;

  @media only screen and (min-width: 651px) and (max-width: 1200px) {
    padding: 2rem 5rem;
  }

  @media only screen and (min-width: 361px) and (max-width: 650px) {
    padding: 2rem;
  }

  @media only screen and (max-width: 360px) {
    padding: 1rem;
  }
`
const Drop = styled.div`
width:100%;
height:10%;
`
const Text = styled.h3`
  font-size: 36px;
  display: flex;
  align-items: center;
  text-align:center;
  justify-content:center;
  color: #FFFFFF;

@media only screen and (min-width: 361px) and (max-width: 560px) {
  font-size: 2em;
}

@media only screen and (max-width: 360px) {
  font-size: 1.5em;
}
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
    <Cont>
    <Drop>
      {children}
    </Drop>
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