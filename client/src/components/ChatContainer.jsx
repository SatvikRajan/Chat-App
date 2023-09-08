import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
// import Messages from './Messages'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/ApiRoutes'
export default function ChatContainer({currentChat,currentUser}) {
  // const [messages, setMessages] = useState([])
  // useEffect(()=>{
  //   async function fetchData() {
  //     const response = await axios.post(getAllMessagesRoute,{
  //       from: currentUser._id,
  //       to: currentChat._id
  //     })
  //     setMessages(response.data)
  //   }
  //   fetchData();
  // },[currentChat])
  const handleSendMsg = async (msg) =>{
    await axios.post(sendMessageRoute,{
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })
  }
  const messages = [
    {
      fromSelf: true,
      message: 'Hello, how are you?'
    },
    {
      fromSelf: false,
      message: 'I am doing well, thank you for asking!'
    }
  ]
  return (
        <Container>
        <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout/>
      </div>
      <div className="chat-messages">
        {
          messages.map((message)=>{
            return (
                <div className={`message ${message.fromSelf ? "sended": "recieve"}`}>
                  <div className='content'>
                    <p>
                      {message.message}
                    </p>
                  </div>
                </div>
            )
          })
        }
      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </Container> 
  )
}

const Container =styled.div`
display: grid;
grid-template-rows: 7% 83% 10%;
padding-top: 0.7rem;
.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }

`