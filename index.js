const express = require("express");
const app = express();

app.use(express.json());

// FIXED PATH (dot, not underscore)
const userRoutes = require("./routes/user_routes");

app.use("/", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});






