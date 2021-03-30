// First let's import data

// mongoimport -c inventory -d {DATABASE}} --drop --type csv --headerline --uri "mongodb://{USERNAME}:{PASSWORD}@{HOSTNAME}:27017/{DATABASE}" inventory.csv

mongoimport -c students -d axel-sirota --drop --type json --uri "mongodb://localhost:27017/axel-sirota" students.json

db.students.createIndex({student_id: 1})

db.students.find({ student_id: { $gt : 12}}).explain()   // IXSCAN

db.students.find({ age: { $gt : 12}}).explain()  // COLLSCAN

db.students.createIndex({student_id:1, age:1}, {  name: "compounded index" })

db.students.find({ age: { $gt : 12}}).explain()  // COLLSCAN

db.students.find({ student_id: { $lt: 16}, age: { $gt : 12}}).explain("executionStats")  // IXSCAN using compound and rejected single index

db.students.find({ student_id: { $gt : 12}}, {student_id: 1}).hint({student_id: 1}).explain("executionStats")
