import React, { useEffect, useState } from "react";
import OrderForm from "./orderForm"; // ✅ Import order form

function App() {
  const [orders, setOrders] = useState([]);              // 🔁 Raw orders from API
  const [displayedOrders, setDisplayedOrders] = useState([]); // 🧪 Orders shown (can be filtered/sorted)

  // Fetch orders from API
  const fetchOrders = () => {
    fetch("/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);           // Store full data
        setDisplayedOrders(data);  // Also use as the current table display
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders(); // 🔁 Run on page load
  }, []);

  // 🖱 Filter: show only orders with ProductName = Mouse
  const filterMouse = () => {
    const filtered = orders.filter((o) => o.ProductName === "Mouse");
    setDisplayedOrders(filtered);
  };

  // 🔄 Sort: highest Quantity first
  const sortByQuantityDesc = () => {
    const sorted = [...displayedOrders].sort((a, b) => b.Quantity - a.Quantity);
    setDisplayedOrders(sorted);
  };

  // ♻ Reset to original
  const resetTable = () => {
    setDisplayedOrders(orders);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 รายการสั่งซื้อ (Orders)</h1>

      {/* ✅ Filter / Sort Buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={filterMouse}>🖱 Show Only Mouse</button>{" "}
        <button onClick={sortByQuantityDesc}>🔢 Sort by Quantity Desc</button>{" "}
        <button onClick={resetTable}>♻ Reset</button>
      </div>

      {/* ✅ Table */}
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {displayedOrders.map((o) => (
            <tr key={o.OrderID}>
              <td>{o.OrderID}</td>
              <td>{o.CustomerName}</td>
              <td>{o.ProductName}</td>
              <td>{o.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Show Form below the table */}
      <OrderForm onOrderAdded={fetchOrders} />
    </div>
  );
}

export default App;
