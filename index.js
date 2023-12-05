import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohamed11@@",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hiiiiiiii");
});
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`,`cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json("book is created");
    }
  });
});

app.listen(8800, () => {
  console.log("connected to backend!!");
});
