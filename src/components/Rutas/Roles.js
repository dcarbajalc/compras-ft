import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import {obtieneRoles} from '../../services/api';
import Spinner from '../Common/spinner/spinner';
import {updateRol} from '../../services/api';
import {deleteRol} from '../../services/api';
import {createRol} from '../../services/api';
import Session from '../Common/session/Session';

class Roles extends Component {
    state = {
      
        roles:[],
        showSpinner: true,
        edit: [],
        showAdd: true,
        nuevoreg: false,
        onedit: false
    };
  
componentWillMount(){
this.getRoles();

}
getRoles =() =>{
obtieneRoles()
.then (roles =>{
  roles.err ? this.props.history.push('/'):
  this.setState({roles:roles,showSpinner:false});
})
.catch(err =>{
  this.props.history.push('/inicio')
})
}

editReg = (e)=>{
e.preventDefault();
let showAdd = false;
const {roles} = this.state;
let i = e.target.value;
let edit = roles.find( rol => rol.num === Number(i));
let onedit = true;
this.setState({edit, showAdd, onedit})
};

handleChange = e => {
  e.preventDefault();
  let {edit} = this.state;
  let field = e.target.name;
  let change = e.target.value;
  edit[field] = change;
  //console.log('edit dentro de la funcion',edit)
  this.setState({edit});
}

saveEdit = e =>{
 
  let {edit} = this.state;
  updateRol(edit)
  .then (
    dat => {
     
      edit = []
      let showAdd = true;
      let onedit = false;
      this.setState({edit, showAdd, onedit})
    })
  .catch(err=>{
    console.log('dio este error : ', err)
  })
}

cancelEdit = e =>{
  e.preventDefault();
  let showAdd = true;

  let edit = [];

  this.setState({edit, showAdd, onedit:false, nuevoreg:false}
    //,()=>{console.log('cccc',this.state.edit)}
  );
 this.getRoles();
};

deleteReg = e=>{
  let {roles} = this.state;
  let i = e.target.value;
  const rolE = roles.find( rol => rol.num === Number(i));
  let _id = rolE._id;
  deleteRol(_id)
  .then(data=>{
    let {roles} = this.state
    roles.filter(function( obj ) {
      return obj._id !== _id;
  });
 this.getRoles();
  })
  .catch(err=>{
    console.log('dio este error : ', err)
  })
}


addReg = e =>{
  e.preventDefault();
  let edit = [];
  let nuevoreg = true;
  let onedit = true;
  let showAdd = false;
  this.setState({edit,nuevoreg,onedit,showAdd});
}

saveNew = e =>{
  e.preventDefault();
  let {edit} = this.state
  let nuevoreg = false;
  let onedit = false;
  let showAdd = true;
  createRol({nom:edit.nom})
  .then(creado=>{
    creado &&
    this.setState({nuevoreg,onedit,showAdd})
    this.getRoles();
  })
  .catch(err=>{
    console.log('este fue el error: ', err)
  })

}


    render () {
      let {showSpinner, showAdd, edit, nuevoreg, onedit} = this.state;
      const{roles} = this.state;
    //  console.log(this.state)
        return(
<div>

{showSpinner || roles === undefined?           
<Spinner dim ='500'/>:
        <div>
          <Session  {...this.props}/> 
          <Menu  {...this.props}/>
          <table 
    className='uk-table uk-table-hover uk-table-justify uk-table-striped'>
    <tbody>
    <tr>
    <th className='uk-text-center' >Número</th>
    <th>Nombre</th>
    <th>Edición</th>
    </tr>
    {
      roles.map((i,index)=>
      <tr key = {index}>
      <td className='uk-text-center'>{i.num}</td>
      <td className='uk-text-left'> { edit.num === i.num?
      <input type='text' defaultValue = {i.nom} 
      className = 'uk-input' name ='nom' onChange={this.handleChange}></input>:
      i.nom
      }
      </td>
      <td className='uk-text-left'>
        { edit.num === i.num? 
        <button className="uk-button uk-button-primary"
        onClick={this.saveEdit} 
        ><span uk-icon="refresh" >
          </span>Guardar</button>
        :
        
        <button className="uk-button uk-button-default" 
        onClick={ this.editReg }
        value = {i.num}
        disabled = {onedit || i.num === undefined ?true:false}
        ><span uk-icon="pencil" >
          </span>Editar</button>

          }
        {edit.num === i.num && 
          <button className="uk-button uk-button-danger"
          onClick={this.cancelEdit}
          value = {i.num}
          ><span uk-icon="ban" >
          </span>Cancelar</button>  
          }
        {i.borrable && edit.num !== i.num && <button className="uk-button uk-button-danger" 
         disabled = {onedit?true:false}
         value = {i.num}
          onClick = {this.deleteReg}
        > <span uk-icon="trash"></span>Eliminar</button>}
        </td>
      </tr>
      )
      
    }

{nuevoreg && <tr> 

<td> --- </td>
<td><input type ='text' className='uk-input' onChange={this.handleChange} name='nom'></input></td>
<td className='uk-text-left'> 
<button className="uk-button uk-button-primary" 
disabled ={edit.nom && edit.nom.length>0?false:true}
onClick = {this.saveNew}> <span uk-icon="push"></span> Guardar</button>
<button className="uk-button uk-button-danger" onClick = {this.cancelEdit}> <span uk-icon="close"></span>Cancelar </button>

</td>
</tr>}
</tbody>
    </table>

    {showAdd && <button className="uk-button uk-button-primary" onClick={this.addReg}> <span uk-icon="plus"></span>Nuevo</button>}
            
        </div>
}
</div>
        )}
};

export default Roles;