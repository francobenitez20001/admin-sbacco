import React from 'react';
import { useHistory } from 'react-router';
import FormPartido from '../../components/forms/formPartido';
const EditPartido = (props) => {
    const history = useHistory();
    return (
        <>
            <div className="container pt-5"><button onClick={()=>history.goBack()} className="btn btn-warning">Volver al panel</button></div>
            <FormPartido id={props.match.params.id}/>
        </>
    );
}
 
export default EditPartido;