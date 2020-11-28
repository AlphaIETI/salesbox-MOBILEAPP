import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import IconButton from '@material-ui/core/IconButton';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';


export default function CouponsInfo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyButton=()=>(

  <IconButton>
    <FilterNoneIcon />
  </IconButton>


  )

  

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      <PermDeviceInformationIcon></PermDeviceInformationIcon>
      </Button>
      <Button onClick={handleClose} color="primary">
        Redimir
      </Button> 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Términos y condiciones"}</DialogTitle>
        <DialogContent>
          Los cupones no son reembolsables, pueden utilizarse en una sola compra de uno o más articulos adquiridos a través de www.salesbox.com.co y no pueden ser canjeados por dinero en efectivo. Aplica Términos y Condiciones del Servicio disponibles en www.salesbox.com.co
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Aceptar 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
