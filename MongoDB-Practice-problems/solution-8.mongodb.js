// Seed Data[cite: 2]
db.students.insertMany([
  { studentId: 101, name: "Arun", department: "CSE", skills: ["Java", "MongoDB", "React"] },
  { studentId: 102, name: "Sneha", department: "ECE", skills: ["Python", "Java"] },
  { studentId: 103, name: "Rahul", department: "IT", skills: ["React", "Node.js", "MongoDB", "Express"] }
]);

// 1. Find students who know Java[cite: 2]
db.students.find({ skills: "Java" });

// 2. Find students who know Java and MongoDB[cite: 2]
db.students.find({ skills: { $all: ["Java", "MongoDB"] } });

// 3. Add Node.js to a student's skills[cite: 2]
db.students.updateOne({ studentId: 101 }, { $push: { skills: "Node.js" } });

// 4. Add a skill without creating duplicates[cite: 2]
db.students.updateOne({ studentId: 101 }, { $addToSet: { skills: "React" } });

// 5. Remove a skill[cite: 2]
db.students.updateOne({ studentId: 101 }, { $pull: { skills: "Node.js" } });

// 6. Find students having exactly 3 skills[cite: 2]
db.students.find({ skills: { $size: 3 } });

// 7. Find students who know React[cite: 2]
db.students.find({ skills: "React" });