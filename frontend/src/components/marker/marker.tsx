import * as React from 'react';
import { ReactComponent as Icon } from '../locationlist/map-marker.svg';
import './marker.css';

const InfoWindow = (props) => {
	const { place } = props;
	const infoWindowStyle: React.CSSProperties = {
		position: 'relative',
		bottom: 150,
		left: '-45px',
		width: 220,
		backgroundColor: 'white',
		boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
		padding: 10,
		fontSize: 14,
		zIndex: 100,
	};

	return (
		<div style={infoWindowStyle}>
			<div style={{ fontSize: 16 }}>
				{place.name}
			</div>
			<div style={{ fontSize: 14 }}>
				<span style={{ color: 'grey' }}>
					{place.rating}
					{' '}
				</span>
				<span style={{ color: 'orange' }}>
					{String.fromCharCode(9733).repeat(Math.floor(place.rating))}
				</span>
				<span style={{ color: 'lightgrey' }}>
					{String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
				</span>
			</div>
			<div style={{ fontSize: 14, color: 'grey' }}>
				{place.types[0]}
			</div>
			<div style={{ fontSize: 14, color: 'grey' }}>
				{'$'.repeat(place.price_level)}
			</div>
			<div style={{ fontSize: 14, color: 'green' }}>
				{place.opening_hours.open_now ? 'Open' : 'Closed'}
			</div>
		</div>
	);
};

export const Marker = ({ color, name, id }: any) => {
	return (
		<React.Fragment>
			<div className="pin bounce"
				style={{ backgroundColor: color, cursor: 'pointer' }}
				title={name}
			/>
			<div className="pulse"/>
		</React.Fragment>
	);
};