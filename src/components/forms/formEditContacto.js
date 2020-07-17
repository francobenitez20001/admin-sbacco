import React from 'react';
const FormEditContacto = (props) => {
    return (
        <div className="container mt-5">
            <h3>Formulario de modificación de datos de contacto</h3>
            <br/>
            <form className="form-group" onSubmit={props.handleSubmit}>
                <div className="my-4 col-12 input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Telefono Principal
                        </div>
                    </div>
                    <input type="text" name="telefonoPrincipal" onChange={props.handleChange} value={props.formValues.telefonoPrincipal} className="form-control"/>
                </div>
                <div className="my-4 col-12 input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Whatsapp
                        </div>
                    </div>
                    <input type="text" name="whatsapp" onChange={props.handleChange} value={props.formValues.whatsapp} className="form-control"/>
                </div>
                <div className="my-4 col-12 input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Facebook
                        </div>
                    </div>
                    <input type="text" name="facebook" onChange={props.handleChange} value={props.formValues.facebook} className="form-control"/>
                </div>
                <div className="my-4 col-12 input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Instagram
                        </div>
                    </div>
                    <input type="text" name="instagram" onChange={props.handleChange} value={props.formValues.instagram} className="form-control"/>
                </div>
                <div className="my-4 col-12 input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Dirección
                        </div>
                    </div>
                    <input type="text" name="direccion" onChange={props.handleChange} value={props.formValues.direccion} className=" form-control"/> 
                </div>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Modificar"/>
            </form>
        </div>
    );
}
 
export default FormEditContacto;