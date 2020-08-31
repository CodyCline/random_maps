import * as React from 'react';
import './slider.css';

export const Slider = ({min, max, value, onChange, style}: any) => {
    return (
        <input 
            className="slider" 
            onChange={onChange}
            style={style}
            type="range" 
            min={min} 
            max={max} 
            value={value}
        />
    )
}