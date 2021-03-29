db.books.remove({});

db.books.insertMany([
  {
    "_id" : 1,
    "item" : "TBD",
    "stock" : 0,
    "info" : { "publisher" : "1111", "pages" : 430 },
    "tags" : [ "technology", "computer" ],
    "ratings" : [ { "by" : "ijk", "rating" : 4 }, { "by" : "lmn", "rating" : 5 } ],
    "reorder" : false
   },
   {
    "_id" : 2,
    "item" : "XYZ123",
    "stock" : 15,
    "info" : { "publisher" : "5555", "pages" : 150 },
    "tags" : [ ],
    "ratings" : [ { "by" : "xyz", "rating" : 5 } ],
    "reorder" : false
   }
]);


db.books.update(
    { _id: 1 },
    {
      $inc: { stock: 5 },
      $set: {
        item: "ABC123",
        "info.publisher": "2222",
        tags: [ "software" ],
        "ratings.1": { by: "xyz", rating: 3 }
      }
    }
 )


 db.books.find({_id : 1})

 db.books.update(
    { _id: 2 },
    {
      $push: { ratings: { "by" : "jkl", "rating" : 2 } }
    }
 )

 db.books.find({_id:2})

 db.books.update(
    { stock: { $lte: 10 } },
    { $set: { reorder: true } },
    { multi: true }
 )
