-- Create Customer table
CREATE TABLE IF NOT EXISTS Customer (
  CustomerID INT PRIMARY KEY,
  CustomerName TEXT
);

-- Create Category table
CREATE TABLE IF NOT EXISTS Category (
  CategoryID INT PRIMARY KEY,
  CategoryName TEXT
);

-- Create Product table
CREATE TABLE IF NOT EXISTS Product (
  ProductID INT PRIMARY KEY,
  ProductName TEXT,
  CategoryID INT,
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
  OrderID INT PRIMARY KEY,
  CustomerID INT,
  ProductID INT,
  Quantity INT,  -- ✅ Fixed: renamed to Quantity
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- Insert Customer data
INSERT INTO Customer VALUES
  (1, 'Alice'),
  (2, 'Bob'),
  (3, 'Charlie');

-- Insert Category data
INSERT INTO Category VALUES
  (1, 'Hardware'),
  (2, 'Display');   -- 🛠 FIXED: Removed comma after last row

-- Insert Product data
INSERT INTO Product VALUES
  (1, 'Mouse', 1),        -- Mouse belongs to Hardware
  (2, 'Keyboard', 1),     -- Keyboard belongs to Hardware
  (3, 'Monitor', 2);      -- Monitor belongs to Display

-- Insert Order data
INSERT INTO Orders VALUES
  (1, 1, 1, 2),   -- Alice orders 2 Mice
  (2, 2, 1, 1),   -- Bob orders 1 Mouse
  (3, 1, 2, 1),   -- Alice orders 1 Keyboard
  (4, 3, 3, 1);   -- Charlie orders 1 Monitor
