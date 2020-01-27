const { Router } = require("express");
const City = require("../models/City");
const router = Router();

// /api/cities/get
router.post("/get", async (req, res) => {
  try {
    const { country } = req.body;
    let records = await City.find({ countryId: country });

    if (records) {
      records = records.map(item => {
        return {
          vkId: item.vkId,
          title: item.title
        };
      });
      return res.status(200).json(records);
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
