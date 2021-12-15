const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {

    const tasks = await Task.find({});

    //this returns the array and the length
    //res.status(200).json({ tasks, amount: tasks.length });
    /*res
        .status(200)
        .json({ status:"success", data:{tasks, nbHits: tasks.length} });
    */

    res.status(200).json({ tasks });

})

const createTask = asyncWrapper(async (req, res) => {

    const task = await Task.create(req.body);
    res.status(201).json({ task });

    //Next line is to test middleware
    //res.json(req.body);
})

const getTask = asyncWrapper(async (req, res, next) => {

    //in this next line we declare it as id but give it an alis
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    //if id does not exist
    if (!task) {
        return next(createCustomError(`no task with id : ${taskID}`, 404));
    }
    //returns task
    res.status(200).json({ task });

})

const updateTask = asyncWrapper(async (req, res) => {

    const { id: taskId } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        //new returns object after update is applied
        new: true,
        runValidators: true
    });

    if (!task) {
        return next(createCustomError(`no task with id : ${taskID}`, 404));
    }

    res.status(200).json({ task });

})

const deleteTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
        return next(createCustomError(`no task with id : ${taskID}`, 404));
    }

    //res.status(200).json({task});
    //res.status(200).send();
    //sets task to null and sends success
    res.status(200).json({ task: null, status: 'success' });


})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}