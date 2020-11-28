import React, { useEffect } from 'react';
import clsx from 'clsx';
import './font.css';
import { Link } from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ButtonProductToCar from '../Carrito/addProductToCart';
import ButtonProductToFav from '../Favorites/addProductToFavs';
import AddPromotion from '../promotion/addPromotion';

//AppBar
import AppBarComponent from './appBar';
import PublicityProduct from '../promotion/addPublicityProduct';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
            Salesbox
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,

    content: {
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    media: {
        height: 200,
    },
    title: {
        paddingBottom: '0.5em',
    },
    actionSpacer: {
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    actionSpacerCard: {
        justifyContent: 'space-around',
    },
    cardproduct: {
        backgroundColor: '#E9E9E9',
    }
}));

export default function Dashboard(props) {

    const classes = useStyles();
    const [openDrawer,setOpenDrawer] = React.useState(false);
    const[products, setProducts] = React.useState([]);
    const BACKENDAPI = 'https://salesbox-alpha-backend.herokuapp.com/';
    const [cantPr, setCantPr] = React.useState(0);
    const editProducts = (pr) => {
        setCantPr(cantPr + pr);
    }

    useEffect (() => {
        fetch(BACKENDAPI+'products', {
            method: 'GET'
        }).then(response => response.json())
            .then(data => {
                //console.log(data)
                data.map(pr => {
                    setProducts(data);
                })
            }).catch(error => {
                console.log(error)
            });
        },[cantPr]);

    const [view, setView] = React.useState(localStorage.getItem('nameEntity'));

    const [filCategory,setFilCategory] = React.useState([]);

    const handleChangeFilCategory = (ans) => {
        setFilCategory(filCategory.concat(ans));
    }

    const handleChangeDeleteFilCategory = (ans) => {
        setFilCategory(filCategory.filter(item => item !== ans));
    }
    
    const [filMarca,setFilMarca] = React.useState([]);

    const handleChangeFilMarca = (ans) => {
        setFilMarca(filMarca.concat(ans));
    }

    const handleChangeDeleteFilMarca = (ans) => {
        setFilMarca(filMarca.filter(item => item !== ans));
    }

    const [filColor,setFilColor] = React.useState([]);

    const handleChangeFilColor = (ans) => {
        setFilColor(filColor.concat(ans));
    }

    const handleChangeDeleteFilColor = (ans) => {
        setFilColor(filColor.filter(item => item !== ans));
    }

    const [filGender,setFilGender] = React.useState([]);

    const handleChangeFilGender = (ans) => {
        setFilGender(filGender.concat(ans));
    }

    const handleChangeDeleteFilGender = (ans) => {
        setFilGender(filGender.filter(item => item !== ans));
    }

    const handleChangeStateDrawer = (ans) => {
        setOpenDrawer(ans);
    };

    const [flagPrice,setFlagPrice] = React.useState(false);
    
    //PrecioMinimo&Maximo
    const [minPrice,setMinPrice] = React.useState(1000000000000);
    const [maxPrice,setMaxPrice] = React.useState(-1000000000000);
    if(products !== undefined){
        products.map(function(pr){
            if(view === '#'){
                if(pr.price - (pr.price * (pr.discount/100)) < minPrice){
                    setMinPrice(pr.price - (pr.price * (pr.discount/100)));
                }
                if(pr.price - (pr.price * (pr.discount/100)) > maxPrice){
                    setMaxPrice(pr.price - (pr.price * (pr.discount/100)));
                }
            }else{
                if((pr.price - (pr.price * (pr.discount/100)) < minPrice) && pr.brand === view){
                    setMinPrice(pr.price - (pr.price * (pr.discount/100)));
                }
                if((pr.price - (pr.price * (pr.discount/100)) > maxPrice) && pr.brand === view){
                    setMaxPrice(pr.price - (pr.price * (pr.discount/100)));
                }
            }
        });
    }

    const [minMax,setMinMax] = React.useState([0,100000000]);
    const handleMinMaxPrice = (e) => {
        setFlagPrice(true);
        setMinMax(e);
    }

    const filters = (pr) => {
        return (((pr.price - (pr.price * (pr.discount/100))>=minMax[0]) && (pr.price - (pr.price * (pr.discount/100))<= minMax[1])) && (filCategory.includes(pr.category) || filCategory.length === 0) && (filGender.includes(pr.gender) || filGender.length === 0) && (filMarca.includes(pr.brand) || filMarca.length === 0) && (filColor.includes(pr.colors[0]) || filColor.length === 0))
    }

    const handlePromote = () => {
        //Verificar cantidad de promociones disponibles de productos
        let cantAdvertising = 1;
        if(cantAdvertising > 0){
            return (
                <AddPromotion/>
            );
        }else {
            //console.log("ENtro2")
            return null
        }
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarComponent flagProducts={true} funStateDrawer={handleChangeStateDrawer} funFilGender={handleChangeFilGender} funDelFilGender={handleChangeDeleteFilGender} funFilCategory={handleChangeFilCategory} funDelFilCategory={handleChangeDeleteFilCategory} funFilMarca={handleChangeFilMarca} funDelFilMarca={handleChangeDeleteFilMarca} view={view} editProducts={editProducts} products={products} funFilColor={handleChangeFilColor} funDelFilColor={handleChangeDeleteFilColor} funMinMaxPrice={handleMinMaxPrice} minMaxPrice={[minPrice,maxPrice]} flagPrice={flagPrice}/>
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: openDrawer,
                })}
            >
                <div className={classes.appBarSpacer} />
                <div>
                    <Typography
                        className="descProd6"
                        variant="h3"
                        component="h2"
                        align="center"
                    >
                        {view !== undefined && view !== "#" ? view: ""}
                    </Typography>
                    <Grid container spacing={1} className={classes.actionSpacer}>
                        {products.map(pr => { 
                            return (((view === "#"  || view === pr.brand ) || (localStorage.getItem('isAdmin') && pr.brand === view)) && filters(pr)) ?
                                <Grid key={products.indexOf(pr)} item xs={12} sm={6} lg={4} xl={3}>
                                    <Card className={classes.cardproduct}>
                                        <div>
                                        <Link to={{
                                            pathname: '/productPage',
                                            search: '?id='+pr.id
                                            }}>
                                                <CardMedia
                                                    image={pr.images[0]}
                                                    className={classes.media}
                                                >
                                                    <span className='porDescuento'>
                                                        - {pr.discount} %
                                                    </span>
                                                </CardMedia>
                                            </Link>
                                        </div>
                                        <CardContent className={classes.title}>
                                            {view === "#" ? 
                                                <div className="nombreMarca">
                                                    <h3>{pr.brand}</h3> 
                                                </div>
                                                :
                                                null
                                            }
                                            <div className="descriptionText">
                                                {pr.name}
                                            </div>
                                            <div>
                                                <span className="precioTotal" >
                                                    ${pr.price - (pr.price * (pr.discount/100))}
                                                </span>
                                                <span className="precioOrigi">
                                                    ${pr.price}
                                                </span>                                                                                                        
                                            </div>
                                        </CardContent>
                                        <CardActions
                                            classes={{ spacing: classes.actionSpacerCard }}
                                        >
                                            {localStorage.getItem('isAdmin') && JSON.parse(localStorage.getItem('entity')).name === view ? 
                                                <div style={{display: 'contents'}}> 
                                                    <div>
                                                        <Link to={{
                                                                pathname: '/productPage',
                                                                search: '?id='+pr.id
                                                            }}>
                                                            <Button color="secondary" >
                                                                Editar  <EditOutlinedIcon fontSize="small"/> 
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    <PublicityProduct promotion={pr}/>
                                                </div>
                                                :
                                                <div>
                                                    <ButtonProductToCar idProduct={pr.id}/>
                                                    <ButtonProductToFav idProduct={pr.id}/>
                                                </div>
                                            }
                                        </CardActions>
                                    </Card>
                                </Grid>
                                :
                                null
                        })}
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </div>
            </main>
        </div>
    );
}
