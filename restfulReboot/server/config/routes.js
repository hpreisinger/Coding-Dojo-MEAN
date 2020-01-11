const tasks = require('../controllers/tasks.js');

module.exports = function(app) {
    app.get("/tasks", tasks.index);
    app.get("/tasks/:id", tasks.profile);
    app.post("/tasks", tasks.create);
    app.put("/update", tasks.update);
    app.delete("/tasks/:id", tasks.remove);
};