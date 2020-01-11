const express = require("express");
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost/name_of_your_DB', {useNewUrlParser: true});

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));

app.listen(8000, () => console.log("listening on port 8000"));

/* -------------------------------- */

const QuoteSchema = new mongoose.Schema({
    content: {type: String, required: true},
    author: {type: String, required: true},
    created_at: {type: Date, default: Date.now, required: true}
});

const Quote = mongoose.model("Quote", QuoteSchema);

/* -------------------------------- */

app.get("/", (req, res) => {
    res.render("index")
});

app.post("/quotes", (req, res) => {
    const quote = new Quote(req.body);
    quote.save()
    .then(() => res.redirect("/quotes"))
    .catch(err => {
        console.log("Houston, we have a problem.", err);
        for (var key in err.errors) {
            req.flash('registration', err.errors[key].message);
        }
        res.redirect('/');
    });
});

app.get("/quotes", (req, res) =>  {
    Quote.find().sort({created_at: -1})
        .then(data => res.render("quotes", {quotes: data}))
        .catch(err => res.json(err));
});

/* -------------------------------- */