const express = require("express");
const app = express();

app.use(express.json());

require("./server/config/routes.js")(app);

app.listen(8000, () => console.log("Listening on port 8000."));