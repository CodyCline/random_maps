
import * as React from 'react';

declare var window: any;


export class AutoComplete extends React.Component<any, any> {
    searchInput = React.createRef<any>();
    autoComplete: any;

    componentDidMount({ map, mapApi } = this.props) {
        const options = {
            // restrict your search to a specific type of result
            // types: ['geocode', 'address', 'establishment', '(regions)', '(cities)'],
            // restrict your search to a specific country, or an array of countries
            // componentRestrictions: { country: ['gb', 'us'] },
        };
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput.current,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlaceChanged = ({ map, addPlace } = this.props) => {
        const place = this.autoComplete.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        addPlace(place);
        this.searchInput.current.blur();
    };


    render() {
        return (
            <div>
                <input
                    ref={this.searchInput}
                    type="text"
                    placeholder="Enter a location"
                />
            </div>
        );
    }
}

export default AutoComplete;



export const AutoCompleter = ({ map, mapApi, addPlace }: any) => {
    const options = {
        //Options here
    }
    const searchRef = React.useRef<any>(null);
    let autoComplete: any;

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
        autoComplete.addListener("place_changed", onPlaceChanged);
        autoComplete.bindTo("bounds", map);
        return () => {
            mapApi.event.clearInstanceListeners(searchRef);
        }
    })
    return (
        <div>
            <Input ref={searchRef}  
                placeHolder="Enter your location"
            />
        </div>
    )
}

export const Input = React.forwardRef((props:any, ref:any) => {
    return (
        <div>
            <label>{props.label}</label>
            <input
                ref={ref}
                type="text"
                onFocus={props.onFocus}
                placeholder={props.placeHolder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
});