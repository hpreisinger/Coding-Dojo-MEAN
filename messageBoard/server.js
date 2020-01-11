const express = require("express");
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost/messageboard', { useNewUrlParser: true });

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash());
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => console.log("listening on port 8000"));

/* -------------------------------- */

const CommentSchema = new mongoose.Schema({
    author: { type: String, required: [true, "Comments must have an author."] },
    content: { type: String, required: [true, "Comments must have content."] },
    created_at: { type: Date, default: Date.now, required: true }
});

const PostSchema = new mongoose.Schema({
    author: { type: String, required: [true, "Posts must have an author."] },
    content: { type: String, required: [true, "Posts must have content."] },
    created_at: { type: Date, default: Date.now, required: true },
    comments: [CommentSchema]
});

const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

/* -------------------------------- */

app.get("/", (req, res) => {
    var posts = Post.find().sort({ created_at: -1 })
        .then(data => res.render("index", { posts: data }))
        .catch(err => res.json(err));
});

app.post("/addPost", (req, res) => {
    var post = new Post(req.body);
    post.save()
        .then(() => res.redirect("/"))
        .catch(err => {
            console.log("Houston, we have a problem.", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
})

app.post("/addComment/:id", (req, res) => {
    var comment = new Comment(req.body);
    Post.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: comment }}, {runValidators: true} )
        .then(() => res.redirect("/"))
        .catch(err => {
            console.log("Houston, we have a problem.", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
})
