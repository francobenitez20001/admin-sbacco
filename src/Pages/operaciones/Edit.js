import React from 'react';
import FormOperacion from '../../components/forms/formOperacion';

const EditOperacion = (props) => {
    return (
        <FormOperacion id={props.match.params.id}/>
    );
}
 
export default EditOperacion;