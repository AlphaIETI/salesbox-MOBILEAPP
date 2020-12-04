import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CardList from "./CardList";
import GeneralAppBar from '../dashboard/appBar';
import Divider from '@material-ui/core/Divider';
import PriceTotal from './PriceTotal';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


export default function Carrito(){
    const [clientCart, setClientCart] = useState(
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

    const [marca, setMarca] = useState("");

    const efecinco2 = (change) => {
        setMarca( change)
    }

    const [precioTotal, setPrecioTotal] = useState(0);

    const changePrecio = (valor) => {
        setPrecioTotal(precioTotal + valor)
    }
    useEffect( () => {

		axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
                setClientCart(res.data)

				})
        }, [recargo,precioTotal]);
        

    const carrito = Object.values(clientCart.cart)
    return(
        <React.Fragment>
            <CssBaseline />
            <GeneralAppBar/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container maxWidth="md">
                {carrito.length > 0 ? carrito.map(item =>{return(<CardList currentItem={item} efecinco={efecinco} efecinco2={efecinco2} changePrecio={changePrecio} key={item}/>)}) : <Typography variant="h2" component="h2" align="center">Tu carrito esta vacío <ShoppingCartIcon fontSize="large"/></Typography>}
                <Divider />
            </Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container maxWidth="sm">
                {carrito.length > 0 ? <PriceTotal precioTotal={precioTotal}  marca={marca}/> : <div></div>}
            </Container> 
            <br/>
            <br/>
            <br/>
        </React.Fragment>
    );
}