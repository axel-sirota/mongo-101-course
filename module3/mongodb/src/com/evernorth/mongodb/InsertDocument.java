package com.evernorth.mongodb;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Properties;

import static com.mongodb.client.model.Filters.eq;

public class InsertDocument {

    public static void main(String[] args) {
        Properties properties= new Properties();
        String host = "";
        String databaseName = "";
        try {
            properties.load(new FileInputStream("configuration.properties"));

            host = (String) properties.get("host");
            databaseName = (String) properties.get("database");
        } catch (IOException e) {
            e.printStackTrace();
        }
        MongoClient mongoClient = MongoClients.create(host);
        MongoDatabase database = mongoClient.getDatabase(databaseName);

//        Insert a Doc

        Document doc = new Document("item", "laptop")
                .append("qty", 12)
                .append("count", 1)
                .append("tags", Arrays.asList("arm", "apple", "fast"))
                .append("size", new Document("h", 35).append("w", 21).append("uom", "cm"))
                .append("status", "A");

        MongoCollection<Document> collection = database.getCollection("inventory");
        collection.insertOne(doc);

//        Find it

        listCollection(collection);

//        If its there, delete it

        collection.find(eq("item", "laptop"))
                .forEach(collection::deleteOne);

        listCollection(collection);

    }

    private static void listCollection(MongoCollection<Document> collection) {
        try (MongoCursor<Document> cursor = collection.find().iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }
        System.out.println("Finished Listing collection\n\n");
    }
}
