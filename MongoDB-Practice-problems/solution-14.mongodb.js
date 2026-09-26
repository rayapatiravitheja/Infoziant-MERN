// Seed Data[cite: 2]
db.customers.insertMany([
  { customerId: 101, name: "Rahul", email: "rahul@gmail.com" },
  { customerId: 102, name: "Pooja", email: "pooja@gmail.com" }
]);

db.customerOrders.insertMany([
  { orderId: 501, customerId: 101, product: "Laptop", amount: 60000 },
  { orderId: 502, customerId: 101, product: "Phone", amount: 30000 },
  { orderId: 503, customerId: 101, product: "Watch", amount: 5000 },
  { orderId: 504, customerId: 101, product: "Bag", amount: 2000 },
  { orderId: 505, customerId: 102, product: "Tablet", amount: 25000 }
]);

// 1 & 2. Display orders with customer name & information[cite: 2]
db.customerOrders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customerDetails"
    }
  },
  { $unwind: "$customerDetails" },
  {
    $project: {
      orderId: 1,
      product: 1,
      amount: 1,
      customerName: "$customerDetails.name",
      customerEmail: "$customerDetails.email"
    }
  }
]);

// 3. Find all orders placed by customer 101[cite: 2]
db.customerOrders.find({ customerId: 101 });

// 4. Calculate total order amount for each customer[cite: 2]
db.customerOrders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" }
    }
  },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customerId",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $project: {
      customerId: "$_id",
      customerName: "$customer.name",
      totalSpent: 1,
      _id: 0
    }
  }
]);

// 5. Find customers who have placed more than 3 orders[cite: 2]
db.customerOrders.aggregate([
  {
    $group: {
      _id: "$customerId",
      orderCount: { $sum: 1 }
    }
  },
  { $match: { orderCount: { $gt: 3 } } },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customerId",
      as: "customer"
    }
  },
  { $unwind: "$customer" }
]);