import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import './index.css';

const useStyles = makeStyles({
    media: {
      height: 140,
    },
    avatar: {
        backgroundColor: red[500],
    }
  });

const Propiedad = ({propiedad,cambiarEstado,eliminarPropiedad}) => {
    const classes = useStyles();
    let imagen = `${propiedad.header}`;
    let descripcion = propiedad.descripcion;
    if (descripcion.length>300) {
        descripcion = propiedad.descripcion.substr(0,200)+'...';
    }
    
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className="avatar">
                    <i className="fas fa-map-marker-alt"></i>
                </Avatar>
                }
                title={propiedad.localidad}
                subheader={propiedad.barrio}  
            />
            <span className="labelEstado">{propiedad.estado}</span>
            <span className={`labelEstadoEnWeb ${propiedad.activo===1 ? 'habilitado' : 'deshabilitado'}`}>{propiedad.activo === 1 ? 'Disponible en web' : 'Oculto en web'}</span>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={imagen}
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {descripcion}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="card-actions">
                <Link to={{pathname: `/propiedad/edit/${propiedad.idCasa}`}}>
                    <Button size="small" className="yellow">
                        <FontAwesomeIcon icon={faPen}/>
                    </Button>
                </Link>
                <Button size="small" className="red" onClick={()=>eliminarPropiedad(propiedad.idCasa)}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </Button>
                <Button size="small" className={propiedad.activo ? 'green' : 'red'} onClick={()=>cambiarEstado(propiedad.idCasa)}>
                    <FontAwesomeIcon icon={propiedad.activo ? faCheck : faEye}/>
                </Button>
            </CardActions>
        </Card>
    );
}
 
export default Propiedad;
