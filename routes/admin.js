const express = require('express');
const router = express.Router();
const redis = require('../lib/redis');

const basePath = '/admin';

router.post(basePath, async (req, res) => {
  await redis.resetDB();
  return res.status(200).json({
    statusCode: 200,
    message: 'Successfully reset the db',
    data: {},
  });
});

module.exports = router;