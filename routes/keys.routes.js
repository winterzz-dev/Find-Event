const NodeRSA = require("node-rsa");
const private_keys = require("../keys");
const { Router } = require("express");
const router = Router();

// /api/keys/get
router.post("/get", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (private_keys[user_id] !== undefined) {
      return res.status(200).json({ public_key: private_keys[user_id] });
    } else {
      const key = new NodeRSA({ b: 512 });
      private_keys[user_id] = key.exportKey("private").toString();

      return res
        .status(200)
        .json({ public_key: key.exportKey("public").toString() });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
