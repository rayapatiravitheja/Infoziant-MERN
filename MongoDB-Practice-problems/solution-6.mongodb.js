// 1. Change an employee's department[cite: 2]
db.employees.updateOne({ empId: 1 }, { $set: { department: "R&D" } });

// 2. Change an employee's role[cite: 2]
db.employees.updateOne({ empId: 1 }, { $set: { role: "Senior Developer" } });

// 3. Update an employee's salary[cite: 2]
db.employees.updateOne({ empId: 3 }, { $set: { salary: 50000 } });

// 4. Increase the salary of an employee by ₹5,000[cite: 2]
db.employees.updateOne({ empId: 4 }, { $inc: { salary: 5000 } });

// 5. Increase the salary of all IT employees by ₹5,000[cite: 2]
db.employees.updateMany({ department: "IT" }, { $inc: { salary: 5000 } });

// 6. Add an isActive field[cite: 2]
db.employees.updateMany({}, { $set: { isActive: true } });

// 7. Mark selected employees as inactive[cite: 2]
db.employees.updateMany({ empId: { $in: [2, 7] } }, { $set: { isActive: false } });

// 8. Rename experience to yearsOfExperience[cite: 2]
db.employees.updateMany({}, { $rename: { "experience": "yearsOfExperience" } });