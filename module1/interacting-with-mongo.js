// To connect to MongoDB we need to use mongo CLI to connect to the mongod process

// mongo -u {username} -p {password} {hostname}/{database_name}

mongo localhost/axel-sirota  // If the database doesn't exist it will auto-create it at the moment you insert a document


// DB variable
db


show dbs

show collections // collections are like tables


db.test.insert({"company": "CIGMA - Evernorth", "technology": "MongoDB"})   // We insert JSON documents
db.test.find()  // We get back an ObjectID and the document


show collections

db.help()
db.test.help()

db.test.totalSize()
