const mongoose = require("mongoose");

//Campaign Reference -> "campaigns" collection to be stored in Profile Object
const CampaignRefSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "campaign",
  },
});

module.exports = CampaignRef = mongoose.model("campaignRef", CampaignRefSchema);
