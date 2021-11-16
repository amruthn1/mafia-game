import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'

class HomePage extends React.Component {
  state = {
    createTextValue: '',
    joinTextValue: '',
    joinLobbyID: ''
  }
  constructor(props){
    super(props);
    this.render();
  }

  render(){
    return (
      <div>
        <h3>Home Page</h3>
        <Button component = {Link} to = {"/createlobby?uid=" + this.state.createTextValue} id = "createLobby">Create Lobby</Button>
          <div id = "createtextfield">
              <input id = "createtextfielda" value = {this.state.createTextValue} onChange = {this.updateCreateTextField}></input>
          </div>
        <br></br>
        <Button component = {Link} to = {"/joinlobby?uid=" + this.state.joinTextValue + "&" + this.state.joinLobbyID} id = "joinLobby">Join Lobby</Button>
          <div id = "jointextfield">
            <input id = "jointextfielda" value = {this.state.joinTextValue} onChange = {this.updateJoinTextField}></input>
          </div>
          <div id = "lobbytextfield">
            <input id = "lobbytextfielda" value = {this.state.joinLobbyID} onChange = {this.updateLobbyTextField}></input>
          </div>
      </div>
    )
  }
  updateJoinTextField = (text) => {
    this.setState({
      joinTextValue: text.target.value
    })  
  }
  updateLobbyTextField = (text) => {
    this.setState({
      joinLobbyID: text.target.value
    })  
  }
  updateCreateTextField = (text) => {
    this.setState({
      createTextValue: text.target.value
    })
  }
}

export default HomePage;