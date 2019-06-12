import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import Home from './Home';
import Inicio from './Inicio';
import Roles from './components/Rutas/Roles';
import MenuxRol from './components/Rutas/MenuxRol'
//import ABCUsuarios from './components/Usuarios/ABC';

const Router = () => (
    <Switch> 
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={AuthForm} />
    <Route exact path="/mailogin" component={AuthForm} />
    <Route exact path="/register" component={AuthForm} />
    <Route exact path="/inicio" component={Inicio}/>
    <Route exact path="/roles" component={Roles}/>
    <Route exact path='/menurol' component = {MenuxRol}/>
    </Switch>
)

export default Router;