const express = require("express");
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost/murderDB', { useNewUrlParser: true });

app.use(express.static(__dirname + '/public'));
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

const CrowSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String, required: true },
    created_at: { type: Date, default: Date.now, required: true }
});

const Crow = mongoose.model("Crow", CrowSchema);

/* -------------------------------- */

app.get("/", (req, res) => {
    Crow.find().sort({ created_at: -1 })
        .then(data => res.render("index", { crows: data }))
        .catch(err => res.json(err));
});

app.get("/crows/new", (req, res) => {
    res.render("new");
});

app.get("/crows/:id", (req, res) => {
    Crow.findOne({ _id: req.params.id })
        .then(data => res.render("profile", { crow: data }))
        .catch(err => res.json(err));
});

app.get("/crows/edit/:id", (req, res) => {
    Crow.findOne({ _id: req.params.id })
        .then(data => res.render("edit", { crow: data }))
        .catch(err => res.json(err));
});

app.post("/crows", (req, res) => {
    const crow = new Crow(req.body);
    crow.save()
        .then(() => res.redirect("/"))
        .catch(err => res.json(err));
    res.redirect('/');
});

app.post("/crows/:id", (req, res) => {
    Crow.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        age: req.body.age,
        color: req.body.color
    })
        .then(() => res.redirect("/"))
        .catch(err => res.json(err));
});

app.post("/crows/destroy/:id", (req, res) => {
    Crow.deleteOne({ _id: req.params.id })
        .then(data => res.redirect("/"))
        .catch(err => res.json(err));
});