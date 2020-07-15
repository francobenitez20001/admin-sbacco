import React from 'react';
import {Link} from 'react-router-dom'
const FormEditPropiedad = (props) => {
    return(
        <div className="container mt-3">
            <div className="alert alert-success d-none" id="alert-success">Se ha agregado la propiedad con éxito</div>
            <Link to="/productos" className="btn btn-warning">Regresar al panel de control</Link>
            <h2 className="mt-2">Formulario de modificación de propiedad</h2>
            <form className="form-group" id="form-principal" onSubmit={props.handleSubmitPrincipal}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <br/>
                        Categoria
                        <select name="idCategoria" className="form-control" onChange={props.handleChangePrincipal} defaultValue={props.formDatosPrincipalesValues.idCategoria}>
                            {props.categorias.map(categoria=>(
                                <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <br/>
                        Tipo de operación
                        <select name="idOperacion" className="form-control" onChange={props.handleChangePrincipal} defaultValue={props.formDatosPrincipalesValues.idOperacion}>
                            {props.operaciones.map(operacion=>(
                                <option key={operacion.id} value={operacion.id}>{operacion.operacion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <br/>
                        Partido
                        <select name="idLocalidad" className="form-control" onChange={props.handleChangePrincipal} defaultValue={props.formDatosPrincipalesValues.moneda}>
                            {props.localidades.map(localidad=>(
                                <option key={localidad.id} value={localidad.id}>{localidad.localidad}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <br/>
                        Dirección
                        <input type="text" name="direccion" placeholder="Dirección" className="form-control" value={props.formDatosPrincipalesValues.direccion} onChange={props.handleChangePrincipal} required/>
                    </div>
                </div>
                <textarea name="descripcion" className="form-control mt-3" defaultValue={props.formDatosPrincipalesValues.descripcion} placeholder="Describa la propiedad" cols="30" rows="10" required onChange={props.handleChangePrincipal}></textarea>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <br/>
                        <input required type="text" name="precio" value={props.formDatosPrincipalesValues.precio} placeholder="Precio" className="form-control" onChange={props.handleChangePrincipal} required/>
                    </div>
                    <div className="col-12 col-md-6">
                        <br/>
                        <select required name="estado" className="form-control" onChange={props.handleChangePrincipal} defaultValue={props.formDatosPrincipalesValues.estado}>
                            <option value="Disponible">Disponible</option>
                            <option value="Ocupado">Ocupado</option>
                            <option value="Reservado">Reservado</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <br/>
                        <select required name="moneda" className="form-control" onChange={props.handleChangePrincipal} defaultValue={props.formDatosPrincipalesValues.moneda}>
                            <option value="dolar">Dolar</option>
                            <option value="pesos">Pesos</option>
                        </select>
                    </div>
                </div>
                <br/>
                <input type="submit" className="btn btn-info mt-3" style={{float: "right"}} value="Actualizar y Continuar"/>
                <br/><br/>
            </form>
            <form className="form-group d-none" id="form-tecnico" onSubmit={props.handleSubmitTecnico}>
                Datos técnicos:
                <hr/>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <input type="hidden" name="idCasa"/>
                        <input type="hidden" name="pass"/>
                        <div className="input-group mt-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Dormitorios</div>
                            </div>
                            <input type="text" name="dormitorios" value={props.formDatosTecnicosValues.dormitorios} onChange={props.handleChangeTecnico} placeholder="Ingrese cantidad de dormitorios" className="form-control" required/>
                        </div>
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Superf. Cubierta</div>
                            </div>
                            <input type="text" name="s_cubierta" value={props.formDatosTecnicosValues.s_cubierta} onChange={props.handleChangeTecnico} placeholder="Superficie cubierta en m2" className="form-control" required/>
                        </div>
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Pileta</div>
                            </div>
                            <select name="pileta" onChange={props.handleChangeTecnico} className="form-control" defaultValue={props.formDatosTecnicosValues.pileta}>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group mt-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Super. Semicubierta</div>
                            </div>
                            <input type="text" onChange={props.handleChangeTecnico} value={props.formDatosTecnicosValues.s_semicubierta} name="s_semicubierta" placeholder="Superficie semicubierta en m2" className="form-control" required/>
                        </div>
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Super. Terreno</div>
                            </div>
                            <input type="text" onChange={props.handleChangeTecnico} value={props.formDatosTecnicosValues.s_terreno} name="s_terreno" placeholder="Superficie del terreno" className="form-control" required/>
                        </div>
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Cochera</div>
                            </div>
                            <select name="cochera" onChange={props.handleChangeTecnico} className="form-control" defaultValue={props.formDatosTecnicosValues.cochera}>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br/>
                <input type="submit" className="btn btn-info mt-3" style={{float:"right"}} value="Guardar y Continuar"/>
                <br/><br/>
            </form>
            <hr/>
            <form className="form-group d-none" id="form-servicio" onSubmit={props.handleSubmitServicio}>
                <div className="row text-center">
                    <div className="input-group col-12 col-md-4">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Electricidad</div>
                        </div>
                        <select className="form-control" name="luz" onChange={props.handleChangeServicios} defaultValue={props.formServiciosValues.luz}>
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
                    <div className="input-group col-12 col-md-4">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Agua</div>
                        </div>
                        <select className="form-control" onChange={props.handleChangeServicios} name="agua" defaultValue={props.formServiciosValues.agua}>
                            <option value="corriente">Corriente</option>
                            <option value="pozo">Pozo</option>
                        </select>
                    </div>
                    <div className="input-group col-12 col-md-4">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Calefacción</div>
                        </div>
                        <select className="form-control" defaultValue={props.formServiciosValues.calefaccion} name="calefaccion" onChange={props.handleChangeServicios}>
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="input-group col-12 col-md-4">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Telefono</div>
                            </div>
                            <select className="form-control" name="telefono" onChange={props.handleChangeServicios} defaultValue={props.formServiciosValues.telefono}>
                                <option value="no">No</option>
                                <option value="si">Si</option>
                            </select>
                        </div>
                        <div className="input-group col-12 col-md-4">
                            <div className="input-group-prepend">
                            <div className="input-group-text">Gas</div>
                            </div>
                            <select className="form-control" name="gas" onChange={props.handleChangeServicios} defaultValue={props.formServiciosValues.gas}>
                                <option value="envasado">Envasado</option>
                                <option value="natural">Natural</option>
                            </select>
                        </div>
                        <div className="input-group col-12 col-md-4">
                            <div className="input-group-prepend">
                            <div className="input-group-text">Internet</div>
                            </div>
                            <select className="form-control" name="internet" onChange={props.handleChangeServicios} defaultValue={props.formServiciosValues.internet}>
                                <option value="no">No</option>
                                <option value="si">Si</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <input type="submit" className="btn btn-info" name="" style={{float: "right"}} value="Guardar y Continuar"/>
                    <br/><br/>
                </form>
            </div>
    );
}
 
export default FormEditPropiedad;