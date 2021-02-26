import React from 'react';
import {Link} from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';
import './style/formEditPropiedad.css';


const FormEditPropiedad = (props) => {
    const omitirDatos = event=>{
        props.handleSubmitTecnico(event,true);
    }
    return(
        <div className="container mt-3">
            <div className="alert alert-success d-none" id="alert-success">Se ha agregado la propiedad con éxito</div>
            <Link to="/propiedades" className="btn btn-warning">Regresar al panel de control</Link>
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
                    <div className="col-12 col-md-4">
                        <br/>
                        Partido
                        <select name="idPartido" className="form-control" onChange={props.handleChangePrincipal} defaultValue={props.formDatosPrincipalesValues.idPartido}> 
                            {props.partidos.map(partido=>(
                                <option key={partido.id} value={partido.id}>{partido.partido}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <br/>
                        Localidades
                        <select name="idLocalidad" className="form-control" defaultValue={props.formDatosPrincipalesValues.idLocalidad} onChange={props.handleChangePrincipal}>
                            {props.localidadesFiltradas.map(localidad=>(
                                <option key={localidad.id} value={localidad.id}>{localidad.localidad}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <br/>
                        Barrio
                        <select name="idBarrio" className="form-control" defaultValue={props.formDatosPrincipalesValues.idBarrio} onChange={props.handleChangePrincipal}>
                            {props.barriosFiltrados.map(barrio=>(
                                <option key={barrio.idBarrio} value={barrio.idBarrio}>{barrio.barrio}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <br/>
                        Dirección
                        <PlacesAutocomplete value={props.formDatosPrincipalesValues.direccion} onChange={props.handleChangeUbicacion} onSelect={props.handleSelectUbicacion}>
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    className='form-control' id="ubicacion"
                                    {...getInputProps({
                                        placeholder: 'Buscá tu dirección ...',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion,key) => {
                                        const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer',margin:'10px',padding:'5px' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer',margin:'10px',padding:'5px' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                                key
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        </PlacesAutocomplete>
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
                    <div className="col-12 col-md-6 input-group mt-4">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                Mostrar Estado en la publicación
                            </div>
                        </div>
                        <select required name="mostrarEstado" className="form-control" id="" onChange={props.handleChangePrincipal} defaultValue={props.formDatosPrincipalesValues.mostrarEstado}>
                            <option value="si">Si</option>
                            <option value="no">No</option>
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
                    <div className="col-12 col-md-4">
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Superf. Cubierta</div>
                            </div>
                            <input type="text" name="s_cubierta" onChange={props.handleChangeTecnico} value={props.formDatosTecnicosValues.s_cubierta} placeholder="Superficie cubierta en m2" className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group mt-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Super. Semicubierta</div>
                            </div>
                            <input type="text" onChange={props.handleChangeTecnico} value={props.formDatosTecnicosValues.s_semicubierta} name="s_semicubierta" placeholder="Superficie semicubierta en m2" className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Super. Terreno</div>
                            </div>
                            <input type="text" onChange={props.handleChangeTecnico} value={props.formDatosTecnicosValues.s_terreno} name="s_terreno" placeholder="Superficie del terreno" className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-text">Sup. Total</div>
                            <input type="text" className="form-control" name="s_total" value={props.formDatosTecnicosValues.s_total} onChange={props.handleChangeTecnico} value={props.formDatosTecnicosValues.s_total}/>
                            <div className="input-group-text">
                                <select onChange={props.handleChangeTecnico} name="u_medida" defaultValue={props.formDatosTecnicosValues.u_medida}>
                                    <option value="metros cuadrados">M2</option>
                                    <option value="hectareas">Hec.</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Pileta</div>
                            </div>
                            <select name="pileta" onChange={props.handleChangeTecnico} defaultValue={props.formDatosTecnicosValues.pileta} className="form-control" id="">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="input-group mt-3 mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Cochera</div>
                            </div>
                            <select name="cochera" onChange={props.handleChangeTecnico} defaultValue={props.formDatosTecnicosValues.pileta} className="form-control" id="">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="hidden" name="idCasa"/>
                        <input type="hidden" name="pass"/>
                        <div className="input-group mt-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Dormitorios</div>
                            </div>
                            <input type="text" name="dormitorios" onChange={props.handleChangeTecnico} value={props.formDatosTecnicosValues.dormitorios} placeholder="Ingrese cantidad de dormitorios" className="form-control" required/>
                        </div>
                    </div>
                </div>
                <br/>
                <input type="button" onClick={omitirDatos} className="btn btn-info mt-3" style={{float:"right"}} value="Omitir datos"/>
                <input type="submit" className="btn btn-info mt-3 mr-2" style={{float:"right"}} value="Guardar y Continuar"/>
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
            <div id="container__imagenes" className="d-none">
                <form className="form-group" id="form-header" encType="multipart/form-data" onSubmit={props.handleSubmitHeader}>
                    <div className="alert alert-warning"><b>En el caso de que no quiera modificar las imagenes puede volver al administrador de propiedades</b></div>
                    <br/>
                    <div className="row">
                        {props.propiedad.imagenes.map(img=>(
                            (img.header === 0)?null:
                            <React.Fragment key={img.id}>
                                <div className="col-12 col-sm-3 md-3">
                                    <img src={img.nombre} className="w-100" alt="header"/>
                                </div>
                                <div className="col-12 col-sm-9 text-right md-3">
                                    <input type="button" style={{position:'absolute',bottom:'0px',right:'10px'}} onClick={()=>props.modificarImagen(img.id)} className="btn btn-info" value="Modificar"/>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </form>
                <hr/>
                <h3 className="mt-3">Imagenes restantes de la propiedad</h3>
                <input type="button" onClick={()=>props.cargarMasImagenes(props.propiedad.data[0].idCasa)} className="btn btn-info" value="Agregar" style={{float:'right',position:'relative',top:'-40px'}}/>
                <form className="form-group" id="form-imagenes" onSubmit={props.handleSubmitImagenes}>
                    <div className="row my-5">
                        {props.propiedad.imagenes.map(img=>(
                            (img.header === 1)?null:
                            <div key={img.id} className="col-12 col-sm-3 text-center contenedor-imagen py-3">
                                <img src={img.nombre} alt={img.nombre} className="w-100 imagen-propiedad d-block mb-3" style={{height:"160px",cursor:'pointer'}}/>
                                <i onClick={()=>props.eliminarImagen(img.id,img.nombre)} className="icono-delete mx-4 fas fa-trash-alt"></i>
                                <i onClick={()=>props.modificarImagen(img.id)} className="icono-update mx-4 fas fa-pen"></i>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default FormEditPropiedad;