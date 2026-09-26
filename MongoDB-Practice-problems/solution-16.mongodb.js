// ==================== 1. CUSTOMER MANAGEMENT ====================[cite: 2]
// Add customer[cite: 2]
db.customers.insertOne({
  customerId: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  address: "123 Main St, Bangalore"
});

// Find customer[cite: 2]
db.customers.find({ customerId: 1 });

// Update customer[cite: 2]
db.customers.updateOne({ customerId: 1 }, { $set: { phone: "9123456780" } });

// Delete customer[cite: 2]
db.customers.deleteOne({ customerId: 1 });


// ==================== 2. PRODUCT MANAGEMENT ====================[cite: 2]
// Add product[cite: 2]
db.products.insertOne({
  productId: 101,
  name: "Wireless Headphones",
  category: "Electronics",
  price: 2999,
  stock: 50,
  rating: 4.6
});

// Find products by category[cite: 2]
db.products.find({ category: "Electronics" });

// Find products within a price range[cite: 2]
db.products.find({ price: { $gte: 1000, $lte: 5000 } });

// Update stock[cite: 2]
db.products.updateOne({ productId: 101 }, { $inc: { stock: -1 } });

// Delete product[cite: 2]
db.products.deleteOne({ productId: 101 });


// ==================== 3. ORDER MANAGEMENT ====================[cite: 2]
// Create order[cite: 2]
db.orders.insertOne({
  orderId: 5001,
  customerId: 1,
  products: [
    { productId: 101, quantity: 2, price: 2999 }
  ],
  totalAmount: 5998,
  status: "Completed",
  orderDate: new Date()
});

// Find orders of a customer[cite: 2]
db.orders.find({ customerId: 1 });

// Find orders by status[cite: 2]
db.orders.find({ status: "Completed" });

// Calculate total sales[cite: 2]
db.orders.aggregate([
  { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } }
]);

// Find highest-value order[cite: 2]
db.orders.find().sort({ totalAmount: -1 }).limit(1);


// ==================== 4. AGGREGATION & ADVANCED ====================[cite: 2]
// Sales by Category[cite: 2]
db.orders.aggregate([
  { $unwind: "$products" },
  {
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "productId",
      as: "productInfo"
    }
  },
  { $unwind: "$productInfo" },
  {
    $group: {
      _id: "$productInfo.category",
      totalSales: { $sum: { $multiply: ["$products.quantity", "$products.price"] } }
    }
  }
]);

// Sales by Product[cite: 2]
db.orders.aggregate([
  { $unwind: "$products" },
  {
    $group: {
      _id: "$products.productId",
      totalSales: { $sum: { $multiply: ["$products.quantity", "$products.price"] } }
    }
  }
]);

// Sales by Customer[cite: 2]
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$totalAmount" },
      ordersCount: { $sum: 1 }
    }
  }
]);

// Average Product Rating[cite: 2]
db.reviews.aggregate([
  {
    $group: {
      _id: "$productId",
      averageRating: { $avg: "$rating" }
    }
  }
]);

// Orders per Customer[cite: 2]
db.orders.aggregate([
  { $group: { _id: "$customerId", totalOrders: { $sum: 1 } } }
]);

// Total Count of completed orders[cite: 2]
db.orders.countDocuments({ status: "Completed" });