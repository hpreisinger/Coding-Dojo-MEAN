const persons = require('../controllers/persons.js');

module.exports = function(app) {
    app.get("/", persons.index);
    app.get("/new/:name", persons.new);
    app.get("/remove/:name", persons.remove);
    app.get("/:name", persons.profile);
};