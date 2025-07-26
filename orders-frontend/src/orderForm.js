import React, { useState } from "react";

function OrderForm({ onOrderAdded }) {
  const [formData, setFormData] = useState({
    CustomerID: "",
    ProductID: "",
    Quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Get input name and value
    setFormData((prev) => ({ ...prev, [name]: value })); // Update form state
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form reload

    fetch("http://localhost:3001/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send form data to backend
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Order added");
        setFormData({ CustomerID: "", ProductID: "", Quantity: "" }); // Reset form
        onOrderAdded(); // Notify parent to refresh
      })
      .catch((err) => {
        console.error("Submit error:", err);
        alert("Error submitting order");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <h2>📝 Add New Order</h2>
      <div>
        <label>CustomerID: </label>
        <input
          type="number"
          name="CustomerID"
          value={formData.CustomerID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>ProductID: </label>
        <input
          type="number"
          name="ProductID"
          value={formData.ProductID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Quantity: </label>
        <input
          type="number"
          name="Quantity"
          value={formData.Quantity}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
}

export default OrderForm;
