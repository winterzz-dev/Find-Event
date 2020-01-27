const { Router } = require("express");
const City = require("../models/City");
const router = Router();

// /api/city/get
router.post("/get", async (req, res) => {
  try {
    const { title, countryId } = req.body;
    let city = await City.findOne({ title, countryId });

    if (city) {
      return res.status(200).json({ id: city.vkId });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
