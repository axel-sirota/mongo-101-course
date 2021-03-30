package com.evernorth.mongodb;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ListDocuments {

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

        MongoCollection<Document> collection = database.getCollection("inventory");
        try (MongoCursor<Document> cursor = collection.find().iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }
        mongoClient.close();
    }
}
