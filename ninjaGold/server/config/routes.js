const games = require('../controllers/games.js');

module.exports = function(app) {
    app.get("/", games.index);
    /* app.put("/update", games.update); */
};