import React from 'react';
const FormAddCategoria = (props) => {
    return (
        <div className="container mt-5">
            <h3>Formulario de nueva categoria</h3>
            <br/>
            <form className="form-group" onSubmit={props.handleSubmit}>
                <input type="text" className="form-control" value={props.formValues.categoria} placeholder="Categoria" onChange={props.handleChange} name="categoria"/>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Enviar"/>
            </form>
        </div>
    );
}
 
export default FormAddCategoria;