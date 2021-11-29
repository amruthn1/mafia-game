import React from "react";
import io from 'socket.io-client';
import { Navigate } from 'react-router-dom'
import Config from '../config.json'
import Loader from '../common/Loader'

let uid;
let socket;
let gotRID = false;
let ndata = '';
let sstorage;
class CreateLobby extends React.Component {
    constructor(){
        super()
        uid = ((window.location.search).split("=")[1])
        if (uid === "" || uid === undefined || uid === null) {
            alert("Please enter a valid UID!")  
        } else {
            sstorage = window.sessionStorage;
            sstorage.setItem('uid', uid)
            this.state = {
                reload: false
            }
            this.createLobby();
        }
    }
    componentWillMount(){
        this.createLobby = this.createLobby.bind(this)
    }
    render(){
        if (!gotRID) {
            return (
                <div>
                    <Loader/>
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