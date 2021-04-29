import React, { useContext, useEffect, useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import { PropiedadContext } from '../../context/propiedades/propiedadesContext';
import { CategoriasContext } from '../../context/categorias/categoriasContext';
import { OperacionesContext } from '../../context/operaciones/operacionesContext';
import { PartidosContext } from '../../context/partidos/partidosContext';
import { LocalidadesContext } from '../../context/localidades/localidadesContext';
import { BarriosContext } from "../../context/barrios/barriosContext";
import { DatoTecnicoContext } from "../../context/datoTecnico/datoContext";
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';

const FormPropiedad = (props) => {
    const [formValues, setFormValues] = useState({
        idCategoria:"",
        idOperacion:"",
        idPartido:"",
        idLocalidad:"",
        idBarrio:"",
        direccion:"",
        descripcion:"",
        precio:"",
        estado:"Disponible",
        mostrarEstado:"si",
        moneda:"dolar",
        lat:'',
        lon:'' 
    });
    const [errorForm, setErrorForm] = useState(false);

    const {data:categorias,traerTodas:traerCategorias} = useContext(CategoriasContext);
    const {data:operaciones,traerTodas:traerOperaciones} = useContext(OperacionesContext);
    const {data:partidos,traerTodos:traerPartidos} = useContext(PartidosContext);
    const {data:localidades,filtradas:localidadesFiltradas,traerTodas:traerLocalidades,filtrarPorIdPartido:filtrarLocalidades} = useContext(LocalidadesContext);
    const {data:barrios,filtrados:barriosFiltrados,traerTodos:traerBarrios,filtrarPorIdLocalidad:filtrarBarrios} = useContext(BarriosContext);
    const {propiedad,error,switchForm,traerUna,agregar,modificar} = useContext(PropiedadContext);

    useEffect(() => {
        getResources();
    }, [])

    useEffect(() => {
        if(propiedad){
            filtrarBarrios(propiedad.idLocalidad);
            setFormValues({
                idCategoria:`${propiedad.idCategoria}`,
                idOperacion:`${propiedad.idOperacion}`,
                idPartido:`${propiedad.idPartido}`,
                idLocalidad:`${propiedad.idLocalidad}`,
                idBarrio:`${propiedad.idBarrio}`,
                direccion:`${propiedad.direccion}`,
                descripcion:`${propiedad.descripcion}`,
                precio:propiedad.precio,
                estado:`${propiedad.estado}`,
                mostrarEstado:`${propiedad.mostrarEstado}`,
                moneda:`${propiedad.moneda}`,
                lat:`${propiedad.lat}`,
                lon:`${propiedad.lon}` 
            });
        }
    }, [propiedad])
    
    const getResources = async()=>{
        if(!categorias.length){
            await traerCategorias();
        }
        if(!operaciones.length){
            await traerOperaciones();
        }
        if(!partidos.length){
            await traerPartidos();
        }
        if(!localidades.length){
            await traerLocalidades();
        }
        if(!barrios.length){
            await traerBarrios();
        }
        if(props.id && !propiedad){
            await traerUna(props.id);
        }
    }

    const handleChange = e=>{
        if(e.target.name == 'idPartido'){
            filtrarLocalidades(e.target.value);
        }
        if(e.target.name == 'idLocalidad'){
            filtrarBarrios(e.target.value);
        }
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    const handleSelectUbicacion = address => {
        geocodeByAddress(address).then(results => getLatLng(results[0])).then(latLng =>{
            setFormValues({
                ...formValues,
                direccion:address,
                lat:latLng.lat,
                lon:latLng.lng
            });
        })
        .catch(error => console.error('Error', error));
    };
    const handleChangeUbicacion = address => {
        setFormValues({
            ...formValues,
            direccion:address
        });
    };

    const handleSubmit = async e=>{
        e.preventDefault();
        const erroresDeForm = validarErrores();
        if(erroresDeForm){
            setErrorForm(`Te falta completar el campo ${erroresDeForm}`);
            return;
        };
        if(props.id){
            await modificar(formValues,props.id);
        }else{
            await agregar(formValues);
        }
        Swal.fire('Listo','Se han agregado los datos de la propiedad','success').then(()=>switchForm());
    }

    const validarErrores = ()=>{
        for (const key in formValues) {
            if(formValues[key] == '') return key;
        }
    }

    if(errorForm || error){
        let err = error ? error : errorForm;
        Swal.fire('Atención',err,'error').then(()=>setErrorForm(false));
    }
    return(
        !categorias.length || !operaciones.length || !partidos.length || !localidades.length || !barrios.length || (props.id && formValues.idCategoria=='')  ? <Loader/> :
        <form className="form-group" id="form-principal" onSubmit={handleSubmit}>
            <h6>Datos principales:</h6>
            <div className="row">
                <div className="col-12 col-md-6">
                    <br/>
                    Categoria
                    <select name="idCategoria" className="form-control" onChange={handleChange} defaultValue={formValues.idCategoria}>
                        <option value="">Selecciona una categoria</option>
                        {categorias.map(categoria=>(
                            <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-6">
                    <br/>
                    Tipo de operación
                    <select name="idOperacion" className="form-control" onChange={handleChange} defaultValue={formValues.idOperacion}>
                        <option value="">Selecciona el tipo operacion</option>
                        {operaciones.map(operacion=>(
                            <option key={operacion.id} value={operacion.id}>{operacion.operacion}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <br/>
                    Partido
                    <select name="idPartido" className="form-control" onChange={handleChange} defaultValue={formValues.idPartido}>
                        <option value="">Selecciona un partido</option>
                        {partidos.map(partido=>(
                            <option key={partido.id} value={partido.id}>{partido.partido}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <br/>
                    Localidades
                    <select name="idLocalidad" className="form-control" onChange={handleChange} defaultValue={formValues.idLocalidad}>
                        <option value="">Selecciona localidad</option>
                        {localidadesFiltradas.map(localidad=>(
                            <option key={localidad.id} value={localidad.id}>{localidad.localidad}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <br/>
                    Barrio
                    <select name="idBarrio" className="form-control" onChange={handleChange} defaultValue={formValues.idBarrio}>
                        <option value="">Selecciona barrio</option>
                        {barriosFiltrados.map(barrio=>(
                            <option key={barrio.idBarrio} value={barrio.idBarrio}>{barrio.barrio}</option>
                        ))}
                    </select>
                </div>

                <div className="col-12">
                    <br/>
                    Dirección
                    <PlacesAutocomplete value={formValues.direccion} onChange={handleChangeUbicacion} onSelect={handleSelectUbicacion}>
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
                    {/* <input type="text" name="direccion" placeholder="Dirección" className="form-control" onChange={props.handleChangePrincipal} required/> */}
                </div>
            </div>
            <textarea name="descripcion" className="form-control mt-3" placeholder="Describa la propiedad" cols="30" rows="10" onChange={handleChange} defaultValue={formValues.descripcion}></textarea>
            <div className="row">
                <div className="col-12 col-md-6">
                    <br/>
                    <input value={formValues.precio} type="text" name="precio" placeholder="Precio" className="form-control" onChange={handleChange}/>
                </div>
                <div className="col-12 col-md-6">
                    <br/>
                    <select required name="estado" className="form-control" id="" onChange={handleChange} defaultValue={formValues.estado}>
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupado">Ocupado</option>
                        <option value="Reservado">Reservado</option>
                        <option value="Alquilado">Alquilado</option>
                        <option value="Vendido">Vendido</option>
                    </select>
                </div>
                <div className="col-12 col-md-6 input-group mt-4">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Mostrar Estado en la publicación
                        </div>
                    </div>
                    <select required name="mostrarEstado" className="form-control" id="" onChange={handleChange} defaultValue={formValues.mostrarEstado}>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="col-12 col-md-6">
                    <br/>
                    <select required name="moneda" className="form-control" id="" onChange={handleChange} defaultValue={formValues.moneda}>
                        <option value="dolar">Dolar</option>
                        <option value="pesos">Pesos</option>
                    </select>
                </div>
            </div>
            <br/>
            {props.id ? <input type="button" onClick={()=>switchForm()} className="btn btn-info mt-3" style={{float:"right"}} value="Omitir datos"/> : null}
            <input type="submit" className="btn btn-info mt-3 mr-2" style={{float: "right"}} value="Cargar y Continuar"/>
            <br/><br/>
        </form>
    );
}
 
export default FormPropiedad;