const mongoose = require("mongoose");
const Campaign = require("./Campaign").schema;
const CampaignRef = require("./CampaignRef").schema;

//Schema for Profile object (profiles collection)
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  campaigns: {
    type: [CampaignRef],
    required: true,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
