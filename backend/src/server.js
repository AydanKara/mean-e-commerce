
import app from "./app.js";
import connectDB from "./config/db.js"

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});