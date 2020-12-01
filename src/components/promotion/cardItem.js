import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
/* import { useTheme } from "@material-ui/styles"; */
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 200,
    minWidth: 200,
    maxHeight: 300,
    minHeight: 300,
  },
  media: {
    height: 120
  }
}));
export default function CardItem (props) {
  const classes = useStyles();
  /* const theme = useTheme(); */
  const handleClickCard = (pr) =>{
    if(props.type === "Product"){
      window.location='/productPage?id='+pr.idProduct
    }else{
      localStorage.setItem('nameEntity', pr.brand);
      window.location='/Dashboard'
    }
  };
  return (
    <Card className={classes.root} onClick = {event => handleClickCard(props.pr)}>
      <CardActionArea>
        <CardMedia
          height="200"
          className={classes.media}
          image={props.pr.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.pr.brand}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.pr.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}