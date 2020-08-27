import * as React from 'react';
import GoogleMapReact from 'google-map-react';
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
		transform: "translate(-50%, -50%)"
	}}>
		{text}
	</div>
);

class SimpleMap extends React.Component<any, any> {
	static defaultProps = {
		center: {
			lat: 39.8283459, lng: -98.5794797
		},
		zoom: 11
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
					<Marker
						lat={39.8283459}
						lng={-98.5794797}
						text="My Marker"
					/>
				</GoogleMapReact>
			</div>
		);
	}
}

function App() {
	return (
		<SimpleMap />
	)
}

export default App;
