const controller = require('../controllers/controller.js');
const path = require("path");

module.exports = function(app) {
    app.get("/api/cakes", controller.getAllCakes);
    app.get("/api/cakes/:id", controller.getOneCake);
    app.post("/api/cakes/create", controller.createCake);
    app.put("/api/cakes/:id/comment", controller.addComment);

	app.all("*", (req,res,next) => {
		res.sendFile(path.resolve("./public/dist/public/index.html"))
	});
};