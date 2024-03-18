// example of model, folder name must be in plural
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SampleModelsSchema = new Schema({
    name: Object,
    age: Number,
    username: String,
    email: String,
    country: String,
    website: String,
    jobTitle: String,
    employmentDate: Date,
})

const SampleModel = mongoose.model("persons", SampleModelsSchema);
module.exports = SampleModel;