// 1. Delete an employee using Employee ID[cite: 2]
db.employees.deleteOne({ empId: 10 });

// 2. Delete all employees from a particular department[cite: 2]
db.employees.deleteMany({ department: "Sales" });

// 3. Delete employees whose salary is below ₹25,000[cite: 2]
db.employees.deleteMany({ salary: { $lt: 25000 } });

// 4. Delete all inactive employees[cite: 2]
db.employees.deleteMany({ isActive: false });

// 5. Display the remaining employees[cite: 2]
db.employees.find();