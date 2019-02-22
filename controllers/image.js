const clarifai = require('clarifai');

const app = new Clarifai.App({
	// apiKey: '35f327a10bec42d5b5006b0038a2f82f'
	apiKey: '711187cfbd70405686e07854d95a64c1'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
	db('users').where('id', '=', req.body.id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
};
