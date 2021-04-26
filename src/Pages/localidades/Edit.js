import React from 'react';
import FormLocalidades from '../../components/forms/formLocalidades';

const EditUbicacion = (props) => {
    return (
        <FormLocalidades id={props.match.params.id}/>
    );
}
 
export default EditUbicacion;