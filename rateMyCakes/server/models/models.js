const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/rateMyCakes');

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true, minlength: 1 },
    rating: {type: Number, required: true, min: 1, max: 5},
}, {timestamps: true});

const CakeSchema = new mongoose.Schema({
    baker: {type: String, required: true, minlength: 1},
    imageURL: {type: String, required: true, match: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/},
    comments: [CommentSchema],
}, {timestamps: true});

const Cake = mongoose.model("Cake", CakeSchema);
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = {
    Cake,
    Comment
};