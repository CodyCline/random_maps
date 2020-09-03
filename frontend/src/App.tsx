import * as React from 'react';
import { GoogleMap } from './components/map/map';
import { Marker } from './components/marker/marker';
import { Slider } from './components/slider/slider';
import { AutoCompleter } from './components/autocomplete/autocomplete';
import axios from 'axios';
import './App.css';


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
		const API_KEY :any = process.env.REACT_APP_GOOGLE_MAPS_KEY
		return (
			
			<React.Fragment>
				<nav style={{ background: "#CCC", height: "100%" }}><h1>NAVBAR</h1></nav>
				<div style={{ background: "#232429", display: "grid", gridTemplateColumns: "minmax(150px,25%)1fr" }}>
					<div style={{padding: "20px"}}>
						{this.state.mapApiLoaded && <AutoCompleter
								map={this.state.mapInstance} 
								mapApi={this.state.mapApi} 
								placeHolder="City, street or address"
								label="Enter a location"
								addPlace={(place:any) => this.setLocation(place)} 
								onIconClick={() => this.giveLocation()}
							/>
						}
						<Slider
							min={10.0}
							max={999.0}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setRange(event)}
							value={this.state.range}
							label="Set the range"
						/>
						<button onClick={() => this.getRandomLocation()}>Get Location</button>
					</div>
					<GoogleMap 
						apiKey={API_KEY}
						onLoad={({ map, maps }:any) => this.apiHasLoaded(map, maps)} 
						zoom={this.state.zoom} 
						center={{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}
					>
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
					</GoogleMap>
				</div>
				<div style={{height: "200px", background: "#171819"}}>
					Footer
				</div>
			</React.Fragment>
		)
	}

}

export default App;
