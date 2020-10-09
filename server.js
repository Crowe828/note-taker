// Require Express
const express = require("express");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect server to the route files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Init the server
app.listen(PORT, () => console.log(`Listen on PORT: http://localhost:${PORT}`));
