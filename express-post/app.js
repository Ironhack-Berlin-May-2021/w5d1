const express = require('express');
const app = express();

// this line is needed for express to be able to handle the request body
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

// this is needed to be able to use partials
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// middleware
let accessCount = 0;
const count = () => {
	return (req, res, next) => {
		accessCount++;
		console.log(accessCount);
		next();
	}
}

// register middleware globally
app.use(count());

app.get('/', count(), (req, res) => {
	res.render('form');
})

app.post('/post-example', (req, res) => {
	console.log(req.body);
	const username = req.body.username;
	res.render('dashboard', { user: username });
})

app.listen(3000, () => {
	console.log('Server listening');
})