import React, { useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import QueueOutlinedIcon from '@material-ui/icons/QueueOutlined';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { OutlinedInput } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Fab } from '@material-ui/core';
import LinearProgressWithLabel from './progressUpload';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

export default function NewProd(props) {
    const [openForm, setOpenForm] = React.useState(false);
    const [fileInputState, setFileInputState] = React.useState('');
    const [previewSource, setPreviewSource] = React.useState();
    const [file, setFile]= React.useState();
    const [urlImg, setUrlImg] = React.useState([]);
    const [typeProd, setTypeProd] = React.useState("");
    const [typeGen, setTypeGen] = React.useState("");
    const [colorProd, setColorProd] = React.useState("");
    const [upload, setUpload] = React.useState(false);

    const [sizes, setSizes] = React.useState([]);
    const handleChange = (event) => {
        setSizes(event.target.value);
      };
    
    const [sizeList, setSizeList] = React.useState([]);

    useEffect (() => {
        setSizes([]);
        if(typeProd !== "" && typeGen !== ""){
            if(typeProd === "Ropa"){
                setSizeList(['XS','S','M','L','XL','XXL']);
            }else if(typeProd === "Tenis" || typeProd === "Deportes"){
                if(typeGen === "Mujeres" || typeGen === "Hombres" || typeGen === "Unisex"){
                    setSizeList(["28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43"]);
                }else if (typeGen === "Niños"){
                    setSizeList(["15","16","17","18","19","20","21","22","23","24","25","26","27"]);
                }
            }else{
                setSizeList(['Talla Única']);
            }
        }
        },[typeProd,typeGen]);

    const CLOUDINARY_URL_PREVIEW = 'https://res.cloudinary.com/deavblstk/image/upload/v';
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/deavblstk/image/upload';
    const CLOUDINARY_PRESETS = 'qc96w20m';
    const BACKENDAPI = 'https://salesbox-alpha-backend.herokuapp.com/';

    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_PRESETS);
        const res = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if(res.statusText==="OK"){
            setUrlImg(urlImg => [...urlImg, CLOUDINARY_URL_PREVIEW+res.data.version+"/"+res.data.public_id+"."+res.data.format])
            setUpload(true);
        }
    };

    const handleFileImg = (e) => {
        setUpload(false);
        const file1 = e.target.files[0];
        setFile(file1);
        const reader = new FileReader();
        reader.readAsDataURL(file1);
        reader.onloadend = () =>{
            setPreviewSource(reader.result);
        }
    };

    const addProductDB = (product) => {
        fetch(BACKENDAPI+'products' , { 
            method:'POST',
            headers:{
              'Content-Type': 'application/json ',
              'Accept': 'application/json',
            },
            body:JSON.stringify(product)
          }).then(function(response) {
                if(response.ok){
                    response.json().then(function(res) {
                    })
                    props.editProducts(1);
                }else{
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }

    const handleAddProd = () => {
        if(document.getElementById("name").value !== "" && document.getElementById("descripcion").value !== "" && document.getElementById("precio").value !== "" && document.getElementById("descuento").value !== "" && typeProd !== "" && typeGen !== "" && colorProd !== "" && sizes.length !== 0 && document.getElementById("cantidadDisponible").value !== "" && urlImg.length !== 0){
            const pr = {id:"",name:document.getElementById("name").value,brand:localStorage.getItem('nameEntity'),description:document.getElementById("descripcion").value,colors:[colorProd],price:document.getElementById("precio").value,discount:document.getElementById("descuento").value,images:urlImg,size:sizes,category:typeProd,gender:typeGen,stockAvailable:document.getElementById("cantidadDisponible").value};
            addProductDB(pr);
            setPreviewSource();
            setTypeProd("");
            setTypeGen("");
            setColorProd("");
            setUrlImg([]);
            setUpload(false);
            setSizes([]);
            setSizeList([]);
            setOpenForm(false);
        } else {
            alert("No se completaron todos los datos del Producto.")
        }
    }
    const handleChangeTypeProd = (e) => {
        setTypeProd(e.target.value);
    }

    const handleChangeTypeGen = (e) => {
        setTypeGen(e.target.value);
    }

    const handleChangeColorProd = (e) => {
        setColorProd(e.target.value);
    }

    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setPreviewSource();
        setUrlImg([]);
        setUpload(false);
        setOpenForm(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <QueueOutlinedIcon fontSize="medium" style={{color:"#8A9592"}}/>
            </IconButton>
            <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar Producto Nuevo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Complete todos los datos del producto.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        type="text"
                        inputProps={{
                            maxLength: 30,
                          }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="descripcion"
                        label="Descripción"
                        variant="outlined"
                        type="text"
                        inputProps={{
                            maxLength: 50,
                          }}
                        fullWidth
                    />
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="precio">Precio</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="precio"
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            labelWidth={60}
                        />
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="descuento"
                        label=" % de descuento"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { max: 100, min: 0 } }}
                        fullWidth
                    />
                    <InputLabel id="demo-mutiple-name-label">Categoria</InputLabel>
                    <Select
                        value={typeProd}
                        id="tipoProducto"
                        labelId="demo-mutiple-name-label"
                        margin="dense"
                        displayEmpty
                        variant="outlined"
                        onChange={handleChangeTypeProd}
                        fullWidth
                    >
                        <MenuItem value="Tenis">Zapatos</MenuItem>
                        <MenuItem value="Ropa">Ropa</MenuItem>
                        <MenuItem value="Accesorios">Accesorios</MenuItem>
                        <MenuItem value="Deportes">Deportes</MenuItem>
                    </Select>
                    <InputLabel id="demo-mutiple-name-label">Género</InputLabel>
                    <Select
                        value={typeGen}
                        id="generoProducto"
                        labelId="demo-mutiple-name-label"
                        margin="dense"
                        displayEmpty
                        variant="outlined"
                        onChange={handleChangeTypeGen}
                        fullWidth
                    >
                        <MenuItem value="Hombres">Hombres</MenuItem>
                        <MenuItem value="Mujeres">Mujeres</MenuItem>
                        <MenuItem value="Niños">Niños</MenuItem>
                        <MenuItem value="Unisex">Unisex</MenuItem>
                    </Select>
                    {typeProd !== "" && typeGen !== "" ?
                        <FormControl fullWidth>
                            <InputLabel id="demo-mutiple-checkbox-sizes">Tallas</InputLabel>
                            <Select
                            labelId="demo-mutiple-checkbox-sizes"
                            id="sizes"
                            multiple
                            value={sizes}
                            onChange={handleChange}
                            renderValue={(selected) => selected.join(', ')}
                            >
                            
                            {sizeList.map((size) => (
                                <MenuItem key={size} value={size}>
                                <Checkbox checked={sizes.indexOf(size) > -1} />
                                <ListItemText primary={size} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        :
                        null
                    }
                    <InputLabel id="demo-mutiple-name-label-color">Color</InputLabel>
                    <Select
                        value={colorProd}
                        id="productoColor"
                        labelId="demo-mutiple-name-label-color"
                        margin="dense"
                        displayEmpty
                        variant="outlined"
                        onChange={handleChangeColorProd}
                        fullWidth
                    >
                        <MenuItem value="Negro">Negro</MenuItem>
                        <MenuItem value="Blanco">Blanco</MenuItem>
                        <MenuItem value="Gris">Gris</MenuItem>
                        <MenuItem value="Azul">Azul</MenuItem>
                        <MenuItem value="Rojo">Rojo</MenuItem>
                        <MenuItem value="Cafe">Café</MenuItem>
                        <MenuItem value="Amarillo">Amarillo</MenuItem>
                        <MenuItem value="Morado">Morado</MenuItem>
                        <MenuItem value="Verde">Verde</MenuItem>
                        <MenuItem value="Rosado">Rosado</MenuItem>
                        <MenuItem value="Anaranjado">Anaranjado</MenuItem>
                    </Select>
                    <TextField
                        margin="dense"
                        id="cantidadDisponible"
                        label="Cantidad Disponible"
                        variant="outlined"
                        type="number"
                        fullWidth
                    />
                    <div>
                    <label htmlFor="upload-photo" >
                        <input 
                            style={{ display: 'none' }}
                            id="upload-photo" 
                            type="file" 
                            name="image" 
                            onChange={handleFileImg} 
                            value={fileInputState} 
                        />
                        <Fab
                            style={{ width: '400px', margin: '0 auto' }}
                            size="small"
                            component="span"
                            aria-label="add"
                            variant="extended"
                        >
                            <CloudUploadIcon />
                            . Selecciona las imagenes del producto
                        </Fab>
                        {previewSource && (
                            <div>
                                <img src={previewSource} alt="chosen" style={{height: '300px'}}/>
                                {!upload ?
                                    <Button onClick={handleSubmit} color="primary">
                                        Subir Imagen
                                    </Button>
                                    :
                                null
                                }
                                {upload ? 
                                    <LinearProgressWithLabel state={10}/>
                                    :
                                    <LinearProgressWithLabel state={0}/>
                                }
                            </div>
                        )}
                    </label>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={handleAddProd} color="primary">
                    Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}