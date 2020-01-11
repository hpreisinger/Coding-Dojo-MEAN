const Person = require("../models/person.js");

module.exports = {
    index: function (req, res) {
        Person.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    new: function (req, res) {
        Person.create({name: req.params.name})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    remove: function (req, res) {
        Person.deleteOne({name: req.params.name})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    profile: function (req, res) {
        Person.findOne({name: req.params.name})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
};