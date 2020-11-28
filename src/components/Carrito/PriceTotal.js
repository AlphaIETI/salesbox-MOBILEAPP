import React from 'react';
import "./PriceTotal.css";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Divider} from "@material-ui/core";
import PaymentIcon from '@material-ui/icons/Payment';
import axios from 'axios';



export default function PriceTotal(props){

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 20,
            marginBottom: 12,
        },
        pos: {
            marginBottom: 10,
            marginTop:10,
        },
        pos2: {
            marginBottom: 10,
            marginTop:25,
        },

    });

    const valor = props.precioTotal;

    const options1 = { style: 'currency', currency: 'USD' };
    const numberFormat1 = new Intl.NumberFormat('en-US', options1);

    const valorFormato = numberFormat1.format(valor)


    const classes = useStyles();
    
    const generateCoupon =  async()  => {
        let user = {};
        

        await axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
				user = res.data
				})

        /* let itemRepetido = false;
        user.cart.map(item => {
            if(item === props.idProduct){
                itemRepetido = true;
            }
        });
        if(!itemRepetido){
            user.cart.push(props.idProduct);
        } */

        /* console.log(props.marca);
        console.log(JSON.parse(localStorage.getItem('client')).id.toString()); */

        //user.coupons.push('0004');

        const info = {
            id: props.marca,
            brand: JSON.parse(localStorage.getItem('client')).id.toString()
        }

        fetch('https://salesbox-alpha-backend.herokuapp.com/api/coupons', { 
            method:'POST',
            headers:{
                'Content-Type': 'application/json ',
                'Accept': 'application/json',
              },
            body:JSON.stringify(info),
          }).then(function(response) {
              
                if(response.ok){
                    response.json().then(function(res) {
                        console.log(res);
                    })
                }else{
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });


        const newUser = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            coupons: user.coupons,
            phone: user.phone,
            address: user.address,
            age:user.age,
            sizeUp: user.sizeUp,
            sizeDown:user.sizeDown,
            shoeSize:user.shoeSize,
            cart: user.cart,
            favorites: user.favorites
        }

        fetch('https://salesbox-alpha-backend.herokuapp.com/clients', { 
            method:'PUT',
            headers:{
                'Content-Type': 'application/json ',
                'Accept': 'application/json',
              },
            body:JSON.stringify(newUser),
          }).then(function(response) {
              
                if(response.ok){
                    response.json().then(function(res) {
                        console.log(res);
                    })
                }else{
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }


    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} gutterBottom  >
                    <label>TOTAL DEL CARRITO</label>
                </Typography>
                <div className='division'>
                    <div className="leftColumn">
                        <Typography className={classes.pos2} variant="h5" component="h2" color="textSecondary" >
                            <label>Subtotal</label>
                        </Typography>
                    </div>
                    <div className="rightColumn">
                        <Typography className={classes.pos} color="textSecondary">
                            
                            <label>{valorFormato}</label>
                        </Typography>
                    </div>
                </div>
                <Divider/>
                <div className='division'>
                    <div className="leftColumn">
                        <Typography className={classes.pos} color="textSecondary" >
                            <label>Envío</label>
                        </Typography>
                    </div>
                    <div className="rightColumn">
                        <Typography className={classes.pos} color="textSecondary">
                            <label>$0</label>
                        </Typography>
                    </div>
                </div>
                <Divider/>
                <div className='division'>
                    <div className="leftColumn">
                        <Typography className={classes.pos} variant="h5" component="p" >
                            <label>Total</label>
                        </Typography>
                    </div>
                    <div className="rightColumn">
                        <Typography className={classes.pos} variant="h5" component="p" >
                            <label>{valorFormato}</label>
                        </Typography>
                    </div>
                </div>
                <Divider/>
                <Typography variant="body2" component="p">
                    <Button size="large" color="primary" variant="contained" onClick={generateCoupon}>
                        <label>PAGAR</label>
                        <PaymentIcon/>
                    </Button>
                </Typography>
            </CardContent>
        </Card>
    );
}