import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../CommentForm';
import { v4 as uuidv4 } from "uuid";
import ReviewSection from '../ReviewSection';
import Comment from '../Comment';

const Cont = styled.div`
    display:flex;
    flex-direction:column;
`




const NewCommentForm = ({
    username="HooWoo",
    date="01/12/2022",
    comment="OMG, I cried while watching this movie too !",
    border="1px solid red"
    
}) => {

    //---------------------User Input-------------------------

    const [userInput, setUserInput] = useState('');
    const [todoList, setTodoList] = useState([])

    const handleChange = (e) => {
        e.preventDefault()

        setUserInput(e.target.value)
        console.log(userInput)


    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setTodoList([
            userInput,
            ...todoList
        ])
    }

    //-------------------------------------------------------------

    return <Cont>
        
        <Comment></Comment>

        <h1>comment form</h1>
        <form>
            
            <label>Nickname</label>
            <input type="textarea" onChange={handleChange}></input>

            <input type="textarea"></input>

            <button onClick={handleSubmit}>Submit</button>
        </form>
        <ul>
            {
                todoList.length >=1 ? todoList.map((todo, idx) => {
                    return <Comment key={idx} comment={todo}></Comment>
                })
                : 'Enter a comment item'
            }
        </ul>
        
    </Cont>
}

export default NewCommentForm

