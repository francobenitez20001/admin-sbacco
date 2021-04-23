import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');

ReactDOM.render((
  <Suspense fallback={'Cargando la app'}>
    <App />
  </Suspense>
), container);
