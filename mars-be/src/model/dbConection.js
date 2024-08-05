const mysql = require('mysql')

const db = mysql.createConnection({
    host :'localhost',
    user :'root',
    password:'',
    database:'mars_project'
});

exports.db = db