import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    content: {
        flex: '1 0 auto',
        
    },
    alinear:{
        alignItems: 'right',
        marginRight: 10,
       
    },
    root3: {
        marginTop: 20,
        width: 300,
        marginRight: 10,
      
      },
      root2: {
        marginTop: 20,
        width: 400,
      },

}));

export default function Carrusel() {
    const classes = useStyles();
    return (
        <div >
        <div className={classes.root2} >
            <Container  className={classes.root2} >
                <Carousel className={classes.root3}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.thesneakerone.com/31251-large_default/NIKE-WOMEN-AIR-FORCE-1-SHADOW-PALE-IVORY-CELESTIAL-CI0919-101.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.thesneakerone.com/31252-large_default/NIKE-WOMEN-AIR-FORCE-1-SHADOW-PALE-IVORY-CELESTIAL-CI0919-101.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.thesneakerone.com/31256-large_default/NIKE-WOMEN-AIR-FORCE-1-SHADOW-PALE-IVORY-CELESTIAL-CI0919-101.jpg"
                            alt="Third slide"
                        />

                    </Carousel.Item>    
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.thesneakerone.com/31432-large_default/NIKE-WOMEN-AIR-FORCE-1-SHADOW-PALE-IVORY-CELESTIAL-CI0919-101.jpg"
                            alt="Fourth slide"
                        />

                    </Carousel.Item>   
                </Carousel>
                <br></br>
                <Card className={classes.alinear}>
                    <CardContent className={classes.content}>  
                        <Typography variant="h5" color="textSecondary">
                            NIKE WOMEN AIR FORCE 1 SHADOW PALE IVORY CELESTIAL
                        </Typography>
                        <Typography variant="subtitle2">
                            Ref: CI0919-101:39
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" color="error">
                            $ 196.000
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </div>
        
    </div>
    );
}
