export type Coordinates = {
    lat: string | number,
    lng: string | number,
};

export interface PureComponent {
    children: React.ReactNode,
};

export interface AutoCompleteProps { 
    map: any,
    mapApi: any,
    addPlace: (place:any) => void,
    placeHolder: string,
    options?: object
    label: string,
    onIconClick: () => void,
}

export interface DirectionBarProps {
    to: Coordinates,
    from: Coordinates,
}


export interface InputProps {
    autoFocus?: boolean,
    label:string,
    value?: any,
    placeHolder?: string,
    onBlur?: () => void,
    onChange?: () => void,
    onIconClick?: () => void,
}

export interface LocationProps {
    userLocation: Coordinates,
    onClick?: any,
    onDoubleClick: (event:any) => void,
    isActive: any,
    latitude: any,
    longitude: any,
}

export interface MarkerProps {
    text: string,
    color?: string,
    lat?: any,
    lng?: any,
}

export interface SliderProps {
    min: number,
    max: number,
    value: number,
    style?: React.CSSProperties,
    label: string,
    onChange: (event:any) => void,
}

export interface SnackbarProps {
    message: string,
    show: boolean,
}