// Seed Data Collections[cite: 2]
db.restaurants.insertMany([
  { restaurantId: 1, name: "Spice Garden", location: "Koramangala", cuisine: "Indian", rating: 4.5 },
  { restaurantId: 2, name: "Pasta Bella", location: "Indiranagar", cuisine: "Italian", rating: 3.9 },
  { restaurantId: 3, name: "Tandoori Nights", location: "HSR Layout", cuisine: "Indian", rating: 4.2 }
]);

db.menuItems.insertMany([
  { itemId: 101, restaurantId: 1, name: "Paneer Butter Masala", category: "Curry", price: 280, available: true },
  { itemId: 102, restaurantId: 1, name: "Garlic Naan", category: "Breads", price: 60, available: true },
  { itemId: 103, restaurantId: 2, name: "Lasagna", category: "Pasta", price: 450, available: false }
]);

db.foodOrders.insertMany([
  { orderId: 1001, customerId: 201, restaurantId: 1, totalAmount: 340, status: "Delivered", orderDate: new Date() },
  { orderId: 1002, customerId: 201, restaurantId: 1, totalAmount: 620, status: "Delivered", orderDate: new Date() },
  { orderId: 1003, customerId: 202, restaurantId: 3, totalAmount: 500, status: "Delivered", orderDate: new Date() }
]);

// 1. Find restaurants offering Indian cuisine[cite: 2]
db.restaurants.find({ cuisine: "Indian" });

// 2. Find restaurants with rating above 4[cite: 2]
db.restaurants.find({ rating: { $gt: 4 } });

// 3. Find available menu items[cite: 2]
db.menuItems.find({ available: true });

// 4. Find menu items below ₹300[cite: 2]
db.menuItems.find({ price: { $lt: 300 } });

// 5. Find all orders for a restaurant (e.g. restaurantId: 1)[cite: 2]
db.foodOrders.find({ restaurantId: 1 });

// 6. Calculate total sales for each restaurant[cite: 2]
db.foodOrders.aggregate([
  { $group: { _id: "$restaurantId", totalSales: { $sum: "$totalAmount" } } }
]);

// 7. Find the restaurant with the highest sales[cite: 2]
db.foodOrders.aggregate([
  { $group: { _id: "$restaurantId", totalSales: { $sum: "$totalAmount" } } },
  { $sort: { totalSales: -1 } },
  { $limit: 1 }
]);

// 8. Find the number of orders for each restaurant[cite: 2]
db.foodOrders.aggregate([
  { $group: { _id: "$restaurantId", count: { $sum: 1 } } }
]);

// 9. Find customers who placed more than 3 orders[cite: 2]
db.foodOrders.aggregate([
  { $group: { _id: "$customerId", totalOrders: { $sum: 1 } } },
  { $match: { totalOrders: { $gt: 3 } } }
]);

// 10. $lookup to display restaurant details along with orders[cite: 2]
db.foodOrders.aggregate([
  {
    $lookup: {
      from: "restaurants",
      localField: "restaurantId",
      foreignField: "restaurantId",
      as: "restaurantDetails"
    }
  },
  { $unwind: "$restaurantDetails" }
]);