const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

router.get('/data', authenticateAdmin, dataController.getData);
router.get('/branch_compare', authenticateAdmin, dataController.getBranchCompare);
router.get('/position_compare', authenticateAdmin, dataController.getPositionCompare);
router.get('/branch_position_compare', authenticateAdmin, dataController.getBranchPositionCompare);
router.post('/data/check', authenticateToken, dataController.checkData);
router.post('/data', authenticateToken, dataController.insertData);
router.get('/user', authenticateToken, dataController.getUserData);

module.exports = router;