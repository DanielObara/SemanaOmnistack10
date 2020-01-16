const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    if (await Dev.findOne({ github_username }))
      return res.status(400).json({ error: "Dev already exists!" });

    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, avatar_url, bio } = response.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });

    return res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find();

    return res.status(200).json(devs);
  },

  async show(req, res) {
    const { github_username } = req.body;
    const dev = await Dev.findOne({ github_username });

    return res.status(200).json(dev);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, avatar_url, bio, techs, latitude, longitude } = req.body;

    await Dev.findByIdAndUpdate(
       id ,
      {
        name,
        avatar_url,
        bio,
        techs,
        latitude,
        longitude
      }
    );

    return res.status(200).json({ msg: "Updated!" });
  },

  async destroy(req, res) {
    const { github_username } = req.body;
    await Dev.findOneAndDelete({ github_username });

    return res.status(200).json({ msg: "deleted!" });
  }
};
