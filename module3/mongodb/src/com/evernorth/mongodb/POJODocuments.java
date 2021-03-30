package com.evernorth.mongodb;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Indexes;
import org.bson.Document;
import org.bson.json.JsonWriterSettings;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.gt;
import static com.mongodb.client.model.Filters.in;

public class POJODocuments {

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
        MongoCollection<Document> collection = database.getCollection("students");

        collection.dropIndexes();

        FindIterable<Document> iterable = collection.find(and(
                        gt("age", 15),
                        in("grade", "A", "B", "C"),
                        eq("subject", "Mathematics")
                ))
                .projection(new Document("student_id", 1)
                        .append("_id", 0)
                        .append("grade", 1)
                        .append("age", 1))
                .sort(new Document("age", -1))
                .limit(10);

//        iterable.forEach(document -> System.out.println(document.toJson()));

        Document explainResult = iterable.explain();
        System.out.println(explainResult.toJson(JsonWriterSettings.builder().indent(true).build()));

//        Let's find a better time indexing subject, grade and age

        collection.createIndex(
                Indexes.compoundIndex(
                        Indexes.ascending("subject"),
                        Indexes.ascending("grade"),
                        Indexes.descending("age")
                )
        );

        explainResult = iterable.explain();
        System.out.println(explainResult.toJson(JsonWriterSettings.builder().indent(true).build()));

//        Much better! Let's drop the index!

        collection.dropIndexes();

    }

}
