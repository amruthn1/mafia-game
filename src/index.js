import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css';
import { Helmet } from 'react-helmet'
import nightwind from 'nightwind/helper';
import Loader from './common/Loader'

const HomePage = lazy(() => import('./HomePage'))
const CreateLobby = lazy(() => import('./lobby/CreateLobby'))
const JoinLobby = lazy(() => import('./lobby/JoinLobby'))
const Lobby = lazy(() => import('./lobby/Lobby'))
const Game = lazy(() => import('./game/Game'))

ReactDOM.render(
  <Suspense fallback = {<Loader></Loader>}>
    <Helmet>
      <script>{nightwind.init()}</script>
    </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<HomePage/>} />
          <Route path = "/createlobby" element = {<CreateLobby/>} />
          <Route path = "/joinlobby" element = {<JoinLobby/>} />
          <Route path = "/lobby" element = {<Lobby/>} />
          <Route path = "/game" element = {<Game/>} />
        </Routes>
        </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);

