import * as React from 'react';
import './button.css';

export const Button = (props :any) => {
    return (
        <button {...props} className="button">
            {props.children}
        </button>
    )
}