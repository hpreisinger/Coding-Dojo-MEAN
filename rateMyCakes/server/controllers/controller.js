const MongExports = require("../models/models.js");
const Cake = MongExports.Cake;
const Comment = MongExports.Comment;
const path = require("path");

module.exports = {
	getAllCakes: (req, res) => {
        Cake.find()
            .then(data => res.json({message: "success", results: data}))
            .catch(err => res.json({message: "error", results: err}))
    },
    getOneCake: (req, res) => {
        Cake.findOne( {_id: req.params.id})
            .then(data => res.json({message: "success", results: data}))
            .catch(err => res.json({message: "error", results: err}))
    },
    createCake: (req, res) => {
        Cake.create(req.body)
            .then(data => res.json({message: "success", results: data}))
            .catch(err => res.json({message: "error", results: err}))
    },
    addComment: (req, res) => {
        Cake.updateOne( {_id: req.params.id}, {$push: {comments: req.body} }, {runValidators: true})
            .then(data => res.json({message: "success", results: data}))
            .catch(err => res.json({message: "error", results: err}))
    },
    getCakesByBaker: (req, res) => {
        Cake.findOne( {baker: req.params.baker})
            .then(data => res.json({message: "success", results: data}))
            .catch(err => res.json({message: "error", results: err}))
    },
};