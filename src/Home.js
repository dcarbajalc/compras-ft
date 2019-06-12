import React, {Component} from 'react';
//import UIkit from 'uikit';
import Menu from './components/Menu/Menu'
import Session from './components/Common/session/Session'
class Home extends Component {
    /*
    state = {
    };
*/  


    render () {
       
        return(
        <div>
            <Session  {...this.props}/> 
            <Menu  {...this.props}/>
            
            
            Esta es la pàgina de inicio
            
        </div>
        )}
};

export default Home;