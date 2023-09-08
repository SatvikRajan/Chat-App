import React, { useState } from 'react'
import styled from 'styled-components'  
import EmojiPicker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import { Theme } from 'emoji-picker-react';
export default function ChatInput({handleSendMsg}) {
  const [showEmojiPicker,setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState("")
  const handleEmojiPickerHideShow = () =>{
    setShowEmojiPicker(!showEmojiPicker)
  }
  const sendChat = (e)=>{
    e.preventDefault()
    if(msg.length>0){
      handleSendMsg(msg)
      setMsg('')
    }
  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
          {
            showEmojiPicker && <EmojiPicker theme={Theme} onEmojiClick={(e)=> setMsg((prevMsg)=> prevMsg + e.emoji)}/>
          }
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder='type your message here' value={msg} onChange={(event)=>{setMsg(event.target.value)}}/>
        <button className='submit'>
          <IoMdSend/>
        </button>
      </form>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #2f2f35;
  padding: 0 1rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    justify-content: center;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        bottom: 60px;
        box-shadow: 0 2px 5px #827e94;
        /* .EmojiScrollWrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        } */
      }
    }
  }
  .input-container {
    width: 100%;
    height: 80%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      height: 100%;
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`