import Head from 'next/head';
import styled from 'styled-components';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import ax from 'axios';


const Cont = styled.div`
width:30%;
min-width:300px;
height:60%;
display:flex;
flex-direction:column;
padding:2.5rem;
align-items:center;
background:#FFFFFF;
`
const Title = styled.h1`
`
const Form = styled.form`
display:flex;
flex-direction:column;
margin:2rem;
`
const Name = styled.input`
border:none;
width: 200px;
height: 40px;
background: #E0E0E0;
border-radius: 5px;
margin:1rem;
padding:1rem;
`
const Email = styled.input`
border:none;
width: 200px;
height: 40px;
background: #E0E0E0;
border-radius: 5px;
margin:1rem;
padding:1rem;
`
const Password = styled.input`
border:none;
width: 200px;
height: 40px;
background: #E0E0E0;
border-radius: 5px;
margin:1rem;
padding:1rem;
`

const Submit = styled.input`
border:none;
width: 200px;
height: 55px;
background: #B08584;
border-radius: 5px;
margin:1rem;
color:#FFFFFF;
`

const Auth = ({
value="Sign Up",

}) => {
     const router = useRouter();
     const [input, setInput] =useState({
        name:'',
        email:'',
        password:'',
    })
    const handleChange=(event)=>{
        //console.log(event.target)
        const {name, value} = event.target;
        setInput(prevInput =>{
            return{
                ...prevInput,
                [name]:value
            }
        })
        //console.log(input)
    }
 
    const handlePost = async (event) =>{
        event.preventDefault();
       
        const user = {
            name:input.name,
            email:input.email,
            password:input.password
        }

        try{
          let res = await ax.post('http://localhost:3001/login', user)
        //console.log(res)
        //console.log(res.config.data)
        //let userData = JSON.parse(res.config.data)
        //console.log(userData)
        //console.log(userData.name)
         localStorage.setItem('token', res.data)
         localStorage.setItem('user', res.config.data)
         console.log("log in suceed")
        // router.push("/")

         // check if token exists/ user is signed in
         if(localStorage.getItem('token')){
           // allow some operstion for logen in user
           router.push("/")
         }
        }catch(e){
          alert(" something went wrong")
        }

    }

    return <Cont>
        <Title>Log In</Title>
        <Form>
            <Name placeholder="Name" onChange={handleChange} name="name" value={input.name} autoComplete="off"/>
            <Email placeholder="Email" onChange={handleChange} name="email" value={input.email} autoComplete="off"/>
            <Password placeholder="Password" onChange={handleChange} name="password" value={input.password} autoComplete="off"/>
            <Submit type="submit" value={value}  onClick={handlePost}/>
        </Form>
    </Cont>
}

export default Auth;