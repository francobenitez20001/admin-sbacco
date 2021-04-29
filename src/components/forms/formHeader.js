import React, { useContext, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import { ImagenesContext } from "../../context/imagenes/imagenesContext";
import { PropiedadContext } from "../../context/propiedades/propiedadesContext";
import withReactContent from 'sweetalert2-react-content';
import './style/formEditPropiedad.css';
const MySwal = withReactContent(Swal);

const FormHeader = (props) => {

    const {data:imagenes,loading,error,habilitarFormHeader,traerImagenes,modificar,agregar,eliminar} = useContext(ImagenesContext);
    const {idCasa,propiedad} = useContext(PropiedadContext);
    let id;

    useEffect(() => {
        if(propiedad){
            id = propiedad.idCasa;
            traerImagenes(id);
        }else{
            id = idCasa;
        }
    }, [])

    const handleSubmit = async e=>{
        e.preventDefault();
        let data = new FormData(e.target);
        if(data.get('header').size === 0){
            Swal.fire('Atención','Es obligatorio que cargues una imagen','warning');
            return;
        }
        await agregar(data,true);
        Swal.fire('Listo','Imagen principal agregada','success').then(()=>{
            habilitarFormHeader();
        })
    }

    
    const modificarImagen = (idImagen)=>{
        Swal.fire({
            title: 'Editar Imagen',
            html:`
                <form id="editarImagen">
                    <input id="swal-input2" className="swal2-input" type="file" required name="header"/>
                    <input type="hidden" name="id" value="${idImagen}"/>
                </form>
            `,
            focusConfirm: false,
            preConfirm: async() => {
                if(document.getElementsByName('header')[0].value === ''){
                    return Swal.fire(
                        'Error',
                        'Ninguna imagen se seleccionó',
                        'error'
                        )
                };
                let data = new FormData(document.getElementById('editarImagen'));
                await modificar(data);
                Swal.fire('Listo','Imagen modificada','success').then(()=>traerImagenes(propiedad.idCasa));
            }
        })
    }

    const eliminarImagen = (id,nombre)=>{
        MySwal.fire({
            title: '¿Desea eliminar la imágen?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then(async(result) => {
            if (result.value) {
                let nombreImagen = nombre.split('/')[4];
                await eliminar(id,nombreImagen);
                Swal.fire('Listo','Imagen eliminado','success').then(()=>traerImagenes(propiedad.idCasa));
            }
        })
    }

    const cargarMasImagenes = ()=>{
        Swal.fire({
            title: 'Agregar Imagenes',
            html:
                `
                <form id="form-imagenes-add">
                    <input id="swal-input2" required className="swal2-input" type="file" multiple name="imagenes"/>
                    <input type="hidden" name="idCasa" value="${propiedad.idCasa}"/> 
                </form>
                `,
            focusConfirm: false,
            preConfirm: async() => {
                if(document.getElementsByName('imagenes')[0].value === ''){
                    return Swal.fire(
                        'Error',
                        'Debes agregar al menos una imagen',
                        'error'
                    )
                };
                let files = new FormData(document.getElementById('form-imagenes-add'));
                await agregar(files,false);
                Swal.fire(
                    'Listo!',
                    'Imagenes agregadas satisfactoriamente',
                    'success'
                ).then(()=>{
                    traerImagenes(propiedad.idCasa);
                });
            }
        })
    }

    return (
        loading ? <Loader/> :
        !props.id ? 
            <>  
                <form className="form-group" id="form-header" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <label>Selecciona la imágen principal de la propiedad</label>
                    <br/>
                    <input type="file" name="header"/>
                    <input type="hidden" name="idCasa" id="input-header-idcasa" value={idCasa}/>
                    <input type="submit" style={{float:"right"}} className="btn btn-info" value="Cargar"/>
                </form>
            </> 
        :
        <div id="container_imagenes">
            {!props.id ? null :
            <>
                <div className="alert alert-warning"><b>En el caso de que no quiera modificar las imagenes puede volver al administrador de propiedades</b></div>
                <br/>
                <div className="row">
                    {imagenes.map(img=>(
                        (img.header === 0)?null:
                        <React.Fragment key={img.id}>
                            <div className="col-12 col-sm-3 md-3">
                                <img src={img.nombre} className="w-100" alt="header"/>
                            </div>
                            <div className="col-12 col-sm-9 text-right md-3">
                                <input type="button" style={{position:'absolute',bottom:'0px',right:'10px'}} onClick={()=>modificarImagen(img.id)} className="btn btn-info" value="Modificar"/>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <hr/>
                <h3 className="mt-3">Imagenes restantes de la propiedad</h3>
                <input type="button" onClick={cargarMasImagenes} className="btn btn-info" value="Agregar" style={{float:'right',position:'relative',top:'-40px'}}/>
                <form className="form-group" id="form-imagenes">
                    <div className="row my-5">
                        {imagenes.map(img=>(
                            (img.header === 1)?null:
                            <div key={img.id} className="col-12 col-sm-3 text-center contenedor-imagen py-3">
                                <img src={img.nombre} alt={img.nombre} className="w-100 imagen-propiedad d-block mb-3" style={{height:"160px",cursor:'pointer'}}/>
                                <i onClick={()=>eliminarImagen(img.id,`${img.nombre}`)} className="icono-delete mx-4 fas fa-trash-alt"></i>
                                <i onClick={()=>modificarImagen(img.id)} className="icono-update mx-4 fas fa-pen"></i>
                            </div>
                        ))}
                    </div>
                </form>
            </>
            }
        </div>
    );
}
 
export default FormHeader;