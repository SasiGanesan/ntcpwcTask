const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const {connect} = require('./config/dbconfig');
const path = require('path');
const app = express();

//middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());
app.set('views', './views');

app.get('/', (req, res) => {
    res.sendFile('form.html', { root: path.join(__dirname, 'views') });
});

// app.get('/',(req,res)=>{
//     return res.json("hiiiiiiiiiiiiiiiiiiiiiii");
// })
connect()
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    const url = `http://localhost:${port}`;
    console.log(url);
});




