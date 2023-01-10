//jshint esversion:6
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    
    rating: 10,
    review: "Peaches are so yummy."
});

const peopleSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", peopleSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great fruit."
});

pineapple.save();

const person = new Person ({
    name: "Amy",
    age: 12,
    favoriteFruit: pineapple
});


//fruit.save();
person.save();



Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    } else {
        
        mongoose.connection.close();

        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});

/*Fruit.updateOne({_id: "63bdcd5acaf8cf3411619c6a"}, {name: "Peach"}, function(err){
    if (err){
        console.log(err);
    } else {
        console.log("Successfully updated the document.");
    }
}); */

/*Fruit.deleteOne({name: "Peach"}, function(err){
    if(err){
        console.log(err);
    } else {
        
    }
}) */

Person.deleteMany({name: "John"}, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully deleted all the document");
    }
});