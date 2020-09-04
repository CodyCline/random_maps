import * as React from 'react';
import { ReactComponent as GoogleMaps } from './google-maps-logo.svg';
import { ReactComponent as Waze } from './waze.svg';
import { ReactComponent as Apple } from './apple.svg';
import { ReactComponent as Bing } from './bing.svg';
import './directionbar.css';

//Directions automatically redirects the user to a map platform of their choice with driving directions
enum PlatformOptions {
    "google",
    "bing",
    "waze"
}

export const DirectionBar = () => {
    const [directions, showDirections] = React.useState<boolean>(false);
    function generateLink (platform:PlatformOptions, latitude, longitude) {
        switch (platform) {
            case PlatformOptions.google:
                return;
            case PlatformOptions.waze:
                return;
            case PlatformOptions.bing:
                return;
            default:
                return; 
        }
    }
    return (
        <React.Fragment>
        <ul className="direction__bar">
            <li className="direction__option">
                <GoogleMaps className="direction__logo google__logo"/>
            </li>
            <li className="direction__option">
                <Waze className="direction__logo waze__logo"/>
            </li>
            <li className="direction__option">
                <Apple className="direction__logo apple__logo"/>
            </li>
            <li className="direction__option">
                <Bing className="direction__logo google__logo"/>
            </li>
        </ul>
        </React.Fragment>
    )
}