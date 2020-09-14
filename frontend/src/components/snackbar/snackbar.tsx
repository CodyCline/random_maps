import * as React from 'react';
import * as types from '../../types/components';
import { ReactComponent as ErrorIcon } from './error.svg'; 
import './snackbar.css'

export const SnackBar = ({message, show} :types.SnackbarProps) => {
    return (
        <React.Fragment>
            {show && <h2 className="snackbar">
                <ErrorIcon className="error__icon"/> 
                {message}
            </h2> 
            }
        </React.Fragment>
    )
}