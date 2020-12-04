import React from 'react';

import './Perfil.css';
import Avatar from '@material-ui/core/Avatar';
import {Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from '@material-ui/core/IconButton';

export default function Perfil (props){


	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
			backgroundcolor: '#272C2A',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: '33.33%',
			flexShrink: 0,
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		accordion:{
			backgroundColor:'#272C2A',
			backgroundcolor: '#272C2A',
		},
		white:{
			color:'white',
		}
	}));
	const useStyless = makeStyles((theme) => ({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		small: {
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
		medium: {
			width: theme.spacing(5),
			height: theme.spacing(5),
		},
		large: {
			width: theme.spacing(14),
			height: theme.spacing(14),
		},
	}));
	const classess = useStyless();
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleLogout = () => {
		localStorage.clear();
	};
	/*
	const [jsonFull, setJSON] = useState({"id":"99999","name":"","lastname":"","email":"","password":"","coupons":"","phone":"","address":""});
	const [jsonEntity,setJSONentity] = useState({"id":"99999999","name":"","nit":"","email":"","password":"","phone":"","city":"","address":"","image":"","publicity":0});

	 */
	/*useEffect(  () => {
		//axios.get('http://localhost:8080/clients/id/1')
		axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
				//console.log("name");
				//console.log(res.data);
				setJSON(res.data)
				})
		}, []);

	useEffect( () => {
		axios.get('https://salesbox-alpha-backend.herokuapp.com/api/entity/name/'+localStorage.getItem('nameEntity'))
			.then(res => {
				//console.log("name");
				setJSONentity(res.data)
			})
	}, []);
	*/
	return (
		<Accordion className="imagenacordion">
				<Grid direction={"column"} justify={"center"} alignItems={"center"} container spacing={2}>
				<AccordionDetails className="imagenacordion">
						{ localStorage.getItem('isLoggedIn') && !localStorage.getItem('isAdmin') && true ?
							<div>
								<br/>

								<Typography align={"center"} variant="h5" className={classes.white}>
									{JSON.parse(localStorage.getItem('client')).name.toString()+"  "
									+JSON.parse(localStorage.getItem('client')).lastname.toString()}
								</Typography>

								<br/>

								<Grid direction={"column"} justify={"center"} alignItems={"center"} container spacing={2}>
								<Avatar className={classess.large}></Avatar>
								</Grid>

								<br/>
								<br/>

								<Typography align={"center"} variant="h5" className={classes.white}>
								{JSON.parse(localStorage.getItem('client')).email.toString()}
								</Typography>

								<br/>
								<Link  underline="none" to="/EstadoPedido">
									<Typography align={"center"} variant="h5" className={classes.white}>
										Mis pedidos 
									</Typography>
								</Link>
								
								<Link  underline="none" to="/Coupons">
									<Typography align={"center"} variant="h5" className={classes.white}>
										Mis cupones: {JSON.parse(localStorage.getItem('client')).coupons.length}
									</Typography>
								</Link>
								

								

								<br/>
								<br/>
								<br/>
								<br/>
								<br/>
								<br/>

							</div>
							:
							null
						}
						{localStorage.getItem('isAdmin') ?
							<div>
								<br/>

								<Typography align={"center"} variant="h4" className={classes.white}>
									{JSON.parse(localStorage.getItem('entity')).name.toString()}
								</Typography>

								<br/>

								<Grid direction={"column"} justify={"center"} alignItems={"center"} container spacing={2}>
								<Avatar className={classess.large}>
									<img src={JSON.parse(localStorage.getItem('entity')).image} alt="chosen" style={{height:'100px'}}/>
								</Avatar>
								</Grid>

								
								<br/>
								
								<br/>

								<Typography align={"center"} variant="h6" className={classes.white}>
									{JSON.parse(localStorage.getItem('entity')).email.toString()}
								</Typography>



								<br/>

								<Link  underline="none" to="/EstadoPedido">
									<Typography align={"center"} variant="h5" className={classes.white}>
										Mis pedidos 
									</Typography>
								</Link>
								
								<br/>
								
								<Typography align={"center"} variant="h6" className={classes.white}>
									Mis promociones: {JSON.parse(localStorage.getItem('entity')).publicity.toString()}
								</Typography>
								
								
								<br/>
								
								<br/>
								
								<br/>

								<br/>
								
								<br/>
								
								<br/>

							</div>
							:
							null
						}
				</AccordionDetails>
					<Button
						onClick={handleLogout}
						variant="contained"
						fullWidth
						style={{background:'#272C2A'}}
						startIcon={<ExitToAppIcon className={classes.white} />}
					>
						<Typography variant="h6" className={classes.white}>
							Log out 
						</Typography>
					</Button>
				</Grid>
			</Accordion>
	);
}

