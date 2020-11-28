import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterCenterFocusOutlinedIcon from '@material-ui/icons/FilterCenterFocusOutlined';

export default function PublicityProduct(props) {
    const [openForm, setOpenForm] = React.useState(false);

    const BACKENDAPI = 'https://salesbox-alpha-backend.herokuapp.com/';

    const handleAddProd = () => {
        if(document.getElementById("descripcion").value !== ""){
            if(props.promotion !== undefined){
                let promotion = {id:"",brand:props.promotion.brand,image:props.promotion.images[0],description:document.getElementById("descripcion").value,type:"Product",idProduct:props.promotion.id}
                addPromotionDB(promotion);
                setOpenForm(false);
            }                    
        }else{
            alert("No se completaron todos los datos de la publicidad.") 
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
                    refreshCantPublicity();
                }else{
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }

    const refreshCantPublicity = () => {
        let putEntity = JSON.parse(localStorage.getItem('entity'));
        putEntity.publicity = putEntity.publicity - 1;
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
    }

    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen} color="secondary">   
                Promocionar <FilterCenterFocusOutlinedIcon fontSize="small" />
            </Button>
            <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar Publicidad al Producto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Complete los datos de la publiciadad.
                    </DialogContentText>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAddProd} color="primary">
                        Publicar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}