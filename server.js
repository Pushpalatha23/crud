const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON in the request body

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Latha@123',
  database: 'test'
});

app.get('/', (req, res) => {
  return res.json("Backend server");
});

app.get('/tests', (req, res) => {
  const sql = "SELECT * FROM exam";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get('/tests/:id',(req,res)=>{
    const sql="select * from exam where id=?";
    const id = parseInt(req.params.id, 10);
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Error:err});
        return res.json(result);
    })
})



app.put("/update/:id", (req, res) => {
    const sql = "UPDATE exam SET name=?, marks=? WHERE id=?";
    const id = parseInt(req.params.id, 10);

    db.query(sql, [req.body.name, req.body.marks, id], (err, result) => {
        if (err) return res.json({ error: err.message });
        return res.json({ updated: true });
    });
});

app.post("/register",(req,res)=>{
    const sql="INSERT INTO exam (`id`,`name`,`marks`)Values(?)";
    const values =[
        req.body.id,
        req.body.name,
        req.body.marks,
    ];
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json({Status:"Success"})
    })
})

  app.delete('/delete', (req, res) => {
    const id = req.params.id;
  
    const sql = "DELETE FROM exam ";
    db.query(sql, [id], (err, result) => {
      if (err) return res.json(err);
  
    });
  });
  app.delete('/delete/:id', (req, res) => {
      const id = parseInt(req.params.id, 10);
  
    const sql = "DELETE FROM exam ";
    db.query(sql, [id], (err, result) => {
      if (err) return res.json(err);
  
    });
  });
  
app.listen(8098, () => {
  console.log("Listening");
});


