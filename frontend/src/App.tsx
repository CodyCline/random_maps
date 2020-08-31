import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './components/marker/marker';
import { Slider } from './components/slider/slider';
import { AutoCompleter } from './components/input/input';
import axios from 'axios';
import './App.css';
import { MapTheme } from './components/map/theme';


class Map extends React.Component<any, any> {
	createMapOptions () {
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
					defaultCenter={this.props.center}
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

class App extends React.Component<any, any> {
	state: any = {
		randomLocation: null,
		currentLocation: { lat: 39.828175, lng: -98.5795 },
		zoom: 4,
		range: 10, //Min max 10k 999k
		isFetching: false,

		mapApiLoaded: false,
		mapInstance: null,
		mapApi: null,
	}
	giveLocation() {
		navigator.geolocation.getCurrentPosition((position: Position) => {
			this.setState({
				currentLocation: {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				},
				randomLocation: null,
				zoom: 17
			});
		}, (error: PositionError) => {
			console.log("ERROR\n", error);
		})
	}

	setLocation (place:any) {
		this.setState({
			currentLocation: {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng()
			}
		})
	}

	apiHasLoaded (map: any, maps: any) {
		this.setState({
			mapApiLoaded: true,
			mapInstance: map,
			mapApi: maps,
		});
	};

	async getRandomLocation() {
		const res = await axios.get("http://localhost:5000/location", {
			params: {
				latitude: this.state.currentLocation.lat,
				longitude: this.state.currentLocation.lng,
				mean: (this.state.range * 1000),
			}
		})
		this.setState({
			randomLocation: {
				lat: res.data.latitude,
				lng: res.data.longitude,
			},
			zoom: 17,
		})
	}
	setRange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			range: event.target.value
		})
	}
	render() {
		console.log(this.state.mapApi, "i\n", this.state.mapInstance)
		return (
			
			<React.Fragment>
				<nav style={{ background: "#CCC", height: "100%" }}><h1>NAVBAR</h1></nav>
				<div style={{ display: "grid", gridTemplateColumns: "minmax(150px,25%)1fr" }}>
					<div>
						{this.state.mapApiLoaded && 
							<AutoCompleter
							map={this.state.mapInstance} 
							mapApi={this.state.mapApi} 
							addPlace={(place:any) => this.setLocation(place)} 
						/>}
						<p>Input Location</p>
						<button onClick={() => this.giveLocation()}>Give Location</button>
						<button onClick={() => this.getRandomLocation()}>Get Location</button>
						<Slider
							min={10.0}
							max={999.0}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setRange(event)}
							value={this.state.range}
						/>
						<p>{this.state.range}</p>
					</div>
					<Map onLoad={({ map, maps }:any) => this.apiHasLoaded(map, maps)} zoom={this.state.zoom} center={{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}>
						<Marker
							text="Your Location"
							lat={this.state.currentLocation.lat}
							lng={this.state.currentLocation.lng}
						/>
						{
							this.state.randomLocation &&
							<Marker
								text="Random Location"
								lat={this.state.randomLocation.lat}
								lng={this.state.randomLocation.lng}
							/>
						}
					</Map>
				</div>
			</React.Fragment>
		)
	}

}

export default App;
