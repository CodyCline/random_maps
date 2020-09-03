import * as React from 'react';
import { Layout } from './components/layout/layout';
import { GoogleMap } from './components/map/map';
import { Marker } from './components/marker/marker';
import { Slider } from './components/slider/slider';
import { AutoCompleter } from './components/autocomplete/autocomplete';
import { Button } from './components/button/button';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';


class App extends React.Component<any, any> {
	state: any = {
		userLocation: { lat: 39.828175, lng: -98.5795 }, //Geographic Center of the United States
		randomLocation: null,
		locationHistory: [], //List of random locations
		range: 10, //Min max 10k 999k
		isFetching: false,

		mapApiLoaded: false,
		mapInstance: null,
		mapApi: null,
	}
	apiHasLoaded(map: any, maps: any) {
		this.setState({
			mapApiLoaded: true,
			mapInstance: map,
			mapApi: maps,
		});
	};

	setRange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			range: event.target.value
		})
	}

	giveLocation() {
		navigator.geolocation.getCurrentPosition((position: Position) => {
			this.setState({
				userLocation: {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				},
				zoom: 17
			});
			this.state.mapInstance.setCenter({
				...this.state.userLocation,
			})
		}, (error: PositionError) => {
			console.log("ERROR\n", error);
		})
	}

	//Internal google maps function
	setUserLocation(place: any) {
		this.setState({
			userLocation: {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng()
			}
		})
	}

	setCurrentLocation(latitude: number, longitude: number) {
		const { mapInstance } = this.state;
		this.setState({
			randomLocation: {
				lat: latitude,
				lng: longitude,
			},
		})
		mapInstance.setCenter({
			lat:latitude, 
			lng:longitude,
		})

	}

	async getRandomLocation() {
		const { mapInstance } = this.state;
		const newLocationId = uuidv4();
		const res = await axios.get("http://localhost:5000/location", {
			params: {
				latitude: this.state.userLocation.lat,
				longitude: this.state.userLocation.lng,
				mean: (this.state.range * 1000),
			}
		})
		this.setState({
			locationHistory: [
				...this.state.locationHistory,
				{ id: newLocationId, lat: res.data.latitude, lng: res.data.longitude },
			],
			randomLocation: {
				lat: res.data.latitude,
				lng: res.data.longitude,
			},
		})
		mapInstance.setCenter({
			lat: res.data.latitude,
			lng: res.data.longitude,
		});
		mapInstance.setZoom(12)
	}
	
	render() {
		const API_KEY: any = process.env.REACT_APP_GOOGLE_MAPS_KEY;
		return (
			<Layout>
				<div style={{ background: "#232429", display: "grid", gridTemplateColumns: "minmax(250px,25%)1fr" }}>
					<div style={{ padding: "20px" }}>
						{this.state.mapApiLoaded && <AutoCompleter
							map={this.state.mapInstance}
							mapApi={this.state.mapApi}
							placeHolder="City, street or address"
							label="Enter a location"
							addPlace={(place: any) => this.setUserLocation(place)}
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
						<Button onClick={() => this.getRandomLocation()}>Random Location</Button>
						<div style={{border: "2px solid #CCC", borderRadius: "5px"}}>
							{this.state.randomLocation  &&
								<p>Current Location {`${this.state.randomLocation.lat}, ${this.state.randomLocation.lng}`}</p>
							}
							
						</div>
						<ul>
							{this.state.locationHistory.map((location:any) => (
								<li onClick={() => this.setCurrentLocation(location.lat, location.lng)}>Location</li>
							))}
						</ul>
					</div>
					<GoogleMap
						//Map center is controlled by the maps api not state
						apiKey={API_KEY}
						onLoad={({ map, maps }: any) => this.apiHasLoaded(map, maps)}
						zoom={4}
						defaultCenter={{ lat: this.state.userLocation.lat, lng: this.state.userLocation.lng }}
					>
						<Marker
							text="Your Location"
							lat={this.state.userLocation.lat}
							lng={this.state.userLocation.lng}
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
			</Layout>
		)
	}

}

export default App;
