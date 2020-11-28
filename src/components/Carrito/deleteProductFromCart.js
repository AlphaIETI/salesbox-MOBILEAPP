import React from 'react';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Button } from 'reactstrap';

export default function deleteProductFromCart(props){

    const handleDeleteItem = async() => {

        let user = {};
        

        await axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
				user = res.data
				})

        let valor = -1;
        for (var i=0; i<user.cart.length;i++){
            if(user.cart[i] === (props.idproduct)){
                valor = i
            }
        }
        if(valor === -1){
            console.log("no hay item encontrado");
        }else{
            console.log(valor)
            user.cart.splice(valor,1);
            props.changePrecio(-props.precioItem*props.cantidadItem);
        }
        

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
            props.efecinco(1);
        }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }

    return(
        <div style={{float:'left'}}>
            <Button onClick={handleDeleteItem}>
                <DeleteForeverIcon ></DeleteForeverIcon>
            </Button>
        </div>
    );

}



