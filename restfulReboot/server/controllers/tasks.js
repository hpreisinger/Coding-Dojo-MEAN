const Task = require("../models/task.js");

module.exports = {
	index: function (req, res) {
        Task.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    profile: function (req, res) {
        Task.findOne({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    create: function (req, res) {
        Task.create({ title: req.body.title, description: req.body.description, completed: req.body.completed })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    update: function (req, res) {
        Task.updateOne({ _id: req.params.id }, { title: req.body.title, description: req.body.description, completed: req.body.completed })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    remove: function (req, res) {
        Task.deleteOne({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
};