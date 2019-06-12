import React from 'react';

let Session = (props) =>{

    let datos = JSON.parse(localStorage.getItem("USER"))? 
    JSON.parse(localStorage.getItem("USER"))
    :  {num:'',nom:'',email:''};
    let {num, nom, email} = datos;

    const handleLogOut = e => {
        localStorage.clear('TOKEN');
        localStorage.clear('USER');
        props.history.push('/inicio');
    };

return(
    <div className="uk-flex">

    
    <div className="uk-card uk-card-default uk-card-body uk-card-small"><a href='/'><span uk-icon="icon: home"></span></a></div>
    <div className="uk-card uk-card-default uk-card-body uk-card-small uk-margin-left"><span uk-icon="icon: hashtag"></span> {num}</div>
    <div className="uk-card uk-card-default uk-card-body uk-card-small uk-margin-left"><span uk-icon="icon: mail"></span> {email}</div>
    <div className="uk-card uk-card-default uk-card-body uk-card-small uk-margin-left"><span uk-icon="icon: user"></span> {nom} </div>
    <div className="uk-card uk-card-default uk-card-body uk-card-small uk-margin-left"><button onClick = {handleLogOut}
    
    >
        <span uk-icon="icon: sign-out"></span>
        Salir</button></div>
  


    </div>
)

}

export default Session;