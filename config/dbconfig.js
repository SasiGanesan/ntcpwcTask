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

module.exports = {
    connect: () => sql.connect (config),
    sql,
};
