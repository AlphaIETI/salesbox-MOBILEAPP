import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeleteButton from '../Favorites/deleteProductFromFavs.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles} from '@material-ui/core/styles';

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

export default function FavItem(props){

    const classes = useStyles();
    
    const [itemData, setItemData] = useState(
        {"id":"",
        "brand":"",
        "description":"",
        "color":"",
        "price":"",
        "discount":"",
        "images":[],
        "size":"",
        "category":"",
        "gender":"",
        "stockAvailable":""
    });

    useEffect( () => {

		axios.get('https://salesbox-alpha-backend.herokuapp.com/products/'+props.favoritos)
			.then(res => {
                setItemData(res.data)
				})
        }, []);

    return(
        <div className={classes.root}>
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
                            <DeleteButton idproduct={props.favoritos} efecinco={props.efecinco}></DeleteButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h5">
                            ${(itemData.price-(itemData.price*(itemData.discount/100)))}
                        </Typography>
                    </Grid>
                    </Grid>
                </Grid>
            </Paper>
      </div>
    );
}