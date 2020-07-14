import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Layout from './Layout';

import Home from '../Pages/Home/Home';
import Productos from '../Pages/Productos/Productos';
import Categorias from '../Pages/categorias/Categorias';
import Ubicaciones from '../Pages/ubicaciones/Ubicaciones';
import Operaciones from '../Pages/operaciones/Operaciones';

import NewPropiedad from '../Pages/Productos/New';
import EditPropiedad from '../Pages/Productos/Edit';

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/productos" component={Productos}/>
                    <Route exact path="/categorias" component={Categorias}/>
                    <Route exact path="/ubicaciones" component={Ubicaciones}/>
                    <Route exact path="/operaciones" component={Operaciones}/>
                    <Route exact path="/quienes-somos" component={Home}/>
                    <Route exact path="/propiedad/add" component={NewPropiedad}/>
                    <Route exact path="/propiedad/edit/:id" component={EditPropiedad}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );  
}
 
export default App;