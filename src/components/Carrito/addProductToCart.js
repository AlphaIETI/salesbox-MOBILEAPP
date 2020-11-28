import React from 'react';
import Button from '@material-ui/core/Button';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import axios from 'axios';

export default function addProductToCart(props){

    const handleAddProductCarrito = async() => {

        let user = {};
        

        await axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
				user = res.data
				})

        let itemRepetido = false;
        user.cart.map(item => {
            if(item === props.idProduct){
                itemRepetido = true;
            }
        });
        if(!itemRepetido){
            user.cart.push(props.idProduct);
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
                        //console.log(res);
                    })
                }else{
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }

    return(
        <div style={{float:'left'}}>
            {localStorage.getItem('isLoggedIn') ? 
            <Button color="secondary" onClick={handleAddProductCarrito}>
                Añadir  <AddShoppingCartOutlinedIcon fontSize="small"/> 
            </Button>
            :null}
            
        </div>
    );

}
