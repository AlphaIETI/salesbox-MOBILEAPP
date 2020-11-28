import React from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Fab } from '@material-ui/core';
import LinearProgressWithLabel from '../dashboard/progressUpload';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PayForm from '../dashboard/pay';
import FilterCenterFocusOutlinedIcon from '@material-ui/icons/FilterCenterFocusOutlined';
import Badge from '@material-ui/core/Badge';

export default function NewPromotion(props) {
    const [openForm, setOpenForm] = React.useState(false);
    const [fileInputState, setFileInputState] = React.useState('');
    const [previewSource, setPreviewSource] = React.useState();
    const [file, setFile]= React.useState();
    const [urlImg, setUrlImg] = React.useState("");
    const [typePlan, setTypePlan] = React.useState("");
    const [upload, setUpload] = React.useState(false);
    const [costPlan, setCostPlan]= React.useState(0);
    const [cantPublicity, setCantPublicity] = React.useState(JSON.parse(localStorage.getItem('entity')).publicity);

    const CLOUDINARY_URL_PREVIEW = 'https://res.cloudinary.com/deavblstk/image/upload/v';
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/deavblstk/image/upload';
    const CLOUDINARY_PRESETS = 'qc96w20m';
    const BACKENDAPI = 'https://salesbox-alpha-backend.herokuapp.com/';
    const stripePromise = loadStripe("pk_test_51Ho9rpF1htJOe8dSfeVP7oQevfWZKOImQEq6UWbTqSOAzed0dqRwjr0Ulot7DewnIZ526BDimuZ01cjM3TGy1QPW00enKhFo7q");

    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_PRESETS);
        const res = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setUrlImg(CLOUDINARY_URL_PREVIEW+res.data.version+"/"+res.data.public_id+"."+res.data.format);
        if(res.statusText==="OK"){
            setUpload(true);
        }
    };

    const handleFileImg = (e) => {
        const file1 = e.target.files[0];
        setFile(file1);
        const reader = new FileReader();
        reader.readAsDataURL(file1);
        reader.onloadend = () =>{
            setPreviewSource(reader.result);
        }
    };

    const handleAddProd = (pay) => {
        if(pay){
            if(typePlan !== ""){
                if(typePlan === "Enterprise" && document.getElementById("descripcion").value !== ""){
                    if(urlImg !== ""){
                        let promotion = {id:"",brand:localStorage.getItem('nameEntity'),image:urlImg,description:document.getElementById("descripcion").value,type:"Entity"}
                        addPromotionDB(promotion);
                        setPreviewSource();
                        setUrlImg("");
                        setUpload(false);
                        setOpenForm(false);
                    }
                    else{
                        alert("No se completaron los datos de la publicidad.")
                    }
                }else{
                    //Sumar cantidad de promociones en productos.
                    let putEntity = JSON.parse(localStorage.getItem('entity'));
                    let cantPubAct = JSON.parse(localStorage.getItem('entity')).publicity;
                    if(typePlan === "Basic"){
                        putEntity.publicity = putEntity.publicity + 2;
                        setCantPublicity(cantPubAct + 2);
                    }else{
                        putEntity.publicity = putEntity.publicity + 5;
                        setCantPublicity(cantPubAct + 5);
                    }
                    fetch(BACKENDAPI + 'api/entities', { 
                        method:'PUT',
                        headers:{
                            'Content-Type': 'application/json ',
                            'Accept': 'application/json',
                        },
                        body:JSON.stringify(putEntity),
                    }).then(function(response) {
                        
                            if(response.ok){
                                response.json().then(function(res) {
                                    localStorage.setItem("entity",JSON.stringify(res));
                                })
                            }else{
                                console.log('Respuesta de red OK pero respuesta HTTP no OK');
                            }
                        }).catch(function(error) {
                            console.log('Hubo un problema con la petición Fetch:' + error.message);
                        });
                    setOpenForm(false);
                    }
            }else{
                alert("No se completaron todos los datos de la publicidad.")
            }
        }
    }

    const addPromotionDB = (promotion) => {
        fetch(BACKENDAPI+'api/promotions' , { 
            method:'POST',
            headers:{
              'Content-Type': 'application/json ',
              'Accept': 'application/json',
            },
            body:JSON.stringify(promotion)
          }).then(function(response) {
                if(response.ok){
                    response.json().then(function(res) {
                    })
                    props.cantPromo(1);
                }else{
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }

    const handleChangeTypePlan = (e) => {
        if(e.target.value === "Enterprise"){
            setCostPlan(20000);
        }else if(e.target.value === "Basic"){
            setCostPlan(25000);
        }else{
            setCostPlan(50000);
        }
        setTypePlan(e.target.value);
    }

    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setPreviewSource();
        setUpload(false);
        setOpenForm(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <Badge badgeContent={cantPublicity} color="secondary">      
                    <FilterCenterFocusOutlinedIcon fontSize="medium" style={{color:"#8A9592"}}/>
                </Badge>
            </IconButton>
            <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar Publicidad Nueva</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Complete los datos de la publiciadad.
                    </DialogContentText>
                    <InputLabel id="demo-mutiple-name-label">Planes de publicidad</InputLabel>
                    <Select
                        required
                        value={typePlan}
                        id="tipoPlan"
                        labelId="demo-mutiple-name-label"
                        margin="dense"
                        displayEmpty
                        variant="outlined"
                        onChange={handleChangeTypePlan}
                        fullWidth
                    >
                        <MenuItem value="Enterprise">Publicidad de Marca</MenuItem>
                        <MenuItem value="Basic">Publicidad de 2 Productos</MenuItem>
                        <MenuItem value="Premium">Publicidad de 5 Productos</MenuItem>
                    </Select>
                    {typePlan === "Enterprise" ?
                        <div>
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="descripcion"
                                label="Descripción"
                                variant="outlined"
                                type="text"
                                inputProps={{
                                    maxLength: 110,
                                }}
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
                                    . Selecciona la imagen de la publicidad
                                </Fab>
                                {previewSource && (
                                    <div>
                                        <img src={previewSource} alt="chosen" style={{height: '300px'}}/>
                                        <Button onClick={handleSubmit} color="primary">
                                            Subir Imagen
                                        </Button>
                                        {upload ? 
                                            <LinearProgressWithLabel state={10}/>
                                            :
                                            <LinearProgressWithLabel state={0}/>
                                        }
                                    </div>
                                )}
                            </label>
                            </div>
                        </div>
                        :
                        null
                    }
                    <DialogContentText>
                        Valor publicidad: ${costPlan}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Elements stripe={stripePromise}>
                        <PayForm addProd={handleAddProd} />
                    </Elements>
                </DialogActions>
            </Dialog>
        </div>
    );
}