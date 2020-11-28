import React from 'react';

import {Card } from 'reactstrap';
import CartItem from './CartItem.js';

export default function CardList(props){

    return(
        <div>
            <Card>
                <CartItem currentItem={props.currentItem} changePrecio={props.changePrecio} efecinco={props.efecinco} efecinco2={props.efecinco2}/>
            </Card>
        </div>
    );
}

