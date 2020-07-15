import React from 'react';
const FormAddUbicacion = (props) => {
    return (
        <div className="container mt-5">
            <h3>Formulario de nueva ubicación</h3>
            <br/>
            <form className="form-group" onSubmit={props.handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <select className="form-control" name="partido" onChange={props.handleChange}>
                            {props.partidos.map(partido=>(
                                <option key={partido.id} value={partido.partido}>{partido.partido}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <input type="text" className="form-control" value={props.formValues.localidad} placeholder="Localidad" onChange={props.handleChange} name="localidad"/>
                    </div>
                </div>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Enviar"/>
            </form>
        </div>
    );
}
 
export default FormAddUbicacion;