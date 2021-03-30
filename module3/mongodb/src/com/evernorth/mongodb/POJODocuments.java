package com.evernorth.mongodb;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

import static java.util.Arrays.asList;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

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

//      To insert POJOs directly we need a Codec Registry

        CodecRegistry pojoCodecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
                fromProviders(PojoCodecProvider.builder().automatic(true).build()));


        MongoDatabase database = mongoClient.getDatabase(databaseName).withCodecRegistry(pojoCodecRegistry);
        MongoCollection<Student> collection = database.getCollection("new_students", Student.class);

        collection.drop();

        Student student = new Student(13, "Biology", "D", 16);
        System.out.println("Original: " + student);
        collection.insertOne(student);

        // Person will now have an ObjectId
        System.out.println("Mutated: " + student);

        // get it (since it's the only one in there since we dropped the rest earlier on)
        Student somebody = collection.find().first();
        System.out.println("Found someone: " + somebody + "\n");

        List<Student> students = asList(
                new Student(13, "Literature", "A", 16),
                new Student(13, "Mathematics", "E", 16),
                new Student(13, "Chemistry", "B", 16)
        );

        collection.insertMany(students);

        collection.find().forEach(System.out::println);
        collection.drop();
        mongoClient.close();
    }

}

