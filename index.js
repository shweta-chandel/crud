//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db1'
});


conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));


app.get('/',(req, res) => {
  let sql = "SELECT * FROM product1";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view' ,{
      results: results
    }); 
  });
});


app.post('/save',(req, res) => {
  let data = {name: req.body.name, price: req.body.price};
  let sql = "INSERT INTO product1 SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});


app.post('/update',(req, res) => {
  let sql = "UPDATE product1 SET name='"+req.body.name+"', price='"+req.body.price+"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});


app.post('/delete',(req, res) => {
  let sql = "DELETE FROM product1 WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});


app.listen(3000, () => console.log('Server is running at port 3000'));
