const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const port = 5000;

const db = mysql.createConnection({
    user: "root",
    password: "perez",
    database: "finals",
    host: "localhost",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});



app.post("/api/post", (req, res) => {
    console.log("Connected to API/post server");
    const { firstname, lastname, email, mobile, address, student, reason } = req.body;
    console.log("Connected to API/post server 2");
    const sqlInsert = 'INSERT INTO users (fname, lname, email, mobile, address, old_student, reason) VALUES (?,?,?,?,?,?,?)';
    console.log("Connected to API/post server3");
    db.query(sqlInsert, [firstname, lastname, email, mobile, address, student, reason],
        (error, results) => {
            if (error) {
              console.log(error);
             } 
             else {
              return res.send('Form submitted successfully');
              db.end()
           }
          }
        )
})
app.get("/", (req, res) => {
    // const sqlInsert = 'INSERT INTO users (fname, lname, email, mobile, address, old_student, reason) VALUES ("haha","haha","haha","haha","haha","haha","haha")';
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("hello");
    // })   
    res.send('hello');
})
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})


