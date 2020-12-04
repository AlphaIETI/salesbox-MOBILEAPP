import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBarComponent from '../dashboard/appBar';
import Divider from '@material-ui/core/Divider';
import FavoriteList from './FavoriteList.js';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';



export default function Favorites(){
    const [clientCart, setClientFavs] = useState(
        {"id":"",
        "name":"",
        "lastname":"",
        "email":"",
        "password":"",
        "coupons":"",
        "phone":"",
        "address":"",
        "age":"",
        "sizeUp":"",
        "sizeDown":"",
        "shoeSize":"",
        "cart":"",
        "favorites":""
    });

    const [recargo, setRecarga] = useState(1);

    const efecinco = (change) => {
        setRecarga(recargo + change)
    }

    useEffect( () => {

		axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
                setClientFavs(res.data)
				})
        }, [recargo]);

    const favoritos = Object.values(clientCart.favorites)


    return(
        <React.Fragment>
            <CssBaseline />
            <AppBarComponent />
            <br/>
            <br/>
            <br/>
            <br/>
            <Container maxWidth="md">
                {favoritos.length > 0 ? favoritos.map(item =>{return(<FavoriteList favoritos={item} efecinco={efecinco} key={item}/>)}) : <Typography variant="h2" component="h2" align="center">No has guardado productos <FavoriteIcon fontSize="large"/></Typography>}
                <Divider />
            </Container>
            <br/>
        </React.Fragment>
    );
}
