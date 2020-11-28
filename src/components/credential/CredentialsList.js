import React from 'react';
import {Credentials} from './Credentials';

export class CredentialsList extends React.Component {
    render() {

      const credentialsList=this.props.todoList;
      const listData= credentialsList.map((dat)=>
       <Credentials nombre={dat.nombre} email ={dat.email} direccion={dat.direccion} telefono={dat.telefono} fecha={dat.fecha} usuario={dat.usuario} contrasena={dat.password}  />
        );
      return <ul>{listData}</ul>
    }



}