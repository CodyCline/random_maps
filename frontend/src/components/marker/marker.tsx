import * as React from 'react';

export const Marker = ({ text }: any) => (
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