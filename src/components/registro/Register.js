import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import logo from '../../logo.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Fab } from '@material-ui/core';
import axios from 'axios';
import FaceIcon from '@material-ui/icons/Face';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";
import ReplayIcon from '@material-ui/icons/Replay';





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

export default function Register() {
  const CLOUDINARY_URL_PREVIEW = 'https://res.cloudinary.com/deavblstk/image/upload/v';
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/deavblstk/image/upload';
  const CLOUDINARY_PRESETS = 'qc96w20m';

  const edades = [
    {
      value: '16-20',
      label: '16-20',
    },
    {
      value: '21-30',
      label: '21-30',
    },
    {
      value: '31-40',
      label: '31-40',
    },
    {
      value: '41-50',
      label: '41-50',
    },
    {
      value: '51-60',
      label: '51-60',
    },
    {
      value: '+60',
      label: '+60',
    }
  ];

  const tallaSuperior = [
    {
      value: 'XS',
      label: 'XS',
    },
    {
      value: 'S',
      label: 'S',
    },
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'L',
      label: 'L',
    },
    {
      value: 'XL',
      label: 'XL',
    },
    {
      value: 'XXL',
      label: 'XXL',
    }
  ];
  
  const tallaInferior = [
    {
      value: '10',
      label: '10',
    },
    {
      value: '12',
      label: '12',
    },
    {
      value: '14',
      label: '14',
    },
    {
      value: '16',
      label: '16',
    },
    {
      value: '18',
      label: '18',
    }
  ];

  const calzado = [
    {
      value: '28-31',
      label: '28-31',
    },
    {
      value: '32-35',
      label: '32-35',
    },
    {
      value: '36-39',
      label: '36-39',
    },
    {
      value: '+39',
      label: '+39',
    }
  ];

  const generos = [

    {
      value :"Femenino",
      label: "Femenino"

    },
    {
      value:"Masculino",
      label:"Masculino"

    }
  ]
  const classes = useStyles();
  const[open,setOpen]=React.useState(false);
  const [value, setValue] = React.useState(0);
  const [edad, setEdad] = React.useState('');
  const [tallaA, setTallaA] = React.useState('');
  const [tallaB, setTallaB] = React.useState('');
  const [tallaC, setTallaC] = React.useState('');
  const [genero, setGenero]= React.useState('')
  const [fileInputState, setFileInputState] = React.useState('');
  const [previewSource, setPreviewSource] = React.useState();
  const [file, setFile]= React.useState();
  const [url, setUrl] = React.useState("");
  const[register,setRegister]=React.useState(false);
 

  const handleChangeEdad = (event) => {
    setEdad(event.target.value);
  };

  const handleChangeTallaA = (event) => {
    setTallaA(event.target.value);
  };

  const handleChangeTallaB = (event) => {
    setTallaB(event.target.value);
  };

  const handleChangeTallaC = (event) => {
    setTallaC(event.target.value);
  };

  const handleChangeGenero = (event) => {
    setGenero(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESETS);
    const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    setUrl(CLOUDINARY_URL_PREVIEW+res.data.version+"/"+res.data.public_id+"."+res.data.format);
};

const handleFileImg = (e) => {
  const file1 = e.target.files[0];
  setFile(file1);
  const reader = new FileReader();
  reader.readAsDataURL(file1);
  reader.onloadend = () =>{
      setPreviewSource(reader.result);
  }
};
  const handleOnClick = (e) => {
    var correo = document.getElementById("emailEmpresa").value;
    if (document.getElementById("nombreEmpresa").value === "" || document.getElementById("nit").value === "" || document.getElementById("emailEmpresa").value === ""
      || document.getElementById("direccionEmpresa").value === "" || document.getElementById("ciudadEmpresa").value === "" ||
      document.getElementById("contrasenaEmpresa").value === "") {
      alert("Hay campos vacios");
    } else {
      let entity = {
        _id: "",
        name: document.getElementById("nombreEmpresa").value, 
        nit: document.getElementById("nit").value, 
        email: document.getElementById("emailEmpresa").value.toLowerCase(), 
        password: document.getElementById("contrasenaEmpresa").value, 
        phone: document.getElementById("telefonoEmpresa").value,
        city: document.getElementById("ciudadEmpresa").value, 
        address: document.getElementById("direccionEmpresa").value,
        image:url,
        priority:0
      }
      verifyUserEntity(entity);
      setPreviewSource();
      setUrl("");
  
    }
    if (!correo.includes('@')) {
      alert("no es un correo válido");

    }
  };


  const handleOnClickCliente = (e) => {
    var correo = document.getElementById("email").value;
    if (document.getElementById("nombreCliente").value === ""
        || document.getElementById("apellidoCliente").value === ""
        || document.getElementById("email").value === ""
        || document.getElementById("direccionCliente").value === ""
        || document.getElementById("telefonoCliente").value === ""
        || document.getElementById("contrasenaCliente").value === ""
    ){
      alert("Hay campos vacios");
    }
    else{

      let client = {

        _id: "",
        name: document.getElementById("nombreCliente").value,
        lastname: document.getElementById("apellidoCliente").value,
        email: document.getElementById("email").value.toLowerCase(),
        password: document.getElementById("contrasenaCliente").value,
        phone: document.getElementById("telefonoCliente").value.toString(),
        address: document.getElementById("direccionCliente").value,
        age:edad,
        sizeUp:tallaA,
        sizeDown:tallaB,
        shoeSize:tallaC,
        gender:genero
      }
      console.log(client.name);
      verifyUserClient(client);
      //alert("Registraste correctamente un cliente")
    }

    if (!correo.includes('@')) {
      alert("no es un correo válido");

    }
  };

  const registerClient = (client) => {
    fetch('https://salesbox-alpha-backend.herokuapp.com/addClient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json',
      },
      body: JSON.stringify(client)
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (res) {
          console.log(res);
        })
      } else {
        console.log("")
      }
    }).catch(function (error) {
      console.log("Bad petition:" + error.message);
    });
  }

  const registerEntity = (entity) => {
    fetch('https://salesbox-alpha-backend.herokuapp.com/api/entities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json',
      },
      body: JSON.stringify(entity)
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (res) {
          console.log(res);
          setRegister(true);
          alert("usuario registrado")
        })
      } else {
        console.log("")
      }
    }).catch(function (error) {
      console.log("Bad petition:" + error.message);
    });

  }

  const verifyUserEntity = (entity) => {
  

    fetch('https://salesbox-alpha-backend.herokuapp.com/api/entity/user/'+entity.email,{
      method: 'GET'
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (res) {
          console.log(res);
          alert("Este usuario ya existe")
        })
      } else {
        console.log("");
        registerEntity(entity);
      }
    }).catch(function (error) {
      console.log("Bad petition:" + error.message);
     
    });

  }

  const verifyUserClient = (client) => {
  

    fetch('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+client.email,{
      method: 'GET'
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (res) {
          console.log(res);
          alert("Este usuario ya existe")
        })
      } else {
        console.log("");
        //alert("entre al else")
        registerClient(client);
      }
    }).catch(function (error) {
      console.log("Bad petition:" + error.message);
     
    });

  }







  return (


    <div align="center"className={classes.root} style={{ width: '480px', margin: '0 auto' }}>
      <AppBar position="static" style={{ width: '480px', margin: '0 auto', background: '#D1B76C' }}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
        <Tab style={{width:'50 auto'}} label={<span style={{ color: '#020202'  }}><FaceIcon></FaceIcon>Cliente</span>} {...a11yProps(0)} />
        <Tab label={<span style={{ color: '#020202' }}><HomeWorkIcon></HomeWorkIcon>Empresa</span>} {...a11yProps(1)} />
        <Link style={{ textDecoration: 'none' }} to="/Login">
         <Tab  label={<span style={{ color: '#020202' }}><ReplayIcon></ReplayIcon>volver</span>}/>
         </Link>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}  >
        <img src={logo} style={{ height: '40px' }} />

        <input
          id="nombreCliente"
          style={{ width: '400px', margin: '0 auto' }}
          type="text"
          className="form-controlj textbox-dgj"
          placeholder="Nombre"




        />

        <br />
        <br />

        <input
            id="apellidoCliente"
            style={{ width: '400px', margin: '0 auto' }}
            type="text"
            className="form-controlj textbox-dgj"
            placeholder="Apellido"



        />

        <br />
        <br />

        <input
          id="email"
          style={{ width: '400px', margin: '0 auto' }}
          type="email"
          className="form-controlj textbox-dgj"
          placeholder="Email"



        />
        <br />
        <br />
        <input
          id="direccionCliente"
          style={{ width: '400px', margin: '0 auto' }}
          type="text"
          className="form-controlj textbox-dgj"
          placeholder="Dirección"



        />
        <br />
        <br />
        <input
          id="telefonoCliente"
          style={{ width: '400px', margin: '0 auto' }}
          type="number"
          className="form-controlj textbox-dgj"
          placeholder="Telefono"


        />
        <br />
        <br />
        <input
          id="fechaNacimiento"
          style={{ width: '400px', margin: '0 auto' }}
          type="date"
          className="form-controlj textbox-dgj"
          placeholder="Fecha de nacimiento"


        />
        <br />
        <br />

        <input
          id="contrasenaCliente"
          style={{ width: '400px', margin: '0 auto' }}
          type="Password"
          className="form-controlj textbox-dgj"
          placeholder="Contraseña"



        />
     
        <br />
        <br />
        <Button class="myButton2"  style={{ position: 'relative'}} onClick={handleClickOpen}> 
        Siguiente
        </Button>
        
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nos gustaría conocerte un poco más</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ayudanos a diligenciar el siguiente formulario para que tengas una experiencia personalizada con SalesBox
          </DialogContentText>
          <TextField
          id="generoCliente"
          select
          label="Genero"
          value={genero}
          onChange={handleChangeGenero}
          helperText="Selecciona el genero"
        >
           {generos.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
          <TextField
          id="edadCliente"
          select
          label="Edad"
          value={edad}
          onChange={handleChangeEdad}
          helperText="Selecciona el rango de edad en el que te encuentras"
        >
           {edades.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <TextField
          id="tallaACliente"
          select
          label="Talla"
          value={tallaA}
          onChange={handleChangeTallaA}
          helperText="Selecciona tu talla para la parte superior de tu cuerpo"
        >
           {tallaSuperior.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <TextField
          id="tallaBCliente"
          select
          label="Talla"
          value={tallaB}
          onChange={handleChangeTallaB}
          helperText="Selecciona tu talla para la parte inferior de tu cuerpo"
        >
           {tallaInferior.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <TextField
          id="tallaCCliente"
          select
          label="Talla"
          value={tallaC}
          onChange={handleChangeTallaC}
          helperText="Selecciona tu talla para productos de calzado"
        >
           {calzado.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </DialogContent>
        <DialogActions>
          <button class="myButton2" onClick={handleOnClickCliente} style={{ position: 'relative'}}>
            
         Registrarme
          </button>
        </DialogActions>
      </Dialog>

      </TabPanel>
      <TabPanel value={value} index={1} >


        <img src={logo} alt="logo" style={{ height: '40px'}} />



        <input
          id="nombreEmpresa"
          style={{ width: '400px', margin: '0 auto' }}
          type="text"
          className="form-controlj textbox-dgj"
          placeholder="Nombre Empresa"


        />
        <br />
        <br />
        <input
          id="nit"
          style={{ width: '400px', margin: '0 auto' }}
          type="text"
          className="form-controlj textbox-dgj"
          placeholder="Nit"


        />
        <br />
        <br />
        <input
          id="emailEmpresa"
          style={{ width: '400px', margin: '0 auto' }}
          type="email"
          className="form-controlj textbox-dgj"
          placeholder="Email"


        />
        <br />
        <br />
        <input
          id="direccionEmpresa"
          style={{ width: '400px', margin: '0 auto' }}
          type="text"
          className="form-controlj textbox-dgj"
          placeholder="Dirección"

        />
        <br />
        <br />

        <input
          id="ciudadEmpresa"
          style={{ width: '400px', margin: '0 auto' }}
          type="text"
          className="form-controlj textbox-dgj"
          placeholder="Ciudad"

        />
        <br />
        <br />

        <input
          id="telefonoEmpresa"
          style={{ width: '400px', margin: '0 auto' }}
          type="text"
          className="form-controlj textbox-dgj"
          placeholder="Telefono"

        />
        <br />
        <br />
        <input
          id="contrasenaEmpresa"
          style={{ width: '400px', margin: '0 auto' }}
          type="Password"
          className="form-controlj textbox-dgj"
          placeholder="Contraseña"

        />
        <br />
        <br />
        <div>
        <label htmlFor="upload-photo" >
  <input
    style={{ display: 'none' }}
    id="upload-photo"
    name="upload-photo"
    type="file"
    onChange={handleFileImg}
    value={fileInputState}
  />
   

  <Fab
    style={{  margin: '0 auto' }}
    size="small"
    component="span"
    aria-label="add"
    variant="extended"
    class="myButton2"
  >
    <CloudUploadIcon  /> 
       . Selecciona la imagen(logo)
  </Fab>
  <br />
  <br />
  {previewSource && (
                            <div>
                                <img src={previewSource} alt="chosen" style={{height: '300px'}}/>
                                <Button class="myButton2" onClick={handleSubmit} >
                                    Subir Imagen
                                </Button>
                            </div>
                        )}

</label>
</div>
<br />
  <br />
   

        <button class="myButton2" onClick={handleOnClick} style={{ position: 'relative' }}>
          Registrarse
          </button>
      </TabPanel>
     

    </div>

  );
}
