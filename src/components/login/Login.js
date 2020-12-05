import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import FaceIcon from '@material-ui/icons/Face';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { Redirect, Route } from 'react-router-dom';
import logo from '../../logo.png';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"

      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const useStyles = makeStyles((theme) => ({
 
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

export default function Login() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const[url,setUrl]= useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[isEntity, setIsEntity]= useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const responseGoogleTrue = (response) =>{
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    alert("Puede iniciar sesión");
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn',true);
    window.location='/Home';
    console.log(email)
  };
  
  const responseGoogleFalse = (response) =>{
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    alert("No está registrado");
  };


  const handleOnClickClient = () => {
    if (document.getElementById("email").value === ""
    || document.getElementById("contrasenaCliente").value === ""
    ){
      alert("Alguno de los campos esta vacio")
    }
    else{
      let client =
          {email:document.getElementById("email").value.toLowerCase(), password:document.getElementById("contrasenaCliente").value}
      loginClient(client);


    }
    };
  

  const handleOnClickEntity=() =>{
    if (document.getElementById("emailEmpresa").value === ""
    || document.getElementById("contrasenaEmpresa").value === ""
    ){
      alert("Alguno de los campos esta vacio")
    }else{
    let entity={email:document.getElementById("emailEmpresa").value.toLowerCase(), password:document.getElementById("contrasenaEmpresa").value}
    loginEntity(entity);
    }
   };

   let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   headers.append('Access-Control-Allow-Origin', '*');
   headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
   headers.append('Accept', 'application/json');
   /* const options = {​​​​​ headers: headers, withCredintials: false }​​​​​; */
   const loginClient = (client)=>{
    fetch('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+client.email,{
    //fetch('http://localhost:8080/clients/email/'+client.email,{
      headers: headers,
      method: 'GET'
    }).then(function(response){
      //console.log(response.ok)
     if (response.ok){

       response.json().then(function (res) {

         //localStorage.setItem(,true);
         if(client.email === res.email && client.password === res.password){
           
           localStorage.setItem('isLoggedIn',true);
           localStorage.setItem('emailClient',res.email);
           localStorage.setItem('client', JSON.stringify(res));
           window.location='/Home';
           setIsLoggedIn(true);
         }
     });
     }
     else{
       console.log("");

       alert("Usuario o Contraseña Incorrecto");
     }
    }).catch(function (error) {

      console.log("Bad petition:" + error.message);

    });
  }

   const loginEntity = (entity) => {
  

    fetch('https://salesbox-alpha-backend.herokuapp.com/api/entity/user/'+entity.email+'/'+entity.password,{
      method: 'GET'
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (res) {
          localStorage.setItem('isAdmin',true);
          localStorage.setItem('nameEntity',res.name);
          localStorage.setItem('entity', JSON.stringify(res));
          localStorage.setItem('isLoggedIn',true);
          setIsLoggedIn(true);
        })
      } else {
        console.log("");
        alert("Usuario o Contraseña Incorrecto");
      }
    }).catch(function (error) {
      console.log("Bad petition:" + error.message);
     
    });

  }


  return (
  
   

    <div align="center"className={classes.root} >    
          <AppBar position="static" style={{ background: '#D1B76C'}}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
              <Tab style={{width:'50 auto'}} label={<span style={{ color: '#020202'  }}><FaceIcon></FaceIcon>Cliente</span>} {...a11yProps(0)} />
              <Tab label={<span style={{ color: '#020202' }}><HomeWorkIcon></HomeWorkIcon>Empresa</span>} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          {isLoggedIn && localStorage.getItem('isAdmin') ?
            <div>
              <Route>
                <Redirect to={{ pathname: '/Dashboard', state: { isEntity: true } }}>
                </Redirect>
              </Route>
            </div>
            :
            null
          }

      <TabPanel value={value} index={0}>
      <img src={logo} style={{ height: '40px' }} />
      <br />  
        
      <Input
        position="static" 
        id="email"
      
        type="email"
        className="form-controlj textbox-dgj"
        placeholder="Email"



      />
    
            <br />
            <br />
      <Input
        id="contrasenaCliente"
  
        type="Password"
        className="form-controlj textbox-dgj"
        placeholder="Contraseña"



      />
      <br/>
      <br />
            <br />
         
      <button className="myButton2" onClick={handleOnClickClient} style={{ position: 'relative', top: '0px' }}>
        Iniciar Sesión
        </button>
      <br>
      </br>
      <br>
      </br>
      <GoogleLogin 
            
            clientId="262410189500-9m36t0v9h1fuat5chk5ft7ttdlp9quk8.apps.googleusercontent.com"
            onSuccess={responseGoogleTrue}
            onFailure={responseGoogleFalse}
            cookiePolicy={'single_host_origin'}
        />
      <br>
      </br>
      <br>
      </br>
      <Link to="/Register"  style={{color:"grey" ,position: 'relative' }}>Haz click para registrarte</Link>
    </TabPanel>

          <TabPanel value={value} index={1} >
          <img src={logo} style={{ height: '40px' }} />
           <br></br>
            <Input
              id="emailEmpresa"
       
              type="email"
              className="form-controlj textbox-dgj"
              placeholder="Email"


            />
            <br />
            <br />
        
            <Input
              id="contrasenaEmpresa"
           
              type="Password"
              className="form-controlj textbox-dgj"
              placeholder="Contraseña"

            />
              <br />
            <br />
            <br />
            <button className="myButton2" onClick={handleOnClickEntity} style={{ position: 'relative', top: '0px'}}>
              Iniciar  Sesión
  </button>
            <br>
            </br>
            <br></br>

            <Link to="/Register" style={{ color: "grey", position: 'relative'}}>Haz click para registrarte</Link>
          </TabPanel>

         
          <form className={classes.form} noValidate>

      
          </form>
        </div>
     
  
 
  );
}