const { Router } = require("express");
const router = Router();
const VK = require("vk-io").VK;
const NodeRSA = require("node-rsa");
const private_keys = require("../keys");

router.post("/get", async (req, res) => {
  try {
    const { event_id, token, user_id } = req.body;

    // const key = await new NodeRSA();
    // key.importKey(private_keys[user_id]);

    // const decrypted_key = key.decrypt(token, "utf8");

    const vk = new VK({
      // token: decrypted_key
      token
    });

    const response = await vk.api.groups.getById({
      group_id: event_id,
      fields:
        "start_date,finish_date,public_date_label,place,activity,description,members_count"
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
