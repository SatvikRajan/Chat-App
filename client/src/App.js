import React from 'react'
import Regitser from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './components/SetAvatar'
import { inject } from '@vercel/analytics';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
inject();
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={<Regitser />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/setAvatar"
          element={<SetAvatar />}
        />
        <Route
          path="/"
          element={<Chat />}
        />
      </Routes>
    </BrowserRouter>
  )
}
