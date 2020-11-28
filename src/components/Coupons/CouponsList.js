import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CouponsInfo from "./CouponsInfo";


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

export default function CouponsList(props){
    const classes = useStyles();

    const [couponData, setCouponData] = useState(
        {"id":"",
        "percentage":"",
        "brand":"",
        "endDate":"",
        "image":"",
        "clientId":""
    });

    useEffect( () => {

		axios.get('https://salesbox-alpha-backend.herokuapp.com/api/coupons/'+ props.item)
			.then(res => {
                setCouponData(res.data)
				})
        }, []);

    return(
        <div>
            <Card className={classes.root}>
                  <CardActionArea>

                    <CardMedia
                      className={classes.media}
                      image={couponData.image}
                      title="Contemplative Reptile"
                      
                    />
                    
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="h2">
                        Coupon
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {couponData.percentage}
                      </Typography>
                      <Typography variant="subtitle" color="textSecondary">
                        {couponData.endDate}
                      </Typography>
                      
                      <CouponsInfo></CouponsInfo>
                
                    </CardContent>
                  </CardActionArea>
                  
                </Card>
        </div>
    );
}

