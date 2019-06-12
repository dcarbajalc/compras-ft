import React, {Component} from 'react';
import {obtieneMenus} from '../../services/api';
import './MenuNavBar.css';
import Spinner from'../Common/spinner/spinner'



class Menu extends  Component {
    ruta = this.props.match.path;
    user = JSON.parse(localStorage.getItem("USER"));
    num  = JSON.parse(localStorage.getItem("USER"))?JSON.parse(localStorage.getItem("USER")).num:0;
    state = { 
        menus:[],
        showSpinner:true
    };

    componentWillMount(){
        this.getMenus();
        if (!JSON.parse(localStorage.getItem("USER"))) {
            this.props.history.push('/inicio')
          }
    };



    getMenus=()=>{
        let token = localStorage.getItem('TOKEN')
        obtieneMenus(token)
        .then (menus =>{
            this.setState({menus,showSpinner:false});
            this.setState({ruta:this.ruta});
        })
        .catch(err =>{
            console.log('este es un error, te voy a desconectar!!!', err);
            localStorage.clear('TOKEN');
            localStorage.clear('USER');
            this.props.history.push('/inicio');
        })
    }
    componentDidUpdate () {

        if (this.state.ruta !== undefined && this.state.ruta !== '/'){
            let validador = this.state.menus.find( menu => menu.evento === this.state.ruta);
           if (validador ===  undefined || validador.length === 0){
                this.props.history.push('/')
           }
        }       
        
    }

    render(){
        let data = this.state.menus;
        let {showSpinner} = this.state
        return(
            showSpinner ?
                    <Spinner dim ='50'/>:
                    <nav id = 'menu'>
                <label htmlFor="tm" id="toggle-menu">
                Menu
                <span className="drop-icon">▾</span></label>
                <input type="checkbox" id="tm"/>
        <ul className="main-menu clearfix headerz">
        {data.filter(objeto => objeto.rama === 1).map((i,index)=>
        <li key ={index}> 
        {
        <a href = {i.evento? i.evento: '#'}>
        {i.nom}
        <span className="drop-icon"></span>
        <label title="Toggle Drop-down" className="drop-icon" htmlFor={`sm${i.num}`}>▾</label>
        </a> 
        }
        <input type="checkbox" id={`sm${i.num}`}/>
        <ul className ='sub-menu'>
        {
        data.filter(oobjeto => oobjeto.rama === 2 && oobjeto.padre === i.num )
        .map((ii,iindex)=>
        <li key={iindex}> 
        {
        <a href = {ii.evento? ii.evento: '#'}>
        {ii.nom}
        { ii.ventana === false &&
        <span className="drop-icon"></span>}
        { ii.ventana === false &&
        <label title="Toggle Drop-down" className="drop-icon" htmlFor={`sm${ii.num}`}>▾</label>}
        </a>
        }
        {ii.ventana === false &&
        <input type="checkbox" id={`sm${ii.num}`}/>
        }
        <ul className = 'sub-menu'>
        {data.filter(objeto => objeto.rama === 3 && objeto.padre === ii.num)
        .map((iii,iiindex)=>
        <li key = {iiindex}>{
        <a href ={iii.evento}>
        {iii.nom}
        </a>}</li>
        )
        }
        </ul>
        </li>
        )}
        </ul>
        </li>

        )}
        </ul>
                </nav>

                )
            }
};

export default Menu;