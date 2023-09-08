import React,{useEffect} from "react";
import { useNavigate} from 'react-router-dom'
import styled from "styled-components";
import Loader from "./Loader"
// import Logo from "https://cdn.dribbble.com/users/1299339/screenshots/11116681/media/79bf1ac602445860e4a44bcd4bf80704.gif"
import { useState } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/ApiRoutes";
export default function SetAvatar() {
    const api = 'https://api.multiavatar.com/4650297/apikey=sOjYZrRbMl0z35'
    const navigate = useNavigate()
    const [avatars,setAvatars]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [selectedAvatar,setSelectedAvatar]=useState(undefined)
    const toastOptions={
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    useEffect(()=>{
        async function fetchData(){
        if(!localStorage.getItem("chat-app-user")){
            navigate('/login')
        }
    }
    fetchData();
    })
    const setProfilePicture = async ()=>{
        if(selectedAvatar===undefined){
            toast.error("Please select an avatar",toastOptions)
        }
        else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar]
            })
            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user))
                navigate('/')
            }
            else{
                toast.error("Error setting avatar, please try again",toastOptions)
            }
        }
    }
    useEffect( () => {
        async function fetchData() {
            const data = [];
            for (let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
          }
          fetchData();
        
      }, []);
  return (
    <>
    {
        isLoading ? <Container>
            <Loader/>
        </Container>:(

            <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar,index)=>{
                        return (
                            <div key={index} className={`avatar ${selectedAvatar===index ? "selected":" "}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>{
                                    setSelectedAvatar(index)
                                }}/>
                            </div>
                        )
                    })
                }
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
    )
}
        <ToastContainer/>
    </>
  )
}
const Container = styled.div`
.title-container{
    h1{
        color: white;
    }
  }
.avatars{
    display: flex;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img{
            height: 6rem;
        }
    }
    .selected{
        border: 0.4rem solid lightblue;
    }

}
.submit-btn{
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
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: black;
height: 100vh;
width: 100vw;
`