import React from 'react';
import gif from '../common/assets/loader.gif'

class Loader extends React.Component {
    render(){
        return (
            <div className = "object-center"><img className = "object-center" alt = "Loading..." src = {gif}></img></div>        
        )
    }
}

export default Loader;