import * as React from 'react';
import { ReactComponent as GoogleMaps } from './google-maps-logo.svg';
import { ReactComponent as Waze } from './waze.svg';
import { ReactComponent as Apple } from './apple.svg';
import { ReactComponent as Bing } from './bing.svg';
import './directionbar.css';

//Directions automatically redirects the user to a map platform of their choice with driving directions
enum PlatformOptions {
    "google",
    "waze",
    "apple",
    "bing",
}

export const DirectionBar = ({to, from} : any) => {
    //Generate links to different map applications will open the mobile app if on mobile device.
    const generateMapLink = (platform, toLocation, fromLocation) => {
        switch (platform) {
            case "google":
                return `https://www.google.com/maps/dir/${fromLocation.lat},${fromLocation.lng}/${toLocation.lat},${toLocation.lng}`;
            case "waze":
                return `https://waze.com/ul?ll=${toLocation.lat},${toLocation.lng}&from=${fromLocation.lat},${fromLocation.lng}&navigate=yes`;
            case "apple":
                return `http://maps.apple.com/?saddr=${fromLocation.lat},${fromLocation.lng}&daddr=${toLocation.lat},${toLocation.lng}`;
            case "bing":
                return `https://bing.com/maps/default.aspx?rtp=adr.${fromLocation.lat},${fromLocation.lng}~adr.${toLocation.lat},${toLocation.lng}`;
            default:
                return `https://www.google.com/maps/dir/${fromLocation.lat},${fromLocation.lng}/${toLocation.lat},${toLocation.lng}`; 
        }
    }
    return (
        <ul className="direction__bar">
            <li className="direction__option">
                <a href={generateMapLink("google", to, from)} target="_blank" rel="noopener noreferrer">
                    <GoogleMaps className="direction__logo google__logo"/>
                </a>
            </li>
            <li className="direction__option">
                <a href={generateMapLink("waze", to, from)} target="_blank" rel="noopener noreferrer">
                    <Waze className="direction__logo waze__logo"/>
                </a>
            </li>
            <li className="direction__option">
                <a href={generateMapLink("apple", to, from)} target="_blank" rel="noopener noreferrer">
                    <Apple className="direction__logo apple__logo"/>
                </a>
            </li>
            <li className="direction__option">
                <a href={generateMapLink("bing", to, from)} target="_blank" rel="noopener noreferrer">
                    <Bing className="direction__logo bing__logo"/>
                </a>
            </li>
        </ul>
    )
}