import * as React from 'react';

export const Weather = ({forecast, temperature}) => {
    //Get the icon corresponding with forecast
    const getIcon = (forecast) => {
        switch (forecast) {
            case "rainy":
                return;
            case "partly-cloud":
                return

        }
    }
    return (
        <div>
            {temperature}
        </div>
    )

}