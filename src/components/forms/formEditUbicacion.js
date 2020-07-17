import React from 'react';
const FormEditUbicacion = (props) => {
    return (
        <div className="container mt-5">
            <h3>Formulario de modificacion de una ubicación</h3>
            <br/>
            <form className="form-group" onSubmit={props.handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <select className="form-control" defaultValue={props.formValues.idPartido} name="idPartido" onChange={props.handleChange}>
                            {props.partidos.map(partido=>(
                                <option key={partido.id} value={partido.id}>{partido.partido}</option>
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
 
export default FormEditUbicacion;