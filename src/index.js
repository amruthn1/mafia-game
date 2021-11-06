import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import CreateLobby from './CreateLobby';
import JoinLobby from './JoinLobby';
import Lobby from './lobby/Lobby'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage/>} />
        <Route path = "createlobby" element = {<CreateLobby/>} />
        <Route path = "joinlobby" element = {<JoinLobby/>} />
        <Route path = "lobby" element = {<Lobby/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

