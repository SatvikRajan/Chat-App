import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import styled from "styled-components";
import Logo from "../assests/messenger.png"
import { useState } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from "../utils/ApiRoutes";
export default function Register() {
  const navigate = useNavigate();
    const [values,setValues]=useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const toastOptions={
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
          const {password,username,email} = values;
          const {data} = await axios.post(registerRoute,{
            username,email,password
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
        const{password,confirmPassword,username,email}=values;
        if(password!==confirmPassword){
            toast.error("password and confirm password should be same.",{
               toastOptions
            });
            return false;
        }
        else if(username.length<3){
            toast.error("Username should be greater than 3 charactors",toastOptions)
            return false;
        }
        else if(password.length<8){
            toast.error("Password should be equal or greater than 8 characters",toastOptions)
            return false;
        }
        else if(email===""){
            toast.error("Email should not be empty",toastOptions)
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
            />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
                handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => {
                handleChange(e);
            }}
            />
          <button type="submit">Create User</button>
          <span>
            Already have an account ?<Link to="/login"> Login</Link>
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
