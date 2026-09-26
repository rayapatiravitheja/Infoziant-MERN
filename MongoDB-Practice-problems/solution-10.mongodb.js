// Seed Data[cite: 2]
db.examStudents.insertMany([
  {
    studentId: 101,
    name: "Arun",
    department: "CSE",
    marks: [
      { subject: "Java", mark: 85 },
      { subject: "MongoDB", mark: 90 },
      { subject: "React", mark: 78 }
    ]
  },
  {
    studentId: 102,
    name: "Sneha",
    department: "ECE",
    marks: [
      { subject: "Java", mark: 90 },
      { subject: "MongoDB", mark: 75 },
      { subject: "React", mark: 92 }
    ]
  }
]);

// 1. Find students who scored more than 80 in MongoDB[cite: 2]
db.examStudents.find({ marks: { $elemMatch: { subject: "MongoDB", mark: { $gt: 80 } } } });

// 2. Find students who scored 90 in Java[cite: 2]
db.examStudents.find({ marks: { $elemMatch: { subject: "Java", mark: 90 } } });

// 3. Update the MongoDB mark for student 101 to 95[cite: 2]
db.examStudents.updateOne(
  { studentId: 101, "marks.subject": "MongoDB" },
  { $set: { "marks.$.mark": 95 } }
);

// 4. Find students who scored more than 80 in both Java and MongoDB[cite: 2]
db.examStudents.find({
  $and: [
    { marks: { $elemMatch: { subject: "Java", mark: { $gt: 80 } } } },
    { marks: { $elemMatch: { subject: "MongoDB", mark: { $gt: 80 } } } }
  ]
});

// 5. Find students who scored more than 90 in any subject[cite: 2]
db.examStudents.find({ "marks.mark": { $gt: 90 } });