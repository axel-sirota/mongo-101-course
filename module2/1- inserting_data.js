// First let's import data

// Import the datasets/inventory.csv file and configure the schema.


db.inventory.insertOne(
    { item: "canvas", qty: 100, tags: ["cotton"] }
)

db.inventory.insertMany([
    { item: "computer", qty: 5, tags: ["ARM"]},
    { item: "accessories", qty: 10, size: { h: 15, w: 12, uom: "cm" }}
])

