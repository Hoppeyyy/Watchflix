import React, {useState} from "react";
import styled from "styled-components";



const PostComment = ({
    subtitle="+ New To-Do"
}) => {
    const AddNew = () =>{
        const ul = document.getElementById("list"); //Gets the whole list ul
        const li = document.createElement("li"); //Create new list item
        li.appendChild(document.createTextNode("Subtitle")); //Appends the li item to ul
        ul.appendChild(li);

        
    const [items, setItems] = useState([])

    const createItems = () => {
        setItems(oldItems => [...oldItems, {
            id:1,
            title:"subtitle"
        }])

    return (
        <div>Add stuff here <div/>
            <ul id="list">

                {items.map(item => (
                    <li key={item.id}>{"subtitle"}</li>
                ))}
            </ul>
            <ListItem onClick={AddNew}>{subtitle}</ListItem>
            <ListItem onClick={createItems}>{subtitle}</ListItem>
        </div>
    );
};
    }
}

export default PostComment; 
