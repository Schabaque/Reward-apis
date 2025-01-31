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

  app.post("/api/rewards/spins", async (req, res) => {
    const { fid } = req.body;  
    try {     
      let reward = await Reward.findOne({ fid });
      if (!reward) {
        return res.status(404).json({ message: "User not found" });
      }     
      if (reward.spins <= 0) {
        return res.status(400).json({ message: "No spins left" });
      }     
      reward.spins -= 1;
  
    // Add a new index after a spin
const rewardKeys = Array.from(reward.rewards.keys()).map(Number); 
if (rewardKeys.length > 0) {
  const maxIndex = Math.max(...rewardKeys); 
  const newIndex = maxIndex + 1; 
  const newReward = (reward.rewards.get(maxIndex.toString()) || 0) + 100;
  reward.rewards.set(newIndex.toString(), newReward); 
} else {
 
  reward.rewards.set("0", 100); // Set initial reward
}

      
      await reward.save();
  
      res.json({ message: "Spin used successfully", spins: reward.spins, rewards: reward.rewards });
    } catch (error) {
      console.error("Error using spin:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
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
