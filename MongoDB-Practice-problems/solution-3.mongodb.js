// 1. Find employees from IT and salary greater than ₹60,000[cite: 2]
db.employees.find({ $and: [{ department: "IT" }, { salary: { $gt: 60000 } }] });

// 2. Find employees from IT or HR[cite: 2]
db.employees.find({ $or: [{ department: "IT" }, { department: "HR" }] });

// 3. Find employees whose age is > 30 or salary is > ₹80,000[cite: 2]
db.employees.find({ $or: [{ age: { $gt: 30 } }, { salary: { $gt: 80000 } }] });

// 4. Find employees who are not from HR[cite: 2]
db.employees.find({ department: { $ne: "HR" } });

// 5. Find employees whose role is either Developer, Tester or Manager[cite: 2]
db.employees.find({ role: { $in: ["Developer", "Tester", "Manager"] } });

// 6. Find employees whose department is not IT or HR[cite: 2]
db.employees.find({ department: { $nin: ["IT", "HR"] } });