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
      <div className = "text-center">
        <br/>
        <h3 className = "text-5xl">Home Page</h3>
        <br/>
        <Button component = {Link} to = {"/createlobby?uid=" + this.state.createTextValue} id = "createLobby">Create Lobby</Button>
          <div id = "createtextfield">
              <input className = "outline-black focus:outline-none focus:ring focus:border-blue-300" id = "createtextfielda" value = {this.state.createTextValue} onChange = {this.updateCreateTextField}></input>
          </div>
        <br></br>
        <Button component = {Link} to = {"/joinlobby?uid=" + this.state.joinTextValue + "&" + this.state.joinLobbyID} id = "joinLobby">Join Lobby</Button>
          <div id = "jointextfield">
            <input className = "outline-black focus:outline-none focus:ring focus:border-blue-300" id = "jointextfielda" value = {this.state.joinTextValue} onChange = {this.updateJoinTextField}></input>
          </div>
          <br/>
          <div id = "lobbytextfield">
            <input className = "outline-black focus:outline-none focus:ring focus:border-blue-300" id = "lobbytextfielda" value = {this.state.joinLobbyID} onChange = {this.updateLobbyTextField}></input>
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