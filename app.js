const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const {connect} = require('./config/dbconfig');
const path = require('path');
const detailsRouter = require('./routes/detailsRouter');
const app = express();


//middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));// Serves static files from the 'public' directory

app.use(cors());
app.set('views', './views');

app.use('/',detailsRouter);



app.get('/', (req, res) => {
    res.sendFile('add-details.html', { root: path.join(__dirname, 'views') });
});


connect();

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    const url = `http://localhost:${port}`;
    console.log(url);
});




