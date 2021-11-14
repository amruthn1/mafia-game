import React from "react";
import io from 'socket.io-client';
import { Navigate } from 'react-router-dom'
import Config from '../config.json'
let uid;
let socket;
let gotRID = false;
let ndata = '';
let sstorage;
class CreateLobby extends React.Component {
    constructor(){
        super()
        uid = ((window.location.search).split("=")[1])
        sstorage = window.sessionStorage;
        sstorage.setItem('uid', uid)
        console.log("createlobby", uid)
        this.createLobby = this.createLobby.bind(this)
        this.state = {
            reload: false
        }
        this.createLobby();
    }
    render(){
        if (!gotRID) {
            return (
                <div>
                    <h3>Loading.....</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <Navigate to = {"/lobby?" + ndata + "&" + uid}></Navigate>
                    </div>
                </div>
            )
        } 
    }
    createLobby(){
        socket = io(Config["server-url"]) 
        socket.on("connect", () => {
            socket.send(["createLobby", socket.id])
            socket.onAny(data => {
                if (data !== null) {
                    console.log(data) //lobbyid
                    socket.emit('end')
                    gotRID = true;
                    ndata = data;
                    this.setState({reload: true});
                }
            })
        })
    }
}
export default CreateLobby;