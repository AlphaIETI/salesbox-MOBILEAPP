import React from 'react';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';


export default function addProductToFavs(props){

    const handleAddProductFavorites = async () => {

        let user = {};
        

        await axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
				user = res.data
                })
                

        let flag = false;
        user.favorites.map(item => {
            if(item === props.idProduct){
                flag = true;
            }
        });
        if(!flag){
            user.favorites.push(props.idProduct);
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
                    //console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }

    return(
        <div style={{float:'left'}}>
            {localStorage.getItem('isLoggedIn') ?
                <Button color="secondary" onClick={handleAddProductFavorites}>
                    <FavoriteBorderIcon fontSize="small"/>
                </Button>
            :null}
            
        </div>
    );

}




















