import * as React from 'react';
import { ReactComponent as Globe } from './globe.svg';
import './input.css';

export const Input = React.forwardRef((props: any, ref: any) => {
    return (
        <div className="input__block">
            <label>{props.label}</label>
            <div className="input__block">
                <input
                    className="input"
                    ref={ref}
                    type="text"
                    onFocus={props.onFocus}
                    placeholder={props.placeHolder}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    autoFocus
                />
                <Globe onClick={props.onIconClick} className="input__icon" />
            </div>
        </div>
    )
});




