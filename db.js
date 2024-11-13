const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const db = process.env.MONGO_URI;
    if (!db) {
      throw new Error("MongoDB connection string is missing");
    }
    
    // Removed deprecated options
    await mongoose.connect(db);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Could not connect to database!", error);
    process.exit(1); // Exit process with failure
  }
};
