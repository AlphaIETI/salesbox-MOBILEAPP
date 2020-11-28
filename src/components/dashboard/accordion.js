import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Pricing from './sliderPrice';

const useStyles = makeStyles((theme) => ({
    root1: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    general:{
        backgroundColor:'#272C2A',
    },
    accordion:{
        backgroundColor:'#272C2A',
    },
    textColor: {
        color: 'white',
        fontWeight: 'bold',
    },
    divPrice: {
        paddingLeft: '32px',
        paddingRight: '32px',
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      color: 'white',
      right: -3,
      top: 20,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  function valuetext(valuePrice) {
    return `${valuePrice}°C`;
  }

export default function AccordionComponent(props) {
    //CantidadProductosPorMarca
    let brands = [];
    let countBrands = [];
    let propsBrands = [];
    let brand;
    if(props.products !== undefined){
        if(props.view === "#"){
            props.products.map(function(pr){
                brands.push(pr.brand)
            });
        }else{
            props.products.map(function(pr){
                if(pr.brand === props.view){
                    brands.push(pr.brand)
                }
            });
        }
        brands.forEach(function(i) { countBrands[i] = (countBrands[i]||0) + 1;});
        for (brand in countBrands) {
            propsBrands.push({name:brand,cantProducts:countBrands[brand]});
        }
    }
    //CantidadDeColoresDisponibles
    let colors = [];
    let countColors = [];
    let propsColors = [];
    let color;
    if(props.products !== undefined){
        if(props.view === "#"){
            props.products.map(function(pr){
                pr.colors.map(function(co){
                    colors.push(co)
                })
            });
        }else{
            props.products.map(function(pr){
                pr.colors.map(function(co){
                    if(pr.brand === props.view){
                        colors.push(co)
                    }
                })
            });
        }
        colors.forEach(function(i) { countColors[i] = (countColors[i]||0) + 1;});
        for (color in countColors) {
            propsColors.push({name:color,cantColors:countColors[color]});
        }
    }
    //CatidadDeCategoriasDisponibles
    let categories = [];
    let countCategories = [];
    let propsCategories = [];
    let category;
    if(props.products !== undefined){
        if(props.view === "#"){
            props.products.map(function(pr){
                categories.push(pr.category)
            });
        }else{
            props.products.map(function(pr){
                if(pr.brand === props.view){
                    categories.push(pr.category)
                }
            });
        }
        categories.forEach(function(i) { countCategories[i] = (countCategories[i]||0) + 1;});
        for (category in countCategories) {
            propsCategories.push({name:category,cantCategories:countCategories[category]});
        }
    }
    //CantidadGeneroDisponibles
    let genres = [];
    let countGenres = [];
    let propsGenres = [];
    let gender;
    if(props.products !== undefined){
        if(props.view === "#"){
            props.products.map(function(pr){
                genres.push(pr.gender)
            });
        }else{
            props.products.map(function(pr){
                if(pr.brand === props.view){
                    genres.push(pr.gender)
                }
            });  
        }
        genres.forEach(function(i) { countGenres[i] = (countGenres[i]||0) + 1;});
        for (gender in countGenres) {
            propsGenres.push({name:gender,cantGenres:countGenres[gender]});
        }
    }

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState("panel1");
    const [expanded3, setExpanded3] = React.useState(false);
    const [expanded4, setExpanded4] = React.useState(false);
    const [expanded5, setExpanded5] = React.useState(false);
    const [expanded7, setExpanded7] = React.useState(false);
    const [expanded8, setExpanded8] = React.useState(false);
    const [view, setView] = React.useState(props.view);
    const [value, setValue] = React.useState(4);
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: false,
    });
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleChange2 = (panel) => (event, newExpanded) => {
        setExpanded2(newExpanded ? panel : false);
    };
    const handleChange3 = (panel) => (event, newExpanded) => {
        setExpanded3(newExpanded ? panel : false);
    };
    const handleChange4 = (panel) => (event, newExpanded) => {
        setExpanded4(newExpanded ? panel : false);
    };
    const handleChange5 = (panel) => (event, newExpanded) => {
        setExpanded5(newExpanded ? panel : false);
    };
    const handleChange6 = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleChange7 = (panel) => (event, newExpanded) => {
        setExpanded7(newExpanded ? panel : false);
    };
    const handleChange8 = (panel) => (event, newExpanded) => {
        setExpanded8(newExpanded ? panel : false);
    };
    
    const [stateCheckBoxCategory, setStateCheckBoxCategory] = React.useState([]);

    const handleChangeCheckBoxCategory = (event) => {
        if(!stateCheckBoxCategory.includes(event.target.name)){
            if(props.funFilCategory !== undefined){
                setStateCheckBoxCategory(stateCheckBoxCategory.concat(event.target.name));
                props.funFilCategory(event.target.name);
            }
        }else{
            if(props.funDelFilCategory !== undefined){
                setStateCheckBoxCategory(stateCheckBoxCategory.filter(item => item !== event.target.name));
                props.funDelFilCategory(event.target.name);
            }
        }
    };

    const [stateCheckBoxBrand, setStateCheckBoxBrand] = React.useState([]);

    const handleChangeCheckBoxBrand = (event) => {
        if(!stateCheckBoxBrand.includes(event.target.name)){
            if(props.funFilMarca !== undefined){
                setStateCheckBoxBrand(stateCheckBoxBrand.concat(event.target.name));
                props.funFilMarca(event.target.name);
            }
        }else{
            if(props.funDelFilMarca !== undefined){
                setStateCheckBoxBrand(stateCheckBoxBrand.filter(item => item !== event.target.name));
                props.funDelFilMarca(event.target.name);
            }
        }
    };

    const [stateCheckBoxColors, setStateCheckBoxColors] = React.useState([]);

    const handleChangeCheckBoxColors = (event) => {
        if(!stateCheckBoxColors.includes(event.target.name)){
            if(props.funFilColor !== undefined){
                setStateCheckBoxColors(stateCheckBoxColors.concat(event.target.name));
                props.funFilColor(event.target.name);
            }
        }else{
            if(props.funDelFilColor !== undefined){
                setStateCheckBoxColors(stateCheckBoxColors.filter(item => item !== event.target.name));
                props.funDelFilColor(event.target.name);
            }
        }
    };

    const [stateCheckBoxGender, setStateCheckBoxGender] = React.useState([]);

    const handleChangeCheckBoxGender = (event) => {
        if(!stateCheckBoxGender.includes(event.target.name)){
            if(props.funFilGender !== undefined){
                setStateCheckBoxGender(stateCheckBoxGender.concat(event.target.name));
                props.funFilGender(event.target.name);
            }
        }else{
            if(props.funDelFilGender !== undefined){
                setStateCheckBoxGender(stateCheckBoxGender.filter(item => item !== event.target.name));
                props.funDelFilGender(event.target.name);
            }
        }
    };

    const [valuePrice, setValuePrice] = React.useState([0, 500000]);

    const handleChangeValuePrice = (event, newValue) => {
        setValuePrice(newValue);
    };
    return (
        <div className={classes.general}>
            <Divider />
                <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.accordion}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography className={classes.textColor}>Categorias</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                        {propsCategories.map(category => (
                            <div key={propsCategories.indexOf(category)}>
                            <StyledBadge badgeContent={category.cantCategories} color="default">
                                <div className={classes.textColor}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            style ={{
                                                color: "white",
                                            }}
                                            onChange={handleChangeCheckBoxCategory}
                                            name={category.name}
                                        />}
                                    label={category.name}
                                />
                                </div>
                            </StyledBadge>
                            </div>
                        ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            <Divider />
            {view === "#" ? 
                <Accordion square expanded={expanded2 === 'panel1'} onChange={handleChange2('panel1')} className={classes.accordion}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography className={classes.textColor}>Marcas</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root1}>
                            {propsBrands.map(brand => (
                                <div key={propsBrands.indexOf(brand)}>
                                <StyledBadge badgeContent={brand.cantProducts} color="default">
                                    <div className={classes.textColor}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                style ={{
                                                    color: "white",
                                                }}
                                                onChange={handleChangeCheckBoxBrand}
                                                name={brand.name}
                                            />}
                                        label={brand.name}
                                    />
                                    </div>
                                </StyledBadge>
                                </div>    
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            :
            null
            }
            <Divider />
                <Accordion square expanded={expanded7 === 'panel1'} onChange={handleChange7('panel1')} className={classes.accordion}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography className={classes.textColor}>Géneros</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root1}>
                            {propsGenres.map(gender => (
                                <div key={propsGenres.indexOf(gender)}>
                                <StyledBadge badgeContent={gender.cantGenres} color="default">
                                    <div className={classes.textColor}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                style ={{
                                                    color: "white",
                                                }}
                                                onChange={handleChangeCheckBoxGender}
                                                name={gender.name}
                                            />}
                                        label={gender.name}
                                    />
                                    </div>
                                </StyledBadge>
                                </div>    
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            <Divider />
                <Accordion square expanded={expanded8 === 'panel1'} onChange={handleChange8('panel1')} className={classes.accordion}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography className={classes.textColor}>Colores</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root1}>
                            {propsColors.map(color => (
                                <div key={propsColors.indexOf(color)}>
                                <StyledBadge badgeContent={color.cantColors} color="default">
                                    <div className={classes.textColor}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                style ={{
                                                    color: "white",
                                                }}
                                                onChange={handleChangeCheckBoxColors}
                                                name={color.name}
                                            />}
                                        label={color.name}
                                    />
                                    </div>
                                </StyledBadge>
                                </div>    
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            <Divider />
                <Accordion square expanded={expanded3 === 'panel1'} onChange={handleChange3('panel1')} className={classes.accordion}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography className={classes.textColor}>Precios</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.divPrice}>
                        <Pricing funMinMaxPrice={props.funMinMaxPrice} minMaxPrice={props.minMaxPrice} flagPrice={props.flagPrice}/>
                    </AccordionDetails>
                </Accordion>
            <Divider />
            {!localStorage.getItem('isAdmin') ?
            <div>  
                <Accordion square expanded={expanded4 === 'panel1'} onChange={handleChange4('panel1')} className={classes.accordion}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography className={classes.textColor}>Búsqueda Personalizada</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControlLabel
                            control={
                            <Switch
                                checked={state.checkedB}
                                onChange={handleChange6}
                                name="checkedB"
                                color="primary"
                            />
                            }
                        />
                    </AccordionDetails>
                </Accordion> 
            <Divider />
                <Accordion square expanded={expanded5 === 'panel1'} onChange={handleChange5('panel1')} className={classes.accordion}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography className={classes.textColor}>Favoritos</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                        <Box borderColor="transparent">
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            :
            null
            }                        
        </div>
    );
}