import * as React from 'react';
import './slider.css';

export const Slider = ({min, max, value, onChange, style, label}: any) => {
    return (
        <div>
            <label>{label}</label>
            <input 
                className="slider" 
                onChange={onChange}
                style={style}
                type="range" 
                min={min} 
                max={max} 
                value={value}
            />
            <span>Current Range: {value}</span>
        </div>
    )
}