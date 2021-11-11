import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loader from './assets/loader.gif'

const HomePage = lazy(() => import('./HomePage'))
const CreateLobby = lazy(() => import('./CreateLobby'))
const JoinLobby = lazy(() => import('./JoinLobby'))
const Lobby = lazy(() => import('./lobby/Lobby'))

ReactDOM.render(
  <Suspense fallback = {<div><img src = {Loader}></img></div>}>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage/>} />
        <Route path = "createlobby" element = {<CreateLobby/>} />
        <Route path = "joinlobby" element = {<JoinLobby/>} />
        <Route path = "lobby" element = {<Lobby/>} />
      </Routes>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);

