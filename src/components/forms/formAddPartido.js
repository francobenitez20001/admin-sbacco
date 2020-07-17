import React from 'react';
const FormAddPartido = (props) => {
    return (
        <div className="container mt-5">
            <h3>Formulario de nuevo partido</h3>
            <br/>
            <form className="form-group" onSubmit={props.handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <input type="text" className="form-control" value={props.formValues.partido} placeholder="Nombre de partido" onChange={props.handleChange} name="partido"/>
                    </div>
                </div>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Enviar"/>
            </form>
        </div>
    );
}
 
export default FormAddPartido;