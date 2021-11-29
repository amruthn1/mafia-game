import React from "react";
import io from 'socket.io-client';
import ReactHtmlParser from 'react-html-parser';
import { Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Config from '../config.json';

let rid, uid, lrid, lobbyhost, socket;
let aplyrs = [];
let plyrids = [];
let shouldSwitch = false;
let leaveRoom = false;
let sstorage = window.sessionStorage;

class Lobby extends React.Component {
    state = {
        l: false,
    }
    constructor() {
        super()
        this.init();
        this.inLobby();
        let temp = aplyrs[0]
        lobbyhost = temp
        aplyrs[0] = '<div>' + temp + "<img src = 'https://www.pngkit.com/png/full/189-1893809_crown-clipart-simple-crown-simple-black-crown-png.png' height = '10px' width = '10px'/></div>"
    }
    componentWillMount(){
        this.inLobby = this.inLobby.bind(this)
    }
    render() {
        if (leaveRoom) {
            return (
                <div>
                    <Navigate to = "/"></Navigate>
                </div>
            )
        } else if (aplyrs.length > Config.maxplayers && !shouldSwitch) { //one killer, one sheriff, one medic, two townsperson
            return (
                <div className = "text-center">
                    <div>{rid}</div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <ul>
                        {aplyrs.map((msg) => <h3 className = "text-center" key = {aplyrs.indexOf(msg)}>{ReactHtmlParser(msg)}</h3>)}
                    </ul>
                    <br></br>
                    <br></br>
                    <br></br>
                    <StartButton/>
                </div>
            )
        } else if (shouldSwitch) {
            return (
                <div>
                    <Navigate to = {"/game?" + btoa(aplyrs.join('@') + "@" + rid)}></Navigate>
                </div>
            )
        } else {
            for (let i = 0; i < aplyrs.length; i++) {
                if (aplyrs[i].includes("%20")) {
                    aplyrs[i].replace('/%20/g', " ");
                }
            }
            return (
                <div>
                    {rid}
                    <br></br>
                    <br></br>
                    <br></br>
                    <ul>
                        {aplyrs.map((msg) => <h3 key = {aplyrs.indexOf(msg)}>{ReactHtmlParser(msg)}</h3>)}
                    </ul>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            )
        }
    }
    inLobby(){
        socket = io(Config["server-url"], {
            'sync disconnect on unload': true })
        socket.on('connect', () => {
            socket.send(["inLobby", rid, uid])
            socket.onAny((data) => {
                if (data[0] === "updatedLobby") {
                    aplyrs = data[1]
                    plyrids = data[2]
                    this.forceUpdate()
                } else if (data[0] === "disconnected") {
                    if (plyrids.includes(data[1])) {
                        if (aplyrs[plyrids.indexOf(data[1])] === sstorage.getItem('uid')){
                            console.log('host leaving end game')
                            socket.send(['endLobby', rid])
                            leaveRoom = true;
                            this.forceUpdate()
                        } else {                   
                            aplyrs.splice(plyrids.indexOf(data[1]), 1)
                            plyrids.splice(plyrids.indexOf(data[1]), 1)
                            if (lobbyhost === sstorage.getItem('uid')) {
                                socket.send(["sendRefresh", rid])
                            }
                            this.forceUpdate()
                        }
                    }
                } else if (data[0] === "movetoGame") {  
                    shouldSwitch = true
                    this.setState({l: true})
                } else if (data[0] === "leaveRoom") {
                    console.log('came')
                    leaveRoom = true;
                    this.forceUpdate()
                } else if (data[0].split("//")[1] !== uid) {
                    plyrids.push(data[1])
                    aplyrs.push("<div>" + data[0].split("//")[1] + "</div>")
                    socket.send(["updateLobby", aplyrs, rid, plyrids])
                    this.forceUpdate()
                } else if (data[0].split("//")[1] === uid) {
                    plyrids.push(data[1])
                }
            }) 
            socket.on('disconnect', () => {
                socket.send(['disconnect', uid, rid])
                console.log(['disconnect', uid, rid])
            })       
        })
    }
    init(){
        lrid = (window.location.search).split("&")[0]
        uid = (window.location.search).split("&")[1]
        rid = lrid.substring(1)
        aplyrs.push(uid)
    }
}

function StartButton(){
    let tempplyrs = []
    tempplyrs[0] = aplyrs[0]
    let t = tempplyrs[0].split("<div>")[1]
    tempplyrs[0] = t.split("<img")[0]
    if (sstorage.getItem('uid') === tempplyrs[0]){
        return <Button component = {Link} to = {"/game?" + btoa(aplyrs.join('@') + "@" + rid)}>Start!</Button> 
    } else {
        return <div></div>
    }
}

export default Lobby;