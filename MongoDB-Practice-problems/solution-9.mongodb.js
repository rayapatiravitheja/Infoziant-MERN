// Seed Data[cite: 2]
db.studentsWithAddress.insertMany([
  { studentId: 101, name: "Arun", department: "CSE", address: { city: "Kochi", state: "Kerala", pincode: "682001" } },
  { studentId: 102, name: "Sneha", department: "ECE", address: { city: "Chennai", state: "Tamil Nadu", pincode: "600001" } },
  { studentId: 103, name: "Rahul", department: "IT", address: { city: "Kochi", state: "Kerala", pincode: "682016" } }
]);

// 1. Find students from Kochi[cite: 2]
db.studentsWithAddress.find({ "address.city": "Kochi" });

// 2. Find students from Kerala[cite: 2]
db.studentsWithAddress.find({ "address.state": "Kerala" });

// 3. Find students using pincode[cite: 2]
db.studentsWithAddress.find({ "address.pincode": "682001" });

// 4. Update a student's city[cite: 2]
db.studentsWithAddress.updateOne({ studentId: 101 }, { $set: { "address.city": "Trivandrum" } });

// 5. Update a student's pincode[cite: 2]
db.studentsWithAddress.updateOne({ studentId: 101 }, { $set: { "address.pincode": "695001" } });

// 6. Display only student name and city[cite: 2]
db.studentsWithAddress.find({}, { _id: 0, name: 1, "address.city": 1 });