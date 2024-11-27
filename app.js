const express = require('express')
const app = express()
const mysql= require('mysql2');
const port = 3000




const dbConnect=mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"nodeMysql",
});

dbConnect.connect((error)=>{
    if(error){
        throw error
    }
    console.log("good and connected")
});

app.get('/users',(req,res)=>{
  console.log('suis la')
  let name='Samuel'
  let email='sam.email'
  const sql='INSERT INTO users (name,email)VALUES(?,?)';
  console.log('executing sql query:',sql);
  console.log('with values:',[name,email]);
  dbConnect.query(sql,[name,email],(err,result)=>{
    if(err){
      console.error(err);
    }
    console.log(result);
    res.send("user was added");
  });
});


app.listen(port,()=>{
  console.log('Express App Server listening on port ${port} and the local server URL: http://localhost:3000/');
});

app.get('/selectall',(req,res)=>{
  const sql='SELECT * FROM users ';
  dbConnect.query(sql,(err,records)=>{
    if(err){
      throw err;
    }
    console.log(records);
    res.send('All users')
  });
});

app.get('/select/:id', (req, res) => {
  const sql = `SELECT * FROM users WHERE id= ${req.params.id}`;
  // Creating queries 
  dbConnect.query(sql, (err, record) => {
      if (err) {
          throw err;
      }
      console.log(record);
      res.send('One user');
  });
});

app.get('/update/:id',(req,res)=>{
  let name='caca'
  const sql=`UPDATE users SET name= '${name}' WHERE id= ${req.params.id}`;
  dbConnect.query(sql,(err,record)=>{
    if(err){
      throw err;
    }
    console.log(record);
    res.send('was updated');
  });
});

app.get('/delete/:id',(req,res)=>{
  const sql=`DELETE FROM users WHERE id=${req.params.id}`;
  dbConnect.query(sql,(err,result)=>{
    if(err){
      throw err;
    }
    console.log(result);
    res.send('was deleted')
  })
})

