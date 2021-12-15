const express = require('express');
const router = express.Router();

const { 
    getAllTasks, 
    createTask,
    deleteTask, 
    updateTask, 
    getTask 
} = require('../controllers/tasks');

router.route('/').get(getAllTasks).post(createTask);
//patch replaces the content and put creates a new id.
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;

