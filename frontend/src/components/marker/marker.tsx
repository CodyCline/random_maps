import * as React from 'react';
import * as types from '../../types/components';
import './marker.css';

export const Marker = ({ color, text }: types.MarkerProps) => {
	return (
		<React.Fragment>
			<h3>{text}</h3>
			<div className="pin bounce"
				style={{ backgroundColor: color, cursor: 'pointer' }}
			/>
			<div className="pulse"/>
		</React.Fragment>
	);
};