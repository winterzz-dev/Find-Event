const { Router } = require("express");
const router = Router();
const VK = require("vk-io").VK;

// /api/events/find
router.post("/find", async (req, res) => {
  try {
    let { user_ud, token, city_id, categories } = req.body;

    const vk = new VK({
      token
    });

    let events = [];

    const find = async cat => {
      const response = await vk.api.groups.search({
        q: cat,
        type: "event",
        city_id,
        future: 1
      });

      return response.items.map(item => {
        return {
          id: item.id,
          name: item.name,
          screen_name: item.screen_name,
          photo: item.photo_100
        };
      });
    };

    categories = categories.split(",");

    for (const category of categories) {
      events = events.concat(await find(category));
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
