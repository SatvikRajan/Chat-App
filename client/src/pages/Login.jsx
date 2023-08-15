import React, { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import styled from "styled-components";
import Logo from "../assests/messenger.png"
import { useState } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { loginRoute } from "../utils/ApiRoutes";
export default function Login() {
  const navigate = useNavigate();
    const [values,setValues]=useState({
        username: "",
        password: ""
    })
    const toastOptions={
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    useEffect(()=>{
      if(localStorage.getItem('chat-app-user'))
      {
        navigate('/')
      }
    },[navigate])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
          const {password,username} = values;
          const {data} = await axios.post(loginRoute,{
            username,password
          })
          if(data.status===false){
            toast.error(data.msg,toastOptions)
          }
          if(data.status===true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user))
          }
          navigate("/");
        }
      }
    const handleValidation = ()=>{
        const{password,username}=values;
        if(password===""){
          toast.error("Username and Password is required",toastOptions)
            return false;
        }
        else if(username.length===0){
            toast.error("Username and Password is required",toastOptions)
            return false;
        }
        return true;
      }
      const handleChange=(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
      }
  return (
    <div>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Messenger</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
            min="3"
            />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
                handleChange(e);
            }}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ?<Link to="/register">  Register</Link>
          </span>
        </form>
      </FormContainer>
    <ToastContainer/>
    </div>
  );
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
background-color: black;
justify-content: center;
gap: 1rem;
align-items: center;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 3rem; 
    }
    h1{
        color: white;
        text-transform: uppercase;
    }
}
form{
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #0c172076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        background-color: transparent;
        padding: 1rem;
        color: white;
        border-radius: 1.2rem;
        width: 100%;
        font-size: 1.2rem; 
        &:focus{
            border: 0.1rem solid #0c172076;
        }
    }
    button{
        background-color: transparent;  
        padding: 1rem 2rem;
        font-size: 1rem;
        color: white;
        cursor: pointer;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #182e3f76;
        }
    }
    span{
        color: white;
        text-transform: uppercase;
        a{
            color: white;
            text-transform: none;

        }
    }
}
`;