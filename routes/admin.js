const express = require('express');
const router = express.Router();
const { resetContacts } = require('../db/helpers');

const basePath = '/admin';

router.post(basePath, (req, res) => {
  resetContacts();
  return res.status(200).json({
    statusCode: 200,
    message: 'Successfully reset the db',
    data: {},
  });
});

module.exports = router;