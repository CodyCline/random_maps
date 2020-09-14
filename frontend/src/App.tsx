import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getPosition } from './asyncLocation';
import { Layout } from './components/layout/layout';
import { GoogleMap } from './components/map/map';
import { Marker } from './components/marker/marker';
import { Slider } from './components/slider/slider';
import { AutoComplete } from './components/autocomplete/autocomplete';
import { Button } from './components/button/button';
import { LocationList, Location } from './components/locationlist/locationlist';
import { SnackBar } from './components/snackbar/snackbar';
import { Loader } from './components/loader/loader';
import 'react-tippy/dist/tippy.css'
import './App.css';

class App extends React.Component<any, any> {
	state: any = {
		userLocation: { lat: 39.828175, lng: -98.5795 }, //Geographic Center of the United States
		activeLocation: null,
		locationHistory: [], //List of random locations
		range: 50, //Min max 10k 999k
		isFetching: false,
		mapApiLoaded: false,
		mapInstance: null,
		mapApi: null,
		errors: false,
		errorMessage: null,
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

	//Internal google maps function
	setUserLocation(place: any) {
		this.setState({
			userLocation: {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng()
			}
		})
	}

	setActiveLocation(latitude, longitude, id) {
		const { mapInstance } = this.state;
		this.setState({
			activeLocation: {
				lat: latitude,
				lng: longitude,
				id: id,
			},
		})
		mapInstance.setCenter({
			lat: parseFloat(latitude),
			lng: parseFloat(longitude),
		})

	}

	deleteLocation(id: string) {
		this.setState((prevState: any) => ({
			locationHistory: prevState.locationHistory.filter((location: any) => {
				return location.id !== id;
			}),
			activeLocation: null,
		}));
	}

	async getRandomLocation() {
		try {
			const { mapInstance } = this.state;
			const newLocationId = uuidv4();
			this.setState({ isFetching: true });
			const res : AxiosResponse = await axios.get("http://localhost:5000/location", {
				params: {
					latitude: this.state.userLocation.lat,
					longitude: this.state.userLocation.lng,
					mean: (this.state.range * 1000),
				}
			})
			this.setState((prevState: any) => ({
				locationHistory: [
					...prevState.locationHistory,
					{ id: newLocationId, lat: res.data.latitude, lng: res.data.longitude },
				],
				activeLocation: {
					lat: res.data.latitude,
					lng: res.data.longitude,
					id: newLocationId,
				},
				isFetching: false,
			}));
			mapInstance.setCenter({
				lat: res.data.latitude,
				lng: res.data.longitude,
			});
			mapInstance.setZoom(12);
		} catch (error) {
			console.log(error);
			this.setState({
				isFetching: false,
				error: true,
				errorMessage: "Error getting random location, try again later"
			})
		}
	}

	//Navigator method to get geolocation
	async getGeoLocation() {
		try {
			const position : Position = await getPosition();
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
		} catch (error) {
			console.log(error);
			this.setState({
				error: true,
				errorMessage: "Error could not get your location",
			})
		}
	}

	render() {
		const API_KEY: any = process.env.REACT_APP_GOOGLE_MAPS_KEY;
		const { userLocation, activeLocation, locationHistory, range, mapApiLoaded, mapInstance, mapApi } = this.state;
		return (
			<Layout>
				<div className="app__container">
					<div className="app__sidebar">
						{mapApiLoaded &&
							<AutoComplete
								map={mapInstance}
								mapApi={mapApi}
								placeHolder="City, street or address"
								label="Enter a location"
								addPlace={(place: any) => this.setUserLocation(place)}
								onIconClick={() => this.getGeoLocation()}
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
											userLocation={userLocation}
											key={location.id}
											isActive={activeLocation && activeLocation.id === location.id}
											latitude={location.lat}
											longitude={location.lng}
											onClick={() => this.setActiveLocation(location.lat, location.lng, location.id)}
											onDoubleClick={() => this.deleteLocation(location.id)}
										/>
									);
								})}
							</LocationList>
						}
					</div>
					<GoogleMap
						//Map center is controlled by the maps api not React state
						apiKey={API_KEY}
						onLoad={({ map, maps }) => this.apiHasLoaded(map, maps)}
						zoom={4}
						defaultCenter={{ lat: 39.828175, lng: -98.5795 }} //Geographic Center of the United States
						center={{ lat: userLocation.lat, lng: userLocation.lng }}
					>

						<Marker
							text="Your Location"
							lat={userLocation.lat}
							lng={userLocation.lng}
						/>
						{activeLocation &&
							<Marker
								text="Random Location"
								lat={activeLocation.lat}
								lng={activeLocation.lng}
							/>
						}
					</GoogleMap>
				</div>
				<SnackBar show={this.state.error} message={this.state.errorMessage || "Error something went wrong"} />
			</Layout>
		)
	}

}

export default App;
