import React from 'react';
const FormEditOperacion = (props) => {
    return (
        <div className="container mt-5">
            <h3>Formulario de modificación de una operación</h3>
            <br/>
            <form className="form-group" onSubmit={props.handleSubmit}>
                <input type="text" className="form-control" value={props.formValues.operacion} placeholder="Operacion" onChange={props.handleChange} name="operacion"/>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Modificar"/>
            </form>
        </div>
    );
}
 
export default FormEditOperacion;