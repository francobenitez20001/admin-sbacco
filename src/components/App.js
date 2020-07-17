import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
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

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/propiedades" component={Productos}/>
                    <Route exact path="/categorias" component={Categorias}/>
                    <Route exact path="/ubicaciones" component={Ubicaciones}/>
                    <Route exact path="/operaciones" component={Operaciones}/>
                    <Route exact path="/nosotros" component={Nosotros}/>
                    <Route exact path="/partidos" component={Partidos}/>
                    <Route exact path="/nosotros/modificar/:id" component={EditNosotros}/>
                    <Route exact path="/propiedad/add" component={NewPropiedad}/>
                    <Route exact path="/propiedad/edit/:id" component={EditPropiedad}/>
                    <Route exact path="/categoria/add" component={NewCategoria}/>
                    <Route exact path="/categoria/edit/:id" component={EditCategoria}/>
                    <Route exact path="/ubicacion/add" component={NewUbicacion}/>
                    <Route exact path="/ubicacion/edit/:id" component={EditUbicacion}/>
                    <Route exact path="/operacion/add" component={NewOperacion}/>
                    <Route exact path="/operacion/edit/:id" component={EditOperacion}/>
                    <Route exact path="/partido/add" component={NewPartido}/>
                    <Route exact path="/partido/edit/:id" component={EditPartido}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );  
}
 
export default App;