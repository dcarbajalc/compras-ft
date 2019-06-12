import React, { useState} from 'react';
import Menu from '../Menu/Menu';
import Spinner from '../Common/spinner/spinner';
import Session from '../Common/session/Session';
import {cambiaMiPass,cambiaOtroPass, obtieneUsuario} from '../../services/api';

let Password = (props)=>{
const [nom, setNom] = useState("");
const [num, setNum] = useState("");
const [pass, setPass] = useState("");
const [pass2, setPass2] = useState("");
const [msg, setMsg] = useState('');
const [spin, setSpin]= useState(false);

const handleChangeNum = e =>{
    e.preventDefault();
    setPass('')
    setPass2('');
    const n = e.target.value;
    setNum(n)
    obtieneUsuario(n)
    .then(nom => {
        let {data} = nom;
         let j = data ? 
            data.nom: 'No existe el usuario'
        setNom(j);})};


const handleChangePass = e =>{
e.preventDefault();
const v = e.target.value;
setPass(v);
};

const handleChangePass2 = e =>{
    e.preventDefault();
    const v = e.target.value;
    setPass2(v);
    };

const handleSaveMiPass = e=>{
setSpin(true);
cambiaMiPass(info)
.then(data =>{
    let {msg} = data;
    setMsg(msg)
    setPass('');
    setPass2('');
    setSpin(false);
})
.catch(err=>{
    let {msg} = err;
    setMsg(msg);
})
};

const handleSaveOtroPass = e=>{
  setSpin(true);
    cambiaOtroPass(info)
    .then(data =>{
        setSpin(false);
        let {msg} = data;
        setMsg(msg)
        setPass('');
        setPass2('');
    })
    .catch(err=>{
        let {msg} = err;
        setMsg(msg);
    })
    };


let ruta = props.match.path
let yo = JSON.parse(localStorage.getItem("USER"))? JSON.parse(localStorage.getItem("USER")).num:0;
let minom = JSON.parse(localStorage.getItem("USER"))? JSON.parse(localStorage.getItem("USER")).nom:0;


let info = {user: num, pass: pass}


return (
    <div>

<Session {...props}/>
<Menu {...props}/>
Usuario:
{ruta === '/mipass'&&
<div><input type='number' defaultValue = {yo} className='uk-input uk-form-width-xsmall' disabled /> {minom} </div>
}

{ruta ==='/passus' && 
<div><input type='number' className='uk-input uk-form-width-xsmall' onChange = {handleChangeNum}/> {nom} </div>
}


{ ruta ==='/mipass'&&
<div>
Ingresa Nuevo Password:<input className = 'uk-input' type = 'password' onChange ={handleChangePass}/>
Confirma Nuevo Password:<input type = 'password' className ={pass === pass2 && pass2.length > 0? 'uk-input uk-form-success': 
pass2.length ===0 ? 'uk-input' : 'uk-input uk-form-danger'} onChange ={handleChangePass2}/>
</div>
}

{ ruta !=='/mipass'&& nom !== ''&& nom !=='No existe el usuario' &&
<div>
Ingresa Nuevo Password: <input className = 'uk-input' type = 'password' onChange ={handleChangePass}/>
Confirma Nuevo Password:<input type = 'password' className ={pass === pass2 && pass2.length > 0? 'uk-input uk-form-success': 
pass2.length ===0 ? 'uk-input' : 'uk-input uk-form-danger'} onChange ={handleChangePass2}/>
</div>
}



{ pass === pass2 && pass.length > 0 && <button className ='uk-button-primary uk-button' 
onClick={ruta ==='/mipass'?handleSaveMiPass:handleSaveOtroPass}> Guardar </button>}
{spin && <Spinner dim ='100'/>}

{msg}



    </div>
)
}

export default Password