const express          = require('express');
const { USERS, POSTS } = require('./models.js');

const app = express();

/* TODO:
 * 3. Implement standard practices
 */
app.get('/users', getPaginatedResult(USERS), (req, res) => {
	res.json(res.paginatedResult);
});

app.get('/posts', getPaginatedResult(POSTS), (req, res) => {
	res.json(res.paginatedResult);
});

app.listen(3000, () => {
	console.clear();
	console.log('server is up and running...');
});

function getPaginatedResult(model) {
	return (req, res, next) => {
		const page  = parseInt(req.query?.page);
		const limit = parseInt(req.query?.limit);

		console.info({ page, limit });

		const resultObject = {};

		if (!page && !limit) {
			res.paginatedResult = model;
			return next();
		}

		const startIndex = (page - 1) * limit;
		const endIndex   = startIndex + limit;
		//const endIndex   = page * limit;

		console.log({ startIndex, endIndex });

		const result = model.slice(startIndex, endIndex);

		resultObject.result = result;

		if (endIndex < model.length) {
			resultObject.next = {
				page: page + 1,
				limit,
			}
		}

		if (startIndex > 0) {
			resultObject.prev = {
				page: page - 1,
				limit,
			}
		}

		console.table(resultObject);

		res.paginatedResult = resultObject;
		return next();
	};
}
