import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import GeneralAppBar from '../dashboard/appBar';
import CouponsList from './CouponsList.js';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: 'flex',
  },
  media: {
    height: 140,
  },
  actionSpacer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Coupons(props) {
  const classes = useStyles();
  const[cliente,setClientCoupons] = useState(
    {"id":"",
    "name":"",
    "lastname":"",
    "email":"",
    "password":"",
    "coupons":"",
    "phone":"",
    "address":"",
    "age":"",
    "sizeUp":"",
    "sizeDown":"",
    "shoeSize":"",
    "cart":"",
    "favorites":""
});
  /* useEffect(() => {
    fetch('https://salesbox-alpha-backend.herokuapp.com/api/coupons', {
      method: 'GET'
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        data.map(pr => {
          setCoupons(data);
        })
      }).catch(error => {
        console.log(error)
      });
  }, []); */

  useEffect( () => {

		axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
          setClientCoupons(res.data)
				})
        }, []);

  const coupons = Object.values(cliente.coupons);

  


  return (

    <div>
      <main>
        <GeneralAppBar ></GeneralAppBar>
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={1} className={classes.actionSpacer}> 
            {coupons.map(c => (
              <Grid xs={12} sm={6} md={4} lg={4} xl={2} item>
                <CouponsList item={c}></CouponsList>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
}