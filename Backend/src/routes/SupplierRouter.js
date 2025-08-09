const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    return res.send("SupplierRouter Router is working!");
});

module.exports = router;