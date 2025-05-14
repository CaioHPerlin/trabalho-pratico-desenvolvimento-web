const express = require("express");
const vagaRoutes = require("./routes/vaga.routes");

const PORT = 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");

// Routes
app.use('/vagas', vagaRoutes);

app.listen(PORT, () => {
    console.log(`[INFO] Server running on http://localhost:${PORT}`);
});