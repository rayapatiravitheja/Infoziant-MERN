db.employees.aggregate([
  // Group by department and aggregate values[cite: 2]
  {
    $group: {
      _id: "$department",
      numberOfEmployees: { $sum: 1 },        // Count[cite: 2]
      averageSalary: { $avg: "$salary" },    // Avg[cite: 2]
      highestSalary: { $max: "$salary" },    // Max[cite: 2]
      lowestSalary: { $min: "$salary" },     // Min[cite: 2]
      totalSalary: { $sum: "$salary" }       // Total[cite: 2]
    }
  },
  // Departments having more than 3 employees[cite: 2]
  {
    $match: {
      numberOfEmployees: { $gt: 3 }
    }
  },
  // Sort departments based on average salary[cite: 2]
  {
    $sort: { averageSalary: -1 }
  }
]);