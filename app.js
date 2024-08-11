const express = require('express');
const bodyParser = require('body-parser');
const sql = require('./config/dbconfig');
const path = require('path');
const app = express();

//middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './views');

app.get('/', (req, res) => {
    res.sendFile('form.html', { root: path.join(__dirname, 'views') });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // const url = `http://localhost:${port}`;
    // console.log(url);
});




