// Seed data: Insert at least 10 employees[cite: 2]
db.employees.insertMany([
  { empId: 1, name: "Alice", age: 28, department: "IT", role: "Developer", salary: 75000, experience: 4, location: "Chennai" },
  { empId: 2, name: "Bob", age: 34, department: "HR", role: "Manager", salary: 90000, experience: 8, location: "Bangalore" },
  { empId: 3, name: "Charlie", age: 25, department: "IT", role: "Tester", salary: 45000, experience: 2, location: "Chennai" },
  { empId: 4, name: "David", age: 31, department: "Finance", role: "Analyst", salary: 65000, experience: 6, location: "Mumbai" },
  { empId: 5, name: "Eve", age: 29, department: "IT", role: "Developer", salary: 85000, experience: 5, location: "Hyderabad" },
  { empId: 6, name: "Frank", age: 40, department: "Sales", role: "Manager", salary: 95000, experience: 12, location: "Chennai" },
  { empId: 7, name: "Grace", age: 24, department: "HR", role: "Recruiter", salary: 38000, experience: 1, location: "Delhi" },
  { empId: 8, name: "Hannah", age: 33, department: "IT", role: "Developer", salary: 78000, experience: 7, location: "Chennai" },
  { empId: 9, name: "Ian", age: 27, department: "Marketing", role: "Executive", salary: 48000, experience: 3, location: "Pune" },
  { empId: 10, name: "Jack", age: 32, department: "IT", role: "Tester", salary: 52000, experience: 6, location: "Bangalore" }
]);

// 1. Display all employees[cite: 2]
db.employees.find();

// 2. Find employees from the IT department[cite: 2]
db.employees.find({ department: "IT" });

// 3. Find employees with salary greater than ₹50,000[cite: 2]
db.employees.find({ salary: { $gt: 50000 } });

// 4. Find employees younger than 30[cite: 2]
db.employees.find({ age: { $lt: 30 } });

// 5. Find employees with more than 5 years of experience[cite: 2]
db.employees.find({ experience: { $gt: 5 } });

// 6. Find employees working in Chennai[cite: 2]
db.employees.find({ location: "Chennai" });

// 7. Find employees with salary between ₹40,000 and ₹80,000[cite: 2]
db.employees.find({ salary: { $gte: 40000, $lte: 80000 } });

// 8. Display only name, role and salary[cite: 2]
db.employees.find({}, { _id: 0, name: 1, role: 1, salary: 1 });