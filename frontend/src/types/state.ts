import {v4 as uuid} from 'uuid';

type UUID = string;
type Coordinate = (string | number);


export interface Location {
    id: UUID,
    lat: Coordinate
    lng: Coordinate
}


interface IState {
    userLocation: {
        lat: Coordinate,
        lng: Coordinate,
    },

}