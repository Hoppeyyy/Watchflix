import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useState } from 'react'
import Sticker from '../Sticker'

const DropCont = styled.div`
  height:70vh;
  background:${({bg})=>bg || '#DDD'};
  width:100%;
  position:relative;
`

const StickerBoard = ({
  //props
  children=null,
  onDropItem=()=>{}
}) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept:['notes', 'sticker'], 
    drop:(item, monitor)=>{
      onDropItem(item);
    },
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

 
 //-----Image

	//store the data from the dropped files in this state
	const [src, setSrc] = useState(null);

	const [fname, setFName] = useState('');

	const [op, setOp] = useState(1);

	async function dropHandler(ev) {
		console.log("dropped", ev.dataTransfer.files, ev.dataTransfer.items);
		if (ev.dataTransfer.items) {

			var file = null
			// Use DataTransferItemList interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			  // If dropped items aren't files, reject them
			  if (ev.dataTransfer.items[i].kind === 'file') {
				var file = ev.dataTransfer.items[i].getAsFile();
				console.log('... file[' + i + '].name = ' + file.name);
			  }
			}
			
			var reader = new FileReader();
			if(file.type.includes('image')){
				reader.readAsDataURL(file);
			}

			if(file.type.includes('csv')){
				reader.readAsText(file);
			}

			reader.onload = ()=>{
				//console.log("result", reader.result);
				if(file.type.includes('image')){
					setSrc(reader.result);
				}

				if(file.type.includes('csv')){
					console.log(reader.result.split('\n').map(o=>o.split(',')));
				}
			}

			console.log(file);
			setFName(`You dropped file ${file.name}`);
			setOp(1);
		  } 
		ev.preventDefault();
	}


	function dragOverHandler(ev) {
		console.log("dragged over")
		setOp(0.5);

		ev.preventDefault();
	}

	return <DropCont
			ref={drop}
      bg={canDrop && isOver ? '#999' : '#DDD'}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragEnd={()=>setOp(1)}
		>
      {children}
			{src && <img height ={100} src={src}/> }
		</DropCont>
}

export default StickerBoard