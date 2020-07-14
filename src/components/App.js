import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Layout from './Layout';

import Home from '../Pages/Home/Home';
import Productos from '../Pages/Productos/Productos';

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/productos" component={Productos}/>
                    <Route exact path="/categorias" component={Home}/>
                    <Route exact path="/ubicaciones" component={Home}/>
                    <Route exact path="/operaciones" component={Home}/>
                    <Route exact path="/quienes-somos" component={Home}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );  
}
 
export default App;