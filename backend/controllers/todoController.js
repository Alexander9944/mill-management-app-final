const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ expectedCompletionDate: 1 });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createTodo = async (req, res) => {
    const { task, expectedCompletionDate } = req.body;
    try {
        const newTodo = new Todo({
            task,
            expectedCompletionDate
        });
        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        const { task, completed, expectedCompletionDate } = req.body;
        if (task !== undefined) todo.task = task;
        if (completed !== undefined) todo.completed = completed;
        if (expectedCompletionDate !== undefined) todo.expectedCompletionDate = expectedCompletionDate;

        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        await todo.deleteOne();
        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
