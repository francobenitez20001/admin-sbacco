import React, { useState, useEffect, useContext } from 'react';
import { CategoriasContext } from "../../context/categorias/categoriasContext";
import { PartidosContext } from "../../context/partidos/partidosContext";
import { LocalidadesContext } from "../../context/localidades/localidadesContext";
import {BarriosContext} from '../../context/barrios/barriosContext';
import { PropiedadContext } from '../../context/propiedades/propiedadesContext';

const FormFiltroPropiedades = () => {

    const {data:categorias,traerTodas:traerCategorias} = useContext(CategoriasContext);
    const {data:partidos,traerTodos:traerPartidos} = useContext(PartidosContext);
    const {data:localidades,traerTodas:traerLocalidades} = useContext(LocalidadesContext);
    const {data:barrios,traerTodos:traerBarrios} = useContext(BarriosContext);
    const {aplicarFiltro} = useContext(PropiedadContext);

    const [formValues, setFormValues] = useState({
        idCategoria:'',
        idPartido:'',
        idLocalidad:'',
        idBarrio:'',
        minPrecio:'',
        maxPrecio:'',
        moneda:'Dolar'
    });
    const [loadAll, setLoadAll] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await traerCategorias();
        await traerPartidos();
        await traerLocalidades();
        await traerBarrios();
        setLoadAll(true);
        return;
    }


    const handleSubmit = e => {
        e.preventDefault();
        aplicarFiltro(formValues);
        setFormValues({
            idCategoria:'',
            idPartido:'',
            idLocalidad:'',
            idBarrio:'',
            minPrecio:'',
            maxPrecio:'',
            moneda:'Dolar'
        })
    }

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    return (
        !loadAll ? null :
        <form className="form-group" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="input-group mb-2">
                        <div className="input-group-text" id="categoria">Categoria</div>
                        <select className="form-control" aria-describedby="categoria" defaultValue={formValues.idCategoria} name="idCategoria" onChange={handleChange}>
                            <option value="">Selecciona una categoria</option>
                            {categorias.map(cat=>(
                                <option value={cat.id} key={cat.id}>{cat.categoria}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="input-group mb-2">
                        <div className="input-group-text" id="partido">Partido</div>
                        <select className="form-control" aria-describedby="partido" defaultValue={formValues.idPartido} name="idPartido" onChange={handleChange}>
                            <option value="">Selecciona un partido</option>
                            {partidos.map(par=>(
                                <option value={par.id} key={par.id}>{par.partido}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="input-group mb-2">
                        <div className="input-group-text" id="localidad">Localidad</div>
                        <select className="form-control" aria-describedby="localidad" defaultValue={formValues.idLocalidad} name="idLocalidad" onChange={handleChange}>
                            <option value="">Selecciona una localidad</option>
                            {localidades.map(localidad=>(
                                <option value={localidad.id} key={localidad.id}>{localidad.localidad}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="input-group mb-2">
                        <div className="input-group-text" id="barrio">Barrio</div>
                        <select className="form-control" aria-describedby="barrio" defaultValue={formValues.idBarrio} name="idBarrio" onChange={handleChange}>
                            <option value="">Selecciona un  barrio</option>
                            {barrios.map(barrio=>(
                                <option value={barrio.idBarrio} key={barrio.idBarrio}>{barrio.barrio}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="input-group mb-2">
                        <div className="input-group-text" id="minpre">Min. precio</div>
                        <input type="text" className="form-control" aria-describedby="minpre" value={formValues.minPrecio} name="minPrecio" onChange={handleChange}/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="input-group mb-2">
                        <div className="input-group-text" id="maxprecio">Max. precio</div>
                        <input type="text" className="form-control" aria-describedby="maxprecio" value={formValues.maxPrecio} name="maxPrecio" onChange={handleChange}/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="input-group mb-2">
                        <div className="input-group-text" id="moneda">Moneda</div>
                        <select className="form-control" aria-describedby="moneda" defaultValue={formValues.moneda} name="moneda" onChange={handleChange}>
                            <option value="Dolar">U$S</option>
                            <option value="Pesos">$</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <input type="submit" value="Aplicar filtro" className="btn btn-info btn-block"/>
                </div>
            </div>
        </form>
    );
}
 
export default FormFiltroPropiedades;