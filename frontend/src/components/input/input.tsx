import * as React from 'react';
import * as types from '../../types/components';
import { Tooltip} from 'react-tippy';
import { ReactComponent as Globe } from './globe.svg';
import './input.css';

export type Ref = HTMLInputElement;

export const Input = React.forwardRef<Ref, types.InputProps>((props, ref) => {
    return (
        <div className="input__block">
            <label>{props.label}</label>
            <div className="input__block">
                <input
                    autoFocus
                    className="input"
                    ref={ref}
                    type="text"
                    value={props.value}
                    onBlur={props.onBlur}
                    onChange={props.onChange}
                    placeholder={props.placeHolder}
                />
                <Tooltip className="tooltip__override" offset={-20} distance={20} title="Give location" position="top" trigger="mouseenter">
                    <Globe onClick={props.onIconClick} className="input__icon" />
                </Tooltip>
                
            </div>
        </div>
    )
});




