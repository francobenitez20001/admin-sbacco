import React from 'react';
import FormBarrio from '../../components/forms/formBarrio';

const EditBarrio = (props) => {

    return (
        <FormBarrio id={props.match.params.id}/>
    );
}
 
export default EditBarrio;