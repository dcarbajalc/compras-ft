import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import {obtieneRoles} from '../../services/api';
import Spinner from '../Common/spinner/spinner';
import Session from '../Common/session/Session';
import {getMenuRol} from '../../services/api';
import {escribeMenuRol} from '../../services/api';

class Roles extends Component {
    state = {
        roles:[],
        menusxRol:[],
        showSpinner: true,
        showSave: false,
        rol:'',
        nomRol:'',
        showSearch: false,
        showVista:false,
        vista:[]
    };
componentWillMount(){
this.getRoles();
}
getRoles =() =>{
obtieneRoles()
.then (roles =>{
  this.setState({roles,showSpinner:false});
})
.catch(err =>{
  this.props.history.push('/inicio')
})
}

handleChangeRol = e => {
  e.preventDefault();
  let i = (e.target.value);
  let {roles,nomRol,showSearch} = this.state
  nomRol = roles.find( rol => rol.num === Number(i))?
  roles.find( rol => rol.num === Number(i)).nom:'El rol no Existe'
  let rol = roles.find( rol => rol.num === Number(i))?
  roles.find( rol => rol.num === Number(i))._id:'';
  showSearch = nomRol === 'El rol no Existe'?false:true
  this.setState({nomRol, showSearch, menusxRol:[], rol, showVista:false, vista:[], showSave:false})
}

buscaRelacion =e=>{
    e.preventDefault();
    let {rol, roles, menusxRol,vista} = this.state;
    let showSpinner = true;
    getMenuRol({perfil:rol})
    .then(info=>{
menusxRol = info;
for (let i=0;i<menusxRol.length;i++)
{
    vista.push({rol:menusxRol[i].rol._id, 
        menu: menusxRol[i].menu._id, 
        active:menusxRol[i].active,
        nomrol:menusxRol[i].rol.nom,
        nommenu:menusxRol[i].menu.nom,
        padre:menusxRol[i].menu.padre,
        orden:menusxRol[i].menu.orden,
        ventana : menusxRol[i].menu.ventana,
        rama: menusxRol[i].menu.rama,
        nummenu: menusxRol[i].menu.num
    })
}

vista.sort((a, b) => (a.orden > b.orden) ? 1 : -1)
showSpinner = false;
this.setState({roles, showSpinner, rol, menusxRol, showSearch:false, vista, showVista:true})
    }
    )
    .catch(err=>{
        console.log('este fue un error al obtener menus por rol :',err)
    })
    this.setState({rol,roles,showSpinner})
}

handleCheck =e =>{

    let ventana = Number(e.target.value);
    let {vista} = this.state;

const mueve = function(){
    for (let i= 0 ; i<vista.length ; i++)
    {

        if (vista[i].nummenu === ventana && vista[i].active === true){ return vista[i].active = false}
        if (vista[i].nummenu === ventana && vista[i].active === false){ return vista[i].active = true}
    }
};
mueve();
this.setState({showSave:true, vista})
    
}

handleSave = e =>{
    let {vista, rol} = this.state
    escribeMenuRol({perfil:rol, datos: vista})
    .then (resolvio=>{
        console.log('si terminó: ',resolvio)
    
    })
    .catch(err=>{
        console.log(err)
    })
    this.setState({rol:'',nomRol:'',showVista:false,showSave:false, vista:[]});

}

    render () {
      let {nomRol,vista,showVista,showSearch, showSpinner, showSave} = this.state;
        return(
<div>

{showSpinner?           
<Spinner dim ='500'/>:
        <div>
            <div>
          <Session {...this.props}/> 
          <Menu {...this.props}/>
</div>
<div>Escoge un perfil: <input type='number' 
className='uk-input uk-form-width-medium uk-form-small' onChange = {this.handleChangeRol} name='rol'
/> <div>{nomRol}</div>

</div>
{showSearch && 
    <div><button className='uk-button uk-button-primary' onClick={this.buscaRelacion}>Busca </button></div>

}

{showVista&&<div> 
    <ul className='uk-align-left'>
{
vista.filter(linea =>linea.rama === 1).map((i,index)=>
<li className='uk-text-left' key = {index}>{i.nommenu} 

{i.active === true? 
    <input type="checkbox" value = {i.nummenu} className="uk-checkbox" defaultChecked onClick={this.handleCheck}/>
:
<input type="checkbox"  className="uk-checkbox" value = {i.nummenu}  onClick={this.handleCheck}/>
}

<ul>
    {vista.filter(llinea => llinea.rama === 2 && llinea.padre === i.nummenu).map((ii,iindex)=>
    <li  key={iindex}>{ii.nommenu}
    {ii.active === true? 
    <input type="checkbox"  className="uk-checkbox" defaultChecked value = {ii.nummenu} onClick={this.handleCheck}/>
:
<input type="checkbox"  className="uk-checkbox" value = {ii.nummenu} onClick={this.handleCheck}/>
}

<ul>
    {vista.filter(lllinea => lllinea.rama === 3 && lllinea.padre === ii.nummenu).map((iii,iiindex)=>
    
    <li key = {iiindex}>

        {iii.nommenu}
        {iii.active === true? 
    <input type="checkbox"  className="uk-checkbox" defaultChecked value = {iii.nummenu} onClick={this.handleCheck}/>
:
<input type="checkbox"  className="uk-checkbox"  value = {iii.nummenu} onClick={this.handleCheck}/>
}

    </li>
    )
    }
</ul>

    </li>

    )}
</ul>


</li>
)
}
</ul>
</div>}

{showSave && <div> 

<button className='uk-button uk-button-primary' onClick={this.handleSave} >Guarda los Cambios </button>;

</div>}
        </div>
}
</div>
        )}
};

export default Roles;