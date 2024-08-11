// dbconfig.js
const sql = require("mssql");

// SQL Server configuration
var config = {
    "server": "localhost",
    "user": "sa",
    "password": "root",
    "database": "detailsdb",
    "options": {
        trustServerCertificate: true,
    }
};

// sql.connect(config, err => {
//     if (err) console.log(err);
//     else console.log('Connected to SQL Server');
// });



module.exports = config;
