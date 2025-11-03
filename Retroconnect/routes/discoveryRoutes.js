const express = require('express');
const { submitComplaint, discoverLocal, discoverSimilar, getUserComplaints, getAllComplaints } = require('../controllers/discoveryController');

const router = express.Router();

router.post('/complaint', submitComplaint);
router.get('/discover', discoverLocal);
router.get('/discover-similar', discoverSimilar);
router.get('/my-complaints', getUserComplaints);
router.get('/complaints', getAllComplaints);

module.exports = router;


