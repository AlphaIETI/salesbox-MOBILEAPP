import React from 'react'

export default function Colors(props) {

    let colors = props.colors;

    const trColor = (color) => {
        if(color === "Negro"){
            return "black";
        }else if(color === "Gris"){
            return "gray";
        }else if(color === "Azul"){
            return "blue";
        }else if(color === "Rojo"){
            return "red";
        }else if(color === "Cafe"){
            return "brown";
        }else if(color === "Amarillo"){
            return "yellow";
        }else if(color === "Morado"){
            return "purple";
        }else if(color === "Verde"){
            return "green";
        }else if(color === "Rosado"){
            return "pink";
        }else if(color === "Anaranjado"){
            return "orange";
        }else{
            return "white"
        }
    }
    
    return (
        <div className="colors">
            {
            colors.map((color, index) =>(
                <button style={{background: trColor(color)}} key={index}></button>

            ))
            }
        </div>
    )
}