const { Router } = require("express");
const config = require("config");
const Country = require("../models/Country");
const router = Router();

// /api/country/get
router.post("/get", async (req, res) => {
  try {
    const { title } = await req.body;

    let country = await Country.findOne({ title });

    if (country) {
      return res.status(200).json({ id: country.vkId, title: country.title });
    } else {
      res.status(404).json({ message: "Такая страна не найдена!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
