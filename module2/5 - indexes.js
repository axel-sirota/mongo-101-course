// First let's import data

// Import the datasets/students.json file and configure the schema.

db.students.createIndex({student_id: 1})

db.students.find({ student_id: { $gt : 12}}).explain()   // IXSCAN

db.students.find({ age: { $gt : 12}}).explain()  // COLLSCAN

db.students.createIndex({student_id:1, age:1}, {  name: "compounded index" })

db.students.find({ age: { $gt : 12}}).explain()  // COLLSCAN

db.students.find({ student_id: { $lt: 16}, age: { $gt : 12}}).explain("executionStats")  // IXSCAN using compound and rejected single index

db.students.find({ student_id: { $gt : 12}}, {student_id: 1}).hint({student_id: 1}).explain("executionStats")
