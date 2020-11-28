import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import useResponsiveFontSize from './useResponsiveFontSize';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const PayForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    if(payload.error === undefined){
        setOpenForm(false);
        props.addProd(true);
    }else{
        alert(payload.error.message)
        props.addProd(false);
    }
  };

  const [openForm, setOpenForm] = React.useState(false);
  const handleClickOpen = () => {
    setOpenForm(true);
  };
  const handleClose = () => {
    setOpenForm(false);
  }

  return (
    <div>
        <IconButton onClick={handleClickOpen}>
            Comprar <CreditCardOutlinedIcon fontSize="large" />
        </IconButton>
        <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Pago con tarjeta de credito</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Complete los datos de la tarjeta de credito.
                </DialogContentText>
                    <CardElement
                        options={options}
                    />
            </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={!stripe} color="primary">
                    Pagar
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
};

export default PayForm;