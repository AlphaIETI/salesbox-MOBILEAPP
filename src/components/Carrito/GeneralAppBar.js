import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import logo from '../../logo.png';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
       
    },
    toolbar:{
        backgroundColor: '#272C2A'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    colorIcons:{
        color: '#8A9592'

    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    const [user, setUser] = React.useState({fav:0,car:0,tran:0,coup:0});

    useEffect( () => {
        if(localStorage.getItem('emailClient') !== null){
            axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
                setUser({fav:res.data.favorites.length,car:res.data.cart.length,tran:0,coup:0})
				})
            }
        }, [user]);

    return (
        <div className={classes.root}>
            <AppBar  position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    <Link to="/Home" className={classes.colorSalesBox}>
                    <img src={logo} alt="logo" style={{height: '16px', position: 'relative', top: '0px'}} />
                    </Link>
                    </Typography>
                    <Link to="/Home">
                        <IconButton >
                            <HomeOutlinedIcon fontSize="medium"  className={classes.colorIcons}/>
                        </IconButton>
                    </Link>
                    <Link to="/Favorites">
                        <IconButton >
                            <Badge badgeContent={user.fav} color="secondary">
                                <FavoriteBorderOutlinedIcon fontSize="medium"   className={classes.colorIcons}/>
                            </Badge>
                        </IconButton>
                    </Link>
                    <Link to="/ShopCar">
                        <IconButton aria-label="cart">
                            <Badge badgeContent={user.car} color="secondary">
                                <ShoppingCartOutlinedIcon fontSize="medium"  className={classes.colorIcons}/>
                            </Badge>
                        </IconButton> 
                    </Link>
                    <Link to="/EstadoPedido">
                        <IconButton aria-label="cart">
                            <Badge  color="secondary">
                                <AssignmentOutlinedIcon fontSize="medium" className={classes.colorIcons}/>
                            </Badge>
                        </IconButton> 
                    </Link>
                    <Link to="/Coupons">
                        <IconButton aria-label="cart">
                            <Badge badgeContent={user.coup} color="secondary">
                                <ConfirmationNumberOutlinedIcon fontSize="medium"  className={classes.colorIcons}/>
                            </Badge>
                        </IconButton> 
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}