import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Layout from './Layout';

import Home from '../Pages/Home/Home';
import Productos from '../Pages/Productos/Productos';
import Categorias from '../Pages/categorias/Categorias';
import Ubicaciones from '../Pages/ubicaciones/Ubicaciones';
import Operaciones from '../Pages/operaciones/Operaciones';
import Nosotros from '../Pages/nosotros/Nosotros';

import NewPropiedad from '../Pages/Productos/New';
import EditPropiedad from '../Pages/Productos/Edit';

import NewCategoria from '../Pages/categorias/New';
import EditCategoria from '../Pages/categorias/Edit';

import NewUbicacion from '../Pages/ubicaciones/New';
import EditUbicacion from '../Pages/ubicaciones/Edit';

import NewOperacion from '../Pages/operaciones/New';
import EditOperacion from '../Pages/operaciones/Edit';

import EditNosotros from '../Pages/nosotros/Edit';

import Partidos from '../Pages/Partidos/Partidos';
import NewPartido from '../Pages/Partidos/New';
import EditPartido from '../Pages/Partidos/Edit';

import Contacto from '../Pages/Contacto/Contacto';
import EditContacto from '../Pages/Contacto/Edit';

import Login from '../Pages/Login/Login';
import Barrios from '../Pages/Barrios/Barrios';
import EditBarrio from '../Pages/Barrios/Edit';
import NewBarrio from '../Pages/Barrios/New';

import AuthState from "../context/auth/authState";
import RutaPrivada from './RutaPrivada';

const App = () => {
    return (
        <AuthState>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <RutaPrivada exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <RutaPrivada exact path="/propiedades" component={Productos}/>
                        <RutaPrivada exact path="/categorias" component={Categorias}/>
                        <RutaPrivada exact path="/ubicaciones" component={Ubicaciones}/>
                        <RutaPrivada exact path="/barrios" component={Barrios}/>
                        <RutaPrivada exact path="/operaciones" component={Operaciones}/>
                        <RutaPrivada exact path="/nosotros" component={Nosotros}/>
                        <RutaPrivada exact path="/partidos" component={Partidos}/>
                        <RutaPrivada exact path="/nosotros/modificar/:id" component={EditNosotros}/>
                        <RutaPrivada exact path="/propiedad/add" component={NewPropiedad}/>
                        <RutaPrivada exact path="/propiedad/edit/:id" component={EditPropiedad}/>
                        <RutaPrivada exact path="/categoria/add" component={NewCategoria}/>
                        <RutaPrivada exact path="/categoria/edit/:id" component={EditCategoria}/>
                        <RutaPrivada exact path="/ubicacion/add" component={NewUbicacion}/>
                        <RutaPrivada exact path="/ubicacion/edit/:id" component={EditUbicacion}/>
                        <RutaPrivada exact path="/barrios/add" component={NewBarrio}/>
                        <RutaPrivada exact path="/barrios/edit/:id" component={EditBarrio}/>
                        <RutaPrivada exact path="/operacion/add" component={NewOperacion}/>
                        <RutaPrivada exact path="/operacion/edit/:id" component={EditOperacion}/>
                        <RutaPrivada exact path="/partido/add" component={NewPartido}/>
                        <RutaPrivada exact path="/partido/edit/:id" component={EditPartido}/>
                        <RutaPrivada exact path="/contacto" component={Contacto}/>
                        <RutaPrivada exact path="/contacto/edit/:id" component={EditContacto}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </AuthState>
    );  
}
 
export default App;