import React, {useState, useEffect} from 'react';
import {Button, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import DeleteButton from '../Carrito/deleteProductFromCart.js';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 897,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    textStyle: {
        fontSize: '24px',
        textAlign: 'center',
        color: 'black'
    },
    imageItem:{
        height:200
    },
    elboton: {
        margin: 'auto',
    }
}));


export default function Item(props){

    const classes = useStyles();
    const [cantidad, setcantidad] = useState(1);

    function restaCantidad(){
        if(cantidad>1){
            setcantidad(cantidad-1);
            props.changePrecio(-(itemData.price-(itemData.price*(itemData.discount/100))))
        }
    }

    function sumaCantidad(){
        if(cantidad<99){
            setcantidad(cantidad+1);
        }
        props.changePrecio(itemData.price-(itemData.price*(itemData.discount/100)));
    }

    const [itemData, setItemData] = useState(
        {"id":"",
        "brand":"",
        "description":"",
        "color":"",
        "price":0,
        "discount":0,
        "images":[],
        "size":"",
        "category":"",
        "gender":"",
        "stockAvailable":""
    });

    function handleOnLoad (){
        props.changePrecio(itemData.price-(itemData.price*(itemData.discount/100)));
    }

    useEffect( () => {

		axios.get('https://salesbox-alpha-backend.herokuapp.com/products/'+ props.currentItem)
			.then(res => {
                setItemData(res.data)
                props.efecinco2(res.data.brand)
                })
                
        }, []);

        
    return(
        <div onLoad={handleOnLoad} className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={itemData.images[0]} />
                    </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                        <Typography gutterBottom variant="h5">
                            {itemData.description}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {itemData.brand}
                        </Typography>
                        
                        </Grid>
                        <Grid item>
                            <DeleteButton idproduct={props.currentItem} efecinco={props.efecinco} precioItem={(itemData.price-(itemData.price*(itemData.discount/100)))} changePrecio={props.changePrecio} cantidadItem={cantidad}></DeleteButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item xs container spacing={2}>
                            <Typography gutterBottom variant="h5">
                            ${(itemData.price-(itemData.price*(itemData.discount/100)))*cantidad}
                            </Typography>
                            <ButtonGroup className={classes.elboton}>
                                <Button onClick={restaCantidad}>-</Button>
                                    <span style={{color:"black", fontSize:'20px', width:'30px', textAlign:'center'}}>{cantidad}</span>
                                <Button onClick={sumaCantidad}>+</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Paper>
      </div>
    )
}