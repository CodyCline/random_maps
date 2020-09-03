import * as React from 'react';

export const Button = ({children} :any) => {
    return (
        <button className="button">
            {children}
        </button>
    )
}