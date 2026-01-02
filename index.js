const mysql = require("mysql2");        // for db connection
const express = require("express");     // loads the express library
 const app = express();                 // function from the express library used to setup the app
app.use(express.json());              // used when we want to insert or update the data , when we give the data in body of postman
// const knex = require("knex");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "",
  database: "myproject",
});

db.connect((error) => {
  if (error) {
    console.log("DB not connected");
    return;
  } else {
    console.log("DB connected");
  }
});

app.get("/user/get/", (req, res) => {                 //            GET API
  // API for fetching the data
  const sql = "select * from student";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("error in fetching the data");
    }
    res.json(result);
  });
});


app.post("/user/post", async (req, res) => {                // API for post
  try {
    const { s_rollno, s_name, s_std, s_dob } = req.body;

    const sql =
      "INSERT INTO student (s_rollno, s_name, s_std, s_dob) VALUES (?, ?, ?, ?)";

    db.query(sql, [s_rollno, s_name, s_std, s_dob], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send("Data Inserted Successfully");
    });
  } catch (error) {
    res.status(500).send(result);
  }
});

app.put("/user/put/:id", (req, res) => {     //                         update API
 const id = req.params.id;
 const { s_name } = req.body;

  const sql = `
    UPDATE student
    SET s_name = ?
    WHERE s_rollno = ?
  `;

  db.query(sql, [s_name,id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("Data updated successfully...");
  });
});



app.delete("/user/delete/:id",(req,res) =>{          // API for delete 
   const id = req.params.id;

        const sql = `
          delete from student
          where s_rollno= ? `;

          db.query(sql,[id],(err,result) =>{
              if(err){
                return res.status(500).send(err);
              }
              res.send("Data has been deleted...")
      });

});








const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
