import mongoose from 'mongoose';

const tasksSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    dispatch_Date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high']
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',

    }
}, {
    timestamps: true
}
);

const Task = mongoose.model('Task', tasksSchema)

export default Task;