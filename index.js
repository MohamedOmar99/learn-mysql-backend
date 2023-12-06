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

// Route to get a single book by ID
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      // Check if any rows were returned
      if (data.length === 0) {
        return res.json({ error: "Book not found" });
      }

      return res.json(data[0]); // Return the first row (assuming ID is unique)
    }
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`,`cover`, `price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json("book is created");
    }
  });
});

app.delete("/books/:id", (req, res) => {
  const booksId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [booksId], (err, data) => {
    console.log(err, data);
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});
app.put("/books/:id", (req, res) => {
  const booksId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?,  `cover` = ?, `price` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...values, booksId], (err, data) => {
    console.log(err, data);
    if (err) {
      return res.json(err);
    } else {
      return res.json("Book has been updated");
    }
  });
});

app.listen(8800, () => {
  console.log("connected to backend!!");
});
