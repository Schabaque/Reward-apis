const express = require("express");
const Reward = require("../models/Reward");

const router = express.Router();

// Create or Update Reward Data
router.post("/update", async (req, res) => {
  const { fid, spins, rewards } = req.body;

  try {
    let reward = await Reward.findOne({ fid });

    if (reward) {
      // Update existing record
      reward.spins = spins || reward.spins;
      reward.rewards = { ...reward.rewards, ...rewards }; // Merge new rewards
    } else {
      // Create new record
      reward = new Reward({ fid, spins, rewards });
    }

    await reward.save();
    res.json({ message: "Reward data updated", reward });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Reward Data by fid
router.get("/:fid", async (req, res) => {
  try {
    const reward = await Reward.findOne({ fid });
    if (!reward) return res.status(404).json({ message: "Reward not found" });

    res.json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
