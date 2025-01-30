const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  });

// Define Reward Schema
const rewardSchema = new mongoose.Schema(
  {
    fid: { type: String, required: true }, // Unique user ID
    spins: { type: Number, default: 0 }, // User spins
    rewards: {
      type: Map,
      of: Number, // Example: { "0": 100, "1": 200 }
      default: {}, // Empty object by default
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

const Reward = mongoose.model("Reward", rewardSchema);

// Create/Update Reward
app.post("/api/rewards/update", async (req, res) => {
  const { spins, rewards } = req.body;
  const fid = 123; // Assign fid here

  try {
    // Directly set fid to 123 for all users
    const reward = new Reward({ fid, spins, rewards });

    await reward.save();
    res.json({ messages: "Reward updated successfully!", reward });
  } catch (error) {
    console.error("Error saving reward:", error); // Log the error to the server console
    res.status(500).json({ messages: "Internal server error", error: error.message });
  }
});


// Get Reward Data by fid


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
