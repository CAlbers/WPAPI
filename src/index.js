const express = require('express')
const app = express()
const port = 5000

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wpapi"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO names (name) VALUES ('Jan Klaas')";
    /*con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result.insertId);
    });*/

    con.query("SELECT name FROM names", function (err, result, fields) {
        if (err) throw err;
        console.log(fields);
    });

    con.query("SELECT name FROM names WHERE name LIKE 'Jan%'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });


})

let count = 0;

app.get('/api', (req, res) => {
    res.json({ count })
})

app.get('/api/:id', (req, res) => {
    const id = req.params.id;

    /*con.query("SELECT name FROM names WHERE id = req", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });*/
    var sql = "SELECT * FROM names WHERE id = ?", req;
    con.query(sql, [id], function (err,result){
        if(err) throw err;
        console.log(result);
    });

    console.log("test" + req.params);
    res.json(req.params);
})

app.post('/api', (req, res) => {
    ++count;
    res.json({ count });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})