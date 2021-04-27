import React from 'react';
import FormCategoria from '../../components/forms/formCategoria';

const EditCategoria = (props) => {
    return (
        <FormCategoria id={props.match.params.id}/>
    );
}
 
export default EditCategoria;