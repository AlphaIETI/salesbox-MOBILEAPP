import React from 'react';

export class Credentials extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
   <div>
          <h1> {this.props.nombre}</h1>
          <h1> {this.props.email}</h1>
          <h1> {this.props.direccion}</h1>
          <h1> {this.props.telefono}</h1>
          <h1> {this.props.fecha.toString()}</h1>
          <h1> {this.props.usuario}</h1>
          <h1> {this.props.contrasena}</h1>

   </div>
        );
    }

}