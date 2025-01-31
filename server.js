const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Reward = require("./models/Reward");
// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully!"))
  .catch((error) => {
    console.error(" MongoDB Connection Failed:", error.message);
    process.exit(1);
  });




//const Reward = mongoose.model("Reward", rewardSchema);

// Create/Update Reward
app.post("/api/rewards/update", async (req, res) => {
  const { spins, rewards } = req.body;
  const fid = 124; // Assign fid here

  try {
   
    const reward = new Reward({ fid, spins, rewards });

    await reward.save();
    res.json({ messages: "Reward updated successfully!", reward });
  } catch (error) {
    console.error("Error saving reward:", error); 
    res.status(500).json({ messages: "Internal server error", error: error.message });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
