import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'

class HomePage extends React.Component {
  state = {
    createTextValue: '',
    joinTextValue: '',
  }
  constructor(props){
    super(props);
    this.render();
  }

  render(){
    return (
      <div>
        <h3>Home Page</h3>
        <Button component = {Link} to = {"/createlobby?uid=" + this.state.createTextValue} onClick = {this.createLobby} id = "createLobby">Create Lobby</Button>
          <div id = "createtextfieldpopunder">
              <input id = "createtextfield" value = {this.state.createTextValue} onChange = {this.updateCreateTextField}></input>
          </div>
        <br></br>
        <Button component = {Link} to = {"/joinlobby?uid=" + this.state.joinTextValue} onClick = {this.joinLobby} id = "joinLobby">Join Lobby</Button>
          <div id = "jointextfieldpopunder">
            <input id = "jointextfield" value = {this.state.joinTextValue} onChange = {this.updateJoinTextField}></input>
          </div>
      </div>
    )
  }

  createLobby = () => {
    if (this.state.createTextValue === "" || this.state.createTextValue == null) {
      console.log("retry")
    } else {
    }
  }
  joinLobby = () => {
    if (this.state.joinTextValue === "" || this.state.joinTextValue == null) {
      console.log("retry")
    } else {
    }
  }
  updateJoinTextField = (text) => {
    this.setState({
      joinTextValue: text.target.value
    })  
  }
  updateCreateTextField = (text) => {
    this.setState({
      createTextValue: text.target.value
    })
  }
}

export default HomePage;
