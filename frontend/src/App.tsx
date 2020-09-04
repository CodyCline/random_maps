import * as React from 'react';
import { Layout } from './components/layout/layout';
import { GoogleMap } from './components/map/map';
import { Marker } from './components/marker/marker';
import { Slider } from './components/slider/slider';
import { AutoCompleter } from './components/autocomplete/autocomplete';
import { Button } from './components/button/button';
import { LocationList, Location } from './components/locationlist/locationlist';
import { Loader } from './components/loader/loader';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'react-tippy/dist/tippy.css'
import './App.css';


class App extends React.Component<any, any> {
	state: any = {
		userLocation: { lat: 39.828175, lng: -98.5795 }, //Geographic Center of the United States
		randomLocation: null,
		activeLocation: null,
		locationHistory: [], //List of random locations
		range: 10, //Min max 10k 999k
		isFetching: false,
		sidebarShow: true,
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
		});
	}

	giveGeoLocation() {
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

	setCurrentLocation(latitude, longitude, id) {
		const { mapInstance } = this.state;
		this.setState({
			randomLocation: {
				lat: latitude,
				lng: longitude,
			},
			activeLocation: id,
		})
		mapInstance.setCenter({
			lat: parseFloat(latitude),
			lng: parseFloat(longitude),
		})

	}

	async getRandomLocation() {
		const { mapInstance } = this.state;
		const newLocationId = uuidv4();
		this.setState({ isFetching: true });
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
			activeLocation: newLocationId,
			randomLocation: {
				lat: res.data.latitude,
				lng: res.data.longitude,
			},
			isFetching: false,
		})
		mapInstance.setCenter({
			lat: res.data.latitude,
			lng: res.data.longitude,
		});
		mapInstance.setZoom(12);
	}

	render() {
		const API_KEY: any = process.env.REACT_APP_GOOGLE_MAPS_KEY;
		const { userLocation, randomLocation, locationHistory, range, mapApiLoaded, mapInstance, mapApi } = this.state;
		return (
			<Layout>
				<div style={{
					background: "#232429",
					display: "grid",
					gridTemplateColumns: "minmax(300px,25%)1fr"
				}}>
					<div style={{ padding: "20px" }}>
						{mapApiLoaded &&
							<AutoCompleter
								map={mapInstance}
								mapApi={mapApi}
								placeHolder="City, street or address"
								label="Enter a location"
								addPlace={(place: any) => this.setUserLocation(place)}
								onIconClick={() => this.giveGeoLocation()}
							/>
						}
						<Slider
							min={10.0}
							max={999.0}
							onChange={(event) => this.setRange(event)}
							value={range}
							label="Set the range"
						/>
						<Button disabled={this.state.isFetching} onClick={() => this.getRandomLocation()}>
							{this.state.isFetching ? <Loader /> : "Random Location"}
						</Button>
						<p>Location History</p>
						{locationHistory &&
							<LocationList>
								{locationHistory.map((location: any) => {
									return (
										<Location
											key={location.id}
											isActive={this.state.activeLocation === location.id}
											latitude={location.lat}
											longitude={location.lng}
											onClick={() => this.setCurrentLocation(location.lat, location.lng, location.id)}
										/>
									);
								})}
							</LocationList>
						}
					</div>
					<GoogleMap
						//Map center is controlled by the maps api not state
						apiKey={API_KEY}
						onLoad={({ map, maps }: any) => this.apiHasLoaded(map, maps)}
						zoom={4}
						defaultCenter={{ lat: userLocation.lat, lng: userLocation.lng }}
					>
						<Marker
							text="Your Location"
							lat={userLocation.lat}
							lng={userLocation.lng}
						/>
						{
							this.state.activeLocation &&
							<Marker
								text="Random Location"
								lat={randomLocation.lat}
								lng={randomLocation.lng}
							/>
						}
					</GoogleMap>
				</div>
			</Layout>
		)
	}

}

export default App;
