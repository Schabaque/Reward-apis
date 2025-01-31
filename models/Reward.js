const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    fid: { type: String, required: true }, // Unique user identifier
    spins: { type: Number, default: 0 }, // Number of spins the user has
    rewards: {
      type: Map,
      of: Number, // Example: { "0": 100, "1": 200, "2": 300 }
      default: {}, // Default empty object
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Reward", rewardSchema);
