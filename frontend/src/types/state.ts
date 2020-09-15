import { Coordinates } from './components';

export interface ILocation {
    id: string,
    lat: string | number,
    lng: string | number
}

export interface AppState {
    userLocation: Coordinates,
    activeLocation: ILocation | null,
    locationHistory: ILocation[],
    range: number,
    isFetching: boolean,
    mapInstance: any,
    mapApi: any,
    mapApiLoaded: boolean,
    error: boolean,
    errorMessage: string | null,
}