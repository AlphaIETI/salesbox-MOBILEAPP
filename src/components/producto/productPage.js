import React, { useEffect } from 'react';
import './ProductPage.css';
import ColorView from './Colors'
import DetailsThumb from './DetailsThumb';
import AppBarComponent from '../dashboard/appBar';
import TextField from '@material-ui/core/TextField';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import ButtonProductToCar from '../Carrito/addProductToCart';

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
              console.log(data)
              setPr(data)
              setImageP(data.images)
              setColors(data.colors)
          }).catch(error => {
              console.log(error)
          });
      myRef.current.children[index].className = "active";
      },[]);
    
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

    return(
        <div>
            <AppBarComponent />
            {localStorage.getItem('isAdmin') ? 
                <div className="app">
                    <div className="details" key={pr.id}>
                        <div className="big-img">
                            <img src={pr.images[index]} alt=""/>
                        </div>
        
                        <div className="box">
                            <div className="row">
                                <h3>{pr.brand}</h3>
                            </div>
                            <div className="row">
                                <TextField value={pr.discount} disabled={false}/>
                                <span className="precioOrigi">${pr.price}</span>
                                <span className="precioTotal">${pr.price-(pr.price*(pr.discount/100))}</span>
                            </div>
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
                            <h4>{pr.name}</h4>
                            <TextField value={pr.category} disabled={false} />
                            <h6>Género: {pr.gender}</h6>
                            <h6>Descripción: {pr.description}</h6>
                            <TextField value={pr.stockAvailable} disabled={false} />
                            <DetailsThumb images={imagesP} tab={handleTab} myRef={myRef} />
        
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