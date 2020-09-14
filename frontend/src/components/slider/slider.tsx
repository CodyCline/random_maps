import * as React from 'react';
import * as types from '../../types/components';
import './slider.css';

export const Slider = ({min, max, value, onChange, style, label}: types.SliderProps) => {
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