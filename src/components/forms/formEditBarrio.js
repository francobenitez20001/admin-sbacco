import React, { useContext, useEffect, useState } from 'react';
import { BarriosContext } from "../../context/barrios/barriosContext";
import { PartidosContext } from "../../context/partidos/partidosContext";
import { LocalidadesContext } from "../../context/localidades/localidadesContext";
import Loader from '../Loader/Loader';
import Error from '../Error';

const FormEditBarrio = (props) => {
    const [formValues, setFormValues] = useState({
        idLocalidad:'',
        barrio:''
    });
    const [errorForm, setErrorForm] = useState(null);

    const {barrio,loading,error,traerUno} = useContext(BarriosContext);
    const {filtradas,traerTodas,filtrarPorIdPartido} = useContext(LocalidadesContext);
    const {data:partidos,traerTodos} = useContext(PartidosContext);

    useEffect(() => {
        traerUno(props.id);
        traerTodas();
        traerTodos();
    }, [])

    useEffect(() => {
        if(barrio){
            setFormValues({
                ...formValues,
                idLocalidad:barrio.idLocalidad,
                barrio:barrio.barrio
            })
        }
    }, [barrio])


    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const filtrarLocalidadPorPartido = e=>{
        filtrarPorIdPartido(e.target.value);
    }

    const verificar = ()=>{
        if(formValues.barrio.trim()==='' || formValues.idLocalidad==''){
            setErrorForm(true);
            return false;
        }
        setErrorForm(false);
        return true;
    }

    const handleSubmit = event=>{
        event.preventDefault();
        if(!verificar()){
            setErrorForm('Completa todos los campos');
            return;
        }
        console.log(formValues);
    }
    return (
        !partidos.length || formValues.idLocalidad==''  ? <Loader/> :
        <div className="container mt-5">
            {errorForm ? <Error message={errorForm}/> : null}
            {error ? <Error message={error.msg}/>:null}
            {loading ? <Loader/> : null} 
            <h3>Formulario de modificación de barrio</h3>
            <br/>
            <form className="form-group" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <select className="form-control" name="idPartido" onChange={filtrarLocalidadPorPartido}>
                            {partidos.map(partido=>(
                                <option key={partido.id} value={partido.id}>{partido.partido}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <select className="form-control" name="idLocalidad" onChange={handleChange} defaultValue={formValues.idLocalidad}>
                            {filtradas.map(localidad=>(
                                <option key={localidad.id} value={localidad.id}>{localidad.localidad}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" value={formValues.barrio} onChange={handleChange} name="barrio"/>
                    </div>
                </div>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Actualizar"/>
            </form>
        </div>
    );
}
 
export default FormEditBarrio;