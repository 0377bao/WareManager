const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    return res.send("Account Router is working!");
});

module.exports = router;