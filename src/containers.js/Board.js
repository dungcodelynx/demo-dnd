import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@material-ui/core';

import data from '../data.json';

const LaneWrapper = styled.div`
	flex-grow: 1;
	max-width: 272px;
	min-width: 272px;
	background: #e3e3e3;
	border-radius: 3px;
	margin: 8px;
`;

const LaneHeader = styled.div`
	font-weight: bold;
	margin-bottom: 8px;
`;

const BoardWrapper = styled.div`
	display: flex;
	flex: 1;
`;

const CardWrapper = styled.div`margin: 8px;`;

class Lane extends React.Component {
	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.cards === nextProps.cards) {
			return false;
		}
		return true;
	};

	render() {
		const { cards } = this.props;
		return cards.map((card, index) => {
			return (
				<Draggable draggableId={card.id} key={card.id} index={index}>
					{(provided) => {
						return (
							<CardWrapper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
					}}
				</Draggable>
			);
		});
	}
}

class Board extends React.Component {
	onDragEnd = () => {};
	render() {
		return (
			<BoardWrapper>
				<DragDropContext>
					{data.map((lane) => {
						return (
							<Droppable droppableId={lane.id} key={lane.id}>
								{(provided) => {
									return (
										<LaneWrapper ref={provided.innerRef} {...provided.droppableProps}>
											<LaneHeader>{lane.name}</LaneHeader>
											<Lane cards={lane.cards} />
											{provided.placeholder}
										</LaneWrapper>
									);
								}}
							</Droppable>
						);
					})}
				</DragDropContext>
			</BoardWrapper>
		);
	}
}
export default Board;
