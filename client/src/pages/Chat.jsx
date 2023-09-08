import React ,{useEffect,useState} from 'react'
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import Contacts from '../components/Contacts'
import {allUsersRoute} from '../utils/ApiRoutes'
import axios from 'axios'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
export default function Chat() {
  const navigate = useNavigate();
  const [currentUser,setCurrentUser] = useState(undefined)
  const [currentChat,setCurrentChat]= useState(undefined)
  const [contacts,setContacts]=useState([])
  useEffect(()=>{
    async function fetchData(){
      if(!localStorage.getItem("chat-app-user")){
        navigate('/login')
    }
    else{
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
    }
    fetchData();
  },[navigate])
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    }
  
    fetchData();
  }, [currentUser, navigate]);
  const handleChatChange = (chat) =>{
    setCurrentChat(chat)
  }
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}
          /> 
              {currentChat === undefined?
              <Welcome currentUser={currentUser}/>:
              <ChatContainer currentChat = {currentChat} currentUser={currentUser}/>  
              }        
        </div>
      </Container>
    </>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  gap: 1rem;
  .container{
    height: 85vh;
    width: 85vw;
    background-color: #1e1e27;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns: 35% 65%      
    }
  }
`