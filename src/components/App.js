import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Layout from './Layout';

import Home from '../Pages/Home/Home';
import Propiedades from '../Pages/Propiedades/Propiedades';
import Categorias from '../Pages/categorias/Categorias';
import Localidades from '../Pages/localidades/Localidades';
import Operaciones from '../Pages/operaciones/Operaciones';
import Nosotros from '../Pages/nosotros/Nosotros';

import NewPropiedad from '../Pages/Propiedades/New';
import EditPropiedad from '../Pages/Propiedades/Edit';

import NewCategoria from '../Pages/categorias/New';
import EditCategoria from '../Pages/categorias/Edit';

import NewLocalidad from '../Pages/localidades/New';
import EditLocalidad from '../Pages/localidades/Edit';

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
import BarriosState from '../context/barrios/barriosState';
import PartidosState from '../context/partidos/partidosState';
import LocalidadesState from '../context/localidades/localidadesState';
import OperacionesState from '../context/operaciones/operacionesState';
import CategoriasState from '../context/categorias/categoriasState';
import NosotrosState from '../context/nosotros/nosotrosState';
import ContactoState from '../context/contacto/contactoState';
import PropiedadesState from '../context/propiedades/propiedadesState';
import DatoTecnicoState from '../context/datoTecnico/datoState';
import ServiciosState from '../context/servicios/serviciosState';
import ImagenesState from '../context/imagenes/imagenesState';

const App = () => {
    return (
        <AuthState>
            <BarriosState>
                <PartidosState>
                    <LocalidadesState>
                        <OperacionesState>
                            <CategoriasState>
                                <NosotrosState>
                                    <ContactoState>  
                                        <PropiedadesState>
                                            <DatoTecnicoState>
                                                <ServiciosState>
                                                    <ImagenesState>
                                                        <BrowserRouter>
                                                            <Layout>
                                                                <Switch>
                                                                    <RutaPrivada exact path="/" component={Home}/>
                                                                    <Route exact path="/login" component={Login}/>
                                                                    <RutaPrivada exact path="/propiedades" component={Propiedades}/>
                                                                    <RutaPrivada exact path="/categorias" component={Categorias}/>
                                                                    <RutaPrivada exact path="/localidades" component={Localidades}/>
                                                                    <RutaPrivada exact path="/barrios" component={Barrios}/>
                                                                    <RutaPrivada exact path="/operaciones" component={Operaciones}/>
                                                                    <RutaPrivada exact path="/nosotros" component={Nosotros}/>
                                                                    <RutaPrivada exact path="/partidos" component={Partidos}/>
                                                                    <RutaPrivada exact path="/nosotros/modificar/:id" component={EditNosotros}/>
                                                                    <RutaPrivada exact path="/propiedad/add" component={NewPropiedad}/>
                                                                    <RutaPrivada exact path="/propiedad/edit/:id" component={EditPropiedad}/>
                                                                    <RutaPrivada exact path="/categoria/add" component={NewCategoria}/>
                                                                    <RutaPrivada exact path="/categoria/edit/:id" component={EditCategoria}/>
                                                                    <RutaPrivada exact path="/localidades/add" component={NewLocalidad}/>
                                                                    <RutaPrivada exact path="/localidades/edit/:id" component={EditLocalidad}/>
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
                                                    </ImagenesState>
                                                </ServiciosState>
                                            </DatoTecnicoState>
                                        </PropiedadesState>
                                    </ContactoState>
                                </NosotrosState>
                            </CategoriasState>
                        </OperacionesState>
                    </LocalidadesState>
                </PartidosState>
            </BarriosState>
        </AuthState>
    );  
}
 
export default App;