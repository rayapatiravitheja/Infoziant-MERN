// 1. Display employees sorted by salary in ascending order[cite: 2]
db.employees.find().sort({ salary: 1 });

// 2. Display employees sorted by salary in descending order[cite: 2]
db.employees.find().sort({ salary: -1 });

// 3. Find the highest-paid employee[cite: 2]
db.employees.find().sort({ salary: -1 }).limit(1);

// 4. Find the lowest-paid employee[cite: 2]
db.employees.find().sort({ salary: 1 }).limit(1);

// 5. Display the top 3 highest-paid employees[cite: 2]
db.employees.find().sort({ salary: -1 }).limit(3);

// 6. Display the 3 lowest-paid employees[cite: 2]
db.employees.find().sort({ salary: 1 }).limit(3);

// 7. Sort employees by department and salary[cite: 2]
db.employees.find().sort({ department: 1, salary: -1 });

// 8. Display employees 6–10[cite: 2]
db.employees.find().skip(5).limit(5);

// 9. Display employees 11–15[cite: 2]
db.employees.find().skip(10).limit(5);