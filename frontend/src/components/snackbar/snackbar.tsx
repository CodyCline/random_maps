import * as React from 'react';
import { ReactComponent as ErrorIcon } from './error.svg'; 
import './snackbar.css'

export const SnackBar = ({message, show} :any) => {
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