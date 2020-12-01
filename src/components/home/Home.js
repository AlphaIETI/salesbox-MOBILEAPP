import React, { useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AppBarComponent from '../dashboard/appBar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Color from 'color';
import CarouselComponent from '../promotion/carousel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  content: {
    backgroundColor: '#D4E9EA',
      flex: '1 0 auto',
  },
  image: {
    position: 'relative',
    top: '50px',
    height: 150,
    [theme.breakpoints.down('xs')]: {
      width: '50% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },

  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
   root2: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(20),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    actionArea:{
      borderRadius: 16,
      transition: '0.2s',
      '&:hover':{
        transform:'scale(1.1)',
      },
    card:({color}) => ({
      minWidth: 256,
      borderRadius: 16,
      boxShadow: 'none',
      '&:hover':{
        boxShadow: `0 6px 12px 0 ${Color(color)
          .rotate(-12)
          .darken(0.2)
          .fade(0.5)}`,
        },
    }),
    content: ({ color }) => {
      return {
        backgroundColor: color,
        padding: '1rem 1.5rem 1.5rem',
      };
    },
      title: {
        fontFamily: 'Keania One',
        fontSize: '2rem',
        color: '#fff',
        textTransform: 'uppercase',
      },
      subtitle: {
        fontFamily: 'Montserrat',
        color: '#fff',
        opacity: 0.87,
        marginTop: '2rem',
        fontWeight: 500,
        fontSize: 14,
      },
      container: {
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(4),
      },
  }}));

  /* const CustomCard = ({classes, image,title,subtitle}) => {
    const mediaStyles=useFourThreeCardMediaStyles();
    return (
      <CardActionArea className={classes.actionArea}>
        <Card className={classes.card}>
          <CardMedia classes={mediaStyles} image={image}/>
          <CardContent className={classes.content}>
            <Typography className={classes.title} variant={'h2'}>
              {title}
            </Typography>
            <Typography className={classes.subtitle}>{subtitle}</Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    );
  }; */


/* const useGridStyles=makeStyles(({breakpoints}) =>  ({
    root:{
      [breakpoints.up('md')]:{
        justifyContent:'center',
      },
    },
  })); */

export default function ButtonBases() {
  const classes = useStyles();
  /* const arrowStyles = useArrowDarkButtonStyles(); */
  const BACKENDAPI = 'https://salesbox-alpha-backend.herokuapp.com/';
  const redirect = (td)=>{
    localStorage.setItem('nameEntity', td);
    window.location='/Dashboard'
  };
  const handleViewAll = () => {
    localStorage.setItem('nameEntity', "#");
    window.location='/Dashboard'
  };
  /* const gridStyles = useGridStyles(); */
  /* const styles= useStyles({color: '#ff0000'}) */

  //Promotions
  const [cantPromo,setCantPromo] = React.useState(0);
  const handleCantPromo = (cant) => {
    setCantPromo(cantPromo + cant);
  }
  const[promotions, setPromotions] = React.useState([]);
  useEffect (() => {
      fetch(BACKENDAPI+'api/promotions', {
          method: 'GET'
      }).then(response => response.json())
          .then(data => {
              //console.log(data)
              data.map(pr => {
                  setPromotions(data);
              })
              setCantPromo(data.length);
          }).catch(error => {
              console.log(error)
          });
      },[cantPromo]);

  //Home images

  const[brands,setBrands]=React.useState([]);
  useEffect(() => {
    fetch(BACKENDAPI+'api/entities', {
      method: 'GET'
    }).then(response => response.json())
      .then(data => {
        //console.log(data)
        data.map(pr => {
          setBrands(data);
        })
      }).catch(error => {
        console.log(error)
      });
  }, []);
  

  return (
   
    <div className={classes.root}>
      <AppBarComponent cantPromo={handleCantPromo}/>
    
        <Container maxWidth="lg" className={classes.container}>
        <div align="center">
        {brands.map((brand) => (
          
              <ButtonBase
                  focusRipple
                  key={brand.name}
                  className={classes.image}
                  onClick={() => redirect(brand.name)}
                  focusVisibleClassName={classes.focusVisible}
                
                  style={{
                      width: "30%",
                  }}
                  >
                  <span
                      className={classes.imageSrc}
                      style={{
                      backgroundImage: `url(${brand.image})`,
                      }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.imageButton}>
                      <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      >
                      </Typography>
                  </span>
              </ButtonBase>
             
        ))}
      
              <br></br><br></br><br></br>
              {!localStorage.getItem('isAdmin') ?
              <div>
              <Button
                  onClick={handleViewAll}
                  variant="contained"
                  style={{backgroundColor:"#272C2A"}}
                  align="center"
                  size="large"
                >
                  <Typography variant="body2"  style={{color:"white"}} >
                    Ver todos los productos
                  </Typography>
              </Button>
              </div>
              :
              null
              }
                 </div>
              <br></br><br></br><br></br>
              <Typography variant="h4" align="center" style={{color:"black" , fontFamily: "Fantasy"}} >
                   Publicidades Destacadas
                  </Typography>
              <CarouselComponent promotions={promotions} type={"Entity"} className={classes.container}/>
              <br></br><br></br><br></br>
              <Typography variant="h4" align="center"  style={{color:"black" , fontFamily: "Fantasy"}} >
                    Productos Destacados
                  </Typography>
              <CarouselComponent promotions={promotions} type={"Product"} />
        </Container>
    </div>
    
  );
}