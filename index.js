const express = require('express')
const basicAuth = require('express-basic-auth')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000;
const path = require('path')

const sqlite3 = require('sqlite3').verbose();
// This creates db if it doesn't exist, if it exists it is opened as read and write.
const db = new sqlite3.Database(path.join(__dirname, 'db', 'my_blog_db.sqlite3'))

db.run(`CREATE TABLE IF NOT EXISTS post (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		title TEXT NOT NULL,
		content TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`
);


app.use(express.static(path.join(__dirname, 'static', 'public')));
app.use(express.static(path.join(__dirname, 'static', 'resources')));

app.use(express.json());
app.get('/api/posts', (req, res) => {
	db.all("SELECT * FROM post ORDER BY created_at DESC", (error, result) => {
		if (error) {
			console.log(error)
			return res.json(400, {
				error: 1,
				msg: "Error occured: " + error
			});
		}
		res.json(result)
	});
});

const staticUserAuth = basicAuth({
	users: {
		[process.env.BLOGUSER]: process.env.PASSWORD
	},
	challenge: true,
})

app.use(staticUserAuth);

app.post('/post', (req, res) => {
	const { body: { title, content } } = req;
	try {
		db.run('INSERT INTO post (title, content) VALUES ($1, $2);', title, content);
		res.json({ "Posted": true });
	} catch (error) {
		if (error) return res.json(400, {
			error: 1,
			msg: "Error occured: " + error
		});
		console.log(error)
	}
});
app.use(express.static(path.join(__dirname, 'static', 'protected')));
app.listen(port, () => {
	console.log(`Blog app listening at localhost:${port}`)
});