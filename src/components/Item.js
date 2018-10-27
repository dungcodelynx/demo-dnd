import React from 'react';
import styled from 'styled-components';
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@material-ui/core';

const CardWrapper = styled.div`margin: 8px;`;

export default class Item extends React.Component {
	render() {
		const { card } = this.props;
		return (
			<CardWrapper>
				<Card>
					<CardMedia
						component="img"
						image={
							'https://www.billboard.com/files/styles/900_wide/public/media/Aly-Raisman-girls-like-you-video-still-2018-billboard-1548.jpg'
						}
					/>
					<CardContent>
						<Typography gutterBottom>{card.id}</Typography>
						<Typography>{card.name}</Typography>
					</CardContent>
				</Card>
			</CardWrapper>
		);
	}
}
