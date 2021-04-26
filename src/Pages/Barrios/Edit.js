import React from 'react';
import FormEditBarrio from '../../components/forms/formEditBarrio';

const EditBarrio = (props) => {

    return (
        <FormEditBarrio
            id={props.match.params.id}/>
    );
}
 
export default EditBarrio;