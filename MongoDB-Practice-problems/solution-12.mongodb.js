db.employees.aggregate([
  // 1. Display only required fields & calculate Annual Salary = Salary * 12[cite: 2]
  {
    $project: {
      _id: 0,
      name: 1,
      department: 1,
      salary: 1,
      annualSalary: { $multiply: ["$salary", 12] }
    }
  },
  // 2. Filter employees whose annual salary is greater than 1,000,000[cite: 2]
  {
    $match: {
      annualSalary: { $gt: 1000000 }
    }
  },
  // 3. Sort employees by annual salary[cite: 2]
  {
    $sort: { annualSalary: -1 }
  }
]);