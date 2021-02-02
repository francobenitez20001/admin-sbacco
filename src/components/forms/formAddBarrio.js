import React from 'react';
const FormAddBarrio = (props) => {
    return (
        <div className="container mt-5">
            <h3>Formulario de Nuevo de barrio</h3>
            <br/>
            <form className="form-group" onSubmit={props.handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <select className="form-control" name="idPartido" onChange={props.filtrarLocalidadPorPartido}>
                            {props.partidos.map(partido=>(
                                <option key={partido.id} value={partido.id}>{partido.partido}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <select className="form-control" name="idLocalidad" onChange={props.handleChange} defaultValue={props.formValues.idLocalidad}>
                            <option value="">Selecciona una localidad</option>
                            {props.localidadesFiltradas.map(localidad=>(
                                <option key={localidad.id} value={localidad.id}>{localidad.localidad}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" placeholder="Ingrese el nombre del barrio" className="form-control" value={props.formValues.barrio} onChange={props.handleChange} name="barrio"/>
                    </div>
                </div>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Agregar"/>
            </form>
        </div>
    );
}
 
export default FormAddBarrio;