const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/1955api');

const PersonSchema = new mongoose.Schema({
	name: {type: String, required: true},
    created_at: {type: Date, default: Date.now, required: true},
    updated_at: {type: Date, default: Date.now, required: true}
});

const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;