import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import {obtieneRoles} from '../../services/api';
import {obtieneUsuarios} from '../../services/api';
import Spinner from '../Common/spinner/spinner';


//import Spinner from '../Common/spinner/spinner';
import Session from '../Common/session/Session';

class Users extends Component {

    state = {
   users:[],
   roles:[],
   edit:[],
   onedit:false,

    };

    componentWillMount(){
        this.getUsers();
        this.getRoles();
        }
    
     getUsers =() =>{
        obtieneUsuarios()
        .then(users =>{
            this.setState({users: users})
        })
        .catch(err=>{
            console.log(err)
        })
     };

     getRoles =() =>{
        obtieneRoles()
        .then (roles =>{
          this.setState({roles:roles});
        })
        .catch(err =>{
          console.log(err)
        })
        }
     
        

    render(){
        console.log(this.state);
        let {users,roles}= this.state

        return (
            <div>
     { users.length===0 || roles.length === 0? <div> <Spinner dim ='500'/> </div>:
     <div>
                         <Session  {...this.props}/> 
                        <Menu  {...this.props}/>
            
            <table className='uk-table uk-table-hover uk-table-justify uk-table-striped'>
                <tbody>
                    <tr>
                        <th> # </th>
                        <th> Nombre</th>
                        <th>Correo</th>
                        <th> # rol</th>
                        <th> Rol </th>
                        <th>ST</th>
                        <th> Edicion</th>
                    </tr>

                {users.map((i,index)=>
                    <tr key = {i.num} >
                        <th className = 'uk-text-small'> {i.num}</th>
                        <th className = 'uk-text-small'> {i.nom}</th>
                        <th className = 'uk-text-small'> {i.email}</th>
                        <th className = 'uk-text-small'> {i.rol.num}</th>
                        <th className = 'uk-text-small'> {i.rol.nom}</th>
                        <th className = 'uk-text-small'>  {i.active?
                       <input type="checkbox"  className="uk-checkbox" checked readOnly/>:
                       <input type="checkbox"  className="uk-checkbox" disabled readOnly/>    
                        }</th>
                        <th className = 'uk-text-small'><button className='uk-button uk-button-default' value ={i.num}> 
                        <span uk-icon="pencil" >
                        </span>Editar </button></th>
                    </tr>
                )}
                </tbody>
            
            </table>
            
            </div>
    }
    </div>
        )
    }

}

export default Users;