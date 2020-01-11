/* const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/ninjaGold');

const GameSchema = new mongoose.Schema({
	log: {type: Array, required: true},
    created_at: {type: Date, default: Date.now, required: true},
    updated_at: {type: Date, default: Date.now, required: true}
});

const Game = mongoose.model("Game", GameSchema);
module.exports = Game; */