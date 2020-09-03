import * as React from 'react';
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
} :any) => {
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


class Map extends React.Component<any, any> {
    createMapOptions() {
        return {
            styles: MapTheme,
        }
    }
    render() {
        const apiKey: any = process.env.REACT_APP_GOOGLE_MAPS_KEY
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    bootstrapURLKeys={{ key: apiKey, libraries: ["places", "geometry"], }}
                    defaultCenter={this.props.defaultCenter}
                    center={this.props.center}
                    zoom={this.props.zoom}
                    onGoogleApiLoaded={this.props.onLoad}
                    options={() => this.createMapOptions()}
                >
                    {this.props.children}
                </GoogleMapReact>
            </div>
        );
    }
}