import React, { useEffect } from "react";

let Inicio =(props) =>{
    
    useEffect( () =>
     JSON.parse(localStorage.getItem("USER")) ? props.history.push('/'):
     undefined  
       ,[props.history]);
    
    return(
      <div className="">
        <h1><span uk-icon="icon: cart"></span>Módulo de Compras<span uk-icon="icon: cart"></span></h1>
        <p> Bienvenido, por favor, selecciona una opciòn:</p>
        <p><a href ='/login'> Ingresar </a></p>
        <p><a href ='/register'> Regìstrate </a></p>
      </div>
    )
}
export default Inicio;