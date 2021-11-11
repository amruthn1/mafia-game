import React from "react";
import io from 'socket.io-client';
import ReactHtmlParser from 'react-html-parser'
import { Button } from "@mui/material";

let rid;
let uid;
let lrid;
let aplyrs = [];
let socket;

class Lobby extends React.Component {
    constructor() {
        super()
        this.init();
        this.inLobby();
        let temp = aplyrs[0]
        aplyrs[0] = '<div>' + temp + "<img src = 'https://www.pngkit.com/png/full/189-1893809_crown-clipart-simple-crown-simple-black-crown-png.png' height = '10px' width = '10px'/></div>"
    }
    render() {
        if (aplyrs.length > 1) {
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
                    <Button>Start!</Button>
                </div>
            )
        } else {
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
        socket = io('ws://localhost:8000', {
            'sync disconnect on unload': true })
        socket.on('connect', () => {
            console.log("connected")
            socket.send(["inLobby", rid, uid])
            socket.onAny((data) => {
                console.log(data)
                if (data[0] === "updatedLobby") {
                    aplyrs = data[1]
                    this.forceUpdate()
                } else if (data[0] === "disconnected") {
                    console.log("splicing")
                    aplyrs.splice(aplyrs.indexOf(data[1]), 1)
                    socket.send(["updateLobby", aplyrs, rid])
                    this.forceUpdate()
                } else if (data[0].split("//")[1] !== uid) {
                    aplyrs.push("<div>" + data[0].split("//")[1] + "</div>")
                    socket.send(["updateLobby", aplyrs, rid])
                    this.forceUpdate()
                }
            }) 
            socket.on('disconnect', () => {
                socket.send(['disconnect', uid, rid])
            })       
        })
    }
    init(){
        lrid = (window.location.search).split("&")[0]
        uid = (window.location.search).split("&")[1]
        rid = lrid.substring(1)
        aplyrs.push(uid)
        console.log(rid, uid)
    }
}
export default Lobby;