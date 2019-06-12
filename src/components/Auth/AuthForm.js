import React, { useState, useEffect} from "react";
import {obtieneUsuario} from '../../services/api';
import {registerUser} from '../../services/api';
import {validaMail} from '../../services/fn';
import {loginMail} from '../../services/api';
import {loginNum} from '../../services/api';


let AuthForm =(props) =>{

    useEffect( () =>
    JSON.parse(localStorage.getItem("USER")) ? props.history.push('/'):
    undefined  
      ,[props.history]);
  
    const type = props.match.path.slice(1);

    const [nom, setNom] = useState("");
    const [num, setNum] = useState("");

    const handleChangeNum = e => {
        e.preventDefault();
        const n = e.target.value;
        setNum(n);
        obtieneUsuario(n)
        .then(nom => {
            let {data} = nom;
             let j = data ? 
                data.nom: 'No existe el usuario'
            setNom(j);})};
   
    const [passw, setPassw] = useState('');

    const handleChangePass = e => {
        e.preventDefault();
        const n = e.target.value;
        obtieneUsuario(n);
        setPassw(n);       
    };
    
    const [mail, setMail] = useState('');

    const handleChangeMail = e => {
        e.preventDefault();
        const n = e.target.value;
        setMail(n);       
    };

    const [nombre, setNombre] = useState('');

    const handleChangeNom = e => {
        e.preventDefault();
        const n = e.target.value;
        setNombre(n);       
    };

    let usr = {
        nombre: nombre,
        email:mail,
        pass: passw
    };

    let log ={
        email:mail,
        pass:passw,
        num:num
    };


    const [msg, setMsg] = useState('');

    const handleRegister = e =>{
        e.preventDefault();
        registerUser(usr)
        .then(respuesta => {
            let {res ,message}= respuesta;
            document.getElementById('i').value = '';
            document.getElementById('j').value = '';
            document.getElementById('k').value = '';
            let mensaje = res?`${message} y eres el usuario ${res.num}`:message
            setMsg(mensaje)
        })
        .catch(error =>{ console.log(error)})
    };

    const handleLogMail =e=>{
        e.preventDefault(); 
        loginMail(log)
        .then (res =>{
            let {token,user} = res;
            localStorage.setItem("TOKEN", token);
            localStorage.setItem("USER", JSON.stringify(user));
            props.history.push('/')
        })
        .catch (err =>{
            setMsg(err.message)
        })
    };

    
    const handleLogNum =e=>{
       e.preventDefault(); 
        loginNum(log)
        .then (res =>{
            let {token,user} = res;
            localStorage.setItem("TOKEN", token);
            localStorage.setItem("USER", JSON.stringify(user));
            props.history.push('/inicio')
        })
        .catch(err => {
            setMsg(err.message)
        })
    };


    return (
        <div>
        <div className="uk-flex uk-flex-center">
        
  
        <div className="uk-width-1-2">
        <form className="uk-form-stacked">

            { type ==='register' &&
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="nom">{
                    type === 'login'?
                    'Número:':
                    'Nombre:'
                    }</label>
                <div className="uk-inline">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input 
                        onChange={type ==='login'? handleChangeNum: handleChangeNom}
                        className="uk-input" 
                        type='text'
                        name="num" 
                        id ='i'
                    />
                </div>
            </div>
            }

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="email">{
                    type === 'login'?
                    'Número:':
                    'Email:'
                    }</label>
                <div className="uk-inline">
                    <span className="uk-form-icon" uk-icon=
                    {type === 'login'?"icon: user": 'icon: mail'}
                    ></span>
                    <input 
                       
                        onChange={type ==='login'? handleChangeNum: handleChangeMail} 
                        className="uk-input" 
                        type={type === 'login' ? 'number':'email'} 
                        name="num"
                        required={true}
                        id ='j'
                    />
                </div>
            </div>
            { type === 'login' &&
            <div style={ nom === 'No existe el usuario' ?
            {color:'red'}:
             {color:'blue'}}>
            {nom}
            </div>
            }
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="password">Password:</label>
                <div className="uk-inline">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input 
                        onChange={handleChangePass} 
                        className="uk-input" 
                        type="password" 
                        name="password" 
                        id ='k'
                    />
                </div>
            </div>

            <div>
                <button className="uk-button uk-button-primary" 
                disabled = {type === 'login' && 
                            passw.length > 0 && nom !== 'No existe el usuario'
                            && nom.length > 0
                            
                            ? false: 
                
                            type === 'register' &&
                            validaMail(mail) === false && 
                            nombre.length > 0 && 
                            passw.length >0 ? false  :

                            type === 'mailogin' && validaMail(mail)=== false && 
                            passw.length >0? false: true
            
            }
                onClick ={type === 'register' ? handleRegister: type === 'login' ? handleLogNum: handleLogMail}
                >{type ==='register'?'Register':'Login'}</button>
            </div>
            <div id='mensaje' style ={msg === 'No se puede crear este usuario!!! el mail ya existe' || msg === 'Contraseña incorrecta' || msg ==='El usuario no existe'?{color:'red'}:{color:'green'}}>{msg}</div>
        </form>
    </div>
        
        </div>
        {type==='login'&& <div>
        <p>¿No te has registrado?, regístrate 
        <a href='/register'> Aquí</a></p>
        <p>No te acuerdas de tu Número?, ingresa 
        <a href = '/mailogin'> Aquí </a> 
        con tu E-mail</p></div>}

        {type==='mailogin'&& <div>
        <p>¿No te has registrado?, regístrate 
        <a href='/register'> Aquí</a></p>
        <p>Prefieres ingresar con tu Número?, ingresa 
        <a href = '/login'> Aquí </a></p>
        </div>}
        {type==='register'&& <div>
        <p>¿Ya tienes cuenta?, ingresa 
        <a href='/login'> Aquí</a></p></div>}
        </div>
    )

}
export default AuthForm;

