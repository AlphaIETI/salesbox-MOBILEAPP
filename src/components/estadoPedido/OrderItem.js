import React, {useState, useEffect} from 'react';
import {CardImg, CardBody, CardTitle, CardSubtitle, Card} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";


export default function Item(props){

    const imageItem = {
        padding:'10px',
        margin: 'auto',
        display: 'block',
        maxWidth: '30%',
        maxHeight: '30%',
    }

    const textStyle = {

        fontSize: '24px',
        textAlign: 'center',
        color: 'black'

    }

    const [itemData, setItemData] = useState(

        {"id":"",
            "brand":"",
            "description":"",
            "color":"",
            "price":0,
            "discount":0,
            "images":[],
            "size":"",
            "category":"",
            "gender":"",
            "stockAvailable":""
        });

    useEffect( () => {

        axios.get('https://salesbox-alpha-backend.herokuapp.com/products/'+props.currentItem)
            .then(res => {
                setItemData(res.data)
            })
    }, []);

    return(
        <Container style={{background:'white'}}>
            <h3> Pedido</h3>
            <h4> 00001 </h4>
            <Row>
                <Col >
                    <CardImg style={imageItem} src={itemData.images[0]} alt="Missing Pic"/>
                </Col>
                <Col xs='6' style={imageItem}>
                    <CardBody >
                        <CardTitle></CardTitle>
                        <CardSubtitle style={textStyle}>{itemData.description}</CardSubtitle>
                    </CardBody>
                </Col>
                <Col style={imageItem}>
                    <CardBody>
                        <CardTitle></CardTitle>
                        <CardSubtitle style={textStyle}>${(itemData.price-(itemData.price*(itemData.discount/100)))}</CardSubtitle>
                    </CardBody>
                </Col>
            </Row>
        </Container>
    )
}