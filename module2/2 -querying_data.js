db.inventory.find({item: "board game"})

db.inventory.find({item: "paiting"}, {qty:1, "size.h":1, "size.w":1})   // One can project over nested documents

db.inventory.insert({item:"microfone", qty:2, tags:["music", "noise cancelling"]})

db.inventory.find({tags:"music"})  // Matches by array value

db.inventory.find({tags:"music"}, {"tags.$":1})  // Returns the first matching element

db.inventory.find({tags: {$exists: true }} )  // Complex operator

db.inventory.find(
    {
        tags: {$exists: true },
        qty: { $gt : 50}
    })

db.inventory.find( { qty: { $in: [ 100, 25 ] } } )

// More on operators: https://docs.mongodb.com/manual/reference/operator/query/


db.example.insertMany([
    {grades: [1,2,3]},
    {grades: [4,5,6]}
])
db.example.find({"grades.0" : { $gt : 3 } })  // Query on tag value chaining with an operator


