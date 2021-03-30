// Start mongod process in Repl Set mode

mongod --replSet mongodb-replicaset --port 27017 --dbpath ~/mongodb-data

// Start with two collection to keep in sync

rs.initiate()
use oreilly
db.orders.insertMany([
    {"sku": "toys", "qty": 0}
])
db.inventory.insertMany([
    {"sku": "toys", "qty": 1000}
])

// Non-trasaction way

var results = db.inventory.find({
    "sku": "toys",
    "qty": { $gt : 200 }
});
if (results.hasNext()) {
  db.orders.updateMany(
    { "sku": "toys" },
    {
        $inc: { "qty" : 200 }
    },
    { upsert: true }
  );
  db.inventory.updateMany(
    { "sku": "toys" },
    {
        $inc: { "qty" : -200 }
    },
    { upsert: true }
  );
} else {
  print("There is no inventory");
}

// What can happen?

rs.initiate()
rs.secondaryOk()

session = db.getMongo().startSession()
orders = session.getDatabase("axel-sirota").orders;
inventory = session.getDatabase("axel-sirota").inventory;

session.startTransaction( { readConcern: { level: "local" }, writeConcern: { w: "majority" } } );

try {
    orders.updateMany(
        { "sku": "toys" },
        {
            $inc: { "qty" : 200 }
        },
        { upsert: true }
    );
    inventory.updateMany(
        { "sku": "toys" },
        {
            $inc: { "qty" : -200 }
        },
        { upsert: true }
    );
} catch (error) {
   // Abort transaction on error
   session.abortTransaction();
   throw error;
}
session.commitTransaction();
session.endSession();
