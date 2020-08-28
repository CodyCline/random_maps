import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './App.css';

const Marker = ({ text }: any) => (
	<div style={{
		color: "white",
		background: "#CCC",
		padding: "15px 10px",
		display: "inline-flex",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "100%",
	}}>
		{text}
	</div>
);

class Map extends React.Component<any, any> {
	static defaultProps = {
		center: {
			lat: 39.8283459, lng: -98.5794797
		},
		zoom: 4
	};
	

	render() {
		const apiKey: any = process.env.REACT_APP_GOOGLE_MAPS_KEY
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '100vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: apiKey }}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
				>
					{this.props.children}
				</GoogleMapReact>
			</div>
		); 
	}
}

class App extends React.Component<any,any> {
	state = {
		randomLocation: { lat: 39.8283459, lng: -98.5794797 },
		currentLocation: { lat: 39.8283459, lng: -98.5794797 },
		zoom: 4,
		range: 10000.0,
	}
	async giveLocation () {
		try {
			await navigator.geolocation.getCurrentPosition((data:any) => {
				this.setState({
					currentLocation: {
						lat: data.coords.latitude,
						lng: data.coords.longitude,
					}
				})
			})
		} catch (error) {
			console.log(error)
		}
	}
	async getRandomLocation () {
		const res = await axios.get("http://localhost:5000/location", { 
			params: { 
				latitude: this.state.currentLocation.lat,
				longitude: this.state.currentLocation.lng,
				mean: this.state.range,
			} 
		})
		this.setState({
			lat: res.data.latitude,
			lng: res.data.longitude,
		})
	}
	render () {
		return (
			<div style={{display:"grid", gridTemplateColumns:"minmax(150px,25%)1fr"}}>
				<div>
					<input/>
					<p></p>
					<button onClick={this.giveLocation}>Give Location</button>
					<button onClick={this.getRandomLocation}>Get Location</button>
				</div>
				<Map center={{lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng}}>
					<Marker 
						text="Your Location"
						lat={this.state.currentLocation.lat}
						lng={this.state.currentLocation.lng}
					/>
					{this.state.randomLocation && <Marker text="Random Location" lat={this.state.randomLocation.lat} lng={this.state.randomLocation.lng}/>}
				</Map>
			</div>
		)
	}
	
}

export default App;
