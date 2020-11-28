import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return "$"+value; 
}

export default function RangeSlider(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState([]);
  useEffect (() => {
    if(!props.flagPrice && props.minMaxPrice !== [1000000000000, -1000000000000]){
      setValue([props.minMaxPrice[0],props.minMaxPrice[1]]);
    }
    },[props.minMaxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.funMinMaxPrice(newValue);
  };
  
  return (
    <div className={classes.root}>
      <Slider
        max={props.minMaxPrice[1]}
        min={props.minMaxPrice[0]}
        step={10000}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}