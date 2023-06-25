const express                  = require('express');
const mongoose                 = require('mongoose');
const { userModel, postModel } = require('./models.js');

mongoose.connect('mongodb://localhost/pagination-mern');

const app = express();

/* TODO:
 * 3. Implement standard practices
 */
app.get('/users', getPaginatedResult(userModel), (req, res) => {
	res.json(res.paginatedResult);
});

app.get('/posts', getPaginatedResult(postModel), (req, res) => {
	res.json(res.paginatedResult);
});

app.listen(3000, () => {
	console.clear();
	console.log('server is up and running...');
});

function getPaginatedResult(model) {
	return async (req, res, next) => {
		const page  = parseInt(req.query?.page);
		const limit = parseInt(req.query?.limit);

		console.info({ page, limit });

		const resultObject = {};

		if (!page && !limit) {
			try {
				res.paginatedResult = await model.find().exec();
				return next();
			} catch (e) {
				return res.status(500).json({ message: e.message });
			}
		}

		const startIndex = (page - 1) * limit;
		const endIndex   = startIndex + limit;
		//const endIndex   = page * limit;

		console.log({ startIndex, endIndex });

		try {
			resultObject.result = await model.find().skip(startIndex).limit(limit).exec();
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}

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

		console.log(resultObject);

		res.paginatedResult = resultObject;
		return next();
	};
}
