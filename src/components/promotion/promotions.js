import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Color from 'color';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import Carousel from 'react-bootstrap/Carousel';

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
  image2:{
    display:'block',
    margin: 'auto'
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
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(17)}px ${theme.spacing(22.5)}px ${theme.spacing(1) + 6}px`,
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
        paddingBottom: theme.spacing(1),
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
  }}));

  const CustomCard = ({classes, image,title,subtitle}) => {
    const mediaStyles=useFourThreeCardMediaStyles();
    return (
        <Card className={classes.card} onClick={event => {handleClickCard(title)}}>
          <CardActionArea className={classes.actionArea}>
            <CardMedia classes={mediaStyles} image={image}/>
            <CardContent className={classes.content}>
              <Typography className={classes.title} variant={'h2'}>
                {title}
              </Typography>
              <Typography className={classes.subtitle}>{subtitle}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
  };

const handleClickCard = (title) =>{
  localStorage.setItem('nameEntity', title);
  window.location='/Dashboard'
};

const useGridStyles=makeStyles(({breakpoints}) =>  ({
    root:{
      [breakpoints.up('md')]:{
        justifyContent:'center',
      },
    },
  }));

export default function Promotions(props) {
    const gridStyles = useGridStyles();
    const styles= useStyles({color: '#ff0000'})
    const classes1 = useStyles();
    return (
        <div>
          <Carousel>
            {props.promotions.map(pr => 
            <Carousel.Item key={pr.id}> 
                  <Grid key={pr.id} lg={7} item className={classes1.image2}>
                      <CustomCard
                          classes={styles}
                          title={pr.brand}
                          subtitle={pr.description}
                          image={pr.image}
                      />
                  </Grid>
              </Carousel.Item>
              )}
          </Carousel>
        </div>
    );
}