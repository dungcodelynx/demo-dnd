import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@material-ui/core';
import { List, CellMeasurer, CellMeasurerCache, AutoSizer } from 'react-virtualized';

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
	cellMeasurerCache = new CellMeasurerCache({
		fixedWidth: true,
		defaultHeight: 70,
		defaultWidth: 250
	});

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.cards === nextProps.cards) {
			return false;
		}
		return true;
	};

	render() {
		const { cards } = this.props;
		return (
			<AutoSizer>
				{({ height, width }) => {
					return (
						<List
							height={500}
							width={width}
							rowCount={cards.length}
							deferredMeasurementCache={this.cellMeasurerCache}
							rowHeight={this.cellMeasurerCache.rowHeight}
							rowRenderer={({ index, key, parent, style }) => {
								const card = cards[index];
								return (
									<CellMeasurer
										cache={this.cellMeasurerCache}
										columnIndex={0}
										key={key}
										parent={parent}
										rowIndex={index}
									>
										{({ measure }) => {
											return (
												<Draggable draggableId={card.id} key={card.id} index={index}>
													{(provided) => {
														return (
															<CardWrapper
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={{
																	...provided.draggableProps.style,
																	...style,
																	position: 'fixed',
																	zIndex: 9999
																}}
															>
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
										}}
									</CellMeasurer>
								);
							}}
						/>
					);
				}}
			</AutoSizer>
		);
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
