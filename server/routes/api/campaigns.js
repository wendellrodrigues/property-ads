const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

//Models
const Profile = require("../../models/Profile");
const Campaign = require("../../models/Campaign");
const CampaignRef = require("../../models/CampaignRef");

//Helper function to create new campaign (campaigns collection) and return its ID
const createCampaign = async () => {
  //Create campaign
  let newCampaign = new Campaign({
    images: [],
  });
  let objId = null;
  try {
    await newCampaign.save().then((obj) => {
      objId = obj.id;
    });
    return objId;
  } catch (error) {
    return null;
  }
};

//Helper function to push a campaign reference to a profile object in db
const pushCampaignToProfile = async (profile, id) => {
  const campObj = await createCampaign();
  const campRef = new CampaignRef({
    campaign: campObj,
  });
  try {
    profile = await Profile.findOneAndUpdate(
      { user: id },
      { $push: { campaigns: campRef } }
    );
    return profile;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
  @route    POST  api/campaigns/createCampaign
  @desc     Create a campaign and store images to DB
  @access   Private  
 */
router.post("/createCampaign", auth, async (req, res) => {
  //Create new campaign

  try {
    let profile = await Profile.findOne({ user: req.user.id }); //Matched from token

    //Create profile if no profile is found
    if (!profile) {
      profile = new Profile({
        user: req.user.id,
        campaigns: [],
      });
      //Save new profile object to DB
      await profile.save();
    }

    //Add new campaign to already existing profile (newly created or already existing)
    profile = await pushCampaignToProfile(profile, req.user.id);
    if (profile) res.status(200).send(profile);
    else res.status(500).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

module.exports = router;
