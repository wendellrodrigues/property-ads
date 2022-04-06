const mongoose = require("mongoose");

//Schema for Campaign object (campaigns collection)
const CampaignSchema = new mongoose.Schema({
  images: {
    type: [String],
    require: false,
  },
});

module.exports = Campaign = mongoose.model("campaign", CampaignSchema);
