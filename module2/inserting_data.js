// First let's import data

// mongoimport -c inventory -d {DATABASE}} --drop --type csv --headerline --uri "mongodb://{USERNAME}:{PASSWORD}@{HOSTNAME}:27017/{DATABASE}" inventory.csv

mongoimport -c inventory -d axel-sirota --drop --type csv --headerline --uri "mongodb://localhost:27017/axel-sirota" inventory.csv

mongo localhost:27017/axel-sirota


db.inventory.insertOne(
    { item: "canvas", qty: 100, tags: ["cotton"] }
)

db.inventory.insertMany([
    { item: "computer", qty: 5, tags: ["ARM"]},
    { item: "accessories", qty: 10, size: { h: 15, w: 12, uom: "cm" }}
])

