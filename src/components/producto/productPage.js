import React, { useEffect } from 'react';
import './ProductPage.css';
import ColorView from './Colors'
import DetailsThumb from './DetailsThumb';
import AppBarComponent from '../dashboard/appBar';
import TextField from '@material-ui/core/TextField';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import ButtonProductToCar from '../Carrito/addProductToCart';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';

export default function ProductPage () { 

    let urlParams = new URLSearchParams(window.location.search);
    let myParam = urlParams.get('id');
    let BACKENDAPI = 'https://salesbox-alpha-backend.herokuapp.com/';
    let myRef = React.createRef();
    const [pr, setPr] = React.useState({id:1,brand:"",images:[""],colors:["white"],description:"",size:[""]});
    const [imagesP, setImageP] = React.useState([pr.images])
    const [colors, setColors] = React.useState([pr.colors])
    useEffect (() => {
      fetch(BACKENDAPI+'products/'+myParam, {
          method: 'GET'
      }).then(response => response.json())
          .then(data => {
              setPr(data)
              setImageP(data.images)
              setColors(data.colors)
          }).catch(error => {
              console.log(error)
          });
      myRef.current.children[index].className = "active";
      },[pr]);
    
    const [index,setIndex] = React.useState(0);
    let images = [];
    const handleTab = (index) => {
        setIndex(index);
        images = myRef.current.children;
        for(let i=0; i<images.length; i++){
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    }
    const handleUpdate=() => {
        if(document.getElementById("productName").value !== "" && document.getElementById("productDescription").value !== "" && document.getElementById("priceOriginal").value !== "" && document.getElementById("discount").value !== "" && document.getElementById("productAvailable").value !== "" ){
            let product = {id:pr.id,name:document.getElementById("productName").value,brand:pr.brand,description:document.getElementById("productDescription").value,colors:pr.colors,price:document.getElementById("priceOriginal").value,discount:document.getElementById("discount").value,images:pr.images,size:pr.size,category:pr.category,gender:pr.gender,stockAvailable:document.getElementById("productAvailable").value};
            console.log(product)
            fetch(BACKENDAPI+'products' , { 
                method:'PUT',
                headers:{
                'Content-Type': 'application/json ',
                'Accept': 'application/json',
                },
                body:JSON.stringify(product)
            }).then(function(response) {
                    if(response.ok){
                        response.json().then(function(res) {
                            console.log(res)
                            setPr(res)
                        })
                        
                    }else{
                        console.log('Respuesta de red OK pero respuesta HTTP no OK');
                    }
                }).catch(function(error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                });
            }
        else{
            alert("No se completaron todos los campos")
        }
    }

    return(
        <div>
            <AppBarComponent />
            {localStorage.getItem('isAdmin') ? 
                <div className="app">
                    <div className="details" key={pr.id}>
                        <div className="big-img">
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <img src={pr.images[index]} alt=""/>
                        </div>
        
                        <div className="box">
                            <div className="row">
                                <h3>{pr.brand}</h3>
                            </div>
                            <div>
                                <TextField
                                        margin="dense"
                                        id="priceOriginal"
                                        label="Precio Original"
                                        type="number"
                                        defaultValue={pr.price}
                                    />
                            </div>
                            <div>
                             <TextField
                                    margin="dense"
                                    id="discount"
                                    label="Descuento"
                                    type="number"
                                    defaultValue={pr.discount}
                                />
                            <div>
                            <TextField
                                    margin="dense"
                                    id="productName"
                                    label="Nombre del producto"
                                    type="text"
                                    defaultValue={pr.name}
                                />
                                
                            <div>
                            <TextField
                                    margin="dense"
                                    id="productDescription"
                                    label="Descripción del producto"
                                    type="text"
                                    defaultValue={pr.description}
                                />
                            </div>
                            <div>
                            <TextField 
                                margin="dense"
                                id="productAvailable"
                                label="Unidades disponibles"
                                type="text"
                                defaultValue={pr.stockAvailable}
                                    />
                            </div>
                            <div>
                            <TextField 
                                disabled
                                margin="dense"
                                id="productGender"
                                label="Género"
                                type="text"
                                defaultValue={pr.gender}
                                    />
                            </div>
                            <div>
                            <TextField 
                                disabled
                                margin="dense"
                                id="productCategoryr"
                                label="Categoría"
                                type="text"
                                defaultValue={pr.category}
                                    />
                            </div>
                            </div>
                                <h6>Colores disponibles:</h6>
                                <ColorView colors={colors}/>
                            </div>
                            <div style={{display:'flex'}}>
                                <h6>Tallas disponibles: </h6>
                                {pr.size.map(sz => (
                                    <h6>{sz + ","}</h6>
                                ))}
                            </div>
                            <DetailsThumb images={imagesP} tab={handleTab} myRef={myRef} />
                            <Button onClick = {event => handleUpdate()}>
                                    <SaveIcon fontSize="small" /> 
                                        <h6>Guardar</h6>
                            </Button>
        
                        </div>
                    </div>
                </div>

                :

                <div className="app">
                    <div className="details" key={pr.id}>
                        <div className="big-img">
                            <img src={pr.images[index]} alt=""/>
                        </div>
        
                        <div className="box">
                            <div className="row">
                                <h3>{pr.brand}</h3>
                                <h4 className="precioTotal">-{pr.discount}%</h4>
                                <span className="precioOrigi" style={{color:'black'}}>${pr.price}</span>
                                <span className="precioTotal">${pr.price-(pr.price*(pr.discount/100))}</span>
                            </div>
                            <h4>{pr.name}</h4>
                            <div>
                                <h6>Colores disponibles:</h6>
                                <ColorView colors={colors}/>
                            </div>
                            <div style={{display:'flex'}}>
                                <h6>Tallas disponibles: </h6>
                                {console.log(pr)}
                                {pr.size.map(sz => (
                                    <h6>{sz + ","}</h6>
                                ))}
                            </div>
                            <h6>Categoría: {pr.category}</h6>
                            <h6>Género: {pr.gender}</h6>
                            <h6>Descripción: {pr.description}</h6>
                            <h6>Disponibles: {pr.stockAvailable}</h6>
                            <DetailsThumb images={imagesP} tab={handleTab} myRef={myRef} />
                            <ButtonProductToCar idProduct={pr.id}/>
                        </div>
                    </div>
                </div>

    }

        </div>

      );
}