const express = require('express');
const router = new express.Router();
const tests = require('../controllers/tests.js');
  
router.route('/tests/:id?')
  .get(tests.get)
  .post(tests.post)
  .put(tests.put)
  .delete(tests.delete);

module.exports = router;