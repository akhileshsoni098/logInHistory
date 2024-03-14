const express = require('express');
const router = express.Router();

router.route('/').get(async (req, res) => {
    res.status(200).json({
      status: true,
      message: "API is working fine"
    });
  });
  

module.exports = router

