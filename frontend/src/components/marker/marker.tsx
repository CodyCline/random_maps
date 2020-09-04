import * as React from 'react';
import { ReactComponent as Icon } from '../locationlist/map-marker.svg';

export const Marker = ({ text }: any) => (
	<div style={{
		color: "white",
		fontSize:"1.5rem",
		padding: "15px 10px",
		position: "fixed",
	}}>
		<Icon style={{height: "50px", width: "50px"}}/>
		{text}
	</div>
);