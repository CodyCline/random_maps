import * as React from 'react';
import { Tooltip } from 'react-tippy';
import { ReactComponent as MapIcon } from './map.svg';
import { ReactComponent as MarkerIcon } from './map-marker.svg';
import { ReactComponent as CopyIcon } from './copy.svg';
import { DirectionBar } from '../directionbar/directionbar';
import './locationlist.css';

export const LocationList = ({ children }: any) => (
    <ul className="location__list">{children}</ul>
)


export const Location = (props: any) => {
    const iconRef = React.useRef<any>(null);
    const [isShown, showBar] = React.useState(false);
    const toggleBar = () => {
        showBar(isShown);
    }
    //If user is not clicking on an icon fire the main onClick event
    const beforeOnClick = (event: React.SyntheticEvent<HTMLLIElement>) => {
        if (iconRef.current !== event.target && !iconRef.current?.contains(event.target)) {
            props.onClick();
        }
    }
    const onCopy = (latitude, longitude) => {
        navigator.clipboard.writeText(`${latitude}, ${longitude}`)
    }
    return (
        <li
            className={`location__item ${props.isActive && "item__active"}`}
            onClick={(event) => beforeOnClick(event)}
            onDoubleClick={props.onDoubleClick}
        >
            <p>
                <MarkerIcon className="location__item__icon marker__icon" />
                {`${parseFloat(props.latitude).toFixed(2)}, ${parseFloat(props.longitude).toFixed(2)}`}
            </p>
            <Tooltip
                html={
                    <DirectionBar 
                        to={{lat: props.latitude, lng: props.longitude}}
                        from={props.userLocation}
                    />
                }
                interactive
                style={{margin: 0}}
                position="bottom-start"
                distance={20}
            >
                <p onClick={toggleBar} ref={iconRef} style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>
                    <MapIcon className="location__item__icon map__icon" />
                </p>
            </Tooltip>
            <Tooltip position="bottom-start" distance={20} title="Click to copy">
                <p ref={iconRef} style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>
                    <CopyIcon className="location__item__icon copy__icon" onClick={() => onCopy(props.latitude, props.longitude)} />
                </p>
            </Tooltip>
        </li>
    )
}

