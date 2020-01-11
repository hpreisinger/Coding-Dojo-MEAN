const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/restfulReboot');

const TaskSchema = new mongoose.Schema({
	title: {type: String, required: true},
    description: {type: String, default: "", required: true},
    completed: {type: Boolean, default: false, required: true},
    created_at: {type: Date, default: Date.now, required: true},
    updated_at: {type: Date, default: Date.now, required: true}
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;