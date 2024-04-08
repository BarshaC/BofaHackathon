const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3306;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    database: 'project_data'
});

connection.connect((err) => {
if (err) throw err;
console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user', (req, res) => {
    const userData = req.body;
    const sql = 'INSERT INTO users SET ?';
    
    connection.query(sql, userData, (err, result) => {
      if (err) {
        console.error('Error inserting user data:', err);
        res.status(500).send('Error inserting user data');
        return;
      }
      console.log('User data inserted successfully');
      res.status(200).send('User data inserted successfully');
    });
  });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

