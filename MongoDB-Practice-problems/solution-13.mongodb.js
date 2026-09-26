// Seed Data[cite: 2]
db.orders.insertMany([
  { orderId: 101, customer: "Rahul", product: "Laptop", category: "Electronics", quantity: 2, price: 50000, orderDate: new Date() },
  { orderId: 102, customer: "Pooja", product: "Mouse", category: "Electronics", quantity: 5, price: 1000, orderDate: new Date() },
  { orderId: 103, customer: "Kiran", product: "Chair", category: "Furniture", quantity: 2, price: 8000, orderDate: new Date() },
  { orderId: 104, customer: "Sneha", product: "Laptop", category: "Electronics", quantity: 1, price: 50000, orderDate: new Date() },
  { orderId: 105, customer: "Arun", product: "Desk", category: "Furniture", quantity: 1, price: 15000, orderDate: new Date() }
]);

// 1. Calculate total sales[cite: 2]
db.orders.aggregate([
  { $group: { _id: null, totalSales: { $sum: { $multiply: ["$quantity", "$price"] } } } }
]);

// 2. Calculate total sales for each product[cite: 2]
db.orders.aggregate([
  { $group: { _id: "$product", totalSales: { $sum: { $multiply: ["$quantity", "$price"] } } } }
]);

// 3. Calculate total quantity sold for each product[cite: 2]
db.orders.aggregate([
  { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } }
]);

// 4. Find the product with the highest sales[cite: 2]
db.orders.aggregate([
  { $group: { _id: "$product", totalSales: { $sum: { $multiply: ["$quantity", "$price"] } } } },
  { $sort: { totalSales: -1 } },
  { $limit: 1 }
]);

// 5. Calculate total sales for each category[cite: 2]
db.orders.aggregate([
  { $group: { _id: "$category", totalSales: { $sum: { $multiply: ["$quantity", "$price"] } } } }
]);

// 6. Calculate average order value[cite: 2]
db.orders.aggregate([
  { $group: { _id: "$orderId", orderTotal: { $sum: { $multiply: ["$quantity", "$price"] } } } },
  { $group: { _id: null, averageOrderValue: { $avg: "$orderTotal" } } }
]);

// 7. Find categories where total sales exceed ₹1,00,000[cite: 2]
db.orders.aggregate([
  { $group: { _id: "$category", totalSales: { $sum: { $multiply: ["$quantity", "$price"] } } } },
  { $match: { totalSales: { $gt: 100000 } } }
]);