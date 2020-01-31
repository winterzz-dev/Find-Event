const { Router } = require("express");
const config = require("config");
const City = require("../models/City");
const router = Router();

const VK = require("vk-io").VK;

// /api/city/get
router.post("/get", async (req, res) => {
  try {
    const { title, countryId } = await req.body;

    const find = async (countryId, title) => {
      const vk = new VK({
        token: config.get("service_token")
      });
      const response = await vk.api.database.getCities({
        country_id: countryId,
        q: title
      });

      return response.items;
    };

    let city = await City.findOne({ title, countryId });

    if (city) {
      return res.status(200).json({ id: city.vkId, title: city.title });
    } else {
      const result = await find(countryId, title);
      if (result.length != 0) {
        const city = new City({
          vkId: result[0].id,
          countryId,
          title
        });
        await city.save();
        return res
          .status(200)
          .json({ id: result[0].id, title: result[0].title });
      } else {
        res.status(404).json({ message: "Такой город не найден!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
