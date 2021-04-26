import React, { useContext, useEffect, useState } from 'react';
import { BarriosContext } from "../../context/barrios/barriosContext";
import { PartidosContext } from "../../context/partidos/partidosContext";
import { LocalidadesContext } from "../../context/localidades/localidadesContext";
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const FormBarrio = (props) => {
    const [formValues, setFormValues] = useState({
        idLocalidad:'',
        barrio:''
    });
    const [errorForm, setErrorForm] = useState(null);
    const history = useHistory();

    const {barrio,loading,error,traerUno:traerBarrio,modificar,agregar} = useContext(BarriosContext);
    const {filtradas,traerTodas:traerLocalidades,filtrarPorIdPartido} = useContext(LocalidadesContext);
    const {data:partidos,traerTodos:traerPartidos} = useContext(PartidosContext);

    useEffect(() => {
        traerPartidos();
        traerLocalidades();
        if(props.id){
            traerBarrio(props.id);
        }
    }, [])

    useEffect(() => {
        if(barrio && props.id){
            console.log('caca');
            setFormValues({
                ...formValues,
                idLocalidad:`${barrio.idLocalidad}`,
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

    const handleSubmit = async event=>{
        event.preventDefault();
        console.log(formValues);
        if(!verificar()){
            setErrorForm('Completa todos los campos');
            return;
        }
        if(props.id){
            await modificar(formValues,props.id);
        }else{
            await agregar(formValues);
        }
        Swal.fire('Listo!','','success').then(()=>{
            history.push('/barrios');
        })
    }

    if(error || errorForm){
        let err = error ? error : errorForm;
        Swal.fire('Error',err,'error').then(setErrorForm(false));
    }


    const render = ()=>{
        if(props.id){
            return formValues.idLocalidad=='' ? <Loader/> :
            <div className="container mt-5">
                {loading ? <Loader/> : null} 
                <h3>Formulario de {props.id ? 'modificación' : 'alta'} de barrio</h3>
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
                            <input type="text" className="form-control" value={formValues.barrio} onChange={handleChange} name="barrio" placeholder="Ingrese el nombre del barrio"/>
                        </div>
                    </div>
                    <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Actualizar"/>
                </form>
            </div>
        }else{
            return !filtradas.length && !partidos.length ? <Loader/> :
            <div className="container mt-5">
                {loading ? <Loader/> : null} 
                <h3>Formulario de {props.id ? 'modificación' : 'alta'} de barrio</h3>
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
                                <option value="">Seleccione una localidad</option>
                                {filtradas.map(localidad=>(
                                    <option key={localidad.id} value={localidad.id}>{localidad.localidad}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-4">
                            <input type="text" className="form-control" value={formValues.barrio} onChange={handleChange} name="barrio" placeholder="Ingrese el nombre del barrio"/>
                        </div>
                    </div>
                    <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Actualizar"/>
                </form>
            </div>
        }
    }

    return render();
}
 
export default FormBarrio;