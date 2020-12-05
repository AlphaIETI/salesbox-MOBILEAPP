import React, {useEffect} from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccordionComponent from './accordion';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import Perfil from '../perfil/Perfil';
import Avatar from "@material-ui/core/Avatar";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import AddProd from './addProd';
import AddPromotion from '../promotion/addPromotion';
import axios from 'axios';
import logo from '../../logo.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24,
        backgroundColor: '#272C2A'// keep right padding when drawer closed
    },
    colorIcons:{
        color: '#8A9592'

    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor:'#272C2A',
    },
    drawerProfile:{
        backgroundColor:'#272C2A',
    },
    drawerHeader: {
        backgroundColor: '#272C2A',
        color: "white",
    },
    textColor: {
        color: 'white',
    },
    colorSalesBox: {
        color: "white"
    },
    customBadge: {
        backgroundColor: "#00AFD7",
        color: "white"
      }
}));

export default function AppBarComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
        if(props.funStateDrawer !== undefined){
            props.funStateDrawer(true);
        }
    };
    const handleDrawerClose = () => {
        setOpen(false);
        if(props.funStateDrawer !== undefined){
            props.funStateDrawer(false);
        }
    };
    const handleDrawer2 = () => {
        setOpen2(true);
    };

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
        <div>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            {props.flagProducts ?
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                :
                null
            }
            
            <Typography component="h1" variant="h6" noWrap className={classes.title}>
                <Link to="/Home" className={classes.colorSalesBox}>
                <img src={logo} alt="logo" style={{ height: '16px', position: 'relative', top: '0px', filter:"brightness(1)"}} />
                </Link>
            </Typography>
 
            {!localStorage.getItem('isAdmin') ?
            <div>
                <Link to="/Home">
                    <IconButton >
                        <HomeOutlinedIcon fontSize="medium" className={classes.colorIcons} />
                    </IconButton>
                </Link>
            </div>
            :
            null
            }
            {localStorage.getItem('isLoggedIn') && !localStorage.getItem('isAdmin') && true ?
                <div>
                    <Link to="/Favorites">
                        <IconButton >
                            <Badge badgeContent={user.fav} color="secondary" >
                                <FavoriteBorderOutlinedIcon  fontSize="medium" className={classes.colorIcons}/>
                            </Badge>
                        </IconButton>
                    </Link>
                    <Link to="/ShopCar">
                        <IconButton aria-label="cart">
                            <Badge badgeContent={user.car} color="secondary">
                                <ShoppingCartOutlinedIcon  fontSize="medium" className={classes.colorIcons} />
                            </Badge>
                        </IconButton> 
                    </Link>
                    <Link to="/EstadoPedido">
                        <IconButton aria-label="cart">
                            <Badge badgeContent={user.tran} color="secondary">
                                <AssignmentOutlinedIcon  fontSize="medium" className={classes.colorIcons}/>
                            </Badge>
                        </IconButton> 
                    </Link>
                    <Link to="/Coupons">
                        <IconButton aria-label="cart">
                            <Badge badgeContent={user.coup} color="secondary">
                                <ConfirmationNumberOutlinedIcon fontSize="medium" className={classes.colorIcons}/>
                            </Badge>
                        </IconButton> 
                    </Link>
                </div>
                :
                null
            }
            {localStorage.getItem('isAdmin') ?
                <Link to="/EstadoPedido">
                    <IconButton aria-label="cart">
                        <Badge badgeContent={2} color="secondary">
                            <AssignmentOutlinedIcon  fontSize="medium"className={classes.colorIcons}/>
                        </Badge>
                    </IconButton>
                </Link>
                :
                null
            }
            {localStorage.getItem('isAdmin') ?
                <AddProd fontSize="medium" editProducts={props.editProducts}  />
                :
                null
            }
            {localStorage.getItem('isAdmin') ?
                <AddPromotion fontSize="medium" cantPromo={props.cantPromo} />
                :
                null
            }
                <div>
                    <IconButton onClick={handleDrawer2}>
                        <Avatar >
                        </Avatar>
                    </IconButton>
                </div>
            </Toolbar>

        </AppBar>
        <Drawer
            className={classes.drawer}
            anchor = "right"
            open = {open2}
            classes={{
                paper: classes.drawerProfile,
            }}
            onClose={() => setOpen2(false)}>
            {localStorage.getItem('isLoggedIn') ? 
            
                <Perfil/>
            
                :
                <Route>
                    <Redirect to='/Login'>
                    </Redirect>
                </Route>
            }

        </Drawer>
        {props.flagProducts ? 
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <div className={classes.textColor}>
                            <ChevronLeftIcon/>
                        </div>
                    </IconButton>
                </div>
                <AccordionComponent funFilGender={props.funFilGender} funDelFilGender={props.funDelFilGender} funFilCategory={props.funFilCategory} funDelFilCategory={props.funDelFilCategory} funFilMarca={props.funFilMarca} funDelFilMarca={props.funDelFilMarca} view={props.view} isComp={props.isComp} isLog={props.isLog} products={props.products} funFilColor={props.funFilColor} funDelFilColor={props.funDelFilColor} funMinMaxPrice={props.funMinMaxPrice} minMaxPrice={props.minMaxPrice} flagPrice={props.flagPrice}/>
            </Drawer>
            :
            null
        }
        </div>
    );
}