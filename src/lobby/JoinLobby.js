import React from "react";
import { Navigate } from 'react-router-dom'

let uid, temp, RID, sstorage;
let reload = false;

class JoinLobby extends React.Component {
    constructor(){
        super()
        temp = ((window.location.search).split("=")[1])
        uid = temp.split("&")[0]
        if (uid === "" || uid === undefined || uid === null) {
            alert("Please enter a valid UID!")  
        } else {
            RID = temp.split("&")[1]
            sstorage = window.sessionStorage;
            sstorage.setItem('uid', uid)
            console.log("joinlobby", uid)
            this.joinLobby = this.joinLobby.bind(this)
            this.state = {
                garb: false
            }
            this.joinLobby();
        }
    }
    render(){
        if (!reload) {
            return (
                <div>
                    <h3>Loading.....</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <Navigate to = {"/lobby?" + RID + "&" + uid}></Navigate>
                    </div>
                </div>
            )
        } 
    }
    componentDidMount(){
        
    }
    joinLobby(){
        reload = true;
        this.setState({garb: true})
    }
}
export default JoinLobby;