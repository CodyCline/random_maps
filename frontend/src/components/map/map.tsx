import * as React from 'react';
import * as types from '../../types/components';
import GoogleMapReact from 'google-map-react';
import { MapTheme } from './theme';


export const GoogleMap = ({
    children,
    apiKey,
    defaultCenter,
    center,
    zoom,
    onLoad,
    isLoading,
}: any) => {
    const createMapOptions = () => {
        return {
            styles: MapTheme,
        }
    }
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{
                    key: apiKey,
                    libraries: ["places", "geometry"],
                }}
                defaultCenter={defaultCenter}
                center={center}
                zoom={zoom}
                onGoogleApiLoaded={onLoad}
                options={createMapOptions()}
            >
                {children}
            </GoogleMapReact>
        </div>
    )
}


