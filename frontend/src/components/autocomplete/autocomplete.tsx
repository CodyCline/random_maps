import * as React from 'react';
import { Input } from '../input/input';
import './autocomplete.css';

export const AutoCompleter = ({ 
    map, 
    mapApi, 
    addPlace, 
    placeHolder, 
    options, 
    label, 
    onIconClick,
}: any) => {
    const searchRef = React.useRef<any>(null);
    const infopanelRef = React.useRef<any>(null);
    let autoComplete: any;
    let infoWindow: any;

    const onPlaceChanged = () => {
        const place = autoComplete.getPlace();
        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        addPlace(place);
        searchRef.current.blur();
    }
    React.useEffect(() => {
        autoComplete = new mapApi.places.Autocomplete(
            searchRef.current,
            options,
        )
        infoWindow = new mapApi.InfoWindow();
        infoWindow.setContent(infopanelRef.current);
        autoComplete.addListener("place_changed", onPlaceChanged);
        autoComplete.bindTo("bounds", map);
        return () => {
            mapApi.event.clearInstanceListeners(searchRef);
        }
    }, [autoComplete, infoWindow])
    return (
        <div>
            <Input ref={searchRef}  
                placeholder={placeHolder}
                label={label}
                onIconClick={onIconClick}
            />
            <div ref={infopanelRef} className="pac-container"/>
        </div>
    )
}