const pageSize = 5; //[cite: 2]

// Page 1 (Employees 1–5)[cite: 2]
db.employees.find().sort({ empId: 1 }).skip(0 * pageSize).limit(pageSize);

// Page 2 (Employees 6–10)[cite: 2]
db.employees.find().sort({ empId: 1 }).skip(1 * pageSize).limit(pageSize);

// Page 3 (Employees 11–15)[cite: 2]
db.employees.find().sort({ empId: 1 }).skip(2 * pageSize).limit(pageSize);

// Formula: db.employees.find().sort({ empId: 1 }).skip((pageNumber - 1) * pageSize).limit(pageSize)[cite: 2]