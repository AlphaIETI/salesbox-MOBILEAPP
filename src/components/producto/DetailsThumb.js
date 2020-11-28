import React from 'react'

export default function DetailsThumb(props) {
    
    let images = props.images;
    let tab = props.tab;
    let myRef = props.myRef;
    return (
        <div className="thumb" ref={myRef}>
            {
            images.map((img, index) =>(
                <img src={img} alt="" key={index} 
                onClick={() => tab(index)}
                />
            ))
            }
        </div>
    )
}