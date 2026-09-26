// ===============================================================
// Problem 1: Student Database – Database and Collection
// ===============================================================

// 1. Switch to/Create database (Run in mongosh: use collegeDB)
// use collegeDB;

// 2. Create the students collection
db.createCollection("students");

// 3. Insert one student
db.students.insertOne({
  studentId: 101,
  name: "Arun Kumar",
  age: 20,
  gender: "Male",
  department: "CSE",
  year: 2,
  email: "arun@example.com"
});

// 4. Insert multiple students (9 more to make 10 total)
db.students.insertMany([
  {
    studentId: 102,
    name: "Sneha Rao",
    age: 21,
    gender: "Female",
    department: "ECE",
    year: 3,
    email: "sneha@example.com"
  },
  {
    studentId: 103,
    name: "Rahul Verma",
    age: 19,
    gender: "Male",
    department: "IT",
    year: 1,
    email: "rahul@example.com"
  },
  {
    studentId: 104,
    name: "Pooja Nair",
    age: 22,
    gender: "Female",
    department: "CSE",
    year: 4,
    email: "pooja@example.com"
  },
  {
    studentId: 105,
    name: "Kiran Das",
    age: 20,
    gender: "Male",
    department: "MECH",
    year: 2,
    email: "kiran@example.com"
  },
  {
    studentId: 106,
    name: "Ananya Sharma",
    age: 21,
    gender: "Female",
    department: "ECE",
    year: 3,
    email: "ananya@example.com"
  },
  {
    studentId: 107,
    name: "Vikas Reddy",
    age: 22,
    gender: "Male",
    department: "CIVIL",
    year: 4,
    email: "vikas@example.com"
  },
  {
    studentId: 108,
    name: "Meera Menon",
    age: 20,
    gender: "Female",
    department: "IT",
    year: 2,
    email: "meera@example.com"
  },
  {
    studentId: 109,
    name: "Siddharth Jain",
    age: 19,
    gender: "Male",
    department: "CSE",
    year: 1,
    email: "siddharth@example.com"
  },
  {
    studentId: 110,
    name: "Divya Patel",
    age: 21,
    gender: "Female",
    department: "EEE",
    year: 3,
    email: "divya@example.com"
  }
]);

// 5. Display all students
db.students.find();

// 6. Find a student using Student ID
db.students.find({ studentId: 101 });

// 7. Display only name, department, and email (Projection)
db.students.find(
  {},
  { _id: 0, name: 1, department: 1, email: 1 }
);