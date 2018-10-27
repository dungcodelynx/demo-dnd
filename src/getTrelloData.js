const axios = require('axios');
const API_KEY = 'd1f33c2857e857e039aabb9c95079864';
const TOKEN = 'd8f57808e0589a89b73d1994974355d01babe4fadc24fa834ba38ae65214ecd4';
const AUTHORIZATION_QUERY = `key=${API_KEY}&token=${TOKEN}`;

const fs = require('fs');

async function getTrelloDataByBoard(boardId) {
	try {
		const url = `https://trello.com/1/boards/${boardId}/lists?${AUTHORIZATION_QUERY}&cards=all`;
		const data = await axios.get(url);
		console.log(data.data);
		fs.writeFile('./src/data.json', JSON.stringify(data.data), (err) => {
			console.log(err);
		});
	} catch (err) {
		console.log(err);
	}
}

getTrelloDataByBoard('5bd2abeca570d18af84e422e');
// 5bd2be04f04c230a6e041985
