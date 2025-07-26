const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json()); // ✅ [Add] รองรับการอ่าน JSON body

const db = new sqlite3.Database("./shop.db"); //Open shop.db database

// build endpoint to get /orders
app.get("/orders", (req, res) => {
  const sql = `
    SELECT o.OrderID, c.CustomerName, p.ProductName, o.Quantity
    FROM Orders o
    JOIN Customer c ON o.CustomerID = c.CustomerID
    JOIN Product p ON o.ProductID = p.ProductID
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows); // คืนผลลัพธ์ในรูปแบบ JSON
    }
  });
});

// Endpoint: the customer who has purchased the most
app.get("/top-customer", (req, res) => {
  const sql = `
    SELECT c.CustomerName
    FROM Customer c
    JOIN Orders o ON c.CustomerID = o.CustomerID
    GROUP BY c.CustomerID
    ORDER BY SUM(o.Quantity) DESC
    LIMIT 1
  `;

  db.get(sql, [], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(row); // คืนแค่ลูกค้าที่มียอดซื้อสูงสุด
    }
  });
});

// ✅ [Add] Endpoint: POST /order — เพิ่มคำสั่งซื้อใหม่
app.post("/order", (req, res) => {
  const { CustomerID, ProductID, Quantity } = req.body;

  if (!CustomerID || !ProductID || !Quantity) {
    return res.status(400).json({ error: "Missing fields" }); // ✅ [Add]
  }

  const checkSql = `
    SELECT 
      (SELECT COUNT(*) FROM Customer WHERE CustomerID = ?) AS CustomerExists,
      (SELECT COUNT(*) FROM Product WHERE ProductID = ?) AS ProductExists
  `;

  db.get(checkSql, [CustomerID, ProductID], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Database error" }); // ✅ [Add]
    }

    if (row.CustomerExists === 0 || row.ProductExists === 0) {
      return res.status(400).json({ error: "Invalid CustomerID or ProductID" }); // ✅ [Add]
    }

    const insertSql = `
      INSERT INTO Orders (CustomerID, ProductID, Quantity)
      VALUES (?, ?, ?)
    `;

    db.run(insertSql, [CustomerID, ProductID, Quantity], function (err) {
      if (err) {
        return res.status(500).json({ error: "Insert failed" }); // ✅ [Add]
      }

      res.json({ message: "Order added", OrderID: this.lastID }); // ✅ [Add]
    });
  });
});

// run api at port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
