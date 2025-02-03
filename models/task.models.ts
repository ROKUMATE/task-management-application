import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    person: {
        type: String,
        required: [true, 'Please provide a person'],
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
        default: '',
    },
    dueDate: {
        type: String,
        required: [true, 'Please provide a due date'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
